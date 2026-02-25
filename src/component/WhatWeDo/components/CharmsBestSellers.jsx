'use client';

import React from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';
import { charmsBestSellers } from '../../../data/data';

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
              <img
                src={normalizeImagePath(charm.src)}
                alt={charm.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="120"
                height="120"
              />
            </div>
            <p className="mt-2 text-gray-700 text-sm font-light font-inter line-clamp-2">
              {charm.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/Charms/Colorful"
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm uppercase tracking-wider font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
        >
          Shop All Charms
        </Link>
      </div>
    </div>
  );
};

export default CharmsBestSellers;
