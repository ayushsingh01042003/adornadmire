#!/usr/bin/env node
/**
 * Generates every optimized media asset the site serves, from the originals in
 * src/assets. Run with `npm run media`.
 *
 * Deliberately a committed, idempotent build step rather than a one-off manual
 * conversion, so re-running it after replacing an original reproduces the whole
 * set. Outputs are written to public/ and pruned by cleanup-unused-media.mjs.
 *
 * Layout: src/assets/ holds originals (never served). public/img and
 * public/media hold the optimised files visitors actually download.
 *
 * The videos were the single worst performance problem on the old build:
 * 31 MB total, because three decorative hover-to-play clips were shipped at
 * their full 50-92 second length with stereo audio tracks attached. Nobody
 * watches 92 seconds of a hover preview, and the audio is never unmuted, so
 * both are removed here.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

/*
 * sharp and ffmpeg-static are optionalDependencies: they are only needed by
 * this script, and their install hooks download large platform binaries. Making
 * them optional keeps a failed binary download from breaking a deploy that
 * never runs this script, since the generated output is committed.
 */
let sharp;
let ffmpegPath;
try {
  ({ default: sharp } = await import('sharp'));
  ({ default: ffmpegPath } = await import('ffmpeg-static'));
} catch {
  console.error(
    '\n  This script needs sharp and ffmpeg-static, which are optional dependencies.\n' +
      '  Install them with:  npm install --include=optional\n',
  );
  process.exit(1);
}

const run = promisify(execFile);

// import.meta.url rather than import.meta.dirname, which needs Node 20.11+.
const ROOT = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = path.join(ROOT, 'src/assets');
const PUB = path.join(ROOT, 'public');
const IMG_OUT = path.join(PUB, 'img');
const MEDIA_OUT = path.join(PUB, 'media');

const AVIF = { quality: 55, effort: 6 };
const WEBP = { quality: 76 };
const JPEG = { quality: 80, mozjpeg: true, progressive: true };

function log(...args) {
  console.log('  ', ...args);
}

async function sizeOf(file) {
  try {
    const s = await stat(file);
    return `${(s.size / 1024).toFixed(0)} KB`;
  } catch {
    return 'missing';
  }
}

/** JPEG-only poster for <video poster> attributes (no AVIF/WebP needed). */
async function posterJpeg(input, name, width) {
  await sharp(input, { failOn: 'none' })
    .rotate()
    .resize({ width, fit: 'inside', withoutEnlargement: false })
    .jpeg(JPEG)
    .toFile(path.join(IMG_OUT, `${name}-${width}.jpg`));
  log(`${name}: ${width}px jpg ${await sizeOf(path.join(IMG_OUT, `${name}-${width}.jpg`))}`);
}

/**
 * Writes AVIF + WebP + JPEG at each requested width. AVIF first because it
 * wins on photographic content by a wide margin; JPEG stays as the universal
 * fallback for the <picture> element.
 */
async function responsiveImage(
  input,
  name,
  widths,
  { fit = 'cover', height, withoutEnlargement = true } = {},
) {
  const base = sharp(input, { failOn: 'none' }).rotate();
  const meta = await base.metadata();
  const written = [];

  for (const width of widths) {
    // Never upscale beyond a small margin: a 960px variant of a 480px source is
    // pure bytes with no added detail. Offer flyers pass withoutEnlargement:
    // false so a 1024px variant always exists for the Offers <picture>.
    if (withoutEnlargement && width > (meta.width ?? width) * 1.5) continue;
    written.push(width);

    const resizeOpts = height
      ? { width, height: Math.round((height / widths[widths.length - 1]) * width), fit }
      : { width, fit: 'inside', withoutEnlargement };

    const pipeline = () => sharp(input, { failOn: 'none' }).rotate().resize(resizeOpts);

    await pipeline().avif(AVIF).toFile(path.join(IMG_OUT, `${name}-${width}.avif`));
    await pipeline().webp(WEBP).toFile(path.join(IMG_OUT, `${name}-${width}.webp`));
    await pipeline().jpeg(JPEG).toFile(path.join(IMG_OUT, `${name}-${width}.jpg`));
  }

  const largest = written[written.length - 1];
  log(
    `${name}: ${written.join('/')}px  →  avif ${await sizeOf(
      path.join(IMG_OUT, `${name}-${largest}.avif`),
    )}, jpg ${await sizeOf(path.join(IMG_OUT, `${name}-${largest}.jpg`))}`,
  );

  return written;
}

/** Pulls a single frame out of a video, for use as a poster or a still image. */
async function frameFrom(video, seconds, outFile) {
  await run(ffmpegPath, [
    '-y',
    '-loglevel',
    'error',
    '-ss',
    String(seconds),
    '-i',
    video,
    '-frames:v',
    '1',
    '-q:v',
    '2',
    outFile,
  ]);
}

async function durationOf(video) {
  const { stdout } = await run(ffmpegPath, ['-hide_banner', '-i', video]).catch((e) => ({
    stdout: `${e.stdout ?? ''}${e.stderr ?? ''}`,
  }));
  const m = /Duration:\s*(\d+):(\d+):(\d+\.?\d*)/.exec(stdout);
  if (!m) return 10;
  return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

/**
 * Picks the most usable frame in a clip rather than trusting a hardcoded
 * timestamp. Hand-picked offsets kept landing on white cross-fade frames, which
 * produced blank thumbnails.
 *
 * Scores candidates on exposure (penalising frames crushed to black or blown
 * out to white) and on standard deviation, which stands in for how much actual
 * detail is present.
 */
async function bestFrameFrom(video, tmpDir, label) {
  const duration = await durationOf(video);
  const candidates = [
    0.05, 0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68, 0.76, 0.84, 0.92,
  ].map((f) => Number((duration * f).toFixed(2)));

  let best = null;

  for (const at of candidates) {
    const candidate = path.join(tmpDir, `${label}-${at}.jpg`);
    try {
      await frameFrom(video, at, candidate);
      const stats = await sharp(candidate).stats();
      const mean = stats.channels.reduce((a, c) => a + c.mean, 0) / stats.channels.length;
      const stdev = stats.channels.reduce((a, c) => a + c.stdev, 0) / stats.channels.length;

      // A near-zero standard deviation means a flat cross-fade frame with no
      // subject in it at all; nothing else is disqualifying, because some of
      // the source footage is uniformly overexposed and still has to yield a
      // usable still.
      if (stdev < 6) continue;

      const exposure = 1 - Math.abs(mean - 125) / 130;
      const detail = Math.min(stdev / 60, 1);
      const score = Math.max(exposure, 0) * 0.4 + detail * 0.6;

      if (!best || score > best.score) best = { score, at, file: candidate, mean, stdev };
    } catch {
      // A seek past the end of a short clip just means no candidate here.
    }
  }

  if (!best) throw new Error(`No usable frame found in ${video}`);
  log(
    `${label}: frame at ${best.at}s (score ${best.score.toFixed(2)}, ` +
      `mean ${best.mean.toFixed(0)}, detail ${best.stdev.toFixed(0)})`,
  );
  return best.file;
}

/**
 * Re-encodes a decorative clip: trimmed, silent, and capped in resolution.
 * Emits both MP4/H.264 (universal) and WebM/VP9 (roughly 25-35% smaller).
 */
async function optimizeVideo(name, { start = 0, duration, maxHeight = 480 }) {
  const input = path.join(SRC, `${name}.mp4`);
  const mp4 = path.join(MEDIA_OUT, `${name}.mp4`);
  const webm = path.join(MEDIA_OUT, `${name}.webm`);

  const common = [
    '-y',
    '-loglevel',
    'error',
    '-ss',
    String(start),
    '-t',
    String(duration),
    '-i',
    input,
    // -an strips audio: these clips are always rendered muted.
    '-an',
    '-vf',
    `scale=-2:'min(${maxHeight},ih)':flags=lanczos`,
  ];

  await run(ffmpegPath, [
    ...common,
    '-c:v',
    'libx264',
    '-profile:v',
    'main',
    '-preset',
    'slow',
    '-crf',
    '30',
    '-pix_fmt',
    'yuv420p',
    // Puts the moov atom first so playback can start before the full download.
    '-movflags',
    '+faststart',
    mp4,
  ]);

  await run(ffmpegPath, [
    ...common,
    '-c:v',
    'libvpx-vp9',
    '-crf',
    '36',
    '-b:v',
    '0',
    '-deadline',
    'good',
    '-cpu-used',
    '2',
    '-row-mt',
    '1',
    webm,
  ]);

  const before = await sizeOf(input);
  log(`${name}: ${before} → mp4 ${await sizeOf(mp4)}, webm ${await sizeOf(webm)}`);
}

/** Minimal ICO container wrapping a PNG payload (valid for Vista and later). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, png]);
}

/**
 * The source logo is a black wordmark on transparency, so it disappears on the
 * dark footer and over the hero video. Negating the colour channels while
 * preserving alpha yields a white wordmark for those placements.
 */
async function buildLogoVariants() {
  const logo = path.join(SRC, 'logo.avif');

  for (const width of [280, 560]) {
    await sharp(logo)
      .resize({ width })
      .ensureAlpha()
      .negate({ alpha: false })
      .png()
      .toFile(path.join(IMG_OUT, `logo-light-${width}.png`));

    await sharp(logo)
      .resize({ width })
      .png()
      .toFile(path.join(IMG_OUT, `logo-dark-${width}.png`));
  }

  log('logo: logo-light-280/560 (white), logo-dark-280/560 (black)');
}

async function buildIcons() {
  const logo = path.join(SRC, 'logo.avif');

  // The logo is a wide wordmark; padding it into a square keeps it legible at
  // favicon sizes instead of being squashed.
  const square = async (size, background) =>
    sharp(logo)
      .resize(Math.round(size * 0.86), Math.round(size * 0.86), {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .extend({
        top: Math.round(size * 0.07),
        bottom: Math.round(size * 0.07),
        left: Math.round(size * 0.07),
        right: Math.round(size * 0.07),
        background,
      })
      .resize(size, size, { fit: 'contain', background })
      .png()
      .toBuffer();

  const opaque = { r: 0xf8, g: 0xf6, b: 0xf5, alpha: 1 };

  await writeFile(path.join(PUB, 'apple-touch-icon.png'), await square(180, opaque));
  await writeFile(path.join(PUB, 'icon-192.png'), await square(192, opaque));
  await writeFile(path.join(PUB, 'icon-512.png'), await square(512, opaque));

  const ico = await square(32, opaque);
  await writeFile(path.join(PUB, 'favicon.ico'), pngToIco(ico, 32));

  log('icons: favicon.ico, apple-touch-icon, icon-192, icon-512');
}

/**
 * The 1200x630 share card. Composites the wordmark and the locality over a
 * darkened salon photograph, because a bare crop of the photo says nothing
 * about who the link belongs to.
 */
async function buildOgImage() {
  const W = 1200;
  const H = 630;

  const bg = await sharp(path.join(SRC, 'background.jpeg'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.55 })
    .blur(2)
    .toBuffer();

  const logoW = 460;
  const logo = await sharp(path.join(SRC, 'logo.avif'))
    .resize({ width: logoW })
    .ensureAlpha()
    .negate({ alpha: false })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  const caption = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .t { fill: #ffffff; font-family: Georgia, 'Times New Roman', serif; }
        .s { fill: #e8ded5; font-family: Helvetica, Arial, sans-serif; }
      </style>
      <text class="t" x="600" y="404" text-anchor="middle" font-size="52">Hair &#183; Skin &#183; Beauty</text>
      <text class="s" x="600" y="462" text-anchor="middle" font-size="30" letter-spacing="3">KALYAN NAGAR, BENGALURU</text>
      <text class="s" x="600" y="536" text-anchor="middle" font-size="26">Open all week &#183; 10:30 AM &#8211; 9:00 PM</text>
    </svg>`,
  );

  const composed = sharp(bg).composite([
    {
      input: logo,
      top: Math.round(H / 2 - (logoMeta.height ?? 200) / 2 - 130),
      left: Math.round((W - logoW) / 2),
    },
    { input: caption, top: 0, left: 0 },
  ]);

  await composed.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(PUB, 'og-image.jpg'));

  log(`og-image.jpg: 1200x630, ${await sizeOf(path.join(PUB, 'og-image.jpg'))}`);
}

async function main() {
  await mkdir(IMG_OUT, { recursive: true });
  await mkdir(MEDIA_OUT, { recursive: true });
  const tmp = path.join(ROOT, 'node_modules/.cache/media');
  await mkdir(tmp, { recursive: true });

  console.log('\nVideos (trimmed, silent, dual-codec)');
  await optimizeVideo('vid1', { start: 0, duration: 10 });
  await optimizeVideo('vid2', { start: 0, duration: 10 });
  await optimizeVideo('vid3', { start: 0, duration: 10 });
  // Hero background: portrait source, kept short and capped taller since it is
  // cropped to fill a wide viewport.
  await optimizeVideo('background-vid', { start: 0, duration: 9, maxHeight: 720 });
  await optimizeVideo('nail-diary-vid', { start: 0, duration: 15 });

  console.log('\nVideo posters');
  for (const [name, width] of [
    ['poster-vid1', 960],
    ['poster-vid2', 960],
    ['poster-vid3', 960],
    ['poster-background-vid', 480],
  ]) {
    const videoName = name.replace('poster-', '');
    const videoPath = path.join(MEDIA_OUT, `${videoName}.mp4`);
    let frame;
    try {
      frame = await bestFrameFrom(videoPath, tmp, name);
    } catch {
      const fallback = path.join(tmp, `${name}-fallback.jpg`);
      await frameFrom(videoPath, 0.5, fallback);
      frame = fallback;
      log(`${name}: poster fallback at 0.5s`);
    }
    await posterJpeg(frame, name, width);
  }

  console.log('\nContent images');
  await responsiveImage(path.join(SRC, 'about-img.jpeg'), 'about', [400, 800, 1200]);
  await responsiveImage(path.join(SRC, 'background.jpeg'), 'hero-fallback', [640, 1280, 1920]);
  await sharp(path.join(SRC, 'background.jpeg'))
    .rotate()
    .resize({ width: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg(JPEG)
    .toFile(path.join(IMG_OUT, 'experience-1600.jpg'));
  log(`experience: 1600px jpg ${await sizeOf(path.join(IMG_OUT, 'experience-1600.jpg'))}`);

  for (const name of ['offer-hair-protein', 'offer-hydra-facial', 'offer-nails']) {
    await responsiveImage(path.join(SRC, `${name}.jpg`), name, [512, 1024], {
      withoutEnlargement: false,
    });
  }

  console.log('\nProduct images');
  for (const name of [
    'product-botoliss-salon',
    'product-botoliss-pro100',
    'product-anddone-take-control',
    'product-anddone-begin-again',
    'product-loreal-xtenso',
  ]) {
    await responsiveImage(path.join(SRC, `${name}.jpg`), name, [400, 800]);
  }

  console.log('\nHair colour portfolio');
  for (let i = 1; i <= 14; i++) {
    const name = `hair-colour-${String(i).padStart(2, '0')}`;
    await responsiveImage(path.join(SRC, `${name}.jpg`), name, [480, 960]);
  }

  console.log('\nNail diary portfolio');
  for (let i = 1; i <= 7; i++) {
    const name = `nail-diary-${String(i).padStart(2, '0')}`;
    await responsiveImage(path.join(SRC, `${name}.jpg`), name, [480, 960]);
  }

  console.log('\nLogo variants');
  await buildLogoVariants();

  console.log('\nIcons');
  await buildIcons();

  console.log('\nShare image');
  await buildOgImage();

  console.log('\nDone.\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
