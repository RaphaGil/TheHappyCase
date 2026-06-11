'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useCreateYours } from '../../hooks/createyours/useCreateYours';
import CreateYoursHeader from '../../component/CreateYours/CreateYoursHeader';
import CanvasSectionCentered from '../../component/CreateYours/CanvasSectionCentered';
import DesignOptionsPanel from '../../component/CreateYours/DesignOptionsPanel';
import PriceSummary from '../../component/CreateYours/PriceSummary';
import MobileStepButtons from '../../component/CreateYours/MobileStepButtons';
import MobileAddTextSection from '../../component/CreateYours/MobileAddTextSection';
const MobileOverlay = dynamic(() => import('../../component/CreateYours/MobileOverlay'), { ssr: false });
const TermsOfUseModal = dynamic(() => import('../../component/CreateYours/TermsOfUseModal'), { ssr: false });
const ItemDescriptionModal = dynamic(() => import('../../component/CreateYours/ItemDescriptionModal'), { ssr: false });
const AddTextModal = dynamic(() => import('../../component/CreateYours/AddTextModal'), { ssr: false });
const DesignTipsModal = dynamic(() => import('../../component/CreateYours/DesignTipsModal'), { ssr: false });
const ImageModal = dynamic(() => import('../../component/ImageModal'), { ssr: false });

/**
 * Create Yours page with canvas centered in the middle of the screen.
 * Mobile: Canvas is vertically centered between step buttons and add-to-cart.
 * Desktop: Canvas is centered in the left column.
 */
export default function CreateYoursPageNew() {
  const [showDesignTipsModal, setShowDesignTipsModal] = useState(false);
  const [hasStartedMobileDesigner, setHasStartedMobileDesigner] = useState(false);
  const [activeDesignStep, setActiveDesignStep] = useState('case');
  const hasShownDesignTipsRef = useRef(false);
  const {
    selectedCategory,
    setSelectedCategory,
    pins,
    mobileSubCategory,
    setMobileSubCategory,
    selectedCaseType,
    selectedColor,
    selectedCaseImage,
    isCaseImageLoading,
    selectedPins,
    showPriceBreakdown,
    setShowPriceBreakdown,
    isCaseDropdownOpen,
    setIsCaseDropdownOpen,
    isCharmsDropdownOpen,
    setIsCharmsDropdownOpen,
    isAddTextDropdownOpen,
    setIsAddTextDropdownOpen,
    isMobile,
    mobileCurrentStep,
    setMobileCurrentStep,
    quantity,
    setQuantity,
    customText,
    setCustomText,
    customTextError,
    setCustomTextError,
    customTextAdded,
    setCustomTextAdded,
    showImageModal,
    setShowImageModal,
    selectedModalImage,
    setSelectedModalImage,
    showDescriptionModal,
    setShowDescriptionModal,
    showTermsModal,
    setShowTermsModal,
    agreedToTerms,
    setAgreedToTerms,
    showTermsError,
    setShowTermsError,
    showAddTextModal,
    setShowAddTextModal,
    productsWithQuantities,
    selectedCase,
    caseBasePrice,
    selectedColorData,
    caseImages,
    pinsPrice,
    totalPrice,
    groupedPinsList,
    cart,
    inventoryMessage,
    inventoryType,
    quantityError,
    handleCaseTypeSelection,
    handleColorSelection,
    handleCaseImageLoaded,
    handlePinSelection,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleMobileAddText,
    handleAddToCart,
    handlePinSelect,
    handlePinRemove,
    handlePinRemoveFromList,
  } = useCreateYours();
  const router = useRouter();
  const mainContentRef = useRef(null);
  const designTipsStorageKey = 'create-yours-design-tips-shown';

  const showDesignTipsOnce = useCallback(() => {
    if (hasShownDesignTipsRef.current) return;
    hasShownDesignTipsRef.current = true;
    setShowDesignTipsModal(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(designTipsStorageKey, 'true');
    }
  }, []);

  useEffect(() => {
    const shouldInitCharms =
      (isMobile && mobileCurrentStep === 'charms') ||
      (!isMobile && activeDesignStep === 'charms');
    if (shouldInitCharms && selectedCategory === '' && productsWithQuantities?.pins?.colorful?.length) {
      setSelectedCategory('colorful');
    }
  }, [
    activeDesignStep,
    isMobile,
    mobileCurrentStep,
    selectedCategory,
    setSelectedCategory,
    productsWithQuantities,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    hasShownDesignTipsRef.current = window.localStorage.getItem(designTipsStorageKey) === 'true';
  }, []);

  const handlePinSelectionWithTips = useCallback(async (pin) => {
    const wasAdded = await handlePinSelection(pin);
    if (wasAdded) {
      showDesignTipsOnce();
      if (isMobile && mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [handlePinSelection, showDesignTipsOnce, isMobile]);

  const handleTextAddedWithTips = useCallback(() => {
    showDesignTipsOnce();
  }, [showDesignTipsOnce]);

  const handleMobileAddTextWithTips = useCallback(() => {
    const wasAdded = handleMobileAddText();
    if (wasAdded) {
      showDesignTipsOnce();
    }
  }, [handleMobileAddText, showDesignTipsOnce]);

  const markDesignerInteractionStarted = useCallback(() => {
    setHasStartedMobileDesigner(true);
  }, []);

  const handleDesignStepChange = useCallback((step) => {
    if (step !== 'case' && (!selectedCaseType || !selectedColor)) return;
    setActiveDesignStep(step);
  }, [selectedCaseType, selectedColor]);

  useEffect(() => {
    if (!isMobile && activeDesignStep !== 'case' && (!selectedCaseType || !selectedColor)) {
      setActiveDesignStep('case');
    }
  }, [activeDesignStep, isMobile, selectedCaseType, selectedColor]);

  useEffect(() => {
    if (isMobile && isAddTextDropdownOpen && mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [isMobile, isAddTextDropdownOpen]);

  const priceSummaryProps = {
    totalPrice,
    caseBasePrice,
    groupedPinsList,
    showPriceBreakdown,
    quantity,
    setQuantity,
    onIncrementQuantity: handleIncrementQuantity,
    onDecrementQuantity: handleDecrementQuantity,
    selectedCase,
    selectedCaseType,
    selectedColor,
    selectedPins,
    selectedCaseImage,
    pinsPrice,
    onAddToCart: handleAddToCart,
    onShowTerms: () => setShowTermsModal(true),
    agreedToTerms,
    setAgreedToTerms,
    showTermsError,
    inventoryMessage,
    inventoryType,
  };

  return (
    <div
      className={`bg-white flex flex-col pb-[env(safe-area-inset-bottom)] ${
        isMobile ? 'h-screen overflow-x-hidden' : 'h-full min-h-0 overflow-hidden'
      }`}
    >
      {isMobile ? (
        <CreateYoursHeader isMobile={isMobile} onClose={() => router.back()} />
      ) : (
        <div className="flex-shrink-0">
          <CreateYoursHeader isMobile={isMobile} onClose={() => router.back()} />
        </div>
      )}

      {/* Main content - canvas centered within its div, options scroll when dropdowns open. Mobile: padding-bottom so fixed bar doesn't cover content */}
      <div
        ref={mainContentRef}
        className={`flex flex-col flex-1 min-h-0 w-full max-w-7xl mx-auto ${
          isMobile
            ? `justify-center overflow-y-auto ${isAddTextDropdownOpen ? 'pb-[380px]' : 'pb-56'}`
            : 'md:flex-row md:items-stretch overflow-y-auto md:overflow-hidden'
        }`}
      >
        {/* Canvas - aligned to top on mobile, centered on desktop */}
        <div className="flex flex-col flex-1 justify-start md:justify-center md:w-1/2 md:flex-none md:flex-shrink-0 md:items-center md:min-h-0 md:h-full min-h-0 md:overflow-hidden">
          <CanvasSectionCentered
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
            isCaseImageLoading={isCaseImageLoading}
            onCaseImageLoaded={handleCaseImageLoaded}
            selectedCase={selectedCase}
            caseImages={caseImages}
            isMobile={isMobile}
            shouldMountCanvas={
              !isMobile ||
              hasStartedMobileDesigner ||
              Boolean(selectedCaseType && selectedColor)
            }
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onOpenImageModal={() => setShowImageModal(true)}
            onOpenDescriptionModal={() => setShowDescriptionModal(true)}
            Products={productsWithQuantities}
            selectedPins={selectedPins}
            customText={customText}
            customTextAdded={customTextAdded}
          />
        </div>

        {/* Desktop options column: tabs + options scroll, price pinned at bottom */}
        {!isMobile && (
          <div className="grid grid-rows-[minmax(0,1fr)_auto] h-full min-h-0 w-1/2 pl-6 lg:pl-8 pr-4 lg:pr-6 border-l border-gray-100 overflow-hidden pt-4 lg:pt-2">
            <div className="min-h-0 h-full overflow-hidden md:pt-0">
              <DesignOptionsPanel
                activeStep={activeDesignStep}
                onStepChange={handleDesignStepChange}
                isMobile={false}
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                selectedCase={selectedCase}
                selectedPins={selectedPins}
                customTextAdded={customTextAdded}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                pins={pins}
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                setCustomTextAdded={setCustomTextAdded}
                onCaseSelect={handleCaseTypeSelection}
                onColorSelect={handleColorSelection}
                onPinSelect={handlePinSelectionWithTips}
                onPinRemove={handlePinRemoveFromList}
                onTextAdded={handleTextAddedWithTips}
                onMobileAddText={handleMobileAddTextWithTips}
                Products={productsWithQuantities}
                cart={cart}
                isCaseImageLoading={isCaseImageLoading}
              />
            </div>

            <div className="relative z-30 flex-shrink-0 bg-white border-t border-gray-200 pt-3 pb-2 shadow-[0_-6px_12px_-8px_rgba(0,0,0,0.08)]">
              <PriceSummary {...priceSummaryProps} isMobile={false} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Fixed bottom - Step buttons + Add to Cart */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white flex flex-col w-full">
          <div className="w-full px-3 xs:px-4 mt-4">
            <MobileStepButtons
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onCaseClick={() => {
                markDesignerInteractionStarted();
                setMobileCurrentStep('case');
              }}
              onColorClick={() => {
                markDesignerInteractionStarted();
                setMobileCurrentStep('color');
              }}
              onCharmsClick={() => {
                markDesignerInteractionStarted();
                setMobileCurrentStep('charms');
              }}
              onTextClick={() => {
                markDesignerInteractionStarted();
                setIsAddTextDropdownOpen((prev) => !prev);
              }}
              isAddTextDropdownOpen={isAddTextDropdownOpen}
              mobileCurrentStep={mobileCurrentStep}
            />
            {isAddTextDropdownOpen && (
              <MobileAddTextSection
                customText={customText}
                setCustomText={setCustomText}
                customTextError={customTextError}
                setCustomTextError={setCustomTextError}
                customTextAdded={customTextAdded}
                setCustomTextAdded={setCustomTextAdded}
                onAddText={handleMobileAddTextWithTips}
              />
            )}
          </div>
          <div className="w-full bg-gray-100 px-3 xs:px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <PriceSummary {...priceSummaryProps} isMobile />
          </div>
        </div>
      )}

      {isMobile && mobileCurrentStep && (
        <MobileOverlay
          mobileCurrentStep={mobileCurrentStep}
          setMobileCurrentStep={setMobileCurrentStep}
          selectedCaseType={selectedCaseType}
          selectedColor={selectedColor}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mobileSubCategory={mobileSubCategory}
          setMobileSubCategory={setMobileSubCategory}
          pins={pins}
          selectedPins={selectedPins}
          handleCaseTypeSelection={handleCaseTypeSelection}
          handleColorSelection={handleColorSelection}
          handlePinSelection={handlePinSelectionWithTips}
          Products={productsWithQuantities}
          cart={cart}
          isCaseImageLoading={isCaseImageLoading}
        />
      )}

      {showTermsModal && (
        <TermsOfUseModal
          show={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          onAgree={() => {
            setAgreedToTerms(true);
            setShowTermsModal(false);
          }}
        />
      )}

      {showDescriptionModal && (
        <ItemDescriptionModal
          show={showDescriptionModal}
          onClose={() => setShowDescriptionModal(false)}
          selectedCase={selectedCase}
        />
      )}

      {showAddTextModal && (
        <AddTextModal
          show={showAddTextModal}
          onClose={() => setShowAddTextModal(false)}
          customText={customText}
          setCustomText={setCustomText}
          customTextError={customTextError}
          setCustomTextError={setCustomTextError}
          customTextAdded={customTextAdded}
          setCustomTextAdded={setCustomTextAdded}
          onTextAdded={handleTextAddedWithTips}
        />
      )}

      {showDesignTipsModal && (
        <DesignTipsModal
          show={showDesignTipsModal}
          onClose={() => setShowDesignTipsModal(false)}
        />
      )}

      {showImageModal && (
        <ImageModal
          show={showImageModal}
          onClose={() => setShowImageModal(false)}
          selectedCase={selectedCase}
          selectedColorData={selectedColorData}
          caseImages={caseImages}
          selectedModalImage={selectedModalImage}
          setSelectedModalImage={setSelectedModalImage}
        />
      )}
    </div>
  );
}
