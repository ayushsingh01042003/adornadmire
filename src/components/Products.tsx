import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Products = () => {
  const products = [
    {
      image: 'https://ext.same-assets.com/3541422158/3696146494.png',
      name: 'Hair Care Set',
      category: 'Hair Care',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/1110654923.png',
      name: 'Skin Care Collection',
      category: 'Skin Care',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/1778675704.png',
      name: 'Kerastase Hair Treatment',
      category: 'Hair Care',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/1613643722.png',
      name: 'L\'Oreal Professional',
      category: 'Hair Care',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/2553227044.png',
      name: 'Matrix Hair Products',
      category: 'Hair Care',
    },
    {
      image: 'https://ext.same-assets.com/3541422158/3384317079.png',
      name: 'Color Treatment',
      category: 'Hair Color',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Our Products</h2>

        {/* Desktop Product Display */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4 h-48 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
            </div>
          ))}
        </div>

        {/* Mobile Product Carousel */}
        <div className="md:hidden">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-sm mx-4 mb-8"
              >
                <div className="mb-4 h-48 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Products;
