import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

import PageHeader from '../components/PageHeader';
import ServicesGrid from '../components/ServicesGrid';
import CallToAction from '../components/CallToAction';
import Faq from '../components/Faq';
import { SERVICES } from '../data/services';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, faqSchema } from '../lib/schema';

const TRAIL = [{ name: 'Services', path: '/services' }];

const SERVICES_FAQS = [
  {
    question: 'How much does a haircut cost at Adorn & Admire?',
    answer:
      'Our advance haircut is \u20b9850 plus tax and includes a consultation, wash, cut and blow-dry finish. That rate applies to both women and men.',
  },
  {
    question: 'Do you offer a consultation before colour or keratin?',
    answer:
      'Yes, and we strongly recommend it. A short consultation covers your hair\u2019s history and condition, what the service will realistically achieve, what it costs at your length and how long it will last.',
  },
  {
    question: 'Are your prices inclusive of tax?',
    answer:
      'Some of our promotional rates are quoted before GST, and those are marked "plus tax" on the price list. Ask when you book and we will confirm the final amount.',
  },
  {
    question: 'How long should I allow for an appointment?',
    answer:
      'A haircut takes about an hour. Global colour and keratin run two to four hours depending on length, balayage three to four, and detailed nail art up to two. Tell us what you want at booking and we will hold the right slot.',
  },
];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Salon Services in Kalyan Nagar',
    description:
      'Hair, skin, nail, makeup and men\u2019s grooming services at Adorn & Admire, Kalyan Nagar. Consultations before every appointment. Open daily.',
    path: '/services',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      { 'script:ld+json': faqSchema(SERVICES_FAQS) },
    ],
  });

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        heading="Salon Services in Kalyan Nagar"
        intro="Hair, skin, nails, makeup and men's grooming under one roof on CMR Main Road, HRBR Layout. Every service starts with a consultation."
        trail={TRAIL}
      />

      <ServicesGrid showHeading={false} />

      <section className="bg-background py-16" aria-labelledby="detail-heading">
        <div className="container mx-auto px-4">
          <h2 id="detail-heading" className="section-title mb-10 text-center">
            Explore Each Service
          </h2>

          <div className="mx-auto grid max-w-4xl gap-6">
            {SERVICES.map((service) => (
              <article key={service.slug} className="rounded-sm bg-white p-6 shadow-sm">
                <h3 className="mb-2 font-display text-2xl text-primary">
                  <Link to={`/services/${service.slug}`} className="hover:text-accent">
                    {service.heading}
                  </Link>
                </h3>
                <p className="prose-body mb-4">{service.intro[0]}</p>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-sm font-semibold uppercase tracking-wide text-secondary hover:text-accent"
                >
                  Read about {service.shortTitle.toLowerCase()} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq items={SERVICES_FAQS} />
      <CallToAction />
    </>
  );
}
