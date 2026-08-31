/**
 * Single source of truth for business identity (NAP), used by page metadata,
 * JSON-LD, the sitemap and every visible mention of the address or phone.
 * Name / address / phone must stay byte-identical to the Google Business
 * Profile: inconsistent NAP across the web dilutes local ranking signals.
 */

export const SITE_ORIGIN = 'https://www.adornadmire.in';

export const BUSINESS = {
  name: 'Adorn & Admire',
  legalName: 'Adorn & Admire Salon & Wellness',
  tagline: 'Hair. Skin. Beauty.',
  foundingYear: '2017',
  street: 'No. 420, 1st Floor, VP Plaza, CMR Main Road, HRBR Layout 2nd Block',
  locality: 'Kalyan Nagar',
  region: 'Karnataka',
  city: 'Bengaluru',
  postalCode: '560043',
  country: 'IN',
  /**
   * Approximate: derived from the HRBR Layout 2nd Block centroid, not a
   * rooftop pin. Replace with the exact coordinates from the Google Business
   * Profile listing so the schema agrees with the map placement.
   */
  geo: { latitude: 13.0234478, longitude: 77.6282108 },
  phonePrimary: '+919663788314',
  phoneSecondary: '+919110423554',
  email: 'adornadmire.kalyannagar@gmail.com',
  priceRange: '₹₹',
  /** Mon-Sun, single shift. Kept in 24h form for openingHoursSpecification. */
  hours: { opens: '10:30', closes: '21:00' },
  hoursLabel: '10:30 AM – 9:00 PM',
  hoursDaysLabel: 'Open all week',
  rating: '4.9',
  /**
   * Shown in the hero and the reviews section, which previously disagreed
   * (1500+ vs 2700+). Deliberately conservative; update to the live Google
   * Business Profile count and keep both surfaces reading from here.
   */
  reviewCount: 1500,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Adorn+%26+Admire+Salon+CMR+Main+Road+HRBR+Layout+2nd+Block+Kalyan+Nagar+Bengaluru+560043',
  social: {
    facebook: 'https://www.facebook.com/AdornAdmireSalonWellnessKalyanNagar/',
    instagram: 'https://www.instagram.com/adornadmire.co/',
    lorealLocator: 'https://hair-salon-en.lorealprofessionnel.com/168997-adorn-admire',
  },
} as const;

/** Human-readable phone for display; the raw values stay E.164 for tel: links. */
export function formatPhone(e164: string): string {
  const digits = e164.replace(/^\+91/, '');
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export const REVIEW_COUNT_LABEL = `${BUSINESS.reviewCount.toLocaleString('en-IN')}+`;

/** Google Analytics 4 property carried over from the previous domain so the
 *  reporting history stays continuous across the migration. */
export const GA4_MEASUREMENT_ID = 'G-BT974BE1LV';

/** Google Ads conversion tracking, already live on the deployed site. */
export const GOOGLE_ADS_ID = 'AW-10873835846';
export const GOOGLE_ADS_CALL_CONVERSION = 'AW-10873835846/VMK6CIy5keEZEMaihsEo';

/**
 * Search Console HTML-tag verification token for adornadmire.in.
 * The value below belongs to the old adornandadmire.com property and will not
 * verify this domain: replace it with the token Search Console issues for the
 * new property, then submit the sitemap and run Change of Address.
 */
export const SEARCH_CONSOLE_VERIFICATION = '';
