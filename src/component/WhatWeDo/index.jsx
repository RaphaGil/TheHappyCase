import React, { useState, useEffect } from "react";
import { Wedo } from '../../data/landing';

const WhatWeDo = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const intervals = Wedo.Items.map((_, index) => {
      return setInterval(() => {
        setCurrentImageIndex(prev => {
          const newIndex = [...prev];
          newIndex[index] = (newIndex[index] + 1) % Wedo.Items[index].images.length;
          return newIndex;
        });
      }, 3000 + (index * 500)); // Stagger the rotation timing
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-green-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 tracking-tight" 
              style={{fontFamily: "'Fredoka One', cursive"}}>
            What We Do
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed" 
             style={{fontFamily: "'Poppins', sans-serif"}}>
            Discover our amazing features that make your luggage truly special
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {Wedo.Items.map((item, index) => (
            <div key={index} className="group">
              {/* Image Container */}
              <div className="relative w-full aspect-square mb-4 transform transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"></div>
                
                {/* Rotating Images */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  {item.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                        imgIndex === currentImageIndex[index] 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105'
                      }`}
                      alt={`Feature ${imgIndex + 1}`}
                      style={{
                        transform: `scale(${imgIndex === currentImageIndex[index] ? 1 : 1.05})`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Image counter indicator */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm z-30">
                  {currentImageIndex[index] + 1}/{item.images.length}
                </div>
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20"></div>
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-20"></div>
              </div>

              {/* Colorful Square with Phrase */}
              <div
                className={`relative flex items-center justify-center w-full aspect-square rounded-2xl shadow-xl transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:scale-105 transform ${
                  Wedo.colors[index % Wedo.colors.length]
                }`}
                style={{
                  background: `linear-gradient(135deg, ${Wedo.colors[index % Wedo.colors.length].replace('bg-', '')} 0%, ${Wedo.colors[index % Wedo.colors.length].replace('bg-', '')}CC 100%)`
                }}
              >
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/20 rounded-full opacity-40"></div>
                
                <p className="text-white text-lg md:text-xl font-semibold text-center px-4 relative z-10 leading-tight drop-shadow-lg" 
                   style={{fontFamily: "'Poppins', sans-serif"}}>
                  {item.text}
                </p>
                
                {/* Enhanced hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
