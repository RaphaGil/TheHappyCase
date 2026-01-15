import React from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ReviewHeader = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="text-center mb-12 md:mb-16">
      <h2 className="text-subtitle-lg md:text-title font-light text-gray-900 mb-3 font-inter tracking-title">
        What Our Customers Say
      </h2>
      <div className="w-20 h-px bg-gray-300 mx-auto mt-4"></div>
    </div>
  );
};

export default ReviewHeader;

