import React from 'react';
import { normalizeImagePath } from '../../utils/imagePath';
import Canvas from '../Canvas';
import ViewMoreImagesButton from './ViewMoreImagesButton';
import ItemDescriptionDropdown from './ItemDescriptionDropdown';

/**
 * Canvas section with canvas and action buttons centered within its parent div.
 * Used for the new Create Yours page layout.
 */
const CanvasSectionCentered = ({
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  selectedCase,
  caseImages,
  isMobile,
  onPinSelect,
  onPinRemove,
  onOpenImageModal,
  onOpenDescriptionModal,
  Products
}) => {
  return (
    <div
      className={`flex flex-col  w-full h-full md:items-center ${
        isMobile ? 'flex-1 min-h-0 py-4 justify-center' : 'md:py-0 md:justify-center'
      }`}
    >
      {/* Canvas - centered on mobile, buttons pushed to bottom */}
      <div className={`flex p-6 w-full flex-col items-center ${isMobile ? 'flex-1 justify-center min-h-0' : 'justify-center'}`}>
        <div
          className="w-full max-w-[270px] aspect-[270/350] sm:w-[270px] sm:h-[350px] sm:aspect-auto flex-shrink-0 relative mx-auto overflow-visible"
          style={{ isolation: 'isolate' }}
        >
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
          <div
            className="w-full h-full absolute inset-0 bg-transparent"
            style={{ zIndex: 2, pointerEvents: 'auto' }}
          >
            <Canvas
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onPinSelect={onPinSelect}
              onPinRemove={onPinRemove}
              products={Products}
            />
          </div>
        </div>

        {/* IMAGES + DETAILS buttons - hidden on mobile, below canvas on desktop */}
        {!isMobile && (
          <div className="flex flex-row  gap-2 w-full flex-shrink-0 mt-4">
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

export default CanvasSectionCentered;
