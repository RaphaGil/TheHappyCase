import React from 'react';

const DesignIdeasGrid = ({ images }) => {
  return (
    <div className="w-full mb-12 md:mb-16 -mx-0 4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="group bg-white transition-all duration-300 hover:shadow-md overflow-hidden"
          >
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[700px] overflow-hidden">
              <img
                src={image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt={`Design Idea ${index + 1}`}
                loading="lazy"
              />
              {/* Text Overlay - Currently commented out but kept for future use */}
              {/* <div className="absolute bottom-0 left-0 right-0 flex items-end font-thin">
                <div className="bg-black/20 w-full py-1.5">
                  <p className="text-white text-center text-lg font-light leading-tight tracking-wide font-inter">
                    {imageTexts[index]}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignIdeasGrid;

