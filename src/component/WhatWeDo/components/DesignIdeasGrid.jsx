'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';

const DesignIdeasGrid = ({ images }) => {
  const [visibleImages, setVisibleImages] = useState(new Set());
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  
  const imageTexts = ['Colorful Charms', 'Bronze Charms', 'Mixed Charms', 'Flags'];
  const imageLinks = ['/Charms/Colorful', '/Charms/Bronze', '/Charms/Colorful', '/Charms/flags'];

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
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-light text-gray-900 font-inter tracking-title">
          CHARMS AVAILABLE
        </h2>
        <p className="text-gray-600 text-sm md:text-base font-light font-inter mt-2 max-w-xl mx-auto">
          Colorful, Bronze, Mixed &amp; Flags — explore design ideas and find your style.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full px-0">
        {images.map((image, index) => {
          const isVisible = visibleImages.has(index);
          return (
            <div
              key={index}
              className={`group bg-white transition-all duration-700 ease-out  overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Link
                href={imageLinks[index] || '/Charms/Colorful'}
                className="block relative w-full aspect-square overflow-hidden sm:min-h-[300px] cursor-pointer"
                aria-label={`Go to ${imageTexts[index] || 'charms'} page`}
              >
                <img
                  src={normalizeImagePath(image)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={`Design Idea ${index + 1} - ${imageTexts[index] || ''}`}
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                  width="400"
                  height="400"
                />
              </Link>
              <div className="bg-white py-3 md:py-4">
                <p className="text-gray-900 text-center text-md md:text-base font-light leading-tight font-inter">
                  {imageTexts[index] || ''}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignIdeasGrid;

