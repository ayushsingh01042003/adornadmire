/**
 * Pure builders for sitemap.xml and robots.txt.
 *
 * Kept free of Node APIs so they can be imported from vite.config.ts (which
 * esbuild bundles, so it resolves TypeScript natively) as well as from app
 * code. The Vite plugin in vite.config.ts writes the output into public/.
 */

import type { SiteUrl } from '../data/urls';

function escapeXml(value: string): string {
  return value.replace(
    /[<>&'"]/g,
    (c) => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[c]};`,
  );
}

export function buildSitemap(urls: SiteUrl[], origin: string): string {
  const entries = urls
    .map((url) => {
      const loc = url.path === '/' ? `${origin}/` : `${origin}${url.path}`;
      return [
        '  <url>',
        `    <loc>${escapeXml(loc)}</loc>`,
        url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>` : null,
        `    <changefreq>${url.changefreq}</changefreq>`,
        `    <priority>${url.priority.toFixed(1)}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export function buildRobots(origin: string): string {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Hashed build artefacts and route data payloads carry no indexable content.
Disallow: /assets/
Disallow: /*.data$

Sitemap: ${origin}/sitemap.xml
`;
}
