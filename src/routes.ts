import { type RouteConfig, index, route } from '@react-router/dev/routes';

/**
 * URL structure deliberately mirrors the previous adornandadmire.com WordPress
 * site (/about-us, /services, /products, /gallery, /contact-us and the three
 * root-level article slugs) so the 301 redirects in vercel.json land on
 * equivalent pages and inherit their ranking signals.
 *
 * The bare `:postSlug` route sits last: React Router ranks static segments
 * above dynamic ones, so it only ever matches single-segment paths that no
 * static route claimed.
 */
export default [
  index('routes/home.tsx'),

  route('services', 'routes/services.tsx'),
  route('services/:slug', 'routes/service-detail.tsx'),

  route('gallery', 'routes/gallery.tsx'),
  route('products', 'routes/products.tsx'),
  route('reviews', 'routes/reviews.tsx'),
  route('about-us', 'routes/about.tsx'),
  route('contact-us', 'routes/contact.tsx'),

  route('blog', 'routes/blog.tsx'),

  // Legacy root-level article URLs, e.g. /what-are-the-benefits-of-hair-smoothening
  route(':postSlug', 'routes/blog-post.tsx'),
] satisfies RouteConfig;
