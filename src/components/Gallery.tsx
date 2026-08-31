import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

export const GALLERY_ITEMS = [
  {
    id: 'vid1',
    title: 'Signature Styling',
    description: 'Precision cuts and styling that define your look.',
  },
  {
    id: 'vid2',
    title: 'Colour Artistry',
    description: 'Balayage, global colour and highlights by our senior colourists.',
  },
  {
    id: 'vid3',
    title: 'Luxury Treatments',
    description: 'Keratin, hair spa and skin rituals in our treatment area.',
  },
] as const;

/**
 * Hover-to-play video cards.
 *
 * preload="none" plus a poster image means nothing but the poster downloads
 * until the visitor actually hovers, so three clips cost three small images on
 * initial load. Each card also carries a real heading and description so the
 * section is not video-only content for a crawler or a screen reader.
 */
export default function Gallery({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;
  const [active, setActive] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  const play = (id: string) => {
    setActive(id);
    void refs.current[id]?.play().catch(() => {
      // Autoplay policies can refuse; the poster simply stays visible.
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

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <li key={item.id}>
              <figure
                className="group relative overflow-hidden rounded-sm bg-primary shadow-lg"
                onMouseEnter={() => play(item.id)}
                onMouseLeave={() => stop(item.id)}
                onFocus={() => play(item.id)}
                onBlur={() => stop(item.id)}
              >
                <video
                  ref={(el) => {
                    refs.current[item.id] = el;
                  }}
                  className="aspect-[4/3] w-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={`/img/poster-${item.id}-960.jpg`}
                  tabIndex={0}
                  aria-label={`${item.title} — ${item.description}`}
                >
                  <source src={`/media/${item.id}.webm`} type="video/webm" />
                  <source src={`/media/${item.id}.mp4`} type="video/mp4" />
                </video>

                {active !== item.id && (
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
