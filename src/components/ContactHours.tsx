import { FaStar } from 'react-icons/fa';

const ContactHours = () => {
  return (
    <section
      id="reviews"
      className="py-20 bg-slate-50"
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        {/* Section heading */}
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-pink-500 mb-3">
            Customer reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
            Discover what our clients say
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            Real stories from guests who trusted{' '}
            <span className="font-semibold text-slate-800">Adorn &amp; Admire</span>{' '}
            for their hair, beauty and spa services.
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex text-yellow-400 mb-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Rated <span className="font-semibold text-slate-900">4.9/5</span> by 2,700+ happy clients in Bangalore.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-sm font-semibold text-pink-700 mr-3">
                H
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Harini Penchalapadu
                </h3>
                <p className="text-[11px] text-slate-500">15 April 2024</p>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              &quot;Amazing nail extensions&quot;
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed flex-1">
              Really amazing service from Rahul. The finish on my nail extensions was
              flawless and the whole experience felt very relaxed. Totally recommend
              this place.
            </p>

            <div className="mt-4 flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700 mr-3">
                S
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Sandhya Reddy
                </h3>
                <p className="text-[11px] text-slate-500">15 April 2024</p>
              </div>
            </div>

            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              &quot;Perfect cut for my daughter&quot;
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed flex-1">
              Happy with the service. Lucy was friendly, patient, and made sure my
              daughter was comfortable throughout. The haircut turned out exactly as
              we wanted.
            </p>

            <div className="mt-4 flex text-yellow-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </article>
        </div>

        {/* More reviews link */}
        <p className="mt-10 text-center text-xs md:text-sm text-slate-500">
          Want to read more reviews? Check out our Google and Justdial pages for
          hundreds of detailed stories from real clients. [web:24][web:19]
        </p>
      </div>
    </section>
  );
};

export default ContactHours;
