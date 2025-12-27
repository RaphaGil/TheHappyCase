import React from 'react';
import Canvas from '../../../component/Canvas/index.jsx';
import ViewMoreImagesButton from './ViewMoreImagesButton';
import ItemDescriptionDropdown from './ItemDescriptionDropdown';
import Products from '../../../data/products.json';
import { getCaseImages } from '../utils/createYoursHelpers';

const CanvasSection = ({
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  selectedCase,
  selectedColorData,
  isMobile,
  isCaseDropdownOpen,
  isCharmsDropdownOpen,
  isAddTextDropdownOpen,
  onPinSelect,
  onPinRemove,
  onSaveImage,
  onOpenImageModal,
  onOpenDescriptionModal
}) => {
  const caseImages = getCaseImages(selectedColorData, selectedCase);

  return (
    <div className={`flex flex-col flex-shrink-0 ${isMobile ? 'mt-2 mb-4' : 'md:w-1/2 md:flex-1 md:overflow-hidden md:px-0 md:py-0'} px-2 xs:px-3 sm:px-4 py-0 xs:py-1 sm:py-2 ${
        isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
          ? 'md:sticky md:top-0 md:self-start'
          : ''
      }`}>
      <div className="w-full h-full flex flex-col justify-start xs:justify-center items-center md:justify-center">
        <div className="w-[300px] h-[350px] md:h-[350px] relative mt-0 md:mt-2" style={{isolation: 'isolate'}}>
          {/* Background Case Image */}
          {selectedCaseImage && (
            <div 
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat"
              style={{
                backgroundImage: `url(${selectedCaseImage})`,
                zIndex: 0,
                pointerEvents: 'none',
                backgroundSize: '270px',
                backgroundPosition: 'center 45%',
              }}
              key={`case-bg-${selectedCaseType}-${selectedColor}`}
            />
          )}
          {/* Canvas Overlay */}
          <div className="w-full h-full absolute inset-0" style={{zIndex: 10, pointerEvents: 'auto', width: '100%', height: '100%'}}>
            <Canvas
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onPinSelect={onPinSelect}
              onPinRemove={onPinRemove}
              onSaveImage={onSaveImage}
              products={Products}
            />
          </div>
        </div>
        
        {/* Action Buttons - Desktop only */}
        {!isMobile && (
          <div className="mt-8 md:mt-24 mb-4 hidden md:flex flex-col lg:flex-row gap-2 xs:gap-2.5 sm:gap-3 flex-shrink-0 w-full max-w-full xs:max-w-[calc(100vw-2rem)] sm:max-w-[400px] md:max-w-[480px] relative z-0">
            <ViewMoreImagesButton
              caseImages={caseImages}
              onOpenModal={onOpenImageModal}
            />
            <ItemDescriptionDropdown
              selectedCase={selectedCase}
              onOpenModal={onOpenDescriptionModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasSection;

