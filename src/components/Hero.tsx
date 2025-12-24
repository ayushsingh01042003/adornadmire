import { FaStar } from 'react-icons/fa';
import background from '../assets/background-vid.mp4'
import posterImg from '../assets/background.jpeg'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black"
    >
      {/* Background image + overlay */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterImg}  // ← Fallback image
      >
      <source src={background} type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 lg:px-0 py-28 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-pink-300 mb-4">
              Hair • Skin • Beauty
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4">
              Best Salon in Kalyan Nagar
            </h1>

            <p className="text-lg md:text-xl text-slate-100/90 mb-6">
              Pamper yourself with expert hair, skin, and beauty services at{' '}
              <span className="font-semibold text-pink-200">
                Adorn &amp; Admire
              </span>
              , Kalyan Nagar&apos;s trusted salon for a luxurious, personalized
              experience.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-yellow-300" />
              </div>
              <span className="ml-2 text-sm text-slate-100">
                Rated <span className="font-semibold">4.9/5</span> by 1500+ happy
                customers
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="tel:+919663788314"
                className="inline-flex items-center justify-center rounded-full bg-black-600 px-8 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-pink-500/30 hover:bg-pink-700 transition-colors"
              >
                Book an Appointment Today
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3 text-sm md:text-base font-semibold text-white hover:bg-white hover:text-slate-900 transition-colors"
              >
                How It Works
              </a>
            </div>

            <p className="text-xs md:text-sm text-slate-200/80">
              Open daily • 10:30 AM – 9:00 PM • Kalyan Nagar, Bengaluru
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
