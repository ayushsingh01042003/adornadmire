import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import Reviews from '../components/Reviews';
import CallToAction from '../components/CallToAction';
import { BUSINESS, REVIEW_COUNT_LABEL } from '../data/site';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, collectionPageSchema } from '../lib/schema';

const TRAIL = [{ name: 'Reviews', path: '/reviews' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Client Reviews from Kalyan Nagar',
    description: `Read what clients say about Adorn & Admire in Kalyan Nagar. Rated ${BUSINESS.rating}/5 by ${REVIEW_COUNT_LABEL} clients for hair, colour, nails and skin services.`,
    path: '/reviews',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      {
        'script:ld+json': collectionPageSchema({
          name: 'Client reviews',
          description: 'Reviews from clients of Adorn & Admire in Kalyan Nagar, Bengaluru.',
          path: '/reviews',
        }),
      },
    ],
  });

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        heading="What Our Clients Say"
        intro="Feedback from clients across Kalyan Nagar, HRBR Layout and the wider Bengaluru east side."
        trail={TRAIL}
      />

      <Reviews />

      <section className="bg-background py-14">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="section-title mb-4">Leave us a review</h2>
          <p className="prose-body mb-6">
            If we have looked after you recently, a review on our Google Business Profile genuinely
            helps other people in the area find us. It takes a minute and we read every one.
          </p>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Review us on Google
          </a>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
