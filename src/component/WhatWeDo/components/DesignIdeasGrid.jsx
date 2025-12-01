import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const DesignIdeasGrid = ({ images }) => {
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  useEffect(() => {
    if (!sectionVisible) return;
    const timers = [];
    images.forEach((_, index) => {
      // Staggered animation delay for each image
      const delay = 500 + (index * 100); // Start at 500ms, add 100ms per image
      const timer = setTimeout(() => {
        setVisibleImages(prev => new Set([...prev, index]));
      }, delay);
      timers.push(timer);
    });
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [images, sectionVisible]);

  return (
    <div ref={sectionRef} className="w-full mb-12 md:mb-16">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full">
        {images.map((image, index) => {
          const isVisible = visibleImages.has(index);
          return (
            <div
              key={index}
              className={`group bg-white transition-all duration-700 ease-out hover:shadow-md overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={`Design Idea ${index + 1}`}
                  loading="lazy"
                  fetchPriority={index < 2 ? "high" : "low"}
                  decoding="async"
                  width="400"
                  height="400"
                />
                {/* Text Overlay - Currently commented out but kept for future use */}
                {/* <div className="absolute bottom-0 left-0 right-0 flex items-end font-thin">
                  <div className="bg-black/20 w-full py-1.5">
                    <p className="text-white text-center text-lg font-light leading-tight tracking-wide font-inter">
                      {imageTexts[index]}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignIdeasGrid;

