import { Link } from 'react-router';

import { PRODUCTS } from '../data/products';
import ResponsiveImage from './ResponsiveImage';

/**
 * Retail ranges stocked in salon. Product images are shown when optimised
 * variants exist in /public/img; otherwise a brand placeholder is used.
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
              className="flex flex-col overflow-hidden rounded-sm border border-gray-light bg-background"
            >
              {product.image ? (
                <ResponsiveImage
                  name={product.image}
                  alt={`${product.brand} — ${product.name}`}
                  widths={[400, 800]}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  width={800}
                  height={600}
                  className="aspect-[4/3] w-full bg-white object-contain"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] items-center justify-center bg-primary/5 px-6 text-center"
                  aria-hidden="true"
                >
                  <span className="font-display text-2xl text-primary/40">{product.brand}</span>
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 text-xs uppercase tracking-widest text-accent">
                  {product.category}
                </p>
                <h3 className="mb-3 font-display text-xl text-primary">{product.name}</h3>
                <p className="prose-body text-base">{product.description}</p>
              </div>
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
