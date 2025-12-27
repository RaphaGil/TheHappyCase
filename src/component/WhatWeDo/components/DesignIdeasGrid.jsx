import React from 'react';

const DesignIdeasGrid = ({ images }) => {
  // Show only first 4 images in 1 row
  const displayImages = images.slice(0, 4);

  return (
    <div className="w-full mb-12 md:mb-16">
      {/* Images Grid - 4 images in 1 row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4  w-full ">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className="group bg-white transition-all duration-500 ease-out hover:shadow-lg overflow-hidden "
          >
            <div className="relative w-full aspect-square overflow-hidden h-[500px]">
              <img
                src={image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt={`Design Idea ${index + 1}`}
                loading="lazy"
                decoding="async"
                width="1000"
                height="1600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignIdeasGrid;

