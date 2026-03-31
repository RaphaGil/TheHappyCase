import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { normalizeImagePath } from '../../utils/imagePath';

// Lazy-load Canvas (and Fabric.js)
const Canvas = dynamic(() => import('../Canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] flex items-center justify-center bg-gray-50 rounded-sm">
      <span className="text-gray-400 text-sm font-inter">Loading designer...</span>
    </div>
  ),
});
import ViewMoreImagesButton from './ViewMoreImagesButton';
import ItemDescriptionDropdown from './ItemDescriptionDropdown';

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjcwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDI3MCAzNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI3MCIgaGVpZ2h0PSIzNTAiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

const CanvasSection = ({
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  isCaseImageLoading,
  onCaseImageLoaded,
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
  const [shouldMountCanvas, setShouldMountCanvas] = useState(!isMobile);

  useEffect(() => {
    if (!isMobile) {
      setShouldMountCanvas(true);
      return;
    }

    let timeoutId;
    let idleId;

    const mountCanvas = () => setShouldMountCanvas(true);
    const win = typeof window !== 'undefined' ? window : null;

    if (win && 'requestIdleCallback' in win) {
      idleId = win.requestIdleCallback(mountCanvas, { timeout: 300 });
    } else {
      timeoutId = setTimeout(mountCanvas, 150);
    }

    return () => {
      if (win && idleId) {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isMobile]);

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
            <Image
              src={normalizeImagePath(selectedCaseImage)}
              alt=""
              fill
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              style={{
                zIndex: 1,
                objectFit: 'contain',
                objectPosition: 'center 45%',
              }}
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 640px) 220px, 250px"
              aria-hidden="true"
              key={`case-bg-${selectedCaseType}-${selectedColor}`}
              onLoadingComplete={onCaseImageLoaded}
            />
          )}
          {isCaseImageLoading && (
            <div className="absolute inset-0 z-[3] bg-white/50 transition-opacity duration-200 pointer-events-none" aria-hidden="true" />
          )}
          {/* Canvas Overlay - On top for pins/text, transparent so case image shows through */}
          <div className="w-full h-full absolute inset-0 bg-transparent" style={{zIndex: 2, pointerEvents: 'auto'}}>
            {shouldMountCanvas ? (
              <Canvas
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                onPinSelect={onPinSelect}
                onPinRemove={onPinRemove}
                products={Products}
              />
            ) : null}
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
