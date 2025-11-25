import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselNavigation = ({ onPrev, onNext }) => {
  return (
    <>
      <button 
        onClick={onPrev}
        className="hidden md:block absolute left-0 sm:left-2 md:left-8 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-8 lg:-translate-x-12 z-20 p-1.5 sm:p-2 md:p-3 transition-all duration-200"
        aria-label="Previous reviews"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-600/70 text-xs sm:text-sm" />
      </button>
      
      <button 
        onClick={onNext}
        className="hidden md:block absolute right-0 sm:right-2 md:right-8 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-8 lg:translate-x-12 z-20 b p-1.5 sm:p-2 md:p-3 transition-all duration-200"
        aria-label="Next reviews"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-600/70 text-xs sm:text-sm" />
      </button>
    </>
  );
};

export default CarouselNavigation;

