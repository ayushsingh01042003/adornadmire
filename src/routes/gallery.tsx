import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import Gallery, { GALLERY_ITEMS } from '../components/Gallery';
import CallToAction from '../components/CallToAction';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, collectionPageSchema, videoObjectSchema } from '../lib/schema';
import { SITE_ORIGIN } from '../data/site';

const TRAIL = [{ name: 'Gallery', path: '/gallery' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Gallery: Inside Our Kalyan Nagar Salon',
    description:
      'See the styling, colour work and treatments we do every day at Adorn & Admire in Kalyan Nagar, Bengaluru. Book on +91 96637 88314.',
    path: '/gallery',
    image: '/img/poster-vid1-960.jpg',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      {
        'script:ld+json': collectionPageSchema({
          name: 'Adorn & Admire gallery',
          description: 'Video gallery of styling, colour and treatment work at the salon.',
          path: '/gallery',
        }),
      },
      // Each clip is declared so it is eligible for video results, which a raw
      // <video> tag on its own is not.
      ...GALLERY_ITEMS.map((item) => ({
        'script:ld+json': videoObjectSchema({
          name: `${item.title} at Adorn & Admire, Kalyan Nagar`,
          description: item.description,
          contentUrl: `${SITE_ORIGIN}/media/${item.id}.mp4`,
          thumbnailUrl: `${SITE_ORIGIN}/img/poster-${item.id}-960.jpg`,
          uploadDate: '2026-02-10',
        }),
      })),
    ],
  });

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        heading="Inside Adorn & Admire"
        intro="Styling, colour and treatment work from our salon floor on CMR Main Road."
        trail={TRAIL}
      />
      <Gallery />
      <CallToAction heading="Like what you see?" />
    </>
  );
}
