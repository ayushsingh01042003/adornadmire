import type { MetaDescriptor } from 'react-router';
import { BUSINESS, SITE_ORIGIN } from '../data/site';

const DEFAULT_OG_IMAGE = '/og-image.jpg';

/** Appended to every title. Budget the page-specific part accordingly. */
const TITLE_SUFFIX = ` | ${BUSINESS.name}`;

export interface SeoInput {
  /**
   * Page-specific part of the title only: the brand suffix is added here, so
   * do not repeat it. Aim for 43 characters or fewer.
   */
  title: string;
  description: string;
  /** Absolute path beginning with a slash, e.g. "/services/hair". */
  path: string;
  /** Absolute URL or root-relative path to a 1200x630 share image. */
  image?: string;
  type?: 'website' | 'article';
  /** Set for pages that should stay out of the index. */
  noIndex?: boolean;
  /** Extra descriptors (JSON-LD, article timestamps) appended verbatim. */
  extra?: MetaDescriptor[];
}

export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path.replace(/\/+$/, '')}`;
}

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_ORIGIN}${pathOrUrl}`;
}

/**
 * Builds the full head for a page: title, description, canonical, Open Graph
 * and Twitter card. Every page gets a self-referencing canonical so the www
 * host is the only URL Google consolidates on.
 */
export function buildMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  extra = [],
}: SeoInput): MetaDescriptor[] {
  const url = canonicalUrl(path);
  const ogImage = absoluteUrl(image);
  const fullTitle = title.includes(BUSINESS.name) ? title : `${title}${TITLE_SUFFIX}`;

  const descriptors: MetaDescriptor[] = [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },

    { property: 'og:type', content: type },
    { property: 'og:site_name', content: BUSINESS.name },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${BUSINESS.name} — ${BUSINESS.tagline}` },
    { property: 'og:locale', content: 'en_IN' },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },

    // Local-intent signals for the address bar and legacy geo parsers.
    { name: 'geo.region', content: 'IN-KA' },
    { name: 'geo.placename', content: `${BUSINESS.locality}, ${BUSINESS.city}` },
    {
      name: 'geo.position',
      content: `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
    },
    { name: 'ICBM', content: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}` },
  ];

  if (noIndex) {
    descriptors.push({ name: 'robots', content: 'noindex, follow' });
  } else {
    descriptors.push({
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
  }

  return [...descriptors, ...extra];
}
