import React from 'react';

const CarouselIndicators = ({ totalSlides, currentSlide, reviewsPerSlide, onSlideChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-8 sm:mt-10">
      {Array.from({ length: totalSlides }, (_, index) => {
        const isActive = Math.floor(currentSlide / reviewsPerSlide) === index;
        return (
          <button
            key={index}
            onClick={() => onSlideChange(index * reviewsPerSlide)}
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive
                ? 'bg-gray-900 w-8 shadow-sm' 
                : 'bg-gray-300 hover:bg-gray-400 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        );
      })}
    </div>
  );
};

export default CarouselIndicators;

