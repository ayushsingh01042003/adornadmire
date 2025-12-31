import img from "../assets/about-img.jpeg";

const About = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="w-full md:w-3/5">
            <h2 className="section-title">About ADORN & ADMIRE</h2>
            <p className="mb-6 text-gray-700">
              Love Your Look. Own the Room. Welcome to Adorn & Admire, your go-to destination for
              head-turning transformations. We're obsessed with the details that make you unique.
              Whether you're looking for a bold new glow-up or a subtle refresh, our expert team
              blends modern techniques with timeless style. Adorn yourself with the best in hair and
              beauty. Admire the most confident version of you. Book your chair today!
            </p>
          </div>
          <div className="w-full md:w-2/5">
            <img
              src={img}
              alt="About Adorn & Admire"
              className="h-auto w-full rounded-md shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
