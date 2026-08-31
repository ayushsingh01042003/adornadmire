import { Link } from 'react-router';

import { BUSINESS } from '../data/site';
import ResponsiveImage from './ResponsiveImage';

export default function About({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;

  return (
    <section className="bg-white py-16" aria-labelledby="about-heading">
      <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
        <ResponsiveImage
          name="about"
          alt="Inside Adorn & Admire salon on CMR Main Road, HRBR Layout, Kalyan Nagar"
          widths={[400, 800, 1200]}
          sizes="(min-width: 1024px) 45vw, 100vw"
          width={1200}
          height={1600}
          className="h-full w-full rounded-sm object-cover"
        />

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            About the salon
          </p>
          <Heading id="about-heading" className="section-title mb-5">
            Love Your Look. Own the Room.
          </Heading>

          <div className="prose-body space-y-4">
            <p>
              Adorn &amp; Admire has been looking after Kalyan Nagar since {BUSINESS.foundingYear}.
              We are a full-service salon on CMR Main Road in HRBR Layout 2nd Block, covering hair,
              skin, nails and makeup under one roof, for women and men.
            </p>
            <p>
              The colour and care systems we use are professional-grade rather than retail. That
              matters most on chemical work &mdash; lightening, balayage and keratin are only as
              good as the products and the person applying them.
            </p>
            <p>
              Every service starts with a consultation rather than a price list. We would rather
              tell you honestly that your hair needs two sessions, or that a treatment will not
              give you what you are picturing, than take the booking and disappoint you.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/services" className="btn btn-primary">
              Explore our services
            </Link>
            <Link to="/contact-us" className="btn btn-outline">
              Find us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
