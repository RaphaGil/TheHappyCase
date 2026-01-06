import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTitle from '../AnimatedTitle';
// Defer slick carousel CSS - load asynchronously if needed
// import 'slick-carousel/slick/slick.css'; 
// import 'slick-carousel/slick/slick-theme.css';

// Get base URL from Vite config for proper path resolution in deployment
const baseUrl = import.meta.env.BASE_URL || '/';
const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
const videoSrc = `${cleanBaseUrl}/assets/videos/hero.mp4`;

function Hero() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [buttonVisible, setButtonVisible] = useState(false);
  
  const handleStartDesigning = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate('/CreateYours');
  };
  
  useEffect(() => {
    // Start fade-in after title animations complete
    // Last title delay (300ms) + animation duration (1200ms) + small buffer (200ms) = 1700ms
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 1700);
    return () => clearTimeout(timer);
  }, []);
  // Try to play video when component mounts (browser may block autoplay)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Safari-specific: Set playback rate after video is loaded
      const setPlaybackRate = () => {
        if (video.readyState >= 2) {
          video.playbackRate = 0.5;
        }
      };
      
      // Try to play once - if it fails, browser autoplay policy is blocking it
      // This is normal and expected in some browsers/situations
      const playVideo = async () => {
        try {
          // Safari: Set playback rate before playing
          setPlaybackRate();
          await video.play();
        } catch (error) {
          // Silently handle autoplay blocking - this is expected behavior
          // The video will still be visible, user can interact to play if needed
        }
      };
      
      // Safari: Wait for video to be ready before setting playback rate
      video.addEventListener('loadedmetadata', setPlaybackRate, { once: true });
      video.addEventListener('canplay', setPlaybackRate, { once: true });
      
      if (video.readyState >= 2) {
        playVideo();
      } else {
        // Safari: Use multiple events for better compatibility
        video.addEventListener('loadeddata', playVideo, { once: true });
        video.addEventListener('canplay', playVideo, { once: true });
        video.addEventListener('loadedmetadata', playVideo, { once: true });
        
        return () => {
          video.removeEventListener('loadeddata', playVideo);
          video.removeEventListener('canplay', playVideo);
          video.removeEventListener('loadedmetadata', playVideo);
          video.removeEventListener('loadedmetadata', setPlaybackRate);
          video.removeEventListener('canplay', setPlaybackRate);
        };
      }
    }
  }, []);



  return (
    <section className="w-full h-[80vh] md:h-[80vh] relative overflow-hidden">
      {/* Video Banner Background */}
      <div className="absolute inset-0 w-full h-full">
        
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('❌ Video error:', e);
            console.error('❌ Video src:', e.target.src);
            console.error('❌ Video error details:', e.target.error);
          }}
          onLoadStart={() => {
            // Safari: Ensure video starts loading
            const video = videoRef.current;
            if (video && video.readyState === 0) {
              video.load();
            }
          }}
          style={{ 
            zIndex: 1,
            minHeight: '100vh',
            minWidth: '100vw'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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
            <AnimatedTitle delay={100}>
              Custom Your Own 
            </AnimatedTitle>
          </h1>
          <h1 
            className="text-title sm:text-title-lg md:text-title-xl lg:text-title-xl font-light text-white mb-4 font-inter tracking-title"
            style={{textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}
          >
            <AnimatedTitle delay={300}>
              Passport Case
            </AnimatedTitle>
          </h1>
          <button 
            onClick={handleStartDesigning}
            className={`px-8 py-3 text-sm uppercase tracking-wider shadow-lg w-fit font-inter bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-btn-primary-blue-text border border-btn-primary-blue-border hover:border-btn-primary-blue-hover transition-opacity duration-700 ease-out ${
              buttonVisible 
                ? 'opacity-100' 
                : 'opacity-0'
            }`}
          >
            Shop Now
          </button>
        </div>
      </div>
    
    </section>
  );
}

export default Hero;
