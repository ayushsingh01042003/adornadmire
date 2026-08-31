/**
 * Gallery catalogue — videos, hair colour, nail art and product imagery.
 * Offer flyers are excluded (shown in the Offers section only).
 */

import { HAIR_COLOUR_IMAGES } from './hair-colour';
import { NAIL_DIARY_IMAGES, NAIL_DIARY_VIDEOS } from './nail-diary';
import { PRODUCTS } from './products';
import type { PortfolioImage } from './services';

export interface GalleryVideoItem {
  type: 'video';
  id: string;
  title: string;
  description: string;
  /** Poster base name, e.g. "nail-diary-01". Defaults to poster-{id}. */
  poster?: string;
  posterWidth?: number;
}

export interface GalleryImageItem {
  type: 'image';
  name: string;
  alt: string;
  width: number;
  height: number;
  widths?: number[];
  objectFit?: 'cover' | 'contain';
}

export type GalleryItem = GalleryVideoItem | GalleryImageItem;

export interface GallerySection {
  heading: string;
  items: GalleryItem[];
}

const SALON_VIDEOS: GalleryVideoItem[] = [
  {
    type: 'video',
    id: 'vid1',
    title: 'Signature Styling',
    description: 'Precision cuts and styling that define your look.',
  },
  {
    type: 'video',
    id: 'vid2',
    title: 'Colour Artistry',
    description: 'Balayage, global colour and highlights by our senior colourists.',
  },
  {
    type: 'video',
    id: 'vid3',
    title: 'Luxury Treatments',
    description: 'Keratin, hair spa and skin rituals in our treatment area.',
  },
];

function toImageItem(
  image: PortfolioImage,
  objectFit: 'cover' | 'contain' = 'cover',
): GalleryImageItem {
  return {
    type: 'image',
    name: image.name,
    alt: image.alt,
    width: image.width,
    height: image.height,
    widths: image.widths,
    objectFit,
  };
}

function toVideoItem(video: (typeof NAIL_DIARY_VIDEOS)[number]): GalleryVideoItem {
  return {
    type: 'video',
    id: video.id,
    title: video.title,
    description: video.description ?? '',
    poster: video.poster,
    posterWidth: video.poster ? 480 : 960,
  };
}

export const GALLERY_SECTIONS: GallerySection[] = [
  {
    heading: 'Inside the salon',
    items: [...SALON_VIDEOS, ...NAIL_DIARY_VIDEOS.map(toVideoItem)],
  },
  {
    heading: 'Hair colour',
    items: HAIR_COLOUR_IMAGES.map((image) => toImageItem(image)),
  },
  {
    heading: 'Nail diary',
    items: NAIL_DIARY_IMAGES.map((image) => toImageItem(image)),
  },
  {
    heading: 'Professional products',
    items: PRODUCTS.filter((product) => product.image).map((product) =>
      toImageItem(
        {
          name: product.image!,
          alt: `${product.brand} — ${product.name}`,
          width: 800,
          height: 600,
          widths: [400, 800],
        },
        'contain',
      ),
    ),
  },
];

/** All video clips, for JSON-LD on the gallery page. */
export const GALLERY_VIDEOS: GalleryVideoItem[] = GALLERY_SECTIONS.flatMap((section) =>
  section.items.filter((item): item is GalleryVideoItem => item.type === 'video'),
);

/** @deprecated Use GALLERY_VIDEOS — kept for imports that expect the old shape. */
export const GALLERY_ITEMS = SALON_VIDEOS;
