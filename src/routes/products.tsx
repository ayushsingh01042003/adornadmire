import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import ProductsGrid from '../components/ProductsGrid';
import CallToAction from '../components/CallToAction';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, collectionPageSchema } from '../lib/schema';

const TRAIL = [{ name: 'Products', path: '/products' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Professional Hair & Skin Products',
    description:
      'K\u00e9rastase, L\u2019Or\u00e9al Professionnel and Matrix ranges stocked at Adorn & Admire, Kalyan Nagar. Prescribed after a consultation with your stylist.',
    path: '/products',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      {
        'script:ld+json': collectionPageSchema({
          name: 'Professional products',
          description:
            'Professional hair and skin care ranges used and stocked at Adorn & Admire.',
          path: '/products',
        }),
      },
    ],
  });

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        heading="Professional Products We Use"
        intro="The same professional ranges we work with in the salon, available to take home."
        trail={TRAIL}
      />
      <ProductsGrid />
      <CallToAction heading="Ask about a product" />
    </>
  );
}
