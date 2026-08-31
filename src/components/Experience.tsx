import { Link } from 'react-router';

/**
 * Ambient section between content blocks.
 *
 * The background image is served from the locally generated variants: the
 * original referenced ext.same-assets.com, which now returns 404 for every
 * asset, so this section was rendering as a bare dark overlay.
 */
export default function Experience() {
  return (
    <section
      className="bg-parallax relative bg-cover bg-center py-24"
      style={{ backgroundImage: "url('/img/experience-1600.jpg')" }}
      aria-labelledby="experience-heading"
    >
      <div className="absolute inset-0 bg-primary/70" />

      <div className="container relative mx-auto px-4 text-center text-white">
        <h2 id="experience-heading" className="mb-4 font-display text-3xl md:text-4xl">
          Experience Our Space
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-200">
          Two floors on CMR Main Road: a full salon floor for hair, nails and makeup, and a
          quieter treatment area for skin and spa services.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/gallery" className="btn btn-accent">
            See the gallery
          </Link>
          <Link
            to="/services/skin"
            className="btn border border-white text-white hover:bg-white hover:text-primary"
          >
            Spa &amp; skin services
          </Link>
        </div>
      </div>
    </section>
  );
}
