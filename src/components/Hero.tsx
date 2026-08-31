import { Link } from 'react-router';
import { FaStar, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import { BUSINESS, REVIEW_COUNT_LABEL } from '../data/site';
import { reportCallConversion } from '../lib/analytics';

/**
 * Home page hero.
 *
 * The still image is always the first paint (and the mobile LCP). The looping
 * video sits on top of it from the `lg` breakpoint up, via a CSS media query
 * rather than a delayed JS mount, so a slow or touch laptop cannot leave the
 * hero blank. A solid `bg-primary` behind both means white type stays readable
 * even if a file 404s.
 */
export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary pt-24 md:pt-28"
      id="home"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source
            type="image/avif"
            srcSet="/img/hero-fallback-640.avif 640w, /img/hero-fallback-1280.avif 1280w, /img/hero-fallback-1920.avif 1920w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/img/hero-fallback-640.webp 640w, /img/hero-fallback-1280.webp 1280w, /img/hero-fallback-1920.webp 1920w"
            sizes="100vw"
          />
          <img
            src="/img/hero-fallback-1280.jpg"
            srcSet="/img/hero-fallback-640.jpg 640w, /img/hero-fallback-1280.jpg 1280w, /img/hero-fallback-1920.jpg 1920w"
            sizes="100vw"
            alt=""
            width={1920}
            height={1440}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </picture>

        <video
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:hidden lg:block"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/img/poster-background-vid-480.jpg"
          tabIndex={-1}
        >
          <source src="/media/background-vid.webm" type="video/webm" />
          <source src="/media/background-vid.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10 text-white md:py-12">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-tertiary">
            Hair &middot; Skin &middot; Beauty
          </p>

          <h1 className="mb-5 font-display text-4xl leading-tight md:text-6xl">
            Best Salon in Kalyan Nagar
          </h1>

          <p className="mb-6 max-w-2xl text-lg text-gray-200 md:text-xl">
            Expert hair, skin, nail and makeup services at Adorn &amp; Admire on CMR Main Road,
            HRBR Layout. Open every day of the week.
          </p>

          <p className="mb-8 flex flex-wrap items-center gap-2 text-gray-200">
            <span className="flex text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            <span>
              Rated {BUSINESS.rating}/5 by {REVIEW_COUNT_LABEL} happy clients
            </span>
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <a
              href={`tel:${BUSINESS.phonePrimary}`}
              onClick={() => reportCallConversion('hero')}
              className="btn btn-accent"
            >
              <FaPhone aria-hidden="true" className="mr-2" />
              Book an appointment
            </a>
            <Link
              to="/services"
              className="btn border border-white text-white hover:bg-white hover:text-primary"
            >
              View services
            </Link>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-200">
            <li className="flex items-center gap-2">
              <FaClock aria-hidden="true" className="text-accent" />
              {BUSINESS.hoursDaysLabel}, {BUSINESS.hoursLabel}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt aria-hidden="true" className="text-accent" />
              {BUSINESS.locality}, {BUSINESS.city}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
