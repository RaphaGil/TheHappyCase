import React from 'react';
import { Link } from 'react-router-dom';

const CharmsShowcase = () => {
  return (
    <div className="w-full py-12 md:py-16 bg-white">
      <div className="">
        {/* Two Big Images - Colorful and Bronze Charms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
        {/* Colorful Charms Image */}
        <div className="group bg-pink-100 transition-all duration-500 ease-out hover:shadow-lg overflow-hidden relative">
          <div className="relative w-full aspect-square overflow-hidden ">
            <img
              src="/TheHappyCase/images/economygreencolorful.png"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt="Colorful Charms"
              loading="lazy"
              decoding="async"
              width="1000"
              height="1000"
            />
      
            
            {/* Title and Button Overlay - At the bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center px-4 pb-6 md:pb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 tracking-title" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}>
                Colorful Charms
              </h2>
              <Link
                to="/ColorfulCharms"
                className="px-6 md:px-8 py-2.5 md:py-3 text-sm uppercase tracking-wider shadow-lg font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bronze Charms Image */}
        <div className="group  bg-green-100 transition-all duration-500 ease-out hover:shadow-lg overflow-hidden relative">
          <div className="relative w-full aspect-square overflow-hidden">
            <img
              src="/TheHappyCase/images/firstclassbrownbronze.png"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt="Bronze Charms"
              loading="lazy"
              decoding="async"
              width="1000"
              height="1000"
            />
            {/* Dark overlay for better text readability - gradient from bottom */}
            <div className="absolute inset-0  z-10"></div>
            
            {/* Title and Button Overlay - At the bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center px-4 pb-6 md:pb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-4 md:mb-6 tracking-title" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}>
                Bronze Charms
              </h2>
              <Link
                to="/BronzeCharms"
                className="px-6 md:px-8 py-2.5 md:py-3 text-sm uppercase tracking-wider shadow-lg font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CharmsShowcase;

