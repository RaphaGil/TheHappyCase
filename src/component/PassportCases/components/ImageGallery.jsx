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
          className={`relative overflow-hidden ${isSelectedColorSoldOut() ? 'pointer-events-none cursor-not-allowed' : ''}`}
          onClick={(e) => {
            if (isSelectedColorSoldOut()) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
          }}
        >
          <img
            src={normalizeImagePath(currentImage)}
            alt={`${selectedCase.name} - View`}
            className={`w-full h-[300px] lg:h-[400px] xl:h-[500px] object-contain transition-opacity duration-200 ${isSelectedColorSoldOut() ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="500"
            height="500"
            onClick={(e) => {
              if (isSelectedColorSoldOut()) {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
          <div className="hidden w-full h-[300px] lg:h-[400px] xl:h-[500px] items-center justify-center text-gray-400 bg-gray-50">
            <div className="text-center">
              <p className="text-gray-500 font-inter">Image not available</p>
            </div>
          </div>
          {/* Sold Out Overlay */}
          {isSelectedColorSoldOut() && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20 pointer-events-none"
            >
              <span className="text-white text-2xl font-medium uppercase tracking-wider font-inter">
                Sold Out
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Detail Images Gallery */}
      <div className="mt-3">
        <div className="grid grid-cols-5 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {detailImages.map((image, index) => (
            <button
              key={index}
              onClick={() => onDetailImageClick(image)}
              disabled={isSelectedColorSoldOut()}
              className={`relative aspect-square overflow-hidden bg-gray-50 border transition-all duration-200 max-w-[80px] mx-auto ${
                selectedDetailImage === image || (!selectedDetailImage && index === 0 && currentImage === image)
                  ? 'border-gray-900 ring-2 ring-gray-300'
                  : 'border-gray-200 hover:border-gray-400'
              } ${isSelectedColorSoldOut() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <div className="hidden w-full h-full items-center justify-center text-gray-300">
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
