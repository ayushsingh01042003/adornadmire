/**
 * Professional retail ranges stocked at the salon. Named brands are a genuine
 * trust signal for a salon page and are worth stating explicitly rather than
 * hiding behind generic "hair care" labels.
 */

export interface Product {
  name: string;
  brand: string;
  category: 'Hair Care' | 'Hair Colour' | 'Skin Care' | 'Styling';
  description: string;
  /** Base image name for /img/{image}-{width}.* variants once added to src/assets. */
  image?: string;
}

export const PRODUCTS: Product[] = [
  {
    name: 'Botoliss Biotin Shampoo & Mask',
    brand: 'Botoliss',
    category: 'Hair Care',
    description:
      '6% biotin, collagen and protein for chemically treated hair. Sulfate and paraben free, from Beauty Garage Professional.',
    image: 'product-botoliss-salon',
  },
  {
    name: 'Botoliss PRO 100 Shampoo & Mask',
    brand: 'Botoliss',
    category: 'Hair Care',
    description:
      'Professional biotin shampoo and hair mask for all chemical treatments. Rich in collagen and protein, sulfate and paraben free.',
    image: 'product-botoliss-pro100',
  },
  {
    name: '&done Take Control',
    brand: '&done',
    category: 'Hair Care',
    description:
      'Hydrating shampoo and shielding conditioner for damaged or chemically treated hair. Deeply cleanses, soothes the scalp and extends colour vibrancy.',
    image: 'product-anddone-take-control',
  },
  {
    name: '&done Begin Again',
    brand: '&done',
    category: 'Hair Care',
    description:
      'Balancing shampoo and restoring conditioner for thinning, fall-prone hair. Restores scalp health, nourishes strands and reduces breakage.',
    image: 'product-anddone-begin-again',
  },
  {
    name: 'L\u2019Or\u00e9al Professionnel Xtenso Care',
    brand: 'L\u2019Or\u00e9al Professionnel',
    category: 'Hair Care',
    description:
      'Pro-Keratin and Incell shampoo and masque for straightened hair. Anti-breakage and anti-dryness care for smoothened and chemically treated hair.',
    image: 'product-loreal-xtenso',
  },
  {
    name: 'Matrix hair care',
    brand: 'Matrix',
    category: 'Hair Care',
    description:
      'Everyday shampoo, conditioner and mask options, including sulphate-free choices for keratin-treated hair.',
  },
  {
    name: 'Professional colour systems',
    brand: 'L\u2019Or\u00e9al Professionnel',
    category: 'Hair Colour',
    description:
      'Ammonia-free and high-lift colour lines for grey coverage, balayage and global highlights.',
  },
  {
    name: 'Bond-building treatments',
    brand: 'Salon range',
    category: 'Hair Care',
    description:
      'Repair treatments used before and after lightening to protect the internal bonds of the hair.',
  },
  {
    name: 'Skin care range',
    brand: 'Salon range',
    category: 'Skin Care',
    description:
      'Cleansers, serums and sun protection matched to your skin type after a consultation.',
  },
];
