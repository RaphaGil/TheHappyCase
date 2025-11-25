import React from 'react';

const PerfectGiftSection = ({ image }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-stretch">
      {/* Text - Top on mobile, Right on desktop */}
      <div className="w-full md:w-1/2 flex items-center order-1 md:order-2">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h2 
              className="text-4xl font-light text-gray-900 mb-6" 
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", 
                letterSpacing: '0.05em'
              }}
            >
              The Perfect Gift for Every Moment
            </h2>
            <p 
              className="text-xl text-gray-700 leading-relaxed font-light" 
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              }}
            >
              Created with love for birthdays, weddings, and for all the travelers who carry their stories around the world.
            </p>
          </div>
        </div>
      </div>
      
      {/* Image - Bottom on mobile (full width), Left on desktop - Edge to Edge */}
      <div className="w-full md:w-1/2 order-2 md:order-1">
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center justify-center">
          <img
            src={image}
            className="w-full h-full object-contain"
            alt="Perfect Gift"
          />
        </div>
      </div>
    </div>
  );
};

export default PerfectGiftSection;

