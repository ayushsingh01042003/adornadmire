import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import About from '../components/About';
import Experience from '../components/Experience';
import Reviews from '../components/Reviews';
import CallToAction from '../components/CallToAction';
import { BUSINESS } from '../data/site';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema } from '../lib/schema';

const TRAIL = [{ name: 'About Us', path: '/about-us' }];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'About Our Salon in Kalyan Nagar',
    description:
      'Adorn & Admire has served Kalyan Nagar since 2017. A L\u2019Or\u00e9al Professionnel partner salon on CMR Main Road, HRBR Layout, for hair, skin, nails and makeup.',
    path: '/about-us',
    extra: [{ 'script:ld+json': breadcrumbSchema(TRAIL) }],
  });

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        heading="About Adorn & Admire"
        intro={`A full-service salon in ${BUSINESS.locality}, ${BUSINESS.city}, looking after hair, skin, nails and makeup since ${BUSINESS.foundingYear}.`}
        trail={TRAIL}
      />

      <About />

      <section className="bg-background py-16" aria-labelledby="values-heading">
        <div className="container mx-auto px-4">
          <h2 id="values-heading" className="section-title mb-10 text-center">
            How We Work
          </h2>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <article className="rounded-sm bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-display text-xl text-primary">Consultation first</h3>
              <p className="prose-body text-base">
                Nothing starts without a conversation about your hair or skin, its history, and what
                you actually want. We would rather tell you a treatment needs two sessions than
                over-process your hair in one.
              </p>
            </article>

            <article className="rounded-sm bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-display text-xl text-primary">Professional product only</h3>
              <p className="prose-body text-base">
                As a listed L&rsquo;Or&eacute;al Professionnel partner salon we use professional
                colour and care systems, alongside K&eacute;rastase and Matrix. On chemical work the
                product matters as much as the technique.
              </p>
            </article>

            <article className="rounded-sm bg-white p-6 shadow-sm">
              <h3 className="mb-3 font-display text-xl text-primary">Honest about outcomes</h3>
              <p className="prose-body text-base">
                Reaching a clean blonde on dark Indian hair takes more than one sitting, and
                smoothening will not make fine hair thicker. You will hear that from us before you
                book, not afterwards.
              </p>
            </article>
          </div>
        </div>
      </section>

      <Experience />
      <Reviews />
      <CallToAction />
    </>
  );
}
