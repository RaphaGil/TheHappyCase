import React from 'react';
import PinHighlightRotator from './PinHighlightRotator';

const HeroText = ({ pinHighlights }) => {
  return (
    <div className="text-center mb-16 md:mb-20">
      <h1 
        className="text-title font-light text-gray-900 mb-6 font-inter tracking-title"
      >
        <span className="block">Design Your</span>
        <span className="block">
          Unique Passport Case with
        </span>
        <PinHighlightRotator pinHighlights={pinHighlights} />
      </h1>
    </div>
  );
};

export default HeroText;

