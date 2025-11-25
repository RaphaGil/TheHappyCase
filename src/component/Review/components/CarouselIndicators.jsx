import React from 'react';

const CarouselIndicators = ({ totalSlides, currentSlide, reviewsPerSlide, onSlideChange }) => {
  return (
    <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
      {Array.from({ length: totalSlides }, (_, index) => {
        return (
          <button
            key={index}
            onClick={() => onSlideChange(index * reviewsPerSlide)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-200 ${
              Math.floor(currentSlide / reviewsPerSlide) === index 
                ? 'bg-gray-800 w-6 sm:w-8 shadow-sm' 
                : 'bg-gray-900/60 hover:bg-gray-800/80 w-1.5 sm:w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default CarouselIndicators;

