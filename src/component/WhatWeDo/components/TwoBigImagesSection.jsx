'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';

const TwoBigImagesSection = ({ image1, image2 }) => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });
  const router = useRouter();
  const normalizedImage1 = normalizeImagePath(image1);
  const normalizedImage2 = normalizeImagePath(image2);

  return (
    <div ref={sectionRef} className="w-full">
      <div className="grid grid-cols-2 gap-2 md:gap-4">
        {/* First Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100">
          <img
            src={normalizedImage1}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Design idea"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="1200"
            height="800"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Personalise Button Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                router.push('/custom-passport-holder');
              }}
              className="px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg"
            >
              PERSONALISE
            </button>
          </div>
        </div>

        {/* Second Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-100">
          <img
            src={normalizedImage2}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Design idea"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="1200"
            height="800"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          
          {/* Personalise Button Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-10 pb-6 md:pb-8">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                router.push('/custom-passport-holder');
              }}
              className="px-8 py-3 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200 shadow-lg"
            >
              PERSONALISE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoBigImagesSection;

