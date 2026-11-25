import React from 'react';
import { normalizeImagePath } from '../../../utils/imagePath';

const ImageGallery = ({ 
  currentImage, 
  detailImages, 
  selectedDetailImage, 
  selectedCase,
  isSelectedColorSoldOut,
  onDetailImageClick 
}) => {
  return (
    <div className="">
      {/* Main Image Display */}
      <div className="relative group">
        <div 
          className={`relative overflow-hidden rounded-3xl bg-white p-6 md:p-10 ${isSelectedColorSoldOut() ? 'pointer-events-none cursor-not-allowed' : ''}`}
        >
          <img
            src={normalizeImagePath(currentImage)}
            alt={`${selectedCase.name} - View`}
            className={`w-full h-[300px] lg:h-[400px] xl:h-[460px] object-contain transition-opacity duration-200 drop-shadow-xl ${isSelectedColorSoldOut() ? 'pointer-events-none cursor-not-allowed' : ''}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="500"
            height="500"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div className="hidden w-full h-[300px] lg:h-[400px] xl:h-[500px] items-center justify-center text-gray-500 bg-white">
            <div className="text-center">
              <p className="text-gray-500 font-inter">Image not available</p>
            </div>
          </div>
          {/* Sold Out Overlay */}
          {isSelectedColorSoldOut() && (
            <div 
              className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 pointer-events-none"
            >
              <span className="rounded-full bg-gray-900/80 px-5 py-2 text-base font-semibold text-white font-inter">
                Sold out
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Detail Images Gallery */}
      <div className="mt-3">
        <div className="grid grid-cols-5 lg:grid-cols-6 gap-2.5">
          {detailImages.map((image, index) => (
            <button
              key={index}
              onClick={() => onDetailImageClick(image)}
              disabled={isSelectedColorSoldOut()}
              className={`relative aspect-square w-full overflow-hidden rounded-2xl bg-white p-1.5 transition-all duration-200 ${
 selectedDetailImage === image || (!selectedDetailImage && index === 0 && currentImage === image)
 ? 'ring-2 ring-[#30279f]'
 : 'ring-1 ring-gray-200 hover:ring-[#30279f]/40'
 } ${isSelectedColorSoldOut() ? 'cursor-not-allowed' : ''}`}
            >
              <img
                src={normalizeImagePath(image)}
                alt={`${selectedCase.name} - Detail ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width="80"
                height="80"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-gray-500 bg-white">
                <span className="text-2xl">📷</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
