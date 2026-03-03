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
        : 'md:flex-shrink-0 md:overflow-hidden md:px-0 md:py-0'
    } px-0 xs:px-2 sm:px-4 py-0 xs:py-1 sm:py-2`}>
      <div className="w-full h-full flex flex-col justify-start xs:justify-start sm:justify-center items-center md:justify-start md:gap-4">
        <div className="w-full max-w-[220px] sm:max-w-[250px] aspect-[270/350] sm:w-[250px] sm:h-[320px] sm:aspect-auto flex-shrink-0 relative mx-auto overflow-visible" style={{isolation: 'isolate'}}>
          {/* Background Case Image - Always behind canvas - Fixed size for all screens */}
          {selectedCaseImage && (
            <img
              src={normalizeImagePath(selectedCaseImage)}
              alt=""
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                zIndex: 1,
                objectFit: 'contain',
                objectPosition: 'center 45%',
                width: '100%',
                height: '100%',
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
          {/* Canvas Overlay - On top for pins/text, transparent so case image shows through */}
          <div className="w-full h-full absolute inset-0 bg-transparent" style={{zIndex: 2, pointerEvents: 'auto'}}>
            <Canvas
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onPinSelect={onPinSelect}
              onPinRemove={onPinRemove}
              products={Products}
            />
          </div>
        </div>
        
        {/* Action Buttons - Bottom - Shown on mobile as compact row, full on desktop */}
        <div className="mt-4 sm:mt-6 md:mt-0 mb-0 flex flex-row gap-2 md:gap-3 flex-shrink-0 w-full max-w-full md:max-w-[320px] relative z-0 px-2 xs:px-0 justify-center">
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
