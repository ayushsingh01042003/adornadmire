/**
 * The canonical list of indexable URLs.
 *
 * Single source for three things that must never disagree:
 *   1. react-router.config.ts prerender() — which pages get static HTML
 *   2. scripts/generate-sitemap.mjs — what lands in sitemap.xml
 *   3. the footer and header navigation
 *
 * Adding a page means adding it here and nowhere else.
 */

import { SERVICES } from './services';
import { BLOG_POSTS } from './blog';

export interface SiteUrl {
  path: string;
  /** Sitemap hint only; Google largely ignores it but it costs nothing. */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Relative importance within this site, 0.0-1.0. */
  priority: number;
  lastmod?: string;
}

const BUILD_DATE = new Date().toISOString().slice(0, 10);

export const SITE_URLS: SiteUrl[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0, lastmod: BUILD_DATE },
  { path: '/services', changefreq: 'weekly', priority: 0.9, lastmod: BUILD_DATE },
  ...SERVICES.map<SiteUrl>((service) => ({
    path: `/services/${service.slug}`,
    changefreq: 'monthly',
    priority: 0.9,
    lastmod: BUILD_DATE,
  })),
  { path: '/contact-us', changefreq: 'monthly', priority: 0.8, lastmod: BUILD_DATE },
  { path: '/about-us', changefreq: 'monthly', priority: 0.7, lastmod: BUILD_DATE },
  { path: '/gallery', changefreq: 'monthly', priority: 0.6, lastmod: BUILD_DATE },
  { path: '/reviews', changefreq: 'weekly', priority: 0.6, lastmod: BUILD_DATE },
  { path: '/products', changefreq: 'monthly', priority: 0.5, lastmod: BUILD_DATE },
  { path: '/blog', changefreq: 'weekly', priority: 0.6, lastmod: BUILD_DATE },
  ...BLOG_POSTS.map<SiteUrl>((post) => ({
    path: `/${post.slug}`,
    changefreq: 'yearly',
    priority: 0.7,
    lastmod: post.dateModified,
  })),
];

/** Paths only, for react-router.config.ts prerender(). */
export const PRERENDER_PATHS: string[] = SITE_URLS.map((url) => url.path);

/** Primary navigation, used by the header and footer so links cannot rot. */
export const PRIMARY_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact-us' },
] as const;
