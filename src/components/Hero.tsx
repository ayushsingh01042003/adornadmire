import React from 'react';

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://ext.same-assets.com/3541422158/4090627419.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="container mx-auto relative z-10 px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://ext.same-assets.com/3541422158/1928086689.png"
            alt="L'Oreal"
            className="w-48 mb-4"
          />

          <h1 className="text-5xl md:text-7xl text-white font-display uppercase mb-4">
            Adorn & Admire
          </h1>

          <h2 className="text-2xl md:text-3xl text-white font-light mb-8">
            Hair. Beauty. Spa
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href="tel:+919663788314"
              className="btn bg-white text-primary hover:bg-accent hover:text-white font-medium px-8 py-3 rounded-sm"
            >
              Call Now: +91 96637 88314
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
