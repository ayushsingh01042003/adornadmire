#!/usr/bin/env node
/**
 * Post-build steps:
 *   1. Emit 404.html so Vercel returns a real 404 status for unknown URLs
 *      instead of a soft 404.
 *   2. Validate the SEO head of every pre-rendered page and fail the build on
 *      a regression.
 *
 * The validation exists because the failure mode it guards against is silent:
 * a missing canonical or a title truncated in the results page costs traffic
 * without ever breaking a page.
 */

import { readFile, copyFile, cp, rm, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

// import.meta.url rather than import.meta.dirname, which needs Node 20.11+.
const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = path.join(ROOT, 'build/client');

const MAX_TITLE = 60;
const MIN_DESC = 70;
const MAX_DESC = 165;

const errors = [];
const warnings = [];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

/** Every index.html under build/client, as [urlPath, filePath]. */
async function collectPages(dir = OUT, prefix = '') {
  const pages = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'img' || entry.name === 'media') continue;
      pages.push(...(await collectPages(path.join(dir, entry.name), `${prefix}/${entry.name}`)));
    } else if (entry.name === 'index.html') {
      pages.push([prefix === '' ? '/' : prefix, path.join(dir, entry.name)]);
    }
  }
  return pages;
}

function pick(html, pattern) {
  const m = pattern.exec(html);
  return m ? m[1] : null;
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'");
}

function validate(urlPath, html, origin) {
  const where = `${urlPath}`;

  const title = pick(html, /<title>([\s\S]*?)<\/title>/);
  if (!title) {
    errors.push(`${where}: no <title>`);
  } else {
    const decoded = decode(title);
    if (decoded.length > MAX_TITLE) {
      errors.push(`${where}: title is ${decoded.length} chars (max ${MAX_TITLE}) — "${decoded}"`);
    }
  }

  const desc = pick(html, /<meta name="description" content="([\s\S]*?)"\s*\/?>/);
  if (!desc) {
    errors.push(`${where}: no meta description`);
  } else {
    const decoded = decode(desc);
    if (decoded.length > MAX_DESC) {
      errors.push(`${where}: description is ${decoded.length} chars (max ${MAX_DESC})`);
    } else if (decoded.length < MIN_DESC) {
      warnings.push(`${where}: description is only ${decoded.length} chars (aim for 140-155)`);
    }
  }

  const canonical = pick(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical) {
    errors.push(`${where}: no canonical link`);
  } else if (!canonical.startsWith(origin)) {
    errors.push(`${where}: canonical is not on ${origin} — ${canonical}`);
  }

  if (!/<meta property="og:image" content="https:\/\//.test(html)) {
    errors.push(`${where}: no absolute og:image`);
  }

  if (!/<meta name="robots"/.test(html)) {
    errors.push(`${where}: no robots meta`);
  }

  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count === 0) errors.push(`${where}: no <h1>`);
  if (h1Count > 1) errors.push(`${where}: ${h1Count} <h1> elements, expected exactly 1`);

  if (!/application\/ld\+json/.test(html)) {
    errors.push(`${where}: no JSON-LD`);
  }

  // Every asset on this host started returning 404; nothing should reference it.
  if (html.includes('ext.same-assets.com')) {
    errors.push(`${where}: still references the dead ext.same-assets.com host`);
  }

  if (html.includes('fonts.googleapis.com') || html.includes('fonts.gstatic.com')) {
    warnings.push(`${where}: references Google Fonts; fonts should be self-hosted`);
  }

  // Rough proxy for "did this page actually pre-render content".
  const body = html.slice(html.indexOf('<body'));
  const words = body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  if (words < 150) {
    errors.push(`${where}: only ${words} words of pre-rendered body text`);
  }

  return { title: title ? decode(title) : '', words, h1Count };
}

async function main() {
  if (!(await exists(OUT))) {
    throw new Error(`Build output not found at ${OUT}`);
  }

  // 1. A real 404. Vercel serves 404.html with a 404 status for unmatched
  //    paths on a static deployment; the SPA fallback then hydrates and the
  //    router renders the not-found UI for the requested URL.
  const fallback = path.join(OUT, '__spa-fallback.html');
  if (await exists(fallback)) {
    await copyFile(fallback, path.join(OUT, '404.html'));
    // The fallback is only needed to produce 404.html. Leaving it in the
    // published tree would give crawlers a second, title-less copy of the shell.
    await rm(fallback);
    console.log('  404.html written from the SPA fallback');
  } else {
    warnings.push('no __spa-fallback.html found; 404.html was not written');
  }

  // 2. The canonical origin is taken from the generated sitemap rather than
  //    repeated here, so there is only ever one place to change the domain.
  const sitemapPath = path.join(OUT, 'sitemap.xml');
  const sitemap = await readFile(sitemapPath, 'utf8').catch(() => '');
  const origin = /<loc>(https?:\/\/[^/<]+)/.exec(sitemap)?.[1];

  if (!origin) {
    console.error('\n  Could not read the site origin from sitemap.xml. Is the build complete?\n');
    process.exit(1);
  }

  // 3. Validate.
  const pages = (await collectPages()).sort(([a], [b]) => a.localeCompare(b));
  console.log(`\n  Validating ${pages.length} pre-rendered pages against ${origin}\n`);

  const rows = [];
  for (const [urlPath, file] of pages) {
    const html = await readFile(file, 'utf8');
    const result = validate(urlPath, html, origin);
    rows.push([urlPath, result.title.length, result.words]);
  }

  const pad = Math.max(...rows.map(([p]) => p.length));
  for (const [urlPath, titleLen, words] of rows) {
    console.log(
      `    ${urlPath.padEnd(pad)}  title ${String(titleLen).padStart(2)}c   ${String(words).padStart(4)} words`,
    );
  }

  // 4. Sitemap must cover exactly the pre-rendered set. A sitemap entry with no
  //    corresponding page is a URL we are actively asking Google to crawl into
  //    a 404.
  const locs = [
    ...sitemap.matchAll(new RegExp(`<loc>${origin}(/[^<]*)?</loc>`, 'g')),
  ].map((m) => (m[1] === '/' || m[1] === undefined ? '/' : m[1].replace(/\/$/, '')));

  const prerendered = new Set(rows.map(([p]) => p));
  for (const loc of locs) {
    if (!prerendered.has(loc)) {
      errors.push(`sitemap lists ${loc} but no page was pre-rendered for it`);
    }
  }
  for (const p of prerendered) {
    if (!locs.includes(p)) warnings.push(`${p} is pre-rendered but missing from the sitemap`);
  }
  console.log(`\n  sitemap.xml: ${locs.length} URLs, all pre-rendered`);

  if (!(await exists(path.join(OUT, 'robots.txt')))) {
    errors.push('robots.txt is missing from the build output');
  }
  if (!(await exists(path.join(OUT, 'og-image.jpg')))) {
    errors.push('og-image.jpg is missing; run `npm run media`');
  }

  if (warnings.length) {
    console.log('\n  Warnings:');
    for (const w of warnings) console.log(`    - ${w}`);
  }

  if (errors.length) {
    console.error('\n  SEO validation failed:\n');
    for (const e of errors) console.error(`    x ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log('\n  SEO validation passed.\n');

  // 5. Internal links and static assets referenced in pre-rendered HTML.
  const { spawnSync } = await import('node:child_process');
  const linkCheck = spawnSync(process.execPath, ['scripts/validate-links.mjs'], {
    cwd: ROOT,
    stdio: 'inherit',
  });
  if (linkCheck.status !== 0) process.exit(linkCheck.status ?? 1);

  // Older Vercel project settings for this repo published `dist` (the Vite
  // default). Dashboard settings override vercel.json, so mirror the output
  // there as well. Either Output Directory value then deploys the same files.
  const legacyDist = path.join(ROOT, 'dist');
  await rm(legacyDist, { recursive: true, force: true });
  await cp(OUT, legacyDist, { recursive: true });
  console.log('  dist/ mirrored from build/client (Vite dashboard fallback)\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
