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
}

export const PRODUCTS: Product[] = [
  {
    name: 'K\u00e9rastase treatment range',
    brand: 'K\u00e9rastase',
    category: 'Hair Care',
    description:
      'In-salon and take-home rituals for damaged, coloured and thinning hair, prescribed after a scalp and strand diagnosis.',
  },
  {
    name: 'L\u2019Or\u00e9al Professionnel',
    brand: 'L\u2019Or\u00e9al Professionnel',
    category: 'Hair Care',
    description:
      'The core professional range we use for colour and care. Adorn & Admire is a listed L\u2019Or\u00e9al Professionnel partner salon.',
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
