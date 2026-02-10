import { useState, useRef } from 'react';
import vid1 from '../assets/vid1.mp4';
import vid2 from '../assets/vid2.mp4';
import vid3 from '../assets/vid3.mp4';

const videos = [
  {
    src: vid1,
    title: 'Signature Styling',
    description: 'Precision cuts & styling that define your look',
  },
  {
    src: vid2,
    title: 'Color Artistry',
    description: 'Vibrant color transformations by our experts',
  },
  {
    src: vid3,
    title: 'Luxury Treatments',
    description: 'Indulgent hair & skin care rituals',
  },
];

const Gallery = () => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    setActiveVideo(index);
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    setActiveVideo(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="py-20 bg-primary/[0.03]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="section-title">Our Gallery</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A glimpse into the artistry and transformations we create every day
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer aspect-[9/16] bg-primary/5"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Video */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.src}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  activeVideo === index
                    ? 'bg-gradient-to-t from-primary/80 via-primary/20 to-transparent'
                    : 'bg-gradient-to-t from-primary/60 via-transparent to-transparent'
                }`}
              />

              {/* Play Icon (shown when paused) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  activeVideo === index ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3
                  className={`text-white text-lg md:text-xl font-semibold mb-1 transition-transform duration-500 ${
                    activeVideo === index
                      ? 'translate-y-0'
                      : 'translate-y-1'
                  }`}
                >
                  {video.title}
                </h3>
                <p
                  className={`text-white/80 text-sm transition-all duration-500 ${
                    activeVideo === index
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
