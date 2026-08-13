import React from 'react';

const Experience = () => {
  return (
    <section
      className="py-16 bg-cover bg-center relative"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://ext.same-assets.com/3541422158/103857601.jpeg)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-display text-white mb-6">Experience Our Space</h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Embark on a journey of discovery and delight as you immerse yourself in the essence of our captivating space.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn bg-white text-primary hover:bg-accent hover:text-white font-medium px-8 py-3 rounded-sm text-center"
          >
            Adorn & Admire Salon
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn bg-white text-primary hover:bg-accent hover:text-white font-medium px-8 py-3 rounded-sm text-center"
          >
            Adorn & Admire Spa
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
