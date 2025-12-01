import React from 'react';
import AnimatedTitle from '../../AnimatedTitle';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const PerfectGiftSection = ({ image }) => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="w-full flex flex-col md:flex-row items-stretch">
      {/* Image - Full width on mobile, left side on larger screens */}
      <div 
        className="relative w-full md:w-1/2 h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[650px] overflow-hidden bg-gray-100 flex items-start"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
          backgroundPosition: '',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Fallback img for SEO and accessibility */}
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          alt="Perfect Gift"
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          width="1200"
          height="800"
          aria-hidden="true"
        />
        
        {/* Gradient overlay - only visible on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 md:hidden"></div>
        
        {/* Text overlay - only visible on mobile */}
        <div className="absolute inset-0 flex items-center justify-center z-10 md:hidden">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="text-center space-y-4 sm:space-y-5">
              <h2 
                className="text-xl sm:text-2xl font-light text-white mb-4 sm:mb-5 font-inter tracking-title"
            
              >
                {sectionVisible && (
                  <AnimatedTitle delay={100}>
                    The Perfect Gift for Every Moment
                  </AnimatedTitle>
                )}
              </h2>
              <p 
                className="text-sm sm:text-base text-white leading-relaxed font-light font-inter px-2 sm:px-4"
            
              >
                Created with love for birthdays, weddings, and for all the travelers who carry their stories around the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Text content - Hidden on mobile, right side on larger screens */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16">
          <div className="space-y-6 lg:space-y-8">
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-6 font-inter tracking-title"
            >
              {sectionVisible && (
                <AnimatedTitle delay={100}>
                  The Perfect Gift for Every Moment
                </AnimatedTitle>
              )}
            </h2>
            <p 
              className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light font-inter"
            >
              Created with love for birthdays, weddings, and for all the travelers who carry their stories around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfectGiftSection;

