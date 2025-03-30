import React from 'react';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="mb-6">
              <img
                src="https://adornadmire.com/wp-content/uploads/2023/10/logo.png"
                alt="Adorn & Admire"
                className="h-16 mb-4"
              />
              <p className="mb-6 text-gray-300">
                Our commitment is to offer an indulgent experience that leaves our clients not just satisfied, but truly astonished.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/AdornAdmireSalonWellnessKalyanNagar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary hover:bg-accent hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/adornadmire.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary hover:bg-accent hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/about-us" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="/products" className="hover:text-accent transition-colors">Products</a></li>
              <li><a href="/gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="/contact-us" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">SERVICES</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-accent transition-colors">Hair Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Skin Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Nail Service</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl font-semibold mb-6">CONTACT US</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-accent mt-1 mr-3 flex-shrink-0" />
                <p>No, 420, 1st Floor VP Plaza, CMR Main Road, 2nd Block HRBR Layout, Kalyan Nagar, Bangalore-560043</p>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-accent mr-3 flex-shrink-0" />
                <div>
                  <a href="tel:+919663788314" className="hover:text-accent transition-colors block">+91 96637 88314</a>
                  <a href="tel:+919110423554" className="hover:text-accent transition-colors block">+91 91104 23554</a>
                </div>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-accent mr-3 flex-shrink-0" />
                <a href="mailto:adornadmire.kalyannagar@gmail.com" className="hover:text-accent transition-colors">
                  adornadmire.kalyannagar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-300 text-sm">
          <p>Copyright © All Rights Reserved</p>
          <p className="mt-2">
            Website Designed By <a href="https://www.zinavo.com/" className="text-accent hover:text-white" target="_blank" rel="noopener noreferrer">Zinavo</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
