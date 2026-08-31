/**
 * schema.org JSON-LD builders.
 *
 * Everything hangs off one stable @id for the salon so Google can resolve the
 * business as a single entity across pages, rather than reading each page as a
 * separate unlinked LocalBusiness.
 *
 * Note on reviews: no aggregateRating or Review is emitted anywhere. Reviews a
 * business publishes about itself are "self-serving" under Google's structured
 * data policy, ineligible for review rich results, and a manual-action risk.
 */

import { BUSINESS, SITE_ORIGIN } from '../data/site';
import { SERVICES, type Service, type Treatment } from '../data/services';
import { canonicalUrl } from './seo';

type Json = Record<string, unknown>;

export const SALON_ID = `${SITE_ORIGIN}/#salon`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const ALL_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/**
 * The primary entity. HairSalon is a LocalBusiness subtype, which is more
 * specific and therefore preferable to a bare LocalBusiness for a salon.
 */
export function hairSalonSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': SALON_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description:
      'Hair, skin, nail and makeup salon in Kalyan Nagar, Bengaluru. A listed L\u2019Or\u00e9al Professionnel partner salon offering haircuts, balayage, global colour, keratin smoothening, facials, nail extensions and bridal makeup.',
    url: `${SITE_ORIGIN}/`,
    telephone: BUSINESS.phonePrimary,
    email: BUSINESS.email,
    foundingDate: BUSINESS.foundingYear,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    image: `${SITE_ORIGIN}/og-image.jpg`,
    logo: `${SITE_ORIGIN}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: `${BUSINESS.locality}, ${BUSINESS.city}`,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    hasMap: BUSINESS.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ALL_DAYS,
        opens: BUSINESS.hours.opens,
        closes: BUSINESS.hours.closes,
      },
    ],
    areaServed: [
      'Kalyan Nagar',
      'HRBR Layout',
      'Banaswadi',
      'Kammanahalli',
      'Indiranagar',
      'Bengaluru',
    ].map((name) => ({ '@type': 'Place', name })),
    sameAs: [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.lorealLocator,
    ],
    knowsLanguage: ['en', 'hi', 'kn'],
    isAccessibleForFree: false,
    publicAccess: true,
    // Derived from the catalogue rather than listed by hand, so adding a
    // service page cannot leave it out of the business entity.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Salon services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'OfferCatalog',
        name: `${service.shortTitle} services`,
        url: canonicalUrl(`/services/${service.slug}`),
        itemListElement: service.treatments.map((t) => treatmentOffer(t, service)),
      })),
    },
  };
}

function treatmentOffer(t: Treatment, service: Service): Json {
  const offer: Json = {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: t.name,
      description: t.description,
      serviceType: service.shortTitle,
      provider: { '@id': SALON_ID },
    },
  };
  if (t.price != null) {
    offer.price = t.price;
    offer.priceCurrency = 'INR';
    offer.availability = 'https://schema.org/InStock';
    if (t.plusTax) offer.valueAddedTaxIncluded = false;
  }
  return offer;
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_ORIGIN}/`,
    name: BUSINESS.name,
    inLanguage: 'en-IN',
    publisher: { '@id': SALON_ID },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

/** Per-service page entity, linked back to the salon as provider. */
export function serviceSchema(service: Service): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl(`/services/${service.slug}`)}#service`,
    name: service.heading,
    serviceType: `${service.shortTitle} services`,
    description: service.metaDescription,
    url: canonicalUrl(`/services/${service.slug}`),
    provider: { '@id': SALON_ID },
    areaServed: {
      '@type': 'Place',
      name: `${BUSINESS.locality}, ${BUSINESS.city}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.shortTitle} treatments`,
      itemListElement: service.treatments.map((t) => treatmentOffer(t, service)),
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function videoObjectSchema(video: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    contentUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    publisher: { '@id': SALON_ID },
  };
}

/** Collection pages (gallery, blog index, reviews) so the list is understood. */
export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.path),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SALON_ID },
  };
}
