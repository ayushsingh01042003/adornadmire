import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import Gallery from '../components/Gallery';
import { GALLERY_VIDEOS } from '../data/gallery';
import CallToAction from '../components/CallToAction';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, collectionPageSchema, videoObjectSchema } from '../lib/schema';
import { SITE_ORIGIN } from '../data/site';

const TRAIL = [{ name: 'Gallery', path: '/gallery' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Gallery: Inside Our Kalyan Nagar Salon',
    description:
      'Hair colour, nail art, styling videos and salon work from Adorn & Admire in Kalyan Nagar, Bengaluru. Book on +91 96637 88314.',
    path: '/gallery',
    image: GALLERY_VIDEOS[0]
      ? `/img/poster-${GALLERY_VIDEOS[0].id}-960.jpg`
      : '/img/about-800.jpg',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      {
        'script:ld+json': collectionPageSchema({
          name: 'Adorn & Admire gallery',
          description: 'Gallery of hair colour, nail art, styling and treatments at the salon.',
          path: '/gallery',
        }),
      },
      ...GALLERY_VIDEOS.map((item) => ({
        'script:ld+json': videoObjectSchema({
          name: `${item.title} at Adorn & Admire, Kalyan Nagar`,
          description: item.description,
          contentUrl: `${SITE_ORIGIN}/media/${item.id}.mp4`,
          thumbnailUrl: `${SITE_ORIGIN}${item.poster ? `/img/${item.poster}-${item.posterWidth ?? 480}.jpg` : `/img/poster-${item.id}-960.jpg`}`,
          uploadDate: '2026-08-31',
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
        intro="Hair colour, nail art, styling clips and salon work from CMR Main Road."
        trail={TRAIL}
      />
      <Gallery full />
      <CallToAction heading="Like what you see?" />
    </>
  );
}
