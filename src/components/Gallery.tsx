import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

import { GALLERY_SECTIONS } from '../data/gallery';
import type { GalleryImageItem, GalleryVideoItem } from '../data/gallery';
import ResponsiveImage from './ResponsiveImage';

interface Props {
  headingLevel?: 'h1' | 'h2';
  /** When false, only salon video clips are shown (homepage). */
  full?: boolean;
}

function posterSrc(video: GalleryVideoItem): string {
  const base = video.poster ?? `poster-${video.id}`;
  const width = video.posterWidth ?? 960;
  return `/img/${base}-${width}.jpg`;
}

function VideoCard({
  item,
  active,
  onPlay,
  onStop,
  setRef,
}: {
  item: GalleryVideoItem;
  active: boolean;
  onPlay: () => void;
  onStop: () => void;
  setRef: (el: HTMLVideoElement | null) => void;
}) {
  return (
    <figure
      className="group relative overflow-hidden rounded-sm bg-primary shadow-lg"
      onMouseEnter={onPlay}
      onMouseLeave={onStop}
      onFocus={onPlay}
      onBlur={onStop}
    >
      <video
        ref={setRef}
        className="aspect-[4/3] w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={posterSrc(item)}
        tabIndex={0}
        aria-label={`${item.title} — ${item.description}`}
      >
        <source src={`/media/${item.id}.webm`} type="video/webm" />
        <source src={`/media/${item.id}.mp4`} type="video/mp4" />
      </video>

      {!active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/85 text-primary">
            <FaPlay className="ml-1" />
          </span>
        </span>
      )}

      <figcaption className="bg-primary px-4 py-4 text-white">
        <h3 className="font-display text-lg">{item.title}</h3>
        <p className="text-sm text-gray-300">{item.description}</p>
      </figcaption>
    </figure>
  );
}

function ImageCard({ item }: { item: GalleryImageItem }) {
  const widths = item.widths ?? [480, 960];

  return (
    <figure className="overflow-hidden rounded-sm bg-white shadow-sm">
      <ResponsiveImage
        name={item.name}
        alt={item.alt}
        widths={widths}
        sizes="(min-width: 768px) 30vw, 45vw"
        width={item.width}
        height={item.height}
        className={`aspect-square w-full ${item.objectFit === 'contain' ? 'bg-background object-contain p-2' : 'object-cover'}`}
      />
      <figcaption className="sr-only">{item.alt}</figcaption>
    </figure>
  );
}

/**
 * Gallery grid with optional full portfolio (hair colour, nails, products).
 * Homepage passes full={false} to keep the section lightweight.
 */
export default function Gallery({ headingLevel = 'h2', full = false }: Props) {
  const Heading = headingLevel;
  const [active, setActive] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  const sections = full
    ? GALLERY_SECTIONS
    : GALLERY_SECTIONS.filter((section) => section.heading === 'Inside the salon');

  const hasContent = sections.some((section) => section.items.length > 0);

  const play = (id: string) => {
    setActive(id);
    void refs.current[id]?.play().catch(() => {
      // Autoplay policies can refuse; the poster stays visible.
    });
  };

  const stop = (id: string) => {
    const video = refs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setActive((current) => (current === id ? null : current));
  };

  return (
    <section className="bg-background py-16" aria-labelledby="gallery-heading">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Inside the salon
          </p>
          <Heading id="gallery-heading" className="section-title">
            Our Gallery
          </Heading>
          <p className="section-subtitle mx-auto mt-3 max-w-2xl">
            A glimpse of the artistry and transformations we create every day in Kalyan Nagar.
          </p>
        </div>

        {hasContent ? (
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.heading}>
                {full && (
                  <h3 className="mb-6 font-display text-2xl text-primary md:text-3xl">
                    {section.heading}
                  </h3>
                )}

                <ul
                  className={
                    section.items[0]?.type === 'video'
                      ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'
                      : 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4'
                  }
                >
                  {section.items.map((item) => (
                    <li key={item.type === 'video' ? item.id : item.name}>
                      {item.type === 'video' ? (
                        <VideoCard
                          item={item}
                          active={active === item.id}
                          onPlay={() => play(item.id)}
                          onStop={() => stop(item.id)}
                          setRef={(el) => {
                            refs.current[item.id] = el;
                          }}
                        />
                      ) : (
                        <ImageCard item={item} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="mx-auto max-w-xl rounded-sm border border-dashed border-gray-light bg-white px-6 py-12 text-center text-gray">
            New gallery content is on the way. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}

export { GALLERY_VIDEOS, GALLERY_ITEMS } from '../data/gallery';
