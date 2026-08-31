/**
 * Blog posts. The slugs deliberately match the three article URLs that exist
 * on the previous adornandadmire.com WordPress site so the 301 redirects land
 * on equivalent content and inherit its ranking signals rather than being
 * folded into the blog index.
 */

export interface BlogSection { heading?: string; body: string[] }

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  /** ISO dates for the BlogPosting schema and the sitemap lastmod. */
  datePublished: string;
  dateModified: string;
  author: string;
  readingMinutes: number;
  /** Local asset path resolved at build time by the route module. */
  image: string;
  imageAlt: string;
  sections: BlogSection[];
  /** Slugs of services this post should link to, for internal linking. */
  relatedServices: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-are-the-benefits-of-hair-smoothening',
    title: 'What Are the Benefits of Hair Smoothening?',
    metaTitle: 'Hair Smoothening: Benefits & Aftercare',
    metaDescription:
      'What hair smoothening actually does, how long it lasts, what it costs in Bengaluru, and how it differs from keratin and straightening. From our Kalyan Nagar salon.',
    excerpt:
      'Smoothening is the most misunderstood service on our menu. Here is what it actually does to your hair, how it differs from keratin and straightening, and who it genuinely suits.',
    datePublished: '2024-06-30',
    dateModified: '2026-08-31',
    author: 'Adorn & Admire',
    readingMinutes: 6,
    image: 'blog-smoothening',
    imageAlt: 'Client with smooth, frizz-free hair after a smoothening treatment',
    relatedServices: ['hair'],
    sections: [
      {
        body: [
          'If you live in Bengaluru and have wavy or coarse hair, you have probably spent a monsoon morning watching a careful blow-dry turn to frizz within twenty minutes of stepping outside. Smoothening is the service most people eventually ask us about, and it is also the one that comes with the most confusion attached, because "smoothening", "keratin" and "straightening" get used as if they were the same thing.',
          'They are not. Understanding the difference is the single most useful thing you can do before booking, because it determines what your hair will look like for the next four months.',
        ],
      },
      {
        heading: 'Smoothening, keratin and straightening are three different things',
        body: [
          'Permanent straightening restructures the hair\u2019s internal bonds. The result is genuinely straight hair, and it is permanent on the lengths that were treated: as your hair grows, you get a visible line where treated and untreated hair meet. It is the most aggressive of the three.',
          'Smoothening is milder. It relaxes the wave and seals the cuticle so the hair lies flat and reflects light, but it does not eliminate all natural movement. You still have body; you just do not have frizz.',
          'Keratin treatments, including the GK keratin system we use, work differently again. Rather than breaking bonds, they deposit protein into the hair shaft and seal it under heat. The effect is smoother, glossier, more manageable hair that gradually washes out over three to five months with no harsh regrowth line. For most clients, this is the one that actually matches what they were picturing.',
        ],
      },
      {
        heading: 'The real benefits',
        body: [
          'The obvious benefit is frizz control, and in a humid climate that alone justifies it for many people. But the benefit our clients mention most often, once they have lived with it for a few weeks, is time. A blow-dry that used to take forty minutes takes fifteen. Some people stop blow-drying altogether and simply air-dry.',
          'That time saving has a secondary effect that is genuinely good for your hair: less heat styling. If a treatment means you use a straightener three times a month instead of five times a week, the net thermal damage to your hair goes down even accounting for the treatment itself.',
          'There is also a manageability benefit for anyone with thick, coarse or tangle-prone hair. Sealed cuticles mean less mechanical damage from combing, fewer split ends over time, and colour that stays glossier for longer.',
        ],
      },
      {
        heading: 'Who it suits, and who it does not',
        body: [
          'Smoothening and keratin work best on hair that is frizzy, wavy, coarse or simply difficult to style. If that describes you and your hair is in reasonable condition, you will likely be very happy with the result.',
          'It is a poor choice if your hair is already heavily damaged from repeated bleaching or previous chemical services. Adding another chemical process to compromised hair is how breakage happens. In those cases we will usually recommend a course of bond-building and conditioning treatments first, and revisit smoothening in a couple of months. That is a slower answer than most people want to hear, but it is the one that leaves you with hair.',
          'If you have fine, straight hair that is already flat, smoothening will not give you much and may make it look limp. And if you are pregnant, we would rather you wait.',
        ],
      },
      {
        heading: 'Aftercare determines how long it lasts',
        body: [
          'This is where results are won or lost. Do not wash your hair for the first 72 hours after the treatment, and do not tie it up tightly or clip it in a way that leaves a bend: the hair is still setting and a crease put in on day one can persist.',
          'Switch to a sulphate-free shampoo. Regular sulphates strip the treatment out considerably faster, and this single change is usually the difference between three months and five. Ask us at the appointment and we will point you at something suitable rather than leaving you to guess in a supermarket aisle.',
          'Wash less often than you think you need to, use a heat protectant when you do style, and avoid chlorinated pool water without rinsing afterwards. Salt water and chlorine both shorten the life of the treatment noticeably.',
        ],
      },
      {
        heading: 'What it costs and how long it takes',
        body: [
          'Our GK keratin treatment is \u20b94,999 for hair up to waist length. Longer or exceptionally dense hair may cost more simply because it takes more product and more time. Budget two and a half to four hours in the chair depending on your length and thickness.',
          'Be wary of prices that seem dramatically lower than the market. Keratin and smoothening are product-intensive services, and the way to make them cheap is to use less product, cut the processing time short, or use a formaldehyde-heavy formulation. All three show up in your hair within a month.',
        ],
      },
      {
        heading: 'Book a consultation first',
        body: [
          'We would genuinely rather talk to you before you commit. A ten-minute consultation tells us your hair\u2019s history, its current condition and what you are actually hoping for, and it tells you which of the three treatments is right, what it will cost at your length, and how long it will realistically last.',
          'Call us on +91 96637 88314 or drop into the salon on CMR Main Road in HRBR Layout 2nd Block, Kalyan Nagar. We are open every day from 10:30 AM to 9:00 PM.',
        ],
      },
    ],
  },
  {
    slug: 'transform-your-look-with-our-signature-haircut-services',
    title: 'Transform Your Look with Our Signature Haircut Services',
    metaTitle: 'How to Choose a Haircut That Suits You',
    metaDescription:
      'How to pick a haircut that suits your face shape, hair density and styling routine \u2014 and what to tell your stylist. From our Kalyan Nagar salon.',
    excerpt:
      'A good haircut is a fit problem, not a fashion problem. Here is how we work out what will suit you, and what to tell your stylist so you get it.',
    datePublished: '2024-06-30',
    dateModified: '2026-08-31',
    author: 'Adorn & Admire',
    readingMinutes: 6,
    image: 'blog-haircut',
    imageAlt: 'Stylist finishing a precision haircut at Adorn & Admire',
    relatedServices: ['hair', 'makeup'],
    sections: [
      {
        body: [
          'Almost everybody has had the haircut that looked wonderful in the salon and unrecognisable three days later. It is rarely because the cut was badly executed. It is because the cut did not fit: not the face, not the hair\u2019s natural behaviour, and not the amount of time the person was ever realistically going to spend on it.',
          'Getting that fit right is most of what a consultation is for. Here is how we approach it.',
        ],
      },
      {
        heading: 'Your hair\u2019s behaviour matters more than the reference photo',
        body: [
          'Bring reference images. They are genuinely useful, because they tell us the shape you are drawn to far better than words do. But understand what we are reading from them: the shape, the weight distribution and the length, not a promise of identical output.',
          'The person in the photograph has their own density, growth pattern and texture. If they have fine, straight hair and yours is thick and wavy, the same cut will behave completely differently on you. A good stylist will tell you which parts of that image are achievable on your hair and which are not, and then propose the closest thing that will actually work.',
          'We also look at your growth pattern, particularly your crown and hairline. A cowlick or a strong front growth pattern will fight certain fringes forever, and it is better to know that before the scissors than after.',
        ],
      },
      {
        heading: 'Face shape, briefly and without the mythology',
        body: [
          'Face shape guidance has been over-systematised into rules that do not survive contact with real people. The useful version is simple: cuts create the illusion of width where they add volume, and length where they remove it.',
          'So if your face is rounder, weight and volume at the sides will emphasise that, while length through the front and a softer, longer shape will lengthen. If your face is longer, a fringe or width at the cheekbone balances it. Strong jawlines are softened by movement around the jaw rather than a blunt line landing exactly on it.',
          'That is the whole principle. Everything else is a variation on it, and it is better applied by eye than by a chart.',
        ],
      },
      {
        heading: 'Be honest about your routine',
        body: [
          'This is the part clients most often get wrong, and it is the single biggest predictor of whether you will be happy in a fortnight.',
          'If you are not going to blow-dry your hair, say so. Some cuts genuinely require styling to hold their shape and will look shapeless air-dried. Others are cut specifically to fall well with no intervention. We can do either, but we need to know which one you need.',
          'The same goes for maintenance interval. A sharp, short shape needs trimming every four to six weeks to stay sharp. If you visit a salon twice a year, a cut that grows out gracefully will serve you far better, and we would rather give you that than watch a precise crop turn shapeless.',
          'Curly hair deserves a specific mention. It should generally be cut dry, curl by curl, because wet curly hair lengthens and springs back unpredictably. If you have curls, ask for a dry cut.',
        ],
      },
      {
        heading: 'What a consultation actually covers',
        body: [
          'When you sit down with one of our stylists, we will look at your hair dry before anything else, because that is the only way to see how it actually falls. We will ask what you liked and disliked about your last cut, which is usually more informative than asking what you want.',
          'We will talk about density, texture, growth pattern, how you part your hair, whether you tie it up during the day, and how much time you have in the morning. Then we will agree on a shape and, importantly, on the length we are taking off, in a way that is specific rather than "just a couple of inches".',
          'Then, before you leave, we will show you how to recreate the finish. If a cut needs a particular drying technique or a specific product to sit right, you should walk out knowing what it is.',
        ],
      },
      {
        heading: 'Book a cut in Kalyan Nagar',
        body: [
          'Our advance haircut is \u20b9850 plus tax and includes the consultation, wash, cut and a blow-dry finish. We cut for women and men, and we are happy to do dry cutting for curls.',
          'Call +91 96637 88314 to book, or visit us on CMR Main Road, HRBR Layout 2nd Block, Kalyan Nagar. Open every day, 10:30 AM to 9:00 PM.',
        ],
      },
    ],
  },
  {
    slug: 'what-are-the-benefits-of-regular-body-massage',
    title: 'What Are the Benefits of Regular Body Massage?',
    metaTitle: 'Benefits of Regular Body Massage',
    metaDescription:
      'What regular body massage does for desk-bound shoulders, sleep and stress, how often to go, and which style to pick. From our Kalyan Nagar salon in HRBR Layout.',
    excerpt:
      'Massage gets filed under indulgence, which undersells it. For anyone at a desk nine hours a day, regular bodywork is closer to maintenance than luxury.',
    datePublished: '2024-06-30',
    dateModified: '2026-08-31',
    author: 'Adorn & Admire',
    readingMinutes: 5,
    image: 'blog-massage',
    imageAlt: 'Relaxing body massage treatment room at Adorn & Admire',
    relatedServices: ['skin'],
    sections: [
      {
        body: [
          'Massage tends to get filed under indulgence, something you book on a birthday. That framing undersells it considerably. If you spend nine hours a day at a desk and a further hour in Outer Ring Road traffic, the stiffness across your shoulders and lower back is not a mood, it is an accumulated physical load, and regular bodywork is one of the more effective ways to keep on top of it.',
          'Here is what regular massage actually does, and how to think about frequency.',
        ],
      },
      {
        heading: 'It addresses the specific damage of desk work',
        body: [
          'Sitting for long stretches shortens the muscles at the front of the hips and chest while the upper back and shoulders hold a sustained low-level contraction. That is the origin of the tight band across the tops of the shoulders that most office workers in Bengaluru recognise immediately.',
          'Massage releases that held tension directly, and it also restores range of motion. Clients frequently notice after a session that they can turn their head further, or that a shoulder that had been quietly restricted for months moves freely again. Neither of those resolves the underlying cause, which is the sitting, but it stops the load compounding.',
        ],
      },
      {
        heading: 'Circulation, recovery and soreness',
        body: [
          'Manual pressure and stroking increase local blood flow, which means more oxygen and nutrients reaching the tissue and more efficient clearance of metabolic waste. That is why massage helps with the deep muscle soreness that follows an unusually hard workout or a long flight.',
          'If you have recently taken up running or lifting, regular massage is a reasonable part of a recovery routine, alongside sleep and adequate protein. It will not make you fitter, but it will reduce the number of days you are too sore to train.',
        ],
      },
      {
        heading: 'Stress and sleep',
        body: [
          'The effect on the nervous system is the benefit people underestimate. Sustained, rhythmic touch shifts the body toward parasympathetic dominance: heart rate drops, breathing slows and cortisol falls. It is the physiological opposite of a stress response.',
          'The practical consequence that clients report most often is sleep. Many people sleep unusually deeply on the night of a massage, and those who go regularly often describe a general improvement in how easily they fall asleep. Given how much else in modern life pushes the other way, that is not a small benefit.',
        ],
      },
      {
        heading: 'Skin, and why it pairs well with a facial',
        body: [
          'Massage oils and the mechanical action of the massage itself leave skin better conditioned, and the improved circulation shows in the face too. This is why a body massage and a facial work well as a single longer appointment: the relaxation carries across, and you deal with body and skin in one visit rather than two.',
          'Our face massage can be taken on its own or added to any facial, and focuses on lymphatic drainage around the jaw and under the eyes as well as pure relaxation.',
        ],
      },
      {
        heading: 'How often, and which style',
        body: [
          'Once a month is a sensible baseline for general wellbeing and is what most of our regular clients settle into. If you have a specific problem area, a stiff neck or a recurring lower back complaint, fortnightly for the first month or two will make faster progress before you drop back to monthly.',
          'On style: a Swedish-style massage uses long, flowing strokes and moderate pressure, and is the right default for relaxation and general tension. Deep tissue works slower and harder into specific knots and is what you want for a stubborn problem area, though you should expect to feel it the next day. Aromatherapy adds essential oils for a stronger relaxation effect. If you are not sure, tell the therapist what hurts and how much pressure you like, and let them choose.',
          'A word of caution: if you are pregnant, have a fever or an active infection, recent injury or surgery, uncontrolled blood pressure or a clotting condition, check with your doctor first and tell us at booking so we can adapt appropriately.',
        ],
      },
      {
        heading: 'Book a massage in Kalyan Nagar',
        body: [
          'Our massage and spa services are available every day from 10:30 AM to 9:00 PM at our salon on CMR Main Road, HRBR Layout 2nd Block, Kalyan Nagar. Call +91 96637 88314 to book, and mention if you want to combine a massage with a facial so we can hold a longer slot.',
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

/** Newest first, for the blog index. */
export const BLOG_POSTS_BY_DATE = [...BLOG_POSTS].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);
