import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import videoSrc from '../../assets/videos/hero.mp4';

function Hero() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  
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
    <section className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
      {/* Video Banner Background */}
      <div className="absolute inset-0 w-full h-full">
        
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
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Text and Shop Now Button - Overlay on Video */}
      <div className="relative z-20 h-full flex items-end justify-center lg:justify-start">
        <div className="flex flex-col  items-center text-center lg:items-start lg:text-left px-4 mb-10 lg:px-10 lg:ml-10">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white"
            style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}
          >
            Custom Your Own 
          </h1>
            <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4"
            style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'}}
          >
            Passport Case
          </h1>
          <button 
            onClick={handleStartDesigning}
            className="px-8 py-3 text-xs uppercase tracking-wider text-white border-2 border-white/80 hover:border-white bg-white/20 hover:bg-white/30 backdrop-blur-md transition-all duration-200 rounded-lg shadow-lg drop-shadow-lg w-fit"
            style={{fontFamily: "'Poppins', sans-serif", textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'}}
          >
            Shop Now
          </button>
        </div>
      </div>
    
    </section>
  );
}

export default Hero;
