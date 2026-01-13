import { FaStar } from 'react-icons/fa';

import deepshikaImg from '../assets/deepshika.jpeg'

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Deepshikha Shukla',
      date: '2 weeks ago',
      rating: 5,
      text: 'Ajay has done amazing nail art! He is very patient & listens to all... Again thanks Ajay see you next time! 💖',
      service: 'Nail Art'
    },
    {
      id: 2,
      name: 'Aanchal Tomar',
      date: '15 Dec 2025',
      rating: 5,
      text: 'Amazing experience with Stylist Javed! I showed him a reference picture and he could recreate it. Would recommend him for hair.',
      service: 'Haircut'
    },
    {
      id: 3,
      name: 'Shruti',
      date: '1 week ago',
      rating: 5,
      text: 'Great service Furapa 💖',
      service: 'Hair Treatment'
    },
    {
      id: 4,
      name: 'Latha Vishwanath',
      date: '2 weeks ago',
      rating: 5,
      text: "JunAid did hair colouring and it was super! I'm using the service since 2 years it's really amazing service.",
      service: 'Hair Colour'
    },
    {
      id: 5,
      name: 'Arina Shijugurumayum',
      date: '1 week ago',
      rating: 5,
      text: 'Ajay thank you it\'s pretty 😍',
      service: 'Nail Art'
    },
    {
      id: 6,
      name: 'Priyambada Patro',
      date: '1 week ago',
      rating: 5,
      text: 'Beautiful balayage and global color! You, JunAid, for my balayage and global color gorgeous, and I couldn\'t be happier...',
      service: 'Balayage'
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-gradient-to-br from-pink-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-pink-500 to-rose-500 text-white uppercase mb-6">
            What Our Clients Say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent mb-6">
            Real Reviews from Happy Clients
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. See why 2,700+ clients in Bangalore love{' '}
            <span className="font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Adorn & Admire
            </span>
          </p>
          
          {/* Overall Rating */}
          <div className="mt-12 flex flex-col items-center">
            <div className="flex text-yellow-400 text-3xl mb-4">
              {[...Array(5)].map((_, i) => <FaStar key={i} className="ml-1" />)}
            </div>
            <p className="text-2xl font-bold text-slate-900">
              4.9/5 from 2,700+{' '}
              <span className="text-yellow-500">★</span> verified reviews
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <article 
              key={review.id}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden"
            >
              {/* Review Content */}
              <div className="p-8">
                {/* User Info */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg text-slate-900 leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-sm text-slate-500">{review.date}</p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 leading-relaxed text-base mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  "{review.text}"
                </p>

                {/* Stars */}
                <div className="flex text-yellow-400 text-lg mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="ml-1" />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
