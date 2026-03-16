import React from 'react';
import Image from 'next/image';
import { normalizeImagePath } from '../../utils/imagePath';

const ImageModal = ({ show, selectedCase, selectedColorData, caseImages, selectedModalImage, setSelectedModalImage, onClose }) => {
  if (!show || !selectedCase || !caseImages || caseImages.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-900 font-medium font-inter">
            {selectedCase.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content - Flex layout to fit everything */}
        <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 min-h-0">
          {/* Main Image - Takes most of the space */}
          <div className="flex-1 flex items-center justify-center min-h-0 mb-4">
            <div className="relative p-4 sm:p-6 md:p-8 flex items-center justify-center w-full h-full">
              <div className="relative w-full h-full max-w-[640px] max-h-[640px] mx-auto">
                <Image
                  src={normalizeImagePath(caseImages[selectedModalImage])}
                  alt={`${selectedCase.name} - View ${selectedModalImage + 1}`}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </div>
            </div>
          </div>
          
          {/* Thumbnail Gallery - Fixed height at bottom */}
          {caseImages.length > 1 && (
            <div className="flex-shrink-0">
            
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 sm:gap-2 mx-auto">
                {caseImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedModalImage(index)}
                    className={`aspect-square overflow-hidden border transition-all duration-200 ${
                      selectedModalImage === index
                        ? 'border-gray-900 ring-2 ring-gray-300'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image
                      src={normalizeImagePath(image)}
                      alt={`${selectedCase.name} - Detail ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                      width={80}
                      height={80}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;

