import { FaStar, FaQuoteLeft } from 'react-icons/fa';

import { BUSINESS, REVIEW_COUNT_LABEL } from '../data/site';
import { REVIEWS } from '../data/reviews';

/**
 * Visible client reviews.
 *
 * No Review or aggregateRating JSON-LD is emitted here. Reviews a business
 * publishes about itself are self-serving under Google's structured data
 * policy: they earn no star rich result and risk a manual action. Stars in
 * search come from the Google Business Profile.
 */
export default function Reviews({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;

  return (
    <section className="bg-white py-16" id="reviews" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            What our clients say
          </p>
          <Heading id="reviews-heading" className="section-title">
            Real Reviews from Happy Clients
          </Heading>
          <p className="section-subtitle mx-auto mt-3 max-w-2xl">
            Rated {BUSINESS.rating} out of 5 by {REVIEW_COUNT_LABEL} clients across Bengaluru.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm text-secondary">
            <span className="flex text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </span>
            {BUSINESS.rating}/5 average rating
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <li key={review.id}>
              <article className="flex h-full flex-col rounded-sm bg-background p-6 shadow-sm">
                <FaQuoteLeft aria-hidden="true" className="mb-3 text-2xl text-tertiary" />
                <p className="prose-body mb-5 flex-1 text-base">{review.text}</p>
                <footer>
                  <p className="flex text-accent" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <FaStar key={i} aria-hidden="true" />
                    ))}
                  </p>
                  <p className="mt-2 font-display text-lg text-primary">{review.name}</p>
                  <p className="text-sm text-gray">
                    {review.service} &middot; {review.date}
                  </p>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
