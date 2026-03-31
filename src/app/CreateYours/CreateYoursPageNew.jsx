'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Products from '../../data/products.json';
import { useCreateYours } from '../../hooks/createyours/useCreateYours';
import CreateYoursHeader from '../../component/CreateYours/CreateYoursHeader';
import CanvasSectionCentered from '../../component/CreateYours/CanvasSectionCentered';
import CaseSelectionSection from '../../component/CreateYours/CaseSelectionSection';
import CharmsSelectionSection from '../../component/CreateYours/CharmsSelectionSection';
import AddTextSection from '../../component/CreateYours/AddTextSection';
import PriceSummary from '../../component/CreateYours/PriceSummary';
import MobileStepButtons from '../../component/CreateYours/MobileStepButtons';
import MobileAddTextSection from '../../component/CreateYours/MobileAddTextSection';
import MobileOverlay from '../../component/CreateYours/MobileOverlay';
import TermsOfUseModal from '../../component/CreateYours/TermsOfUseModal';
import ItemDescriptionModal from '../../component/CreateYours/ItemDescriptionModal';
import AddTextModal from '../../component/CreateYours/AddTextModal';
import DesignTipsModal from '../../component/CreateYours/DesignTipsModal';
import ImageModal from '../../component/ImageModal';

/**
 * Create Yours page with canvas centered in the middle of the screen.
 * Mobile: Canvas is vertically centered between step buttons and add-to-cart.
 * Desktop: Canvas is centered in the left column.
 */
export default function CreateYoursPageNew() {
  const [showDesignTipsModal, setShowDesignTipsModal] = useState(false);
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
    if (selectedCategory === '' && Products?.pins?.colorful?.length) {
      setSelectedCategory('colorful');
    }
  }, [selectedCategory, setSelectedCategory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    hasShownDesignTipsRef.current = window.localStorage.getItem(designTipsStorageKey) === 'true';
  }, []);

  const handlePinSelectionWithTips = useCallback((pin) => {
    const wasAdded = handlePinSelection(pin);
    if (wasAdded) {
      showDesignTipsOnce();
    }
  }, [handlePinSelection, showDesignTipsOnce]);

  const handleTextAddedWithTips = useCallback(() => {
    showDesignTipsOnce();
  }, [showDesignTipsOnce]);

  const handleMobileAddTextWithTips = useCallback(() => {
    const wasAdded = handleMobileAddText();
    if (wasAdded) {
      showDesignTipsOnce();
    }
  }, [handleMobileAddText, showDesignTipsOnce]);

  // On mobile, when Text section opens, scroll main content to top so the page (canvas) stays fully visible
  useEffect(() => {
    if (isMobile && isAddTextDropdownOpen && mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [isMobile, isAddTextDropdownOpen]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
      <CreateYoursHeader isMobile={isMobile} onClose={() => router.back()} />

      {/* Main content - canvas centered within its div, options scroll when dropdowns open. Mobile: padding-bottom so fixed bar doesn't cover content */}
      <div
        ref={mainContentRef}
        className={`flex flex-col justify-center md:flex-row flex-1 min-h-0 w-full max-w-7xl mx-auto overflow-y-auto md:overflow-hidden ${
          isMobile ? (isAddTextDropdownOpen ? 'pb-[380px]' : 'pb-56') : '' 
        }`}
      >
        {/* Canvas - aligned to top on mobile, centered on desktop */}
        <div className="flex flex-col flex-1 justify-start md:justify-center md:w-1/2 md:flex-none md:flex-shrink-0 md:items-center md:min-h-0 min-h-0 md:overflow-hidden">
          <CanvasSectionCentered
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
            isCaseImageLoading={isCaseImageLoading}
            onCaseImageLoaded={handleCaseImageLoaded}
            selectedCase={selectedCase}
            caseImages={caseImages}
            isMobile={isMobile}
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onOpenImageModal={() => setShowImageModal(true)}
            onOpenDescriptionModal={() => setShowDescriptionModal(true)}
            Products={productsWithQuantities}
          />
        </div>

        {/* Options column - options scroll, price summary always visible. overflow-hidden keeps canvas from moving. */}
        <div className={`flex flex-col md:w-1/2 md:pl-6 lg:pl-8 md:border-l mt-4 md:mt-6 md:border-gray-100 md:min-h-0 md:overflow-hidden ${isMobile ? 'hidden' : 'flex-shrink-0 md:flex-none p-4 lg:p-0'}`}>
          {!isMobile && (
            <>
              {/* Scrollable options - dropdowns expand here without moving price summary */}
              <div className="flex-1 min-h-0 mt-10 overflow-y-auto overflow-x-hidden hide-scrollbar">
                <CaseSelectionSection
                  isOpen={isCaseDropdownOpen}
                  onToggle={() => {
                    setIsCharmsDropdownOpen(false);
                    setIsAddTextDropdownOpen(false);
                    setIsCaseDropdownOpen((prev) => !prev);
                  }}
                  selectedCaseType={selectedCaseType}
                  selectedColor={selectedColor}
                  selectedCase={selectedCase}
                  onCaseSelect={handleCaseTypeSelection}
                  onColorSelect={handleColorSelection}
                  setIsCaseDropdownOpen={setIsCaseDropdownOpen}
                  Products={productsWithQuantities}
                  cart={cart}
                />
                <CharmsSelectionSection
                  isOpen={isCharmsDropdownOpen}
                  onToggle={() => {
                    setIsCaseDropdownOpen(false);
                    setIsAddTextDropdownOpen(false);
                    setIsCharmsDropdownOpen((prev) => !prev);
                  }}
                  pins={pins}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedPins={selectedPins}
                  onPinSelect={handlePinSelectionWithTips}
                  Products={productsWithQuantities}
                  cart={cart}
                />
                <AddTextSection
                  isOpen={isAddTextDropdownOpen}
                  onToggle={() => {
                    setIsCaseDropdownOpen(false);
                    setIsCharmsDropdownOpen(false);
                    setIsAddTextDropdownOpen((prev) => !prev);
                  }}
                  customText={customText}
                  setCustomText={setCustomText}
                  customTextError={customTextError}
                  setCustomTextError={setCustomTextError}
                  customTextAdded={customTextAdded}
                  setCustomTextAdded={setCustomTextAdded}
                  onTextAdded={handleTextAddedWithTips}
                />
              </div>

              {/* Price summary - always visible at bottom, never scrolls */}
              <div className="flex-shrink-0 pt-6 border-t border-gray-100 bg-white">
                <PriceSummary
            totalPrice={totalPrice}
            caseBasePrice={caseBasePrice}
            groupedPinsList={groupedPinsList}
            showPriceBreakdown={showPriceBreakdown}
            quantity={quantity}
            setQuantity={setQuantity}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            selectedCase={selectedCase}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedPins={selectedPins}
            selectedCaseImage={selectedCaseImage}
            pinsPrice={pinsPrice}
            onAddToCart={handleAddToCart}
            onShowTerms={() => setShowTermsModal(true)}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            showTermsError={showTermsError}
            inventoryMessage={inventoryMessage}
            inventoryType={inventoryType}
            isMobile={isMobile}
          />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile: Fixed bottom section - Step buttons + Add to Cart */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-40  bg-white flex flex-col w-full">
          {/* Case, Color, Charms, Text buttons - at bottom above Add to Cart */}
          <div className="w-full px-3 xs:px-4  ">
            <MobileStepButtons
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              onCaseClick={() => setMobileCurrentStep('case')}
              onColorClick={() => setMobileCurrentStep('color')}
              onCharmsClick={() => setMobileCurrentStep('charms')}
              onTextClick={() => setIsAddTextDropdownOpen((prev) => !prev)}
              isAddTextDropdownOpen={isAddTextDropdownOpen}
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
          {/* Add to Cart bar - full width on mobile */}
          <div className="w-full bg-gray-100  px-3 xs:px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <PriceSummary
              totalPrice={totalPrice}
              caseBasePrice={caseBasePrice}
              groupedPinsList={groupedPinsList}
              showPriceBreakdown={showPriceBreakdown}
              quantity={quantity}
              setQuantity={setQuantity}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
              selectedCase={selectedCase}
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              selectedPins={selectedPins}
              selectedCaseImage={selectedCaseImage}
              pinsPrice={pinsPrice}
              onAddToCart={handleAddToCart}
              onShowTerms={() => setShowTermsModal(true)}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              showTermsError={showTermsError}
              inventoryMessage={inventoryMessage}
              inventoryType={inventoryType}
              isMobile={true}
            />
          </div>
        </div>
      )}

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
      />

      <TermsOfUseModal
        show={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAgree={() => {
          setAgreedToTerms(true);
          setShowTermsModal(false);
        }}
      />

      <ItemDescriptionModal
        show={showDescriptionModal}
        onClose={() => setShowDescriptionModal(false)}
        selectedCase={selectedCase}
      />

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

      <DesignTipsModal
        show={showDesignTipsModal}
        onClose={() => setShowDesignTipsModal(false)}
      />

      <ImageModal
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        selectedCase={selectedCase}
        selectedColorData={selectedColorData}
        caseImages={caseImages}
        selectedModalImage={selectedModalImage}
        setSelectedModalImage={setSelectedModalImage}
      />
    </div>
  );
}
