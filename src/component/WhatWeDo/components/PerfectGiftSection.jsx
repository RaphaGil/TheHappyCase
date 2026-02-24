'use client';

import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';

const PerfectGiftSection = ({ image }) => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const [customerCount, setCustomerCount] = useState(0);
  const normalizedImage = normalizeImagePath(image);
  
  const title = "The Perfect Gift for Every Moment";
  const description = "Created with love for all the travelers who carry their stories around the world.";

  // Animated counter for happy customers - starts when section is visible
  useEffect(() => {
    if (!sectionVisible) return;

    const targetCount = 39;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetCount / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const counterInterval = setInterval(() => {
      currentStep++;
      const newCount = Math.min(Math.floor(increment * currentStep), targetCount);
      setCustomerCount(newCount);
      
      if (newCount >= targetCount) {
        clearInterval(counterInterval);
        setCustomerCount(targetCount);
      }
    }, stepDuration);

    return () => clearInterval(counterInterval);
  }, [sectionVisible]);

  return (
    <div ref={sectionRef} className="w-full flex flex-col md:flex-row items-stretch">
      {/* Image - Full width on mobile, left side on larger screens */}
      <div className="relative w-full md:w-1/2 h-[400px] sm:h-[450px] md:h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden bg-gray-100">
        <img
          src={normalizedImage}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Perfect Gift"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          width="1200"
          height="800"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        {/* Mobile overlay with text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 md:hidden flex items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4 sm:space-y-5">
            <h2 className="text-subtitle-lg font-light text-white mb-4 sm:mb-5 font-inter tracking-title" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'}}>
              {title}
            </h2>
            <p className="text-lg text-white leading-relaxed font-light font-inter px-2 sm:px-4 mb-6" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'}}>
              {description}
            </p>
            
            {/* Happy Customers Counter and Etsy Reviews - Mobile */}
            {sectionVisible && (
              <div className="flex flex-col items-center gap-4 text-white mt-6" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-light font-inter">
                    {customerCount}+
                  </span>
                  <span className="text-sm font-light font-inter">
                    Happy Customers
                  </span>
                </div>
                <a 
                  href="https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm font-light font-inter">
                    Reviews on Etsy
                  </span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop text content */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 space-y-6 lg:space-y-8">
          <h2 className="text-subtitle-lg md:text-title font-light text-gray-900 mb-6 font-inter tracking-title">
            {title}
          </h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light font-inter">
            {description}
          </p>
          
          {/* Happy Customers Counter and Etsy Reviews - Desktop */}
          {sectionVisible && (
            <div className="flex flex-row items-center gap-6 pt-4 border-t border-gray-200 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-light font-inter text-gray-900">
                  {customerCount}+
                </span>
                <span className="text-base font-light font-inter text-gray-700">
                  Happy Customers
                </span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <a 
                href="https://www.etsy.com/shop/TheHappyCaseShop?ref=dashboard-header"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-gray-700 hover:text-gray-900"
              >
                <span className="text-base font-light font-inter">
                  Reviews on Etsy
                </span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerfectGiftSection;

