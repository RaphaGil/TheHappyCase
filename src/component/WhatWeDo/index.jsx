import React from "react";
import { pinHighlights, designIdeasImages } from '../../data/data';
import HeroText from './components/HeroText';
import DesignIdeasGrid from './components/DesignIdeasGrid';
import PerfectGiftSection from './components/PerfectGiftSection';

const WhatWeDo = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="container mx-auto relative z-10">
        <HeroText pinHighlights={pinHighlights} />
      </div>

      <DesignIdeasGrid images={designIdeasImages} />

      <PerfectGiftSection image={designIdeasImages[4]} />
    </section>
  );
};

export default WhatWeDo;
