import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';
import Canvas from '../Canvas';
import ViewMoreImagesButton from './ViewMoreImagesButton';
import ItemDescriptionDropdown from './ItemDescriptionDropdown';

const CanvasSection = ({
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  selectedCase,
  caseImages,
  isCaseDropdownOpen,
  isCharmsDropdownOpen,
  isAddTextDropdownOpen,
  isMobile,
  onPinSelect,
  onPinRemove,
  onOpenImageModal,
  onOpenDescriptionModal,
  Products
}) => {
  return (
    <div className={`flex flex-col flex-shrink-0 ${
      isMobile
        ? 'justify-start sm:flex-1 sm:justify-center' 
        : 'md:w-1/2 md:flex-1 md:overflow-hidden md:px-0 md:py-0'
    } px-2 xs:px-3 sm:px-4 py-0 xs:py-1 sm:py-2 ${
      isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
        ? 'md:sticky md:top-0 md:self-start'
        : ''
    }`}>
      <div className="w-full h-full flex flex-col justify-start xs:justify-start sm:justify-center items-center md:justify-between">
        <div className="w-full max-w-[300px] aspect-[300/350] relative md:mt-2" style={{isolation: 'isolate'}}>
          {/* Background Case Image - Always behind canvas */}
          {selectedCaseImage && (
            <img
              src={normalizeImagePath(selectedCaseImage)}
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                zIndex: 0,
                objectFit: 'contain',
                objectPosition: 'center 45%',
                width: '270px',
                height: 'auto',
                maxWidth: '100%',
                margin: '0 auto',
              }}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="270"
              height="350"
              aria-hidden="true"
              key={`case-bg-${selectedCaseType}-${selectedColor}`}
            />
          )}
          {/* Canvas Overlay - Always on top */}
          <div className="w-full h-full absolute inset-0" style={{zIndex: 10, pointerEvents: 'auto', width: '100%', height: '100%'}}>
            <Canvas
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onPinSelect={onPinSelect}
              onPinRemove={onPinRemove}
              products={Products}
            />
          </div>
        </div>
        
        {/* Action Buttons - Bottom - Hidden on mobile */}
        <div className="mt-8 md:mt-8 mb-0 hidden md:flex flex-row gap-2 md:gap-2.5 lg:gap-3 flex-shrink-0 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] relative z-0">
          <ViewMoreImagesButton
            caseImages={caseImages}
            onOpenModal={onOpenImageModal}
          />
          
          <ItemDescriptionDropdown
            selectedCase={selectedCase}
            onOpenModal={onOpenDescriptionModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasSection;
