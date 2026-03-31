import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getMobileVariantImagePath, normalizeImagePath } from '../../utils/imagePath';
import ViewMoreImagesButton from './ViewMoreImagesButton';
import ItemDescriptionDropdown from './ItemDescriptionDropdown';

const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjcwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDI3MCAzNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI3MCIgaGVpZ2h0PSIzNTAiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';

// Lazy-load Canvas (and Fabric.js) - only when Custom Passport Holder page is opened
const Canvas = dynamic(() => import('../Canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] flex items-center justify-center bg-gray-50 rounded-sm">
      <span className="text-gray-400 text-sm font-inter">Loading designer...</span>
    </div>
  ),
});


/**
 * Canvas section with canvas and action buttons centered within its parent div.
 * Used for the new Create Yours page layout.
 */
const CanvasSectionCentered = ({
  selectedCaseType,
  selectedColor,
  selectedCaseImage,
  isCaseImageLoading,
  onCaseImageLoaded,
  selectedCase,
  caseImages,
  isMobile,
  onPinSelect,
  onPinRemove,
  onOpenImageModal,
  onOpenDescriptionModal,
  Products
}) => {
  const [shouldMountCanvas, setShouldMountCanvas] = useState(!isMobile);
  const [resolvedCaseImageSrc, setResolvedCaseImageSrc] = useState('');

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

  useEffect(() => {
    if (!selectedCaseImage) {
      setResolvedCaseImageSrc('');
      return;
    }

    const defaultSrc = normalizeImagePath(selectedCaseImage);
    const mobileSrc = normalizeImagePath(getMobileVariantImagePath(selectedCaseImage));
    const shouldTryMobileVariant = isMobile && mobileSrc && mobileSrc !== defaultSrc;
    setResolvedCaseImageSrc(shouldTryMobileVariant ? mobileSrc : defaultSrc);
  }, [selectedCaseImage, isMobile]);

  return (
    <div
      className={`flex flex-col w-full h-full md:items-center ${
        isMobile ? 'flex-1 min-h-0 pt-2 pb-4 justify-start md:mt-0' : 'md:py-0 md:justify-center'
      }`}
    >
      {/* Canvas - aligned to top on mobile, centered on desktop */}
      <div className={`flex p-6 w-full flex-col items-center ${isMobile ? 'flex-1 justify-start min-h-0' : 'justify-center'}`}>
        <div
          className="w-full max-w-[270px] aspect-[270/350] sm:w-[270px] sm:h-[350px] sm:aspect-auto flex-shrink-0 relative mx-auto overflow-visible"
          style={{ isolation: 'isolate' }}
        >
          {resolvedCaseImageSrc && (
            <Image
              src={resolvedCaseImageSrc}
              alt=""
              fill
              className="object-contain pointer-events-none"
              style={{
                zIndex: 1,
                objectFit: 'contain',
                objectPosition: 'center 40%',
              }}
              priority
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              sizes="(max-width: 768px) 270px, 270px"
              aria-hidden="true"
              key={`case-bg-${selectedCaseType}-${selectedColor}-${resolvedCaseImageSrc}`}
              onLoadingComplete={onCaseImageLoaded}
              onError={() => {
                const defaultSrc = normalizeImagePath(selectedCaseImage);
                if (resolvedCaseImageSrc !== defaultSrc) {
                  setResolvedCaseImageSrc(defaultSrc);
                }
              }}
            />
          )}
          {isCaseImageLoading && (
            <div className="absolute inset-0 z-[3] bg-white/50 transition-opacity duration-200 pointer-events-none" aria-hidden="true" />
          )}
          <div
            className="w-full h-full absolute inset-0 bg-transparent"
            style={{ zIndex: 2, pointerEvents: 'auto' }}
          >
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
