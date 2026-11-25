import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CarouselNavigation = ({ onPrev, onNext }) => {
  return (
    <>
      <button 
        onClick={onPrev}
        className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[#30279f] shadow-md hover:bg-[#ffd93d] transition-all duration-200 group"
        aria-label="Previous reviews"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm transition-colors" />
      </button>
      
      <button 
        onClick={onNext}
        className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-8 z-20 w-11 h-11 items-center justify-center rounded-full bg-white text-[#30279f] shadow-md hover:bg-[#ffd93d] transition-all duration-200 group"
        aria-label="Next reviews"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-sm transition-colors" />
      </button>
    </>
  );
};

export default CarouselNavigation;

