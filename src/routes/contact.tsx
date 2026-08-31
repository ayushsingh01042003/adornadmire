import type { MetaFunction } from 'react-router';

import PageHeader from '../components/PageHeader';
import ContactDetails from '../components/ContactDetails';
import Faq from '../components/Faq';
import CallToAction from '../components/CallToAction';
import { BUSINESS } from '../data/site';
import { buildMeta } from '../lib/seo';
import { breadcrumbSchema, faqSchema } from '../lib/schema';

const TRAIL = [{ name: 'Contact Us', path: '/contact-us' }];

const CONTACT_FAQS = [
  {
    question: 'What are your opening hours?',
    answer:
      'Adorn & Admire is open every day of the week, including Sundays and most public holidays, from 10:30 AM to 9:00 PM.',
  },
  {
    question: 'Where exactly is the salon?',
    answer:
      'On the first floor of VP Plaza, No. 420, CMR Main Road, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru 560043. Look for VP Plaza on CMR Main Road; we are up one floor.',
  },
  {
    question: 'Is parking available?',
    answer:
      'There is street parking on and around CMR Main Road. It is easiest on weekday afternoons and tightest on weekend evenings, so allow a few extra minutes then.',
  },
  {
    question: 'Do you take walk-ins?',
    answer:
      'Yes. Walk-ins are welcome for cuts, grooming and quick services. For colour, keratin, nail extensions or bridal work please call ahead, since those need a longer slot and a particular stylist.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'Call or WhatsApp us on +91 96637 88314, or use our second line on +91 91104 23554. You can also email adornadmire.kalyannagar@gmail.com, though calling gets a faster answer.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Most of our clients come from Kalyan Nagar and HRBR Layout, and we are a short drive from Banaswadi, Kammanahalli, Indiranagar and Hennur.',
  },
];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Contact & Opening Hours',
    description:
      'Adorn & Admire, VP Plaza, CMR Main Road, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru 560043. Open daily 10:30 AM to 9:00 PM. Call +91 96637 88314.',
    path: '/contact-us',
    extra: [
      { 'script:ld+json': breadcrumbSchema(TRAIL) },
      { 'script:ld+json': faqSchema(CONTACT_FAQS) },
    ],
  });

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        heading="Contact & Opening Hours"
        intro={`Open ${BUSINESS.hoursDaysLabel.toLowerCase()}, ${BUSINESS.hoursLabel}. Call, WhatsApp or walk in.`}
        trail={TRAIL}
      />

      <ContactDetails />
      <Faq items={CONTACT_FAQS} heading="Visiting the salon" />
      <CallToAction heading="Ready to book?" />
    </>
  );
}
