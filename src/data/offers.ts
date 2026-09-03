/**
 * Seasonal and festive promotions. Image names map to responsive variants in
 * /public/img generated from src/assets/offer-* via npm run media.
 */

export interface Offer {
  /** Base image name, e.g. "offer-hydra-facial" → /img/offer-hydra-facial-1024.jpg */
  image: string;
  alt: string;
  /** Intrinsic pixel size for layout; defaults to 1024×1024. */
  width?: number;
  height?: number;
}

export const OFFERS: Offer[] = [
  {
    image: 'offer-happy-hours',
    alt: 'Happy Hours Monday to Thursday: pay for pedicure get manicure free, pay for global hair colour get one root touch-up free, pay for facial get upper lip and underarm threading free, pay for hair spa get haircut free at Adorn & Admire',
    width: 682,
    height: 1024,
  },
  {
    image: 'offer-festive-combos',
    alt: 'Special festive combos at Adorn & Admire: Basic ₹1,499, Premium ₹1,999, Luxury ₹2,999',
    width: 529,
    height: 1024,
  },
  {
    image: 'offer-mens-ultimate',
    alt: 'Men’s Ultimate Refresh package — haircut, beard trim, hair spa, de-tan and cleanup for ₹1,999, down from ₹2,999 at Adorn & Admire',
    width: 682,
    height: 1024,
  },
  {
    image: 'offer-memberships',
    alt: 'Exclusive memberships at Adorn & Admire: Silver ₹999 for 6 months, Gold ₹1,499 for 6 months, Platinum ₹2,499 for 1 year',
    width: 1024,
    height: 682,
  },
  {
    image: 'offer-hair-protein',
    alt: 'Hair protein treatment for frizzy and damaged hair — ₹5,999, 30% off at Adorn & Admire',
  },
  {
    image: 'offer-hydra-facial',
    alt: 'Festive Hydra Facial offer — 50% off, now ₹1,700 at Adorn & Admire, Kalyan Nagar',
  },
  {
    image: 'offer-nails',
    alt: 'Nail extensions from ₹999, cat-eye, ombre and French tip ₹1,499, 3D nail art ₹2,000, gel polish ₹499 plus GST at Adorn & Admire, Kalyan Nagar',
  },
];
