import React from 'react';
import AnimatedTitle from '../../AnimatedTitle';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { normalizeImagePath } from '../../../utils/imagePath';

const PerfectGiftSection = ({ image }) => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });
  const normalizedImage = normalizeImagePath(image);
  
  const title = "The Perfect Gift for Every Moment";
  const description = "Created with love for all the travelers who carry their stories around the world.";

  return (
    <div ref={sectionRef} className="w-full flex flex-col md:flex-row items-stretch">
      {/* Image - Full width on mobile, left side on larger screens */}
      <div 
        className="relative w-full md:w-1/2 h-[400px] sm:h-[450px] md:h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden bg-gray-100"
        style={{
          backgroundImage: `url(${normalizedImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={normalizedImage}
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
          alt="Perfect Gift"
          loading="lazy"
          aria-hidden="true"
        />
        
        {/* Mobile overlay with text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 md:hidden flex items-center justify-center z-10">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center space-y-4 sm:space-y-5">
            <h2 className="text-subtitle-lg font-light text-white mb-4 sm:mb-5 font-inter tracking-title" style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'}}>
              {sectionVisible && <AnimatedTitle delay={100}>{title}</AnimatedTitle>}
            </h2>
            <p className="text-lg text-white leading-relaxed font-light font-inter px-2 sm:px-4" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'}}>
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop text content */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 space-y-6 lg:space-y-8">
          <h2 className="text-subtitle-lg md:text-title font-light text-gray-900 mb-6 font-inter tracking-title">
            {sectionVisible && <AnimatedTitle delay={100}>{title}</AnimatedTitle>}
          </h2>
          <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light font-inter">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfectGiftSection;

