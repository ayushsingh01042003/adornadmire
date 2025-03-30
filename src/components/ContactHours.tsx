import React from 'react';
import { FaClock, FaCalendarAlt } from 'react-icons/fa';

const ContactHours = () => {
  return (
    <section
      className="py-16"
      style={{
        backgroundImage: 'url(https://ext.same-assets.com/3541422158/2732551206.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Working Hours */}
          <div className="bg-white p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <FaClock className="text-2xl text-accent mr-3" />
              <h3 className="text-2xl font-display text-primary">Working Hours</h3>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Monday - Sunday</span>
                <span>10:30 AM - 9:00PM</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center mb-6">
                <FaCalendarAlt className="text-2xl text-accent mr-3" />
                <h3 className="text-2xl font-display text-primary">Appointments</h3>
              </div>
              <p className="mb-1">No, 420, 1st Floor VP Plaza, CMR Main Road,</p>
              <p className="mb-1">2nd Block HRBR Layout,</p>
              <p className="mb-4">Kalyan Nagar, Blore-560043</p>

              <a
                href="#"
                className="btn bg-primary text-white hover:bg-accent inline-block uppercase"
              >
                Book an appointment
              </a>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-display text-primary mb-4">Testimonial</h3>
            <h4 className="text-xl text-primary mb-6">What Our Clients Have to Say!</h4>

            <div className="border border-gray-200 rounded-md p-4 mb-4">
              <div className="flex items-center mb-4">
                <img
                  src="https://ext.same-assets.com/410181739/2338982516.png"
                  alt="Client"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h5 className="font-semibold">Harini Penchalapadu</h5>
                  <p className="text-xs text-gray-500">15 April 2024</p>
                </div>
              </div>
              <p className="text-gray-700">Really amazing service Rahul, would totally recommend nail extensions here.</p>
            </div>

            <div className="border border-gray-200 rounded-md p-4">
              <div className="flex items-center mb-4">
                <img
                  src="https://ext.same-assets.com/410181739/2158107166.png"
                  alt="Client"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h5 className="font-semibold">Sandhya Reddy</h5>
                  <p className="text-xs text-gray-500">15 April 2024</p>
                </div>
              </div>
              <p className="text-gray-700">Happy with the service and Ms. Lucy was friendly and ensured to give the best hair cut to my daughter.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHours;
