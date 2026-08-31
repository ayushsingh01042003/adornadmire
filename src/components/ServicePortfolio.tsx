import type { PortfolioSection } from '../data/services';
import ResponsiveImage from './ResponsiveImage';

interface Props {
  sections: PortfolioSection[];
}

/**
 * Image and video portfolio blocks on service detail pages (e.g. Hair colour, Nail diary).
 */
export default function ServicePortfolio({ sections }: Props) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        const hasContent =
          section.images.length > 0 || (section.videos && section.videos.length > 0);

        return (
          <section
            key={section.heading}
            className="border-t border-gray-light bg-background py-14"
            aria-labelledby={`portfolio-${section.heading.replace(/\s+/g, '-').toLowerCase()}`}
          >
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-5xl">
                <h2
                  id={`portfolio-${section.heading.replace(/\s+/g, '-').toLowerCase()}`}
                  className="mb-3 font-display text-2xl text-primary md:text-3xl"
                >
                  {section.heading}
                </h2>
                {section.intro && <p className="prose-body mb-8 max-w-2xl">{section.intro}</p>}

                {hasContent ? (
                  <div className="space-y-6">
                    {section.videos && section.videos.length > 0 && (
                      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {section.videos.map((video) => {
                          const posterBase = video.poster ?? `poster-${video.id}`;
                          const posterWidth = video.poster ? 480 : 960;

                          return (
                          <li key={video.id}>
                            <figure className="overflow-hidden rounded-sm bg-primary shadow-sm">
                              <video
                                className="aspect-[4/3] w-full object-cover"
                                controls
                                playsInline
                                preload="metadata"
                                poster={`/img/${posterBase}-${posterWidth}.jpg`}
                                aria-label={
                                  video.description
                                    ? `${video.title} — ${video.description}`
                                    : video.title
                                }
                              >
                                <source src={`/media/${video.id}.webm`} type="video/webm" />
                                <source src={`/media/${video.id}.mp4`} type="video/mp4" />
                              </video>
                              <figcaption className="bg-primary px-4 py-3 text-white">
                                <p className="font-display text-base">{video.title}</p>
                                {video.description && (
                                  <p className="text-sm text-gray-300">{video.description}</p>
                                )}
                              </figcaption>
                            </figure>
                          </li>
                          );
                        })}
                      </ul>
                    )}

                    {section.images.length > 0 && (
                      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                        {section.images.map((image) => (
                          <li key={image.name}>
                            <ResponsiveImage
                              name={image.name}
                              alt={image.alt}
                              widths={image.widths ?? [480, 960]}
                              sizes="(min-width: 768px) 30vw, 45vw"
                              width={image.width}
                              height={image.height}
                              className="aspect-square w-full rounded-sm object-cover"
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <p className="rounded-sm border border-dashed border-gray-light bg-white px-6 py-10 text-center text-gray">
                    Photos coming soon.
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
