#!/usr/bin/env node
/**
 * Validates internal links and static asset references across the built site.
 * Run after `react-router build` (via postbuild.mjs).
 */

import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const OUT = path.join(ROOT, 'build/client');
const PUBLIC = path.join(ROOT, 'public');
const SRC = path.join(ROOT, 'src');

/** Populated from sitemap.xml at runtime. */
let STATIC_ROUTES = new Set(['/']);

const REDIRECTS = new Map([
  ['/offers', '/services'],
  ['/about', '/about-us'],
  ['/contact', '/contact-us'],
  ['/service', '/services'],
  ['/hair', '/services/hair'],
  ['/skin', '/services/skin'],
  ['/nails', '/services/nails'],
  ['/makeup', '/services/makeup'],
  ['/mens', '/services/mens-grooming'],
]);

const errors = [];
const warnings = [];

async function loadRoutesFromSitemap() {
  const sitemap = await readFile(path.join(OUT, 'sitemap.xml'), 'utf8');
  const origin = /<loc>(https?:\/\/[^/<]+)/.exec(sitemap)?.[1];
  if (!origin) throw new Error('Could not parse sitemap.xml origin');
  const routes = new Set(['/']);
  for (const m of sitemap.matchAll(new RegExp(`<loc>${origin}(/[^<]*)?</loc>`, 'g'))) {
    const p = m[1] === '/' || m[1] === undefined ? '/' : m[1].replace(/\/$/, '');
    routes.add(p);
  }
  return routes;
}

async function collectSourceFiles(dir = SRC) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectSourceFiles(full)));
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function extractSourceLinks(content) {
  const links = [];
  for (const m of content.matchAll(/\b(?:to|href)=\{?[`'"](\/[^`'"]+)[`'"]\}?/g)) {
    links.push(m[1]);
  }
  return links;
}

/** Validate dynamic /services/:slug and /:postSlug links against data files. */
async function validateDynamicRoutes() {
  const servicesSrc = await readFile(path.join(SRC, 'data/services.ts'), 'utf8');
  const blogSrc = await readFile(path.join(SRC, 'data/blog.ts'), 'utf8');

  for (const m of servicesSrc.matchAll(/slug:\s*'([^']+)'/g)) {
    const route = `/services/${m[1]}`;
    if (!STATIC_ROUTES.has(route)) {
      errors.push(`src/data/services.ts: ${route} is not in sitemap.xml`);
    }
  }

  for (const m of blogSrc.matchAll(/slug:\s*'([^']+)'/g)) {
    const route = `/${m[1]}`;
    if (!STATIC_ROUTES.has(route)) {
      errors.push(`src/data/blog.ts: ${route} is not in sitemap.xml`);
    }
  }

  for (const m of blogSrc.matchAll(/relatedServices:\s*\[([^\]]+)\]/g)) {
    for (const slug of m[1].match(/'([^']+)'/g) ?? []) {
      const serviceSlug = slug.slice(1, -1);
      const route = `/services/${serviceSlug}`;
      if (!STATIC_ROUTES.has(route)) {
        errors.push(`src/data/blog.ts: relatedServices references missing route ${route}`);
      }
    }
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function collectHtml(dir = OUT, prefix = '') {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (['assets', 'img', 'media', 'fonts'].includes(entry.name)) continue;
      files.push(...(await collectHtml(path.join(dir, entry.name), `${prefix}/${entry.name}`)));
    } else if (entry.name.endsWith('.html')) {
      files.push([prefix === '' ? '/' : prefix.replace(/\/index$/, '') || '/', path.join(dir, entry.name)]);
    }
  }
  return files;
}

function normalizePath(href) {
  const withoutHash = href.split('#')[0];
  const withoutQuery = withoutHash.split('?')[0];
  if (!withoutQuery || withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/$/, '') || '/';
}

function isStaticAsset(pathname) {
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return (
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/img/') ||
    pathname.startsWith('/media/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/favicon.ico' ||
    pathname === '/icon.svg' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/og-image.jpg' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

function isInternal(href) {
  return href.startsWith('/') && !href.startsWith('//');
}

function routeExists(routePath) {
  if (STATIC_ROUTES.has(routePath)) return true;
  if (REDIRECTS.has(routePath)) return true;
  // Legacy /blog/:slug redirects to /:slug
  if (routePath.startsWith('/blog/')) {
    const slug = routePath.slice('/blog/'.length);
    return STATIC_ROUTES.has(`/${slug}`);
  }
  return false;
}

async function assetExists(assetPath) {
  const clean = assetPath.split('?')[0].split('#')[0];
  if (clean.startsWith('/assets/')) {
    return exists(path.join(OUT, clean.slice(1)));
  }
  return exists(path.join(PUBLIC, clean.slice(1))) || exists(path.join(OUT, clean.slice(1)));
}

function extractRefs(html) {
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    refs.push(m[1]);
  }
  for (const m of html.matchAll(/url\(['"]?(\/[^'")\s]+)['"]?\)/g)) {
    refs.push(m[1]);
  }
  return refs;
}

async function main() {
  if (!(await exists(OUT))) {
    console.error('Build output not found. Run `npm run build` first.');
    process.exit(1);
  }

  STATIC_ROUTES = await loadRoutesFromSitemap();

  const pages = await collectHtml();
  const checkedRoutes = new Set();
  const checkedAssets = new Set();

  async function checkRef(ref, context) {
    if (ref.startsWith('tel:') || ref.startsWith('mailto:') || ref.startsWith('http')) return;
    if (ref.startsWith('#')) return;

    if (isInternal(ref)) {
      const route = normalizePath(ref);
      if (isStaticAsset(route)) {
        if (checkedAssets.has(ref)) return;
        checkedAssets.add(ref);
        if (!(await assetExists(ref))) {
          errors.push(`${context}: missing static asset "${ref}"`);
        }
        return;
      }
      if (checkedRoutes.has(route)) return;
      checkedRoutes.add(route);
      if (!routeExists(route)) {
        errors.push(`${context}: internal link "${ref}" has no matching route`);
      }
      return;
    }

    if (ref.startsWith('/')) {
      if (checkedAssets.has(ref)) return;
      checkedAssets.add(ref);
      if (!(await assetExists(ref))) {
        errors.push(`${context}: missing static asset "${ref}"`);
      }
    }
  }

  for (const [pagePath, file] of pages) {
    const html = await readFile(file, 'utf8');
    for (const ref of extractRefs(html)) {
      await checkRef(ref, pagePath);
    }
  }

  // Scan TS/TSX source for hardcoded internal paths (including client-only nav).
  for (const file of await collectSourceFiles()) {
    const rel = path.relative(ROOT, file);
    const content = await readFile(file, 'utf8');
    for (const ref of extractSourceLinks(content)) {
      if (ref.includes('${')) continue;
      await checkRef(ref, rel);
    }
  }

  await validateDynamicRoutes();

  // Every pre-rendered page should appear in the sitemap.
  for (const [pagePath] of pages) {
    if (pagePath === '/' || pagePath.includes('spa-fallback') || pagePath === '/404') continue;
    const normalized = pagePath.endsWith('/index') ? pagePath.replace(/\/index$/, '') || '/' : pagePath;
    if (!STATIC_ROUTES.has(normalized)) {
      warnings.push(`pre-rendered page ${normalized} is missing from sitemap.xml`);
    }
  }

  if (warnings.length) {
    console.log('Link validation warnings:');
    for (const w of warnings) console.log(`  - ${w}`);
  }

  if (errors.length) {
    console.error('\nLink validation failed:\n');
    for (const e of errors) console.log(`  x ${e}`);
    console.error('');
    process.exit(1);
  }

  console.log(
    `Link validation passed (${pages.length} HTML files, ${checkedRoutes.size} internal routes, ${checkedAssets.size} assets checked).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
