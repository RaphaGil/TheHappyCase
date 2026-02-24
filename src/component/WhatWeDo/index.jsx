import React from "react";
import { designIdeasImages } from '../../data/data';
import DesignIdeasGrid from './components/DesignIdeasGrid';
import CaseOptionsSection from './components/CaseOptionsSection';
import CharmsBestSellers from './components/CharmsBestSellers';
import QuoteSection from './components/QuoteSection';
import PerfectGiftSection from './components/PerfectGiftSection';
import ImageCarousel from './components/ImageCarousel';

const WhatWeDo = () => {
  // Exclude designidea4 from the grid, it will only be shown in PerfectGiftSection
  const gridImages = designIdeasImages.filter((_, index) => index !== 4);
  
  return (
    <section className="relative pt-8 md:pt-12 pb-20 md:pb-32 overflow-hidden bg-white ">
      <CharmsBestSellers />

      <QuoteSection />

      <DesignIdeasGrid images={gridImages} />

      <CaseOptionsSection />

      <PerfectGiftSection image={designIdeasImages[4]} />

      <div className="relative z-10 mt-12 md:mt-16">
        <ImageCarousel />
      </div>
    </section>
  );
};

export default WhatWeDo;
