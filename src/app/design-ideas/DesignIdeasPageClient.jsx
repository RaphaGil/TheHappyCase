'use client';

import React from 'react';
import Link from 'next/link';
import { normalizeImagePath } from '@/utils/imagePath';



const DesignIdeasPageClient = ({ designImages, caseImages }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Back link */}
    

      {/* Hero */}
      <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            DESIGN IDEAS
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter">
            Get inspired by our gallery of custom passport holders.{' '}
            <Link href="/custom-passport" className="text-btn-primary-blue hover:underline font-inter pr-1">
              Create 
            </Link> 
              your own unique design.
          </p>
     
        </div>
      </div>

      {/* Design inspiration images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        {/* <h2 className="text-xl md:text-2xl font-light text-gray-900 font-inter tracking-title text-center mb-6 md:mb-8">
          Design Inspiration
        </h2> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {designImages.map((image, index) => (
            <div
              key={`design-${index}`}
              className="group aspect-square overflow-hidden rounded-sm bg-gray-50"
            >
              <img
                src={normalizeImagePath(image)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={`Design idea ${index + 1}`}
                loading={index < 8 ? 'eager' : 'lazy'}
                decoding="async"
                width="400"
                height="400"
              />
            </div>
          ))}
        </div>
      </div>

   

      {/* Gift occasions - scannable, tappable */}
      <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-title text-gray-900 tracking-title mb-1 md:mb-2">
            THE PERFECT GIFT FOR
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto font-light px-4 font-inter mb-8">
            Weddings, honeymoons, and every milestone in-between—make it personal.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-5">
            {[
              'Weddings',
              'Anniversary',
              'Bride',
              'Friends',
              "Mother's Day",
              "Valentine's Day",
              'Birthday',
              'Graduation',
              'Honeymoon',
              'Travellers',
            ].map((occasion) => (
              <Link
                key={occasion}
                href="/custom-passport"
                className="inline-flex items-center px-4 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 text-sm font-medium font-inter shadow-sm hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-btn-primary-blue focus-visible:ring-offset-2 hover:bg-btn-primary-blue hover:text-white hover:border-btn-primary-blue transition-all duration-200 min-h-[44px] justify-center"
              >
                {occasion}
              </Link>
            ))}
          </div>
          <p className="text-gray-400 text-xs font-light font-inter">
            and more
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="py-12 md:py-16 px-4 text-center">
        <Link
          href="/custom-passport"
          className="inline-flex items-center justify-center px-8 py-3 text-sm uppercase tracking-wider shadow-lg font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-opacity duration-700 ease-out"
        >
          Start Designing
        </Link>
      </div>

      {/* Backlinks */}
    </div>
  );
};

export default DesignIdeasPageClient;
