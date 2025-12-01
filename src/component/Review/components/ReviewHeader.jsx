import React from 'react';
import AnimatedTitle from '../../AnimatedTitle';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const ReviewHeader = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="text-center mb-16 md:mb-20">
      <h2 className="text-subtitle-lg font-light text-gray-900 mb-3 font-inter tracking-title">
        {sectionVisible && (
          <AnimatedTitle delay={100}>
            What Our Customers Say
          </AnimatedTitle>
        )}
      </h2>
    </div>
  );
};

export default ReviewHeader;

