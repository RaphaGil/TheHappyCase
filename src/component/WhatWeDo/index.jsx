import React, { useState, useEffect } from "react";

import { Wedo } from '../../data/landing';

const WhatWeDo = () => {
  
  const [currentImageIndex, setCurrentImageIndex] = useState([0, 0, 0, 0]);
  
  const pinHighlights = [
    'Colorful Pins',
    ' Bronze Pins',
    ' Flags',
  ];
  const [pinHighlightIndex, setPinHighlightIndex] = useState(0);
  const [pinHighlightVisible, setPinHighlightVisible] = useState(true);


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

  // Pin highlights rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setPinHighlightVisible(false);
      setTimeout(() => {
        setPinHighlightIndex((prev) => (prev + 1) % pinHighlights.length);
        setPinHighlightVisible(true);
      }, 300); // matches fade-out duration
    }, 3000);

    return () => clearInterval(interval);
  }, [pinHighlights.length]);

  useEffect(() => {
    if (pinHighlights.length === 0) return;
    setPinHighlightIndex(0);
    setPinHighlightVisible(true);
  }, [pinHighlights.length]);

  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden ">
      <div className="container mx-auto  relative z-10">
        {/* Hero Text Content */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-light text-gray-900 mb-6" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            <span className="block">Design Your</span>
            <span className="block">
              Unique Passport Case with
            </span>
            <span
              className={`block transition-opacity duration-300 ${
                pinHighlightVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {pinHighlights[pinHighlightIndex]}
            </span>
          </h1>
          

        </div>

      

        {/* Clean Grid Layout - 4 equal columns */}
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Wedo.Items.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col  bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-yellow-50">
                  {item.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      className={`absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-500 ${
                        imgIndex === currentImageIndex[index] 
                          ? 'opacity-100' 
                          : 'opacity-0'
                      }`}
                      alt={`Feature ${imgIndex + 1}`}
                    />
                  ))}
                </div>

                {/* Content Section */}
                <div className="p-4 border-t border-gray-100 flex-grow flex items-center">
                  <p className="text-sm text-gray-700 leading-relaxed font-light text-center w-full" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
