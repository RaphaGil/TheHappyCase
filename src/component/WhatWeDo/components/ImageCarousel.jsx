'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { carouselImages } from '../../../data/data';
import SectionHeader from './SectionHeader';

const SLIDE_WIDTH = 300;
const DURATION = 50;

// TEMP: hide main-page images for speed testing
const HIDE_HOME_IMAGES_FOR_TEST = false;

const ImageCarousel = () => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate images for seamless infinite loop (2 full sets)
  const duplicatedImages = useMemo(
    () => [...carouselImages, ...carouselImages],
    []
  );

  const handlePersonalise = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push('/custom-passport');
  };

  return (
    <section ref={sectionRef} className="w-full overflow-hidden pt-14 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeader
          eyebrow="#TheHappyCase"
          title="Designed by you"
          subtitle="Every case is one of a kind. Here are a few of our favourites."
          align="center"
        />
      </div>
      <style>{`
        @keyframes whatwedo-carousel-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .whatwedo-carousel-track {
          animation: whatwedo-carousel-scroll ${DURATION}s linear infinite;
        }
        .whatwedo-carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative">
        {!HIDE_HOME_IMAGES_FOR_TEST && mounted && (
          <div
            className="whatwedo-carousel-track flex"
            style={{
              width: duplicatedImages.length * SLIDE_WIDTH,
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative flex-shrink-0 overflow-hidden bg-gray-100"
                style={{ width: SLIDE_WIDTH, height: 380 }}
              >
                <img
                  src={normalizeImagePath(src)}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="300"
                  height="380"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        )}
        {/* PERSONALISE overlay - fixed at bottom center of visible area */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={handlePersonalise}
              className="btn-happy font-inter"
            >
              Personalise
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
