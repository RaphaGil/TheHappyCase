import React, { useState, useEffect } from "react";

const WhatWeDo = () => {
  
  const pinHighlights = [
    'Colorful Pins',
    ' Bronze Pins',
    ' Flags',
  ];
  const [pinHighlightIndex, setPinHighlightIndex] = useState(0);
  const [pinHighlightVisible, setPinHighlightVisible] = useState(true);

  // Design ideas images - all 6 images
  const designIdeasImages = [
    '/TheHappyCase/images/designideas/designidea.png',
    '/TheHappyCase/images/designideas/designidea1.png',
    '/TheHappyCase/images/designideas/designidea2.png',
    '/TheHappyCase/images/designideas/designidea3.png',
    '/TheHappyCase/images/designideas/designidea4.png',
    '/TheHappyCase/images/designideas/designidea5.png',
  ];

  // Text overlays for each image
  const imageTexts = [
    '3 Different Case Designs ',
    '40+ CHARMS OPTIONS',
    '10+ CASE COLORS AVAILABLE',
    'COLORFUL, BRONZE AND FLAGS CHARMS',
  ];

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
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">
      <div className="container mx-auto  relative z-10">
        {/* Hero Text Content */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-4xl font-light text-gray-900 mb-6" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            <span className="block">Design Your</span>
            <span className="block">
              Unique Passport Case with
            </span>
            <span
              className={`block transition-opacity duration-300 italic  ${
                pinHighlightVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {pinHighlights[pinHighlightIndex]}
            </span>
          </h1>
          

        </div>
      </div>

      {/* Design Ideas Grid - 4 Images Side by Side - Edge to Edge */}
      <div className="w-full mb-12 md:mb-16 -mx-0 4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {designIdeasImages.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="group bg-white transition-all duration-300 hover:shadow-md overflow-hidden"
            >
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[700px] overflow-hidden ">
                <img
                  src={image}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={`Design Idea ${index + 1}`}
                />
                {/* Text Overlay */}
                {/* <div className="absolute bottom-0 left-0 right-0 flex items-end font-thin">
                  <div className="bg-black/20 w-full py-1.5">
                    <p className="text-white text-center text-xs sm:text-sm md:text-base lg:text-lg font-light leading-tight tracking-wide" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {imageTexts[index]}
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect Gift Section - Image Edge to Edge */}
      <div className="w-full flex flex-col md:flex-row items-stretch  ">
        {/* Text - Top on mobile, Right on desktop */}
        <div className="w-full md:w-1/2 flex items-center order-1 md:order-2">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
            <div className="text-center ">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 mb-4 md:mb-6" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
              The Perfect Gift for Every Moment
              
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Created with love for birthdays, weddings, and for all the travelers who carry their stories around the world.
              </p>
            </div>
          </div>
        </div>
        
        {/* Image - Bottom on mobile (full width), Left on desktop - Edge to Edge */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center justify-center">
            <img
              src={designIdeasImages[4]}
              className="w-full h-full object-contain"
              alt="Perfect Gift"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
