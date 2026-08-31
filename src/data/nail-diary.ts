import type { PortfolioImage, PortfolioVideo } from './services';

/** Nail art portfolio shown on /services/nails. */
export const NAIL_DIARY_IMAGES: PortfolioImage[] = [
  {
    name: 'nail-diary-01',
    alt: 'Metallic gold cat-eye almond nails with glossy finish',
    width: 480,
    height: 600,
    widths: [480],
  },
  {
    name: 'nail-diary-02',
    alt: 'Teal cat-eye nails with 3D floral charms and botanical accent nails',
    width: 800,
    height: 1000,
  },
  {
    name: 'nail-diary-03',
    alt: 'Teal magnetic cat-eye nails with dried flower encapsulation and 3D roses',
    width: 800,
    height: 1000,
  },
  {
    name: 'nail-diary-04',
    alt: 'Holographic white nails with gold celestial art and mehendi accents',
    width: 800,
    height: 1000,
  },
];

export const NAIL_DIARY_VIDEOS: PortfolioVideo[] = [
  {
    id: 'nail-diary-vid',
    title: 'Nail art in progress',
    description: 'Custom nail art and extensions at Adorn & Admire, Kalyan Nagar.',
    poster: 'nail-diary-01',
  },
];
