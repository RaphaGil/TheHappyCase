'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { charmsBestSellers } from '../../../data/data';

// TEMP: hide main-page images for speed testing
const HIDE_HOME_IMAGES_FOR_TEST = true;

const CharmsBestSellers = () => {
  const [sectionRef] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="w-full mt-12 md:mt-16 mb-12 md:mb-16">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-light text-gray-900 font-inter tracking-title">
          BEST SELLING CHARMS
        </h2>
      
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 w-full max-w-5xl mx-auto px-2 sm:px-0">
        {charmsBestSellers.map((charm) => (
          <Link
            key={charm.src}
            href={charm.href}
            className="group flex flex-col items-center text-center"
            aria-label={`Shop ${charm.name} charm`}
          >
            <div className="relative w-full aspect-square max-w-[140px] mx-auto rounded-sm overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center p-3 md:p-4 group-hover:border-btn-primary-blue/30 transition-colors">
              {charm.badge && (
                <div className="absolute top-1 right-1 bg-btn-primary-blue text-white text-[10px] font-medium px-1.5 py-0.5 rounded z-10 font-inter">
                  {charm.badge}
                </div>
              )}
              {!HIDE_HOME_IMAGES_FOR_TEST && (
                <img
                  src={normalizeImagePath(charm.src)}
                  alt={charm.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width="120"
                  height="120"
                  fetchPriority="low"
                />
              )}
            </div>
            <p className="mt-2 text-gray-700 text-sm font-light font-inter line-clamp-2">
              {charm.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-4 py-6 mt-8 md:mt-10">
        <Link
          href="/charms/colorful"
          className="w-full sm:w-auto min-w-[180px] sm:min-w-0 inline-flex items-center justify-center px-5 py-3 text-sm font-light uppercase tracking-wider font-inter text-gray-500 bg-transparent border border-gray-300 hover:text-gray-700 hover:border-gray-400 transition-colors duration-200 rounded-sm"
          aria-label="Shop all charms"
        >
          Shop All Charms
        </Link>
        <Link
          href="/custom-passport"
          className="w-full sm:w-auto min-w-[180px] sm:min-w-0 inline-flex items-center justify-center px-5 py-3 text-sm font-light uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue hover:border-btn-primary-blue-hover transition-colors duration-200 rounded-sm"
          aria-label="Design your custom passport case"
        >
          Design Yours
        </Link>
      </div>
    </div>
  );
};

export default CharmsBestSellers;
