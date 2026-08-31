import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  Link,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';

import type { Route } from './+types/root';
import stylesheet from './index.css?url';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BUSINESS,
  GA4_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  SEARCH_CONSOLE_VERIFICATION,
} from './data/site';
import { hairSalonSchema, websiteSchema } from './lib/schema';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },

  /*
   * Both fonts are render-blocking for text that appears above the fold, so
   * they are preloaded rather than discovered after the CSS parses.
   */
  {
    rel: 'preload',
    href: '/fonts/lato-400.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const,
  },
  {
    rel: 'preload',
    href: '/fonts/cormorant-garamond-var.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const,
  },

  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

/** Fallback head for any route that does not export its own meta. */
export const meta: MetaFunction = () => [
  { title: `${BUSINESS.name} — ${BUSINESS.tagline}` },
  {
    name: 'description',
    content:
      'Hair, skin, nail and makeup salon in Kalyan Nagar, Bengaluru. Open all week, 10:30 AM to 9:00 PM.',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#362b25" />
        <meta name="author" content={BUSINESS.name} />
        {SEARCH_CONSOLE_VERIFICATION ? (
          <meta name="google-site-verification" content={SEARCH_CONSOLE_VERIFICATION} />
        ) : null}
        <Meta />
        <Links />

        {/*
          Site-wide entities live in the shell so they appear on every page and
          resolve to one business regardless of the entry point.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hairSalonSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />

        {/* Google tag: one loader, configured for both the GA4 property carried
            over from the previous domain and the existing Ads account. */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
gtag('config', '${GA4_MEASUREMENT_ID}');
            `.trim(),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-primary">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  const heading = is404 ? 'Page not found' : 'Something went wrong';
  const body = is404
    ? 'That page has moved or never existed. The links below cover everything on the site.'
    : 'An unexpected error occurred. Please try again, or call the salon directly.';

  return (
    <main id="main" className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {is404 ? 'Error 404' : 'Error'}
        </p>
        <h1 className="mb-4 font-display text-4xl text-primary md:text-5xl">{heading}</h1>
        <p className="prose-body mb-8">{body}</p>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <a href={`tel:${BUSINESS.phonePrimary}`} className="btn btn-outline">
            Call the salon
          </a>
        </div>

        <nav aria-label="Site pages">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-secondary">
            <li>
              <Link className="underline hover:text-accent" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/reviews">
                Reviews
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/about-us">
                About
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/products">
                Products
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="underline hover:text-accent" to="/contact-us">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
