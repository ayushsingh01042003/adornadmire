import { useState, useEffect } from 'react';
import { FaPhone, FaFacebookF, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Top bar with phone and social icons */}
        <div className="flex items-center justify-between w-full md:w-auto px-4 md:px-0">
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary p-2"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <img
                src="https://adornadmire.com/wp-content/uploads/2023/10/logo.png"
                alt="Adorn & Admire"
                className="h-12 md:h-16"
              />
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <a href="tel:+919663788314" className="text-primary flex items-center ml-4">
              <FaPhone className="mr-2" />
              <span className="hidden sm:inline">+91 9663788314</span>
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-primary hover:text-accent transition-colors font-medium">Home</a>
          <a href="/about-us" className="text-primary hover:text-accent transition-colors font-medium">About Us</a>
          <a href="/services" className="text-primary hover:text-accent transition-colors font-medium">Services</a>
          <a href="/products" className="text-primary hover:text-accent transition-colors font-medium">Products</a>
          <a href="/gallery" className="text-primary hover:text-accent transition-colors font-medium">Gallery</a>
          <a href="/contact-us" className="text-primary hover:text-accent transition-colors font-medium">Contact Us</a>
        </nav>

        {/* Phone and social icons for desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="tel:+919663788314" className="text-primary flex items-center">
            <FaPhone className="mr-2" />
            <span>+91 9663788314</span>
          </a>
          <div className="flex items-center space-x-2 ml-4">
            <a
              href="https://www.facebook.com/AdornAdmireSalonWellnessKalyanNagar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors p-1"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/adornadmire.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors p-1"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="flex flex-col py-4 px-6">
          <a href="/" className="py-2 text-primary hover:text-accent transition-colors">Home</a>
          <a href="/about-us" className="py-2 text-primary hover:text-accent transition-colors">About Us</a>
          <a href="/services" className="py-2 text-primary hover:text-accent transition-colors">Services</a>
          <a href="/products" className="py-2 text-primary hover:text-accent transition-colors">Products</a>
          <a href="/gallery" className="py-2 text-primary hover:text-accent transition-colors">Gallery</a>
          <a href="/contact-us" className="py-2 text-primary hover:text-accent transition-colors">Contact Us</a>

          <div className="flex items-center space-x-2 mt-4">
            <a
              href="https://www.facebook.com/AdornAdmireSalonWellnessKalyanNagar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors p-1"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/adornadmire.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors p-1"
            >
              <FaInstagram />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
