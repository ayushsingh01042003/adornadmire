import { HAIR_COLOUR_IMAGES } from './hair-colour';
import { NAIL_DIARY_IMAGES, NAIL_DIARY_VIDEOS } from './nail-diary';

/**
 * Service catalogue. Each entry becomes a pre-rendered page at
 * /services/<slug> and feeds the Service/OfferCatalog JSON-LD.
 *
 * Prices are the published offer rates carried over from the previous site.
 * They are marketing claims that change seasonally, so treat this file as the
 * one place to update them; the pages and the structured data both read here.
 */

export interface Treatment {
  name: string;
  description: string;
  /** Numeric INR amount. Omit when the price is on consultation. */
  price?: number;
  /** True when the quoted rate excludes the 18% GST shown on the price list. */
  plusTax?: boolean;
  note?: string;
}

export interface ServiceFaq { question: string; answer: string }

export interface PortfolioImage {
  /** Base name for /img/{name}-{width}.* variants. */
  name: string;
  alt: string;
  width: number;
  height: number;
  widths?: number[];
}

export interface PortfolioVideo {
  /** Base name for /media/{id}.mp4 and /img/poster-{id}-960.jpg */
  id: string;
  title: string;
  description?: string;
  /** Override poster image base name when /img/poster-{id}-960.jpg is unavailable. */
  poster?: string;
}

export interface PortfolioSection {
  heading: string;
  intro?: string;
  images: PortfolioImage[];
  videos?: PortfolioVideo[];
}

export interface Service {
  slug: string;
  /** Nav / card label. */
  shortTitle: string;
  /** On-page H1. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  /** One-line summary used on the services index and in JSON-LD. */
  summary: string;
  icon: 'cut' | 'spa' | 'nails' | 'makeup' | 'beard';
  /** Lead paragraphs, rendered in order. */
  intro: string[];
  /** Sub-sections with their own H2s. */
  sections: { heading: string; body: string[] }[];
  treatments: Treatment[];
  faqs: ServiceFaq[];
  audience: 'women' | 'men' | 'all';
  /** Optional image portfolios shown below the main service copy. */
  portfolios?: PortfolioSection[];
}

export const SERVICES: Service[] = [
  {
    slug: 'hair',
    shortTitle: 'Hair',
    heading: 'Hair Salon in Kalyan Nagar',
    metaTitle: 'Hair Salon in Kalyan Nagar',
    metaDescription:
      'Haircuts, balayage, global colour and keratin smoothening at Adorn & Admire, a L\u2019Or\u00e9al Professionnel partner salon in Kalyan Nagar. Call +91 96637 88314.',
    summary:
      'Precision cuts, balayage, global colour, keratin and smoothening by senior stylists trained on L\u2019Or\u00e9al Professionnel systems.',
    icon: 'cut',
    audience: 'all',
    intro: [
      'Hair is what most of our clients in Kalyan Nagar come to us for, and it is where our senior team spends most of its time. Whether you want a cut that finally suits your face shape, a colour that grows out gracefully, or a smoothening treatment that survives a Bengaluru monsoon, the work starts with a consultation rather than a price list.',
      'Adorn & Admire is a listed L\u2019Or\u00e9al Professionnel partner salon, so every colour and care service uses professional-grade systems rather than retail product. That matters most for chemical work: lightening, balayage and keratin are only as good as the products and the person applying them.',
    ],
    sections: [
      {
        heading: 'Haircuts and styling',
        body: [
          'Our advance haircut begins with a consultation on face shape, hair density, growth pattern and how much time you realistically want to spend styling at home. There is no point in a cut that looks excellent in the chair and unmanageable on a Tuesday morning. Stylists work across blunt cuts, layers, textured crops, curtain bangs and curly-specific dry cutting.',
          'Blow-dry, tong and straightening finishes are available on their own or after any colour service, and we are happy to walk you through how to recreate the finish yourself before you leave.',
        ],
      },
      {
        heading: 'Colour: balayage, global and highlights',
        body: [
          'Balayage remains our most requested colour service because it is hand-painted rather than foiled, so the regrowth line stays soft and you can go three to four months between appointments. Global colour is the choice for full grey coverage or a uniform tonal change, and global highlights add dimension without committing to a full lift.',
          'Every lightening service includes a strand test and a bond-protecting treatment. On darker Indian hair, reaching a clean blonde or ash tone usually takes more than one session; we will tell you that honestly at the consultation rather than over-processing your hair in a single sitting.',
        ],
      },
      {
        heading: 'Keratin, smoothening and hair care',
        body: [
          'GK keratin is our flagship smoothening treatment, priced up to waist length. It reduces frizz and cuts blow-dry time substantially while keeping some natural movement, which is what most clients actually want rather than a poker-straight finish. Results typically hold for three to five months depending on wash frequency and aftercare.',
          'For hair that is already stressed from previous chemical work, we will often recommend a course of in-salon bond-building or scalp treatments before any new colour or smoothening. It is a slower path but it protects the hair you already have.',
        ],
      },
    ],
    portfolios: [
      {
        heading: 'Hair colour',
        intro: 'Balayage, global colour, highlights and gloss treatments from our colourists.',
        images: HAIR_COLOUR_IMAGES,
      },
    ],
    treatments: [
      {
        name: 'Advance haircut',
        description: 'Consultation, wash, precision cut and blow-dry finish.',
        price: 850,
        plusTax: true,
      },
      {
        name: 'Balayage',
        description: 'Hand-painted lightening with a soft, low-maintenance regrowth line.',
        price: 3999,
        plusTax: true,
        note: 'Any length',
      },
      {
        name: 'Global highlights',
        description: 'All-over dimensional highlights for depth and movement.',
        price: 4999,
        plusTax: true,
        note: 'Any length',
      },
      {
        name: 'GK keratin smoothening',
        description: 'Frizz control and reduced styling time with natural movement retained.',
        price: 4999,
        note: 'Up to waist length',
      },
      {
        name: 'Global hair colour',
        description: 'Uniform single-tone colour or full grey coverage.',
        note: 'Priced on length and product',
      },
      {
        name: 'Hair spa and scalp treatments',
        description: 'Deep conditioning and scalp care, including bond-building for chemically treated hair.',
        note: 'Priced on length and condition',
      },
    ],
    faqs: [
      {
        question: 'How long does a balayage appointment take?',
        answer:
          'Budget three to four hours for balayage on medium to long hair, including the toner and the finishing blow-dry. On very dark or previously coloured hair it can run longer, so we book it as an afternoon rather than squeezing it in.',
      },
      {
        question: 'Will keratin make my hair completely straight?',
        answer:
          'No, and that is deliberate. GK keratin is a smoothening treatment rather than a permanent straightening one. It removes frizz and makes hair far easier to blow-dry while keeping some natural body. If you want a genuinely poker-straight result, ask us about permanent straightening at the consultation.',
      },
      {
        question: 'Do you cut and colour men\u2019s hair?',
        answer:
          'Yes. Men\u2019s cutting, beard shaping, grey blending and colour are all part of the regular menu at our Kalyan Nagar salon.',
      },
    ],
  },
  {
    slug: 'skin',
    shortTitle: 'Skin',
    heading: 'Facials & Skin Treatments in Kalyan Nagar',
    metaTitle: 'Facials & Skin Care in Kalyan Nagar',
    metaDescription:
      'Facials, clean-ups, de-tan and advanced skin treatments tailored to Bengaluru\u2019s climate, at Adorn & Admire in HRBR Layout, Kalyan Nagar. Book on +91 96637 88314.',
    summary:
      'Facials, clean-ups, de-tan and brightening treatments chosen around your skin type rather than a fixed package.',
    icon: 'spa',
    audience: 'all',
    intro: [
      'Skin services at Adorn & Admire start with a look at your actual skin rather than an upsell. Bengaluru\u2019s mix of hard water, dust and year-round UV tends to produce a specific set of complaints: dullness, uneven tone across the cheeks and jaw, congestion around the nose, and tanning on the arms and neck that does not match the face.',
      'We work through those with facials and clean-ups matched to skin type, plus de-tan and brightening treatments where pigmentation is the main concern. If a course of treatments would serve you better than a one-off facial, we will say so.',
    ],
    sections: [
      {
        heading: 'Facials and clean-ups',
        body: [
          'A clean-up is the shorter option: cleanse, gentle exfoliation, steam, extraction where needed and a calming mask. It suits congested or acne-prone skin that does not want heavy massage. A full facial adds targeted serums and a longer massage phase, and is the better choice for dryness, dullness and early fine lines.',
          'We keep separate protocols for oily, dry, combination and sensitive skin. If you are using retinoids or have had any recent clinical treatment, tell us at booking so we can adjust or reschedule rather than aggravate the skin.',
        ],
      },
      {
        heading: 'De-tan and brightening',
        body: [
          'De-tan treatments address the mismatch between covered and exposed skin that most Bengaluru commuters develop, particularly on the forearms, neck and upper back. Brightening protocols work on overall dullness and uneven tone.',
          'Pigmentation responds to consistency rather than intensity. A monthly treatment paired with daily broad-spectrum sunscreen will outperform an aggressive single session every time, and it will not leave your skin barrier compromised.',
        ],
      },
      {
        heading: 'Waxing, threading and grooming',
        body: [
          'Threading, waxing and general grooming are available alongside skin services, and can be combined into a single appointment if you are short on time. Let us know when you book so we can allocate the slot properly.',
        ],
      },
    ],
    treatments: [
      {
        name: 'Clean-up',
        description: 'Cleanse, exfoliate, steam, extraction and a calming mask.',
        note: 'Priced on protocol',
      },
      {
        name: 'Facial',
        description: 'Full facial with skin-type-specific serums and an extended massage phase.',
        note: 'Priced on protocol',
      },
      {
        name: 'De-tan treatment',
        description: 'Evens out tanning on the face, neck, arms and back.',
        note: 'Priced by area',
      },
      {
        name: 'Brightening treatment',
        description: 'Targets dullness and uneven tone; best taken as a course.',
        note: 'Priced on protocol',
      },
      {
        name: 'Face massage',
        description: 'Relaxation and lymphatic-drainage focused massage, standalone or added to a facial.',
      },
      {
        name: 'Threading and waxing',
        description: 'Eyebrow and facial threading, and body waxing by area.',
        note: 'Priced by area',
      },
    ],
    faqs: [
      {
        question: 'How often should I get a facial?',
        answer:
          'Roughly once every four to six weeks suits most skin, which tracks the natural cell turnover cycle. Congested or acne-prone skin sometimes does better with a shorter clean-up every three weeks instead of a full facial.',
      },
      {
        question: 'Can I get a facial before an event?',
        answer:
          'Yes, but book it five to seven days ahead rather than the day before. Extractions and exfoliation can leave temporary redness, and you want that settled before photographs.',
      },
      {
        question: 'Do you offer skin services for men?',
        answer:
          'Yes. Men\u2019s facials, clean-ups, de-tan and grooming are all available at the Kalyan Nagar salon.',
      },
    ],
  },
  {
    slug: 'nails',
    shortTitle: 'Nails',
    heading: 'Nail Extensions & Nail Art in Kalyan Nagar',
    metaTitle: 'Nail Extensions in Kalyan Nagar',
    metaDescription:
      'Acrylic and gel nail extensions from \u20b9999, gel polish and custom nail art at Adorn & Admire, HRBR Layout, Kalyan Nagar. Book with our nail artist on +91 96637 88314.',
    summary:
      'Acrylic and gel extensions from \u20b9999, gel polish and hand-painted custom nail art.',
    icon: 'nails',
    audience: 'all',
    intro: [
      'Our nail work is the service clients most often name a specific artist for, and it is worth booking ahead for that reason. We cover acrylic and gel extensions, gel polish, and custom hand-painted nail art, along with the manicure and pedicure basics.',
      'Extensions start at \u20b9999 for both acrylic and gel, which makes this one of the better-value nail services in the Kalyan Nagar and HRBR Layout area for professionally applied work with proper prep and sealing.',
    ],
    sections: [
      {
        heading: 'Acrylic and gel extensions',
        body: [
          'Acrylic extensions are the harder-wearing option and hold up well if you type all day or work with your hands. Gel extensions are lighter and more flexible with a naturally glossier finish, and tend to suit shorter shapes and thinner natural nails.',
          'Both start with proper prep: cuticle work, surface dehydration and a bonding layer. Skipping that is why cheap extensions lift within a week. Expect two to three weeks before you need infills, depending on your nail growth.',
        ],
      },
      {
        heading: 'Gel polish and nail art',
        body: [
          'Gel nail paint gives a fortnight or more of chip-free colour on natural nails, cured under lamp and sealed at the free edge. It is the low-commitment option if you are not ready for extensions.',
          'Nail art is hand-painted rather than stickered: chrome and cat-eye finishes, French and micro-French, marble, ombr\u00e9, seasonal and bridal sets. Bring a reference image and our artist will tell you honestly whether it will work at your current nail length.',
        ],
      },
      {
        heading: 'Manicure and pedicure',
        body: [
          'Classic and spa manicures and pedicures are available on their own or before an extension set. If you want extensions and a pedicure in one visit, mention it at booking so we can hold a longer slot.',
        ],
      },
    ],
    portfolios: [
      {
        heading: 'Nail diary',
        intro: 'Hand-painted nail art, gel extensions and custom sets from our nail artist.',
        images: NAIL_DIARY_IMAGES,
        videos: NAIL_DIARY_VIDEOS,
      },
    ],
    treatments: [
      {
        name: 'Acrylic nail extensions',
        description: 'Hard-wearing extensions with full prep, shaping and sealing.',
        price: 999,
      },
      {
        name: 'Gel nail extensions',
        description: 'Lighter, more flexible extensions with a high-gloss finish.',
        price: 999,
        plusTax: true,
      },
      {
        name: 'Gel nail paint',
        description: 'Lamp-cured gel colour on natural nails, two weeks or more of wear.',
        price: 500,
        plusTax: true,
      },
      {
        name: 'Custom nail art',
        description: 'Hand-painted designs including chrome, cat-eye, French, marble and bridal sets.',
        note: 'Priced by design complexity',
      },
      {
        name: 'Manicure',
        description: 'Classic or spa manicure with cuticle work, shaping and massage.',
        note: 'Priced on protocol',
      },
      {
        name: 'Pedicure',
        description: 'Classic or spa pedicure with soak, exfoliation, cuticle work and massage.',
        note: 'Priced on protocol',
      },
    ],
    faqs: [
      {
        question: 'How long do nail extensions last?',
        answer:
          'Two to three weeks before infills are needed, and a full set can be maintained for a couple of months with regular infills. It depends mostly on your natural nail growth rate and how much manual work you do.',
      },
      {
        question: 'Will extensions damage my natural nails?',
        answer:
          'Not when they are applied and, importantly, removed correctly. The damage people describe almost always comes from prying extensions off at home. Come back to us for soak-off removal and your natural nails will be fine.',
      },
      {
        question: 'Should I book ahead for nail art?',
        answer:
          'Yes, particularly for detailed or bridal sets. Intricate art can take two hours or more, so booking ahead means we can allocate the artist and the time properly.',
      },
    ],
  },
  {
    slug: 'makeup',
    shortTitle: 'Makeup',
    heading: 'Party & Bridal Makeup in Kalyan Nagar',
    metaTitle: 'Bridal & Party Makeup, Kalyan Nagar',
    metaDescription:
      'Party, engagement and bridal makeup with hair styling at Adorn & Admire, HRBR Layout, Kalyan Nagar. Trials available. Book your slot on +91 96637 88314.',
    summary:
      'Party, engagement and bridal makeup with matching hair styling, shade-matched to your skin tone.',
    icon: 'makeup',
    audience: 'all',
    intro: [
      'Makeup at Adorn & Admire is built around the event, the lighting and your own colouring rather than a single house look. We cover party and occasion makeup, engagement and reception looks, and full bridal packages with hair styling included.',
      'Shade matching is where most makeup goes wrong on Indian skin tones, particularly the base and the undertone around the jaw and neck. We match in natural light and blend down past the jawline so nothing separates in photographs.',
    ],
    sections: [
      {
        heading: 'Party and occasion makeup',
        body: [
          'For dinners, birthdays and office events we work to a soft, photograph-friendly finish that lasts an evening without needing constant blotting. Tell us the outfit colour and whether the event is indoors or outdoors and we will adjust the base and the eye accordingly.',
          'Hair styling can be added to any makeup booking: blow-dry, tongs, or a set updo. Booking both together is usually quicker than two separate visits.',
        ],
      },
      {
        heading: 'Bridal and engagement makeup',
        body: [
          'Bridal bookings include a trial, which we strongly recommend rather than treating the wedding day as the first attempt. The trial is where we settle the base, the eye intensity, the lip and the hair, and where you can tell us what you do not like without any time pressure.',
          'We also handle engagement, mehendi, reception and family-member makeup. For a full wedding week, get in touch well ahead so we can block the dates: peak season fills up months in advance.',
        ],
      },
      {
        heading: 'What to bring',
        body: [
          'Bring your outfit or a clear photograph of it, your jewellery if it is available, and any reference images you like. If you have a foundation or lip colour you already know suits you, bring that too. Arrive with clean, moisturised, product-free skin.',
        ],
      },
    ],
    treatments: [
      {
        name: 'Party makeup',
        description: 'Occasion makeup with a photograph-friendly base and evening-long wear.',
        note: 'Priced on look',
      },
      {
        name: 'Engagement makeup',
        description: 'Full look with hair styling, shade-matched in natural light.',
        note: 'Priced on look',
      },
      {
        name: 'Bridal makeup package',
        description: 'Trial plus wedding-day makeup and hair styling, with draping on request.',
        note: 'Priced on package',
      },
      {
        name: 'Makeup with hair styling',
        description: 'Any makeup service combined with a blow-dry, tongs or a set updo.',
        note: 'Priced on look',
      },
      {
        name: 'Saree and dupatta draping',
        description: 'Professional draping, available alongside any makeup booking.',
      },
    ],
    faqs: [
      {
        question: 'Do you offer a bridal makeup trial?',
        answer:
          'Yes, and we recommend it for every bride. The trial settles the base, eye, lip and hair in advance so the wedding morning is execution rather than experimentation.',
      },
      {
        question: 'How far ahead should I book bridal makeup?',
        answer:
          'Two to three months for peak wedding season, and at least three to four weeks otherwise. If you need makeup for several family members on the same morning, book as early as you can so we can roster enough artists.',
      },
      {
        question: 'Can you come to my venue?',
        answer:
          'Talk to us at the time of booking. On-location bridal work is possible depending on the date, the location within Bengaluru and the size of the booking.',
      },
    ],
  },
  {
    slug: 'mens-grooming',
    shortTitle: "Men's Grooming",
    heading: "Men's Salon & Grooming in Kalyan Nagar",
    metaTitle: "Men's Salon in Kalyan Nagar",
    metaDescription:
      'Men\u2019s haircuts, beard shaping, grey blending, facials and de-tan at Adorn & Admire, HRBR Layout, Kalyan Nagar. Walk in or call +91 96637 88314.',
    summary:
      'Men\u2019s cutting, beard shaping, grey blending, colour, facials and de-tan, on the same professional product lines.',
    icon: 'beard',
    audience: 'men',
    intro: [
      'Adorn & Admire is a unisex salon, and men\u2019s services are a full part of the menu rather than an afterthought. Cutting, beard work, colour and grey blending, facials, de-tan and grooming are all available seven days a week on CMR Main Road in HRBR Layout.',
      'The same senior stylists and the same L\u2019Or\u00e9al Professionnel product lines are used across the salon, so a men\u2019s cut or colour gets the same consultation and the same professional-grade products as anything else we do.',
    ],
    sections: [
      {
        heading: "Men's haircuts and beard shaping",
        body: [
          'Cutting covers everything from a clean corporate taper to textured crops, scissor-over-comb work and fades. As with any cut, we look at your growth pattern and density first: a fade that sits well on straight hair behaves differently on coarse or wavy hair, and crown growth patterns dictate how short the top can go before it stops sitting down.',
          'Beard shaping is about matching the line to your jaw and neck rather than applying a template. We will shape, line up and trim, and tell you where the natural line falls so you can maintain it between visits.',
        ],
      },
      {
        heading: 'Grey blending and colour for men',
        body: [
          'Grey blending is the most requested colour service among our male clients, and the point of it is that it should not read as dyed hair. Rather than covering greys completely to a flat block colour, blending reduces them to a natural-looking scatter, which grows out without an obvious line.',
          'Full grey coverage, beard colour and more conventional colour changes are all available too. If you have never coloured your hair before, ask for a consultation first and we will talk through how often it will need redoing.',
        ],
      },
      {
        heading: 'Skin, de-tan and grooming',
        body: [
          'Men\u2019s facials, clean-ups and de-tan treatments address the same Bengaluru-specific complaints as our other skin work: dust congestion, dullness, and the tan line where a helmet or a shirt sleeve ends. Two-wheeler commuters in particular tend to see a marked difference from a regular de-tan.',
          'General grooming, including threading and waxing, can be combined into the same appointment. Mention it at booking so we can allocate a longer slot.',
        ],
      },
    ],
    treatments: [
      {
        name: "Men's haircut",
        description: 'Consultation, wash, cut and finish. Fades, tapers, crops and scissor work.',
        price: 850,
        plusTax: true,
        note: 'Advance haircut rate',
      },
      {
        name: 'Beard shaping and trim',
        description: 'Line-up, shaping to the jaw and neck, and a trim to your preferred length.',
        note: 'Priced on service',
      },
      {
        name: 'Grey blending',
        description: 'Reduces greys to a natural scatter with no hard regrowth line.',
        note: 'Priced on coverage',
      },
      {
        name: "Men's facial and clean-up",
        description: 'Cleanse, exfoliation, extraction and a mask, matched to your skin type.',
        note: 'Priced on protocol',
      },
      {
        name: 'De-tan treatment',
        description: 'Evens out tanning on the face, neck and arms. Popular with commuters.',
        note: 'Priced by area',
      },
      {
        name: 'Head massage',
        description: 'Relaxation-focused scalp and head massage, standalone or after a cut.',
      },
    ],
    faqs: [
      {
        question: 'Do I need an appointment for a men\u2019s haircut?',
        answer:
          'Walk-ins are welcome and we will fit you in where we can, but weekends and weekday evenings are our busiest periods. A quick call to +91 96637 88314 beforehand saves you waiting.',
      },
      {
        question: 'Will grey blending look obviously dyed?',
        answer:
          'That is exactly what it is designed to avoid. Blending softens greys rather than covering them to a flat block colour, so it reads as natural hair and grows out without a visible line.',
      },
      {
        question: 'Is this a separate men\u2019s salon?',
        answer:
          'No, Adorn & Admire is one unisex salon. Men\u2019s and women\u2019s services run from the same floor with the same stylists and the same professional product lines.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
