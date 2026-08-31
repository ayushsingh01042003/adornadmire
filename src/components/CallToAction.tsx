import { Link } from 'react-router';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { BUSINESS } from '../data/site';
import { trackEvent } from '../lib/analytics';
import CallButton from './CallButton';

/**
 * Closing conversion block, repeated at the foot of every content page. A local
 * salon's entire funnel is a phone call or a walk-in, so both are offered
 * alongside the hours that make a visit possible.
 */
export default function CallToAction({
  heading = 'Book your appointment',
  body = 'Call us to check availability, or drop into the salon on CMR Main Road. We are open every day.',
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-primary py-16 text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 text-center">
        <h2 id="cta-heading" className="mb-4 font-display text-3xl md:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">{body}</p>

        <div className="flex flex-wrap justify-center gap-3">
          <CallButton source="cta-block" className="btn btn-accent" />
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('directions_click', { source: 'cta-block' })}
            className="btn border border-white text-white hover:bg-white hover:text-primary"
          >
            <FaMapMarkerAlt aria-hidden="true" className="mr-2" />
            Get directions
          </a>
          <Link
            to="/contact-us"
            className="btn border border-white text-white hover:bg-white hover:text-primary"
          >
            Contact &amp; hours
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-300">
          {BUSINESS.hoursDaysLabel} &middot; {BUSINESS.hoursLabel} &middot; {BUSINESS.locality},{' '}
          {BUSINESS.city}
        </p>
      </div>
    </section>
  );
}
