'use client';

import React, { useEffect } from 'react';

const About = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-title md:text-title-lg font-light text-gray-900 mb-2 font-inter tracking-title">
            About Me
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
          
          {/* Image - Centered at top */}
          <div className="w-full max-w-xs mx-auto mb-12">
            <div className="aspect-square w-full rounded-full overflow-hidden">
              <img
                src="/images/raphaela.webp"
                alt="Raphaela"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Content with Icons */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 text-gray-700 leading-relaxed font-inter">
            
            {/* First Paragraph with Dream Icon */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-body md:text-body-lg font-light flex-1">
                As a dreamer, travel lover, and creative soul, I started making passport cases because I wanted something that could travel the world with me — in style and keeping my documents safe. I loved the idea of protecting my most important papers with designs that actually tell my story… and apparently everyone around me loved it too!
              </p>
            </div>
            
            {/* Second Paragraph with Gift Icon */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <p className="text-body md:text-body-lg font-light flex-1">
                What began as a little personal project quickly turned into birthday gifts for friends — and before I knew it, I had opened an Etsy shop.
              </p>
            </div>
            
            {/* Third Paragraph with Globe Icon */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-body md:text-body-lg font-light flex-1">
                And now here I am, dreaming of the day when people everywhere will carry these cases on their adventures. Nothing makes me happier than knowing I'm part of someone's journey, even in a small way.
              </p>
            </div>
            
            {/* Location & Skills with Icons */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-body md:text-body-lg font-light flex-1">
                I'm originally from Brazil and have been living in the UK for a few years now. A fun twist? I'm also a Frontend Developer — yep, I built this website myself!
              </p>
            </div>
            
            {/* Final Message with Heart Icon */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-base md:text-lg font-light">
                  I hope your experience here feels fun, smooth, and inspiring.
                </p>
                <p className="text-base md:text-lg font-light text-gray-900">
                  Happy travels, and may your passport collect many stories! 🌍✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
