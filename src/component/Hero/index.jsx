'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { normalizeImagePath } from '../../utils/imagePath';
// Defer slick carousel CSS - load asynchronously if needed
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css';

// Use normalizeImagePath utility for proper path resolution in both dev and production
const videoSrc = normalizeImagePath('/assets/videos/hero.webm');
// Lightweight poster image shown immediately while video loads
const posterSrc = normalizeImagePath('/images/Designideas/designidea.webp');

function Hero() {
  const videoRef = useRef(null);
  const router = useRouter();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const handleStartDesigning = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    router.push('/custom-passport-holder');
  };
  
  useEffect(() => {
    // Start fade-in after title animations complete
    // Last title delay (300ms) + animation duration (1200ms) + small buffer (200ms) = 1700ms
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);

  // Optimized video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loadTimeout;
    let isMounted = true;
    let hasLoaded = false;
    let hasError = false;

    // Set a timeout to prevent infinite loading
    loadTimeout = setTimeout(() => {
      if (isMounted && !hasLoaded && !hasError) {
        console.warn('Video loading timeout - continuing without video');
        hasError = true;
        setVideoError(true);
      }
    }, 5000); // 5 second timeout

    // Safari-specific: Set playback rate after video is loaded
    const setPlaybackRate = () => {
      if (video.readyState >= 2) {
        video.playbackRate = 0.5;
      }
    };
    
    // Try to play once - if it fails, browser autoplay policy is blocking it
    const playVideo = async () => {
      if (!isMounted) return;
      try {
        setPlaybackRate();
        await video.play();
        if (isMounted) {
          hasLoaded = true;
          setVideoLoaded(true);
        }
        clearTimeout(loadTimeout);
      } catch (error) {
        // Silently handle autoplay blocking - this is expected behavior
        if (isMounted) {
          hasLoaded = true;
          setVideoLoaded(true);
        }
        clearTimeout(loadTimeout);
      }
    };

    // Handle video loaded successfully
    const handleCanPlay = () => {
      if (!isMounted) return;
      hasLoaded = true;
      setVideoLoaded(true);
      clearTimeout(loadTimeout);
      playVideo();
    };

    // Handle video errors
    const handleError = () => {
      if (!isMounted) return;
      hasError = true;
      setVideoError(true);
      clearTimeout(loadTimeout);
    };

    // Safari: Wait for video to be ready before setting playback rate
    video.addEventListener('loadedmetadata', setPlaybackRate, { once: true });
    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('canplaythrough', handleCanPlay, { once: true });
    video.addEventListener('error', handleError, { once: true });
    
    // Start loading the video (lazy load)
    if (video.readyState === 0) {
      video.load();
    } else if (video.readyState >= 2) {
      handleCanPlay();
    }
    
    return () => {
      isMounted = false;
      clearTimeout(loadTimeout);
      video.removeEventListener('loadedmetadata', setPlaybackRate);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);



  return (
    <section className="w-full h-[80vh] md:h-[80vh] relative overflow-hidden">
      {/* Static background image instead of video (for performance testing) */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${posterSrc})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      {/* Text and Shop Now Button - Overlay on background */}
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
