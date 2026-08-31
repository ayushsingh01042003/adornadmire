import type { MetaFunction } from 'react-router';

import Hero from '../components/Hero';
import About from '../components/About';
import ServicesGrid from '../components/ServicesGrid';
import Experience from '../components/Experience';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import BlogList from '../components/BlogList';
import CallToAction from '../components/CallToAction';
import Faq from '../components/Faq';
import { buildMeta } from '../lib/seo';
import { faqSchema } from '../lib/schema';

const HOME_FAQS = [
  {
    question: 'Where is Adorn & Admire located?',
    answer:
      'We are on the first floor of VP Plaza, No. 420, CMR Main Road, HRBR Layout 2nd Block, Kalyan Nagar, Bengaluru 560043. It is an easy trip from Banaswadi, Kammanahalli and Indiranagar.',
  },
  {
    question: 'What are your opening hours?',
    answer:
      'We are open every day of the week, including Sundays, from 10:30 AM to 9:00 PM.',
  },
  {
    question: 'Do I need an appointment, or can I walk in?',
    answer:
      'Walk-ins are welcome and we will fit you in wherever we can. For colour, keratin, nail extensions and any bridal work, please book ahead: those services need a longer slot and a specific stylist. Call +91 96637 88314.',
  },
  {
    question: 'Is Adorn & Admire a unisex salon?',
    answer:
      'Yes. We offer hair, skin and grooming services for both women and men, from the same floor and the same senior team.',
  },
  {
    question: 'Which product brands do you use?',
    answer:
      'We are a listed L\u2019Or\u00e9al Professionnel partner salon and also work with K\u00e9rastase and Matrix. All colour and care services use professional-grade product rather than retail lines.',
  },
];

export const meta: MetaFunction = () =>
  buildMeta({
    title: 'Best Salon in Kalyan Nagar',
    description:
      'L\u2019Or\u00e9al Professionnel partner salon in Kalyan Nagar, Bengaluru. Haircuts, balayage, keratin, facials, nails and bridal makeup. Open daily, 10:30 AM\u20139 PM.',
    path: '/',
    extra: [{ 'script:ld+json': faqSchema(HOME_FAQS) }],
  });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesGrid />
      <Experience />
      <Gallery />
      <Reviews />
      <BlogList limit={3} />
      <Faq items={HOME_FAQS} heading="Common questions" />
      <CallToAction />
    </>
  );
}
