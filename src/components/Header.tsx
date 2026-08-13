import { useState, useEffect } from "react";
import { FaPhone, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.avif"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseTextColor = isScrolled ? "text-slate-900" : "text-white";
  const baseBg = isScrolled ? "bg-white shadow-md" : "bg-transparent";

  return (
    <header className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${baseBg}`}>
      <div className="mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-20 items-center justify-between md:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Adorn & Admire"
              className="h-12 md:h-14" // bigger logo
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#home"
              className={`${baseTextColor} text-sm font-semibold tracking-wide transition-colors hover:text-pink-500 md:text-base`}
            >
              Home
            </a>
            <a
              href="#offers"
              className={`${baseTextColor} text-sm font-semibold tracking-wide transition-colors hover:text-pink-500 md:text-base`}
            >
              Offers
            </a>
            <a
              href="#reviews"
              className={`${baseTextColor} text-sm font-semibold tracking-wide transition-colors hover:text-pink-500 md:text-base`}
            >
              Customer Reviews
            </a>
            <a
              href="#services"
              className={`${baseTextColor} text-sm font-semibold tracking-wide transition-colors hover:text-pink-500 md:text-base`}
            >
              Services
            </a>

            <a
              href="tel:+919663788314"
              className="ml-3 inline-flex items-center rounded-full bg-pink-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-pink-700 md:text-base"
            >
              <FaPhone className="mr-2" />
              Call Now!
            </a>

            <div className="ml-4 flex items-center gap-3 text-lg">{/* socials unchanged */}</div>
          </nav>

          {/* Mobile actions – slightly bigger button & icon */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+919663788314"
              className="inline-flex items-center rounded-full bg-pink-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors hover:bg-pink-700"
            >
              <FaPhone className="mr-1.5" />
              Call Now
            </a>
            <button
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className={`${baseTextColor} p-1`}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
