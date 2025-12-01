import React from 'react';
import PinHighlightRotator from './PinHighlightRotator';
import AnimatedTitle from '../../AnimatedTitle';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const HeroText = ({ pinHighlights }) => {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={sectionRef} className="text-center mb-16 md:mb-20">
      <h1 
        className="text-title font-light text-gray-900 mb-6 font-inter tracking-title"
      >
        {sectionVisible && (
          <>
            <AnimatedTitle delay={100}>
              Design Your
            </AnimatedTitle>
            <AnimatedTitle delay={300}>
              Unique Passport Case with
            </AnimatedTitle>
            <AnimatedTitle delay={500}>
              <PinHighlightRotator pinHighlights={pinHighlights} />
            </AnimatedTitle>
          </>
        )}
      </h1>
    </div>
  );
};

export default HeroText;

