import type { MetaFunction } from 'react-router';
import { Link, useParams } from 'react-router';

import PageHeader from '../components/PageHeader';
import CallToAction from '../components/CallToAction';
import Faq from '../components/Faq';
import ServicePortfolio from '../components/ServicePortfolio';
import { SERVICES, getServiceBySlug } from '../data/services';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '../lib/schema';

/*
 * No loader is used here on purpose. The catalogue is a few kilobytes of static
 * data already in the bundle, so reading it directly avoids generating a .data
 * payload per route and keeps client-side navigation instant.
 */

export const meta: MetaFunction = ({ params }) => {
  const service = getServiceBySlug(params.slug ?? '');

  if (!service) {
    return buildMeta({
      title: 'Service not found',
      description: 'This service page does not exist.',
      path: `/services/${params.slug ?? ''}`,
      noIndex: true,
    });
  }

  const trail = [
    { name: 'Services', path: '/services' },
    { name: service.shortTitle, path: `/services/${service.slug}` },
  ];

  return buildMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    extra: [
      { 'script:ld+json': serviceSchema(service) },
      { 'script:ld+json': breadcrumbSchema(trail) },
      { 'script:ld+json': faqSchema(service.faqs) },
    ],
  });
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug ?? '');

  if (!service) {
    return (
      <div className="container mx-auto px-4 pb-24 pt-32 text-center">
        <h1 className="mb-4 font-display text-4xl text-primary">Service not found</h1>
        <p className="prose-body mb-8">
          We could not find that service. Here is everything we offer.
        </p>
        <Link to="/services" className="btn btn-primary">
          All services
        </Link>
      </div>
    );
  }

  const trail = [
    { name: 'Services', path: '/services' },
    { name: service.shortTitle, path: `/services/${service.slug}` },
  ];

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={`${service.shortTitle} services`}
        heading={service.heading}
        trail={trail}
      />

      <article className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="prose-body mb-5 text-lg">
                {paragraph}
              </p>
            ))}

            {service.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="mb-4 font-display text-2xl text-primary md:text-3xl">
                  {section.heading}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="prose-body mb-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>

      {service.portfolios && service.portfolios.length > 0 && (
        <ServicePortfolio sections={service.portfolios} />
      )}

      <Faq items={service.faqs} heading={`${service.shortTitle} questions`} />

      <section className="bg-white py-14" aria-labelledby="other-services">
        <div className="container mx-auto px-4 text-center">
          <h2 id="other-services" className="section-title mb-6">
            Other Services
          </h2>
          <ul className="flex flex-wrap justify-center gap-3">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link to={`/services/${other.slug}`} className="btn btn-outline">
                  {other.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction heading={`Book your ${service.shortTitle.toLowerCase()} appointment`} />
    </>
  );
}
