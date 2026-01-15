import React from 'react';
import PinHighlightRotator from './PinHighlightRotator';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const HeroText = ({ pinHighlights }) => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="text-center mb-16 md:mb-20">
      <h1 
        className="text-title font-light text-gray-900 mb-6 font-inter tracking-title"
      >
        Design Your Unique Passport Case with <PinHighlightRotator pinHighlights={pinHighlights} />
      </h1>
    </div>
  );
};

export default HeroText;

