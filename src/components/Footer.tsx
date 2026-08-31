import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

import { BUSINESS, formatPhone } from '../data/site';
import { SERVICES } from '../data/services';
import { PRIMARY_NAV } from '../data/urls';
import { reportCallConversion, trackEvent } from '../lib/analytics';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary pb-6 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* White wordmark: the source logo is black and was previously
                rendered near-invisible against this dark background. */}
            <img
              src="/img/logo-light-280.png"
              srcSet="/img/logo-light-280.png 280w, /img/logo-light-560.png 560w"
              sizes="160px"
              alt={`${BUSINESS.name} salon, Kalyan Nagar`}
              className="mb-4 h-auto w-[160px]"
              width={280}
              height={132}
              loading="lazy"
            />
            <p className="mb-6 text-gray-300">
              A L&rsquo;Or&eacute;al Professionnel partner salon in Kalyan Nagar, offering hair,
              skin, nail and makeup services since {BUSINESS.foundingYear}.
            </p>
            <div className="flex space-x-3">
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BUSINESS.name} on Facebook`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-accent hover:text-white"
              >
                <FaFacebookF aria-hidden="true" />
              </a>
              <a
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BUSINESS.name} on Instagram`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary transition-colors hover:bg-accent hover:text-white"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className="mb-6 font-display text-xl">
              Quick Links
            </h2>
            <ul className="space-y-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="transition-colors hover:text-accent">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="mb-6 font-display text-xl">
              Services
            </h2>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-6 font-display text-xl">Contact Us</h2>

            {/*
              Marked up as a postal address so assistive tech and parsers read
              it as one unit. Must stay byte-identical to the Google Business
              Profile: NAP consistency is a direct local ranking factor.
            */}
            <address className="space-y-4 not-italic">
              <div className="flex items-start">
                <FaMapMarkerAlt aria-hidden="true" className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('directions_click', { source: 'footer' })}
                  className="transition-colors hover:text-accent"
                >
                  {BUSINESS.street}, {BUSINESS.locality}, {BUSINESS.city} &ndash;{' '}
                  {BUSINESS.postalCode}
                </a>
              </div>

              <div className="flex items-start">
                <FaPhone aria-hidden="true" className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <a
                    href={`tel:${BUSINESS.phonePrimary}`}
                    onClick={() => reportCallConversion('footer-primary')}
                    className="block transition-colors hover:text-accent"
                  >
                    {formatPhone(BUSINESS.phonePrimary)}
                  </a>
                  <a
                    href={`tel:${BUSINESS.phoneSecondary}`}
                    onClick={() => reportCallConversion('footer-secondary')}
                    className="block transition-colors hover:text-accent"
                  >
                    {formatPhone(BUSINESS.phoneSecondary)}
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <FaEnvelope aria-hidden="true" className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="break-all transition-colors hover:text-accent"
                >
                  {BUSINESS.email}
                </a>
              </div>

              <div className="flex items-start">
                <FaClock aria-hidden="true" className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <p>
                  {BUSINESS.hoursDaysLabel}
                  <br />
                  {BUSINESS.hoursLabel}
                </p>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-300">
          <p>
            &copy; {year} {BUSINESS.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
