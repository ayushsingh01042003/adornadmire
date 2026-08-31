import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

import { BUSINESS, formatPhone } from '../data/site';
import { PRIMARY_NAV } from '../data/urls';
import { reportCallConversion } from '../lib/analytics';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on navigation, otherwise it stays open over the new page.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent the page behind the open menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const solid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-background shadow-md' : 'bg-black/25'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" aria-label={`${BUSINESS.name} home`} className="flex-shrink-0">
          {/* The wordmark is black, so it needs the white variant while the
              header is transparent over the dark hero. */}
          <img
            src={solid ? '/img/logo-dark-280.png' : '/img/logo-light-280.png'}
            alt={`${BUSINESS.name} salon, Kalyan Nagar`}
            className="h-auto w-[130px] md:w-[150px]"
            width={280}
            height={132}
            loading="eager"
            fetchpriority="high"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'text-accent'
                    : solid
                      ? 'text-primary hover:text-accent'
                      : 'text-white hover:text-accent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phonePrimary}`}
            onClick={() => reportCallConversion('header')}
            className="btn btn-accent hidden py-2 sm:inline-flex"
          >
            <FaPhone aria-hidden="true" className="mr-2" />
            {formatPhone(BUSINESS.phonePrimary)}
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className={`p-2 text-2xl lg:hidden ${solid ? 'text-primary' : 'text-white'}`}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/*
        The previous build toggled this state but never rendered a panel, so
        mobile navigation was entirely unreachable.
      */}
      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-gray-light bg-background lg:hidden">
          <nav aria-label="Mobile navigation" className="container mx-auto px-4 py-4">
            <ul className="flex flex-col divide-y divide-gray-light">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 text-base font-medium uppercase tracking-wide ${
                        isActive ? 'text-accent' : 'text-primary'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/products" className="block py-3 text-base font-medium uppercase text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block py-3 text-base font-medium uppercase text-primary">
                  Blog
                </Link>
              </li>
            </ul>

            <a
              href={`tel:${BUSINESS.phonePrimary}`}
              onClick={() => reportCallConversion('mobile-menu')}
              className="btn btn-primary mt-4 w-full"
            >
              <FaPhone aria-hidden="true" className="mr-2" />
              Call {formatPhone(BUSINESS.phonePrimary)}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
