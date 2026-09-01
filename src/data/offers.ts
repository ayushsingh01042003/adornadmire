/**
 * Seasonal and festive promotions. Image names map to responsive variants in
 * /public/img generated from src/assets/offer-* via npm run media.
 */

export interface Offer {
  /** Base image name, e.g. "offer-hydra-facial" → /img/offer-hydra-facial-1024.jpg */
  image: string;
  alt: string;
}

export const OFFERS: Offer[] = [
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
