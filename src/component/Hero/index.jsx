'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { normalizeImagePath } from '../../utils/imagePath';
// Defer slick carousel CSS - load asynchronously if needed
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css';

// Use normalizeImagePath utility for proper path resolution in both dev and production
const videoMp4Src = normalizeImagePath('/assets/videos/hero.mp4');
const videoWebmSrc = normalizeImagePath('/assets/videos/hero.webm');
const heroFallbackImage = normalizeImagePath('/images/heroimage.png');
const heroImageWebP = normalizeImagePath('/images/heroimage.webp');

// TEMP: hide hero media for speed testing
const HIDE_HOME_IMAGES_FOR_TEST = false;

function Hero() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleStartDesigning = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push('/custom-passport');
  };
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Start fade-in after title animations complete
    // Last title delay (300ms) + animation duration (1200ms) + small buffer (200ms) = 1700ms
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full min-h-[50vh] h-[70vh] sm:h-[75vh] md:h-[80vh] max-h-[90vh] relative overflow-hidden">
      {/* Video / image background (temporarily hidden for speed testing) */}
      <div className="absolute inset-0 w-full h-full">
        {!HIDE_HOME_IMAGES_FOR_TEST && mounted && (
          <>
            {/* Static hero image on small screens; video only on md+ */}
            <picture className="md:hidden absolute inset-0 block w-full h-full">
              <source
                type="image/webp"
                srcSet={heroImageWebP}
                sizes="(max-width: 768px) 100vw"
              />
              <img
                src={heroFallbackImage}
                alt="Custom passport cases with charms from The Happy Case"
                className="w-full h-full object-cover object-center"
                width={1600}
                height={900}
                fetchPriority="high"
              />
            </picture>
            {/* Video on md and up; fallback image if video errors */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
              {!videoError ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="w-full h-full object-cover object-center"
                  onError={() => setVideoError(true)}
                >
                  <source src={videoMp4Src} type="video/mp4" />
                  <source src={videoWebmSrc} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <picture className="absolute inset-0 block w-full h-full">
                  <source type="image/webp" srcSet={heroImageWebP} sizes="100vw" />
                  <img
                    src={heroFallbackImage}
                    alt="Custom passport cases with charms from The Happy Case"
                    className="w-full h-full object-cover object-center"
                    width={1600}
                    height={900}
                  />
                </picture>
              )}
            </div>
          </>
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Text and Shop Now Button - Overlay on Video */}
      <div className="relative z-20 h-full flex items-end justify-center lg:justify-start">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left px-4 mb-10 lg:px-10 lg:ml-10">
          <h1 
            className="text-title sm:text-title-lg md:text-title-xl lg:text-title-xl font-light text-white font-inter tracking-title"
            style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}
          >
            Create Your Own Custom
          </h1>
          <h1 
            className="text-title sm:text-title-lg md:text-title-xl lg:text-title-xl font-light text-white mb-4 font-inter tracking-title"
            style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}
          >
            Passport Case
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={handleStartDesigning}
              className={`px-8 py-3 text-sm uppercase tracking-wider shadow-lg w-fit font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-opacity duration-700 ease-out ${
                buttonVisible 
                  ? 'opacity-100' 
                  : 'opacity-0'
              }`}
            >
              CREATE NOW
            </button>
           
          </div>
          <p className="mt-4 text-sm text-white/90 font-light font-inter max-w-lg" style={{textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)'}}>
            We only sell to the UK. To purchase from other countries, visit our{' '}
            <a
              href="https://www.etsy.com/shop/TheHappyCaseShop"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Etsy shop
            </a>
            .
          </p>
        </div>
      </div>
    
    </section>
  );
}

export default Hero;
