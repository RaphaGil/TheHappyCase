import React from "react";
import { designIdeasImages } from '../../data/data';
import DesignIdeasGrid from './components/DesignIdeasGrid';
import PerfectGiftSection from './components/PerfectGiftSection';
import TwoBigImagesSection from './components/TwoBigImagesSection';

const WhatWeDo = () => {
  // Exclude designidea4 from the grid, it will only be shown in PerfectGiftSection
  const gridImages = designIdeasImages.filter((_, index) => index !== 4);
  
  return (
    <section className="relative pt-8 md:pt-12 pb-20 md:pb-32 overflow-hidden bg-white">
      <DesignIdeasGrid images={gridImages} />

      <PerfectGiftSection image={designIdeasImages[4]} />

      <div className="relative z-10 mt-12 md:mt-16">
        <TwoBigImagesSection 
          image1="/TheHappyCase/images/designideas/designidea5.png"
          image2="/TheHappyCase/images/designideas/designidea6.png"
        />
      </div>
    </section>
  );
};

export default WhatWeDo;
