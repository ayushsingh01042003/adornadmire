import { Link } from 'react-router';

import { OFFERS } from '../data/offers';
import { BUSINESS, formatPhone } from '../data/site';
import ResponsiveImage from './ResponsiveImage';
import { reportCallConversion } from '../lib/analytics';

export default function Offers({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;

  if (OFFERS.length === 0) return null;

  return (
    <section className="bg-white py-16" aria-labelledby="offers-heading">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Limited time
          </p>
          <Heading id="offers-heading" className="section-title">
            Current Offers
          </Heading>
          <p className="section-subtitle mx-auto mt-3 max-w-2xl">
            Seasonal packages and festive deals at our Kalyan Nagar salon. Call to check
            availability and book your slot.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {OFFERS.map((offer) => (
            <li key={offer.image}>
              <figure className="overflow-hidden rounded-sm border border-gray-light bg-background shadow-sm">
                <ResponsiveImage
                  name={offer.image}
                  alt={offer.alt}
                  widths={[512, 1024]}
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 45vw, 100vw"
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-contain"
                />
              </figure>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-gray">
          Offers change through the year.{' '}
          <a
            href={`tel:${BUSINESS.phonePrimary}`}
            onClick={() => reportCallConversion('offers')}
            className="text-secondary underline hover:text-accent"
          >
            Call {formatPhone(BUSINESS.phonePrimary)}
          </a>{' '}
          to confirm pricing, or{' '}
          <Link to="/contact-us" className="text-secondary underline hover:text-accent">
            visit us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
