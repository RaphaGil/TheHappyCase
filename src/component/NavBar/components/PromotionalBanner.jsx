import React, { useState, useEffect, useMemo } from 'react';
import { useCurrency } from '../../../context/CurrencyContext';
import SocialMediaIcons from './SocialMediaIcons';
import CurrencySelector from './CurrencySelector';

const PromotionalBanner = () => {
  const { formatPrice } = useCurrency();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Promotional banner messages - reactive to currency changes
  const bannerMessages = useMemo(() => [
    "🌍 SHIP TO EUROPE, USA, AND UK",
    // "🚚 FREE DELIVERY WHEN YOU SPEND " + formatPrice(50),
    "🔒 WEBSITE 100% SAFE",
    "❤️ MADE WITH LOVE ",
  ], [formatPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cycle through banner messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % bannerMessages.length
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [bannerMessages.length]);

  return (
    <div className="text-gray-700 text-center py-2 px-4 relative bg-yellow-100 border-b border-gray-100">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - empty for balance */}
        <div className="lg:w-20"></div>
        
        {/* Center - Banner message */}
        <div className="flex-1 flex items-center justify-center">
          <div 
            key={currentBannerIndex}
            className="text-xs font-light font-inter"
          >
            {bannerMessages[currentBannerIndex]}
          </div>
        </div>
        
        {/* Right side - Currency Selector and Social Media */}
        <div className="hidden md:flex items-center justify-end gap-2 md:gap-6">
          <SocialMediaIcons />
          <CurrencySelector variant="desktop" />
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;

