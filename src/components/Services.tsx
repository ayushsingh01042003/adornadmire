import React from 'react';
import { FaCut, FaSpa, FaHandSparkles, FaPaintBrush } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-sm p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl text-accent mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <FaCut />,
      title: 'Hair Service',
      description: 'Elevate your style with personalized hair services designed to enhance your beauty.',
    },
    {
      icon: <FaSpa />,
      title: 'Skin Service',
      description: 'Get top-notch skincare services, tailored specifically for women, with our expert offerings.',
    },
    {
      icon: <FaHandSparkles />,
      title: 'Nail Service',
      description: 'Get a manicure tailored exclusively for women when you indulge in our pampering nail service.',
    },
    {
      icon: <FaPaintBrush />,
      title: 'Makeup',
      description: 'Our expert makeup services specifically designed for women will enhance your natural beauty.',
    },
  ];

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Services</h2>
          <div className="flex justify-center gap-4 mb-6">
            <button className="btn btn-primary">Women</button>
            <button className="btn btn-outline">Men</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
