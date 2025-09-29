import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { hero } from '../../data/landing';
import videoSrc from '../../assets/videos/hero.mp4';

function Hero() {
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setVideoError(true);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleStartDesigning = () => {
    navigate('/CreateYours');
  };

  // Force video to play when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          // Set playback rate to 0.5 (half speed) for slow motion effect
          video.playbackRate = 0.5;
          await video.play();
          console.log('🎥 Video started playing automatically at 0.5x speed');
        } catch (error) {
          console.error('❌ Autoplay failed:', error);
          // Try again after a short delay
          setTimeout(() => {
            video.play().catch(e => console.error('❌ Second autoplay attempt failed:', e));
          }, 1000);
        }
      };
      
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo);
        return () => video.removeEventListener('loadeddata', playVideo);
      }
    }
  }, []);

  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Video Banner Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 via-cyan-400 to-yellow-300">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onLoadStart={() => console.log('🎥 Video loading started')}
          onCanPlay={() => {
            console.log('🎥 Video can play');
            // Try to play immediately when ready
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log('Play failed on canplay:', e));
            }
          }}
          onError={(e) => {
            console.error('❌ Video error:', e);
            console.error('❌ Video src:', e.target.src);
            handleVideoError(e);
          }}
          onLoadedData={() => {
            console.log('🎥 Video data loaded successfully');
            // Try to play when data is loaded
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log('Play failed on loadeddata:', e));
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
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Blue & Yellow Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-yellow-400"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueYellowGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="#ffffff" opacity="0.4"/>
              <circle cx="15" cy="15" r="1" fill="#3B82F6" opacity="0.3"/>
              <circle cx="45" cy="15" r="1" fill="#FDE047" opacity="0.3"/>
              <circle cx="15" cy="45" r="1" fill="#FDE047" opacity="0.3"/>
              <circle cx="45" cy="45" r="1" fill="#3B82F6" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueYellowGrid)" />
        </svg>
      </div>

      {/* Blue & Yellow Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-yellow-400 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-400 to-cyan-500 animate-pulse"></div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
        
        {/* Text Content - Left Side */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
          <div className="space-y-6">
          
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              <span className="block">Design Your</span>
              <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-yellow-400 bg-clip-text text-transparent animate-gradient-text">
                Unique Passport Case
              </span>
              <span className="block text-white/90">with Custom Pins</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
              Express your individuality with our premium passport cases. Choose from hundreds of custom pins and create a travel accessory that tells your unique story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleStartDesigning}
                className="px-8 py-4 bg-green-400 hover:bg-green-500 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Start Designing
              </button>
             
            </div>
          </div>
        </div>
        
        {/* Image - Right Side */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative">
            {/* Blue & Yellow Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-yellow-400/30 rounded-full blur-3xl scale-110 animate-pulse"></div>
            
        
           
            
         
          </div>
        </div>
      </div>
    
    </section>
  );
}

export default Hero;
