# Adorn & Admire — adornadmire.in

Website for Adorn & Admire, a hair, skin, nail and makeup salon in Kalyan Nagar,
Bengaluru. React Router v7 in framework mode, pre-rendered to static HTML and
deployed to Vercel.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Generates sitemap/robots, pre-renders every route, then validates the SEO head of each page |
| `npm run typecheck` | Regenerates route types and runs `tsc` |
| `npm run lint` | ESLint, zero warnings tolerated |
| `npm run media` | Re-encodes videos and images from `src/assets` into `public/` |

`npm run build` **fails** if any page is missing a canonical, has more than one
`<h1>`, has a title over 60 characters, a description over 165, or thin
pre-rendered content. That is intentional: these problems are invisible at
runtime and only show up as lost traffic weeks later.

## Architecture

The site is a **pre-rendered static site**, not a single-page app. Every URL in
`src/data/urls.ts` is rendered to its own `index.html` at build time, so
crawlers get complete markup with no JavaScript execution. It hydrates into a
client-side router after load, so navigation between pages stays instant.

```
src/
  root.tsx              App shell: <html>, head, analytics, site-wide JSON-LD
  routes.ts             URL → route module mapping
  routes/               One module per page, each exporting meta()
  components/           Shared UI
  data/
    site.ts             NAP, hours, socials, analytics IDs — single source of truth
    services.ts         Service catalogue, copy and prices
    blog.ts             Article content
    urls.ts             The canonical URL list
  lib/
    seo.ts              buildMeta(): title, description, canonical, OG, Twitter
    schema.ts           JSON-LD builders
scripts/
  optimize-media.mjs    Video/image/icon/OG-image generation
  postbuild.mjs         404.html + SEO validation
lib/
  sitemap.ts            sitemap.xml + robots.txt (written during the Vite build)
docs/
  domain-migration.md   301 map from the old domain, Search Console steps
  local-seo-checklist.md Google Business Profile and citations work
```

### Things worth knowing before you edit

**`src/data/urls.ts` is the only place to add a page.** It drives
`prerender()` in `react-router.config.ts`, the sitemap, and the navigation. If
you add a route module without adding it here, it will not be pre-rendered and
will not be in the sitemap.

**`src/data/site.ts` holds the name, address, phone and hours.** These must stay
byte-identical to the Google Business Profile listing, because inconsistent NAP
across the web weakens local ranking. Change them here and every page, the
footer and the schema update together. This is also what fixed the old site
showing "1500+ happy customers" in the hero and "2,700+" in the reviews section.

**Reviews are deliberately not marked up as schema.** Google treats reviews a
business publishes about itself as self-serving: they are ineligible for star
rich results and risk a manual action. Stars in search come from the Business
Profile. See the comment at the top of `src/lib/schema.ts`.

**Titles get ` | Adorn & Admire` appended automatically.** Pass only the
page-specific part to `buildMeta`, and keep it to about 43 characters.

## Media pipeline

`npm run media` reads the originals in `src/assets` and writes optimized output
to `public/`. Output is committed; run it and commit the result after changing
any original.

The videos were the worst performance problem on the previous build: 31 MB,
because three decorative hover-preview clips shipped at their full 50-92 second
length with stereo audio attached. They are now trimmed to 10 seconds, stripped
of audio, and encoded as both H.264 and VP9.

| Clip | Before | After (MP4) |
| --- | --- | --- |
| `vid1` | 15.7 MB | 187 KB |
| `vid2` | 4.5 MB | 47 KB |
| `vid3` | 9.0 MB | 375 KB |
| `background-vid` | 1.7 MB | 414 KB |

## Deployment

Vercel, configured by `vercel.json`:

- Framework: none (`framework: null` — do not let Vercel treat this as a
  React Router server app)
- Build: `npm run build`
- Output: `build/client`
- Install: `npm install --omit=optional` (skips ffmpeg/sharp; those are only
  for `npm run media` locally)

If the Vercel project still has leftover Vite settings from the old SPA
(Output Directory `dist`, Framework Vite), the build also mirrors output into
`dist/` so either setting publishes the same files. In the dashboard, set
Framework to **Other** and Output Directory to **build/client** so they match.

The live host is already `www.adornadmire.in`. Apex `adornadmire.in` already
308s there — this repo does not change that.

**Old domain:** 301s from `adornandadmire.com` are **not** applied by deploying
this repo. They have to be set on the old WordPress host (see
`docs/domain-migration.md`). Safety-net host redirects are in `vercel.json` in
case that domain is later pointed at this project.

## Outstanding items

These need information only the salon owner has:

1. **Exact map coordinates.** `BUSINESS.geo` in `src/data/site.ts` currently
   holds the HRBR Layout 2nd Block locality centroid, not a rooftop pin.
2. **Search Console verification token.** `SEARCH_CONSOLE_VERIFICATION` is
   empty, so no verification meta tag renders.
3. **Real review count.** `BUSINESS.reviewCount` is set to a conservative 1500;
   update it to the live Business Profile figure.
4. **Heading font.** The original Astrospace font was loaded from
   `ext.same-assets.com`, which now returns 404 for every asset, so headings had
   been silently falling back to system sans. Replaced with self-hosted
   Cormorant Garamond — swap it in `src/index.css` and `tailwind.config.js` if
   you have the original file or prefer something else.
