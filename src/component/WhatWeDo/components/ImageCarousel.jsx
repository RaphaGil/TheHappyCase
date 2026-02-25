'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { carouselImages } from '../../../data/data';

const SLIDE_WIDTH = 300;
const DURATION = 50;

const ImageCarousel = () => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const router = useRouter();

  // Duplicate images for seamless infinite loop (2 full sets)
  const duplicatedImages = useMemo(
    () => [...carouselImages, ...carouselImages],
    []
  );

  const handlePersonalise = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push('/custom-passport-holder');
  };

  return (
    <div ref={sectionRef} className="w-full overflow-hidden">
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
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
        {/* PERSONALISE overlay - fixed at bottom center of visible area */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <button
              onClick={handlePersonalise}
              className="px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg"
            >
              Personalise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
