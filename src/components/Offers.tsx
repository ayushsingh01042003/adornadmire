import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import offerOnamFestiveGlow from '../assets/offer-onam-festive-glow.png'
import offerOnamPick5 from '../assets/offer-onam-pick5.png'
import offerRakshaBandhan from '../assets/offer-raksha-bandhan.png'
import offerRakshaBandhan2 from '../assets/offer-raksha-bandhan-2.png'

const Offers = () => {
  const offers = [
    { image: offerOnamFestiveGlow, alt: 'Happy Onam festive glow package' },
    { image: offerOnamPick5, alt: 'Happy Onam pick any 5 services offer' },
    { image: offerRakshaBandhan, alt: 'Happy Raksha Bandhan special offers' },
    { image: offerRakshaBandhan2, alt: 'Happy Raksha Bandhan brother and sister packages' },
  ];

  return (
    <section id="offers" className="py-16 bg-primary">
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
                <div className="flex h-[420px] items-center justify-center overflow-hidden rounded-sm bg-black/20">
                  <img
                    src={offer.image}
                    alt={offer.alt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            ))}
          </Carousel>

          {/* Mobile view for offers */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-black/20"
              >
                <img
                  src={offer.image}
                  alt={offer.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offers;
