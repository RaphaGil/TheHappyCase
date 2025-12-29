import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselNavigation = ({ onPrev, onNext }) => {
  return (
    <>
      <button 
        onClick={onPrev}
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center hover:border-btn-primary-blue-hover transition-all duration-200 group"
        aria-label="Previous reviews"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-sm lg:text-base transition-colors" />
      </button>
      
      <button 
        onClick={onNext}
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-8 z-20 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center  border   transition-all duration-200 group"
        aria-label="Next reviews"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-sm lg:text-base transition-colors" />
      </button>
    </>
  );
};

export default CarouselNavigation;

