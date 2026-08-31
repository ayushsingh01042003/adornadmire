import { Link } from 'react-router';
import { FaCut, FaSpa, FaHandSparkles, FaPaintBrush, FaUserTie, FaArrowRight } from 'react-icons/fa';

import { SERVICES, type Service } from '../data/services';

const ICONS: Record<Service['icon'], React.ReactNode> = {
  cut: <FaCut />,
  spa: <FaSpa />,
  nails: <FaHandSparkles />,
  makeup: <FaPaintBrush />,
  beard: <FaUserTie />,
};

/**
 * Service cards linking through to a page each.
 *
 * The previous version had non-functional Women/Men filter buttons. They are
 * not reinstated as a client-side filter on purpose: hiding half the copy
 * behind a toggle keeps it out of the rendered HTML that Google indexes.
 * Men's grooming is instead its own page, which can rank on its own terms.
 */
export default function ServicesGrid({
  headingLevel = 'h2',
  showHeading = true,
}: {
  headingLevel?: 'h1' | 'h2';
  showHeading?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <section className="bg-background py-16" aria-labelledby="services-heading">
      <div className="container mx-auto px-4">
        {showHeading && (
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
              What we do
            </p>
            <Heading id="services-heading" className="section-title">
              Our Services
            </Heading>
            <p className="section-subtitle mx-auto mt-3 max-w-2xl">
              Hair, skin, nails, makeup and men&rsquo;s grooming, seven days a week in Kalyan Nagar.
            </p>
          </div>
        )}

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-sm bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <span className="mb-4 text-4xl text-accent" aria-hidden="true">
                  {ICONS[service.icon]}
                </span>
                <h3 className="mb-3 font-display text-xl text-primary">{service.shortTitle}</h3>
                <p className="prose-body mb-4 flex-1 text-base">{service.summary}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-secondary group-hover:text-accent">
                  View {service.shortTitle.toLowerCase()}
                  <FaArrowRight aria-hidden="true" className="text-xs" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
