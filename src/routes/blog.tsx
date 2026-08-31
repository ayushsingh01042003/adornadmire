import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import BlogList from '../components/BlogList';
import CallToAction from '../components/CallToAction';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, collectionPageSchema } from '../lib/schema';

const TRAIL = [{ name: 'Blog', path: '/blog' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Hair & Beauty Guides from Our Stylists',
    description:
      'Practical hair and beauty advice from the team at Adorn & Admire, Kalyan Nagar: smoothening, choosing a haircut, and the benefits of regular massage.',
    path: '/blog',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      {
        'script:ld+json': collectionPageSchema({
          name: 'Adorn & Admire blog',
          description: 'Hair and beauty guides written by the stylists at Adorn & Admire.',
          path: '/blog',
        }),
      },
    ],
  });

export default function BlogIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        heading="Hair & Beauty Guides"
        intro="Straight answers to the questions our clients in Kalyan Nagar ask most often."
        trail={TRAIL}
      />
      <BlogList showHeading={false} />
      <CallToAction heading="Questions we have not answered?" />
    </>
  );
}
