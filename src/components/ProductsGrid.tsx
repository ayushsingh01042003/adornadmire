import { Link } from 'react-router';

import { PRODUCTS } from '../data/products';

/**
 * Retail ranges stocked in salon.
 *
 * Rendered as text rather than product photography: the original component
 * pulled six images from ext.same-assets.com, and every asset on that host now
 * returns 404. Named brands are the actual trust signal here anyway.
 */
export default function ProductsGrid({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const Heading = headingLevel;

  return (
    <section className="bg-white py-16" aria-labelledby="products-heading">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            What we use and sell
          </p>
          <Heading id="products-heading" className="section-title">
            Professional Products
          </Heading>
          <p className="section-subtitle mx-auto mt-3 max-w-2xl">
            We work with professional-grade ranges rather than retail product, and stock the same
            lines for you to take home.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <li
              key={product.name}
              className="flex flex-col rounded-sm border border-gray-light bg-background p-6"
            >
              <p className="mb-1 text-xs uppercase tracking-widest text-accent">
                {product.category}
              </p>
              <h3 className="mb-3 font-display text-xl text-primary">{product.name}</h3>
              <p className="prose-body text-base">{product.description}</p>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-gray">
          Ask your stylist for a recommendation, or{' '}
          <Link to="/contact-us" className="text-secondary underline hover:text-accent">
            call the salon
          </Link>{' '}
          to check stock.
        </p>
      </div>
    </section>
  );
}
