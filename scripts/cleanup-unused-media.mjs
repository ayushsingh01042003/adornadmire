#!/usr/bin/env node
/**
 * Prunes generated media in public/ and unused originals in src/assets/.
 *
 * Media layout:
 *   src/assets/  — originals only (never served to visitors)
 *   public/img/  — optimised images the site loads
 *   public/media/ — optimised videos the site loads
 *
 * Run automatically after `npm run media`.
 */

import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = path.join(ROOT, 'src/assets');
const IMG = path.join(ROOT, 'public/img');
const MEDIA = path.join(ROOT, 'public/media');
const PUB = path.join(ROOT, 'public');

/** Source files in src/assets/ that optimize-media.mjs reads. */
const USED_SOURCES = new Set([
  'about-img.jpeg',
  'background.jpeg',
  'background-vid.mp4',
  'logo.avif',
  'logo-icon-mark.jpg',
  'vid1.mp4',
  'vid2.mp4',
  'vid3.mp4',
  'nail-diary-vid.mp4',
  'offer-nanoplastia.jpg',
  'offer-happy-hours.jpg',
  'offer-festive-combos.jpg',
  'offer-mens-ultimate.jpg',
  'offer-mens-grooming.jpg',
  'offer-memberships.jpg',
  'offer-hair-protein.jpg',
  'offer-hydra-facial.jpg',
  'offer-nails.jpg',
  'product-botoliss-salon.jpg',
  'product-botoliss-pro100.jpg',
  'product-anddone-take-control.jpg',
  'product-anddone-begin-again.jpg',
  'product-loreal-xtenso.jpg',
  ...Array.from({ length: 14 }, (_, i) => `hair-colour-${String(i + 1).padStart(2, '0')}.jpg`),
  ...Array.from({ length: 7 }, (_, i) => `nail-diary-${String(i + 1).padStart(2, '0')}.jpg`),
]);

const KEEP_FILES = new Set([
  'og-image.jpg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon.svg',
]);

const KEEP_IMAGE_BASES = [
  { base: 'about', widths: [400, 800, 1200], formats: ['avif', 'webp', 'jpg'] },
  { base: 'hero-fallback', widths: [640, 1280, 1920], formats: ['avif', 'webp', 'jpg'] },
  { base: 'experience', widths: [1600], formats: ['jpg'] },
  { base: 'logo-light-280', widths: [], formats: ['png'] },
  { base: 'logo-light-560', widths: [], formats: ['png'] },
  { base: 'logo-dark-280', widths: [], formats: ['png'] },
  { base: 'logo-dark-560', widths: [], formats: ['png'] },
  { base: 'poster-background-vid', widths: [480], formats: ['jpg'] },
  { base: 'poster-vid1', widths: [960], formats: ['jpg'] },
  { base: 'poster-vid2', widths: [960], formats: ['jpg'] },
  { base: 'poster-vid3', widths: [960], formats: ['jpg'] },
  ...[
    'offer-nanoplastia',
    'offer-happy-hours',
    'offer-festive-combos',
    'offer-mens-ultimate',
    'offer-mens-grooming',
    'offer-memberships',
    'offer-hair-protein',
    'offer-hydra-facial',
    'offer-nails',
  ].map((base) => ({
    base,
    widths: [512, 1024],
    formats: ['avif', 'webp', 'jpg'],
  })),
  ...[
    'product-botoliss-salon',
    'product-botoliss-pro100',
    'product-anddone-take-control',
    'product-anddone-begin-again',
    'product-loreal-xtenso',
  ].map((base) => ({ base, widths: [400, 800], formats: ['avif', 'webp', 'jpg'] })),
  ...Array.from({ length: 14 }, (_, i) => ({
    base: `hair-colour-${String(i + 1).padStart(2, '0')}`,
    widths: [480, 960],
    formats: ['avif', 'webp', 'jpg'],
  })),
  ...Array.from({ length: 7 }, (_, i) => ({
    base: `nail-diary-${String(i + 1).padStart(2, '0')}`,
    widths: [480, 960],
    formats: ['avif', 'webp', 'jpg'],
  })),
];

const KEEP_MEDIA = new Set([
  'background-vid.mp4',
  'background-vid.webm',
  'vid1.mp4',
  'vid1.webm',
  'vid2.mp4',
  'vid2.webm',
  'vid3.mp4',
  'vid3.webm',
  'nail-diary-vid.mp4',
  'nail-diary-vid.webm',
]);

function buildKeepSet() {
  const keep = new Set(KEEP_FILES);

  for (const { base, widths, formats } of KEEP_IMAGE_BASES) {
    if (widths.length === 0) {
      for (const fmt of formats) keep.add(`img/${base}.${fmt}`);
      continue;
    }
    for (const w of widths) {
      for (const fmt of formats) keep.add(`img/${base}-${w}.${fmt}`);
    }
  }

  for (const name of KEEP_MEDIA) keep.add(`media/${name}`);

  return keep;
}

async function dirSize(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) total += await dirSize(p);
    else total += (await stat(p)).size;
  }
  return total;
}

async function main() {
  const keep = buildKeepSet();
  const removed = [];

  for (const file of await readdir(IMG)) {
    const rel = `img/${file}`;
    if (!keep.has(rel)) {
      await unlink(path.join(IMG, file));
      removed.push(rel);
    }
  }

  for (const file of await readdir(MEDIA)) {
    const rel = `media/${file}`;
    if (!keep.has(rel)) {
      await unlink(path.join(MEDIA, file));
      removed.push(rel);
    }
  }

  for (const file of await readdir(SRC)) {
    if (!USED_SOURCES.has(file)) {
      await unlink(path.join(SRC, file));
      removed.push(`src/assets/${file}`);
    }
  }

  for (const file of ['favicon-16.png', 'favicon-32.png']) {
    try {
      await unlink(path.join(PUB, file));
      removed.push(file);
    } catch {
      // already gone
    }
  }

  const srcBytes = await dirSize(SRC);
  const imgBytes = await dirSize(IMG);
  const mediaBytes = await dirSize(MEDIA);

  console.log(`\nRemoved ${removed.length} unused files.`);
  if (removed.length) {
    for (const f of removed.sort()) console.log(`  - ${f}`);
  }
  console.log(`\nRemaining:`);
  console.log(`  src/assets  ${(srcBytes / 1024 / 1024).toFixed(2)} MB (sources, not served)`);
  console.log(`  public/img  ${(imgBytes / 1024 / 1024).toFixed(2)} MB (served)`);
  console.log(`  public/media ${(mediaBytes / 1024 / 1024).toFixed(2)} MB (served)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
