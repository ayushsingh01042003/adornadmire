import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Offers = () => {
  const offers = [
    {
      image: 'https://ext.same-assets.com/3541422158/3358946107.jpeg',
      title: 'Combo Offer for Females',
      cta: 'BOOK NOW',
      url: '#',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/659592579.jpeg',
      title: 'Combo Offer for Males',
      cta: 'BOOK NOW',
      url: '#',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/380228453.jpeg',
      title: 'New Combo Offer',
      cta: 'BOOK NOW',
      url: '#',
    },
  ];

  const brands = [
    {
      image: 'https://ext.same-assets.com/3541422158/3158797294.png',
      name: "L'Oreal",
    },
    {
      image: 'https://ext.same-assets.com/3541422158/2955878310.png',
      name: "Lotus",
    },
    {
      image: 'https://ext.same-assets.com/3541422158/2313962894.png',
      name: "Schwarzkopf",
    },
    {
      image: 'https://ext.same-assets.com/3541422158/1646695698.png',
      name: "GK",
    },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-display text-white text-center mb-12">EXCLUSIVE OFFERS</h2>

        {/* Offers Carousel */}
        <div className="mb-16">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            centerMode={true}
            centerSlidePercentage={33.33}
            className="hidden md:block"
          >
            {offers.map((offer, index) => (
              <div key={index} className="px-2">
                <div className="relative overflow-hidden group">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 transition-all duration-300">
                    <h3 className="text-xl text-white font-bold mb-4">{offer.title}</h3>
                    <a
                      href={offer.url}
                      className="btn bg-accent text-white hover:bg-white hover:text-primary font-medium px-6 py-2"
                    >
                      {offer.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          {/* Mobile view for offers */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {offers.map((offer, index) => (
              <div key={index} className="relative overflow-hidden group">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                  <h3 className="text-xl text-white font-bold mb-4">{offer.title}</h3>
                  <a
                    href={offer.url}
                    className="btn bg-accent text-white hover:bg-white hover:text-primary font-medium px-6 py-2"
                  >
                    {offer.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={brand.image}
                alt={brand.name}
                className="h-16 md:h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
