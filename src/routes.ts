import { type RouteConfig, index, route } from '@react-router/dev/routes';

/**
 * URL structure deliberately mirrors the previous adornandadmire.com WordPress
 * site (/about-us, /services, /products, /gallery, /contact-us) so the 301
 * redirects in vercel.json land on equivalent pages and inherit their ranking
 * signals.
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
] satisfies RouteConfig;
