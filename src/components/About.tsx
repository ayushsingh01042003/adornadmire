import React from 'react';

const About = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-3/5">
            <h2 className="section-title">About ADORN & ADMIRE</h2>
            <p className="text-gray-700 mb-6">
              At Adorn & Admire, we are dedicated to providing a pampering experience that will leave our clients feeling not only satisfied, but amazed. Our salon services range from hair styling to manicures, all designed to enhance your natural beauty and boost your self-confidence.
            </p>
            <p className="text-gray-700 mb-6">
              It is our goal to ensure every customer leaves feeling like their best self thanks to our team of skilled professionals. The key to success lies not only in the quality of our services, but also in the relationships we build with our clients.
            </p>
            <p className="text-gray-700 mb-6">
              Therefore, we place a high priority on personalized attention and a warm, welcoming atmosphere. Our goal at Adorn & Admire isn't just to make people look good; we are also dedicated to creating happiness.
            </p>
          </div>
          <div className="w-full md:w-2/5">
            <img
              src="https://ext.same-assets.com/3541422158/3358946107.jpeg"
              alt="About Adorn & Admire"
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
