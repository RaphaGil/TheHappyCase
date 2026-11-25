import React from "react";
import TrustBar from './components/TrustBar';
import ShopByCollection from './components/ShopByCollection';
import CharmsBestSellers from './components/CharmsBestSellers';
import EditorialBanners from './components/EditorialBanners';
import CaseOptionsSection from './components/CaseOptionsSection';
import Reviews from '../Review';
import ImageCarousel from './components/ImageCarousel';

// Homepage sections below the hero, in shop order:
// trust -> collections -> bestsellers -> editorial -> cases -> reviews -> customer designs
const WhatWeDo = () => (
  <div className="relative overflow-hidden bg-white">
    <TrustBar />
    <ShopByCollection />
    <CharmsBestSellers />
    <EditorialBanners />
    <CaseOptionsSection />
    <Reviews />
    <ImageCarousel />
  </div>
);

export default WhatWeDo;
