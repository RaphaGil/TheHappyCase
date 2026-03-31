'use client';

import React, { useEffect } from 'react';
import Products from '../../data/products.json';
import { useCreateYours } from '../../hooks/createyours/useCreateYours';
import CreateYoursHeader from '../../component/CreateYours/CreateYoursHeader';
import CanvasSection from '../../component/CreateYours/CanvasSection';
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
import ImageModal from '../../component/ImageModal';

export default function CreateYoursPage() {
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

  useEffect(() => {
    if (selectedCategory === '' && Products?.pins?.colorful?.length) {
      setSelectedCategory('colorful');
    }
  }, [selectedCategory, setSelectedCategory]);

  return (
    <div className="min-h-screen md:h-screen bg-white flex flex-col overflow-x-hidden overflow-y-auto md:overflow-hidden pb-[env(safe-area-inset-bottom)]">
      <CreateYoursHeader />

      <div className="relative flex flex-col md:flex-row flex-1 min-h-0 w-full max-w-7xl xl:max-w-[90rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-4 lg:px-6 xl:px-8 pb-4 sm:pb-6 md:pb-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-10 md:min-h-0">
        {/* Canvas - position:fixed on desktop so it never moves */}
        <div className="flex flex-col min-w-0 flex-1 md:flex-none md:fixed md:left-0 md:w-2/5 lg:w-[42%] xl:w-[40%] md:top-24 md:bottom-0 md:z-10 md:pointer-events-none md:overflow-hidden">
          <div className="flex flex-col flex-1 md:flex-none md:min-h-0 md:overflow-hidden md:rounded-xl md:bg-gray-50/50 md:p-3 lg:p-4 xl:p-5 md:items-center md:justify-start md:pt-2 md:pointer-events-auto md:max-w-7xl md:mx-auto md:pl-4 md:pr-2">
            <CanvasSection
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
            isCaseImageLoading={isCaseImageLoading}
            onCaseImageLoaded={handleCaseImageLoaded}
            selectedCase={selectedCase}
            caseImages={caseImages}
            isCaseDropdownOpen={isCaseDropdownOpen}
            isCharmsDropdownOpen={isCharmsDropdownOpen}
            isAddTextDropdownOpen={isAddTextDropdownOpen}
            isMobile={isMobile}
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onOpenImageModal={() => setShowImageModal(true)}
            onOpenDescriptionModal={() => setShowDescriptionModal(true)}
            Products={productsWithQuantities}
          />
          </div>
        </div>

        {/* Spacer for fixed canvas - takes up left space on desktop */}
        <div className="hidden md:block md:w-2/5 lg:w-[42%] xl:w-[40%] md:flex-shrink-0 md:flex-none" aria-hidden="true" />

        {/* Custom options + Price Summary - Right side. overflow-y-scroll + scrollbar-gutter prevents canvas shift when dropdown opens */}
        <div className="flex flex-col flex-1 min-h-0 md:w-3/5 lg:w-[58%] xl:w-[60%] min-w-0 md:overflow-y-scroll md:overflow-x-hidden md:flex-shrink-0 md:flex-none md:pl-2 lg:pl-4 xl:pl-6 md:items-center [scrollbar-gutter:stable]">
          <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-2xl  mx-auto flex flex-col md:flex-1 md:min-h-0 md:mr-4">
          {isMobile && (
            <>
              <MobileStepButtons
                selectedCaseType={selectedCaseType}
                selectedColor={selectedColor}
                onCaseClick={() => setMobileCurrentStep('case')}
                onColorClick={() => setMobileCurrentStep('color')}
                onCharmsClick={() => setMobileCurrentStep('charms')}
                onTextClick={() => setIsAddTextDropdownOpen((prev) => !prev)}
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
                  onAddText={handleMobileAddText}
                />
              )}
            </>
          )}

          <CharmsSelectionSection
            isOpen={isCharmsDropdownOpen}
            onToggle={() => setIsCharmsDropdownOpen((prev) => !prev)}
            pins={pins}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPins={selectedPins}
            onPinSelect={handlePinSelection}
            Products={productsWithQuantities}
            cart={cart}
          />

          <AddTextSection
            isOpen={isAddTextDropdownOpen}
            onToggle={() => setIsAddTextDropdownOpen((prev) => !prev)}
            customText={customText}
            setCustomText={setCustomText}
            customTextError={customTextError}
            setCustomTextError={setCustomTextError}
            customTextAdded={customTextAdded}
            setCustomTextAdded={setCustomTextAdded}
          />

          <CaseSelectionSection
            isOpen={isCaseDropdownOpen}
            onToggle={() => setIsCaseDropdownOpen((prev) => !prev)}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCase={selectedCase}
            onCaseSelect={handleCaseTypeSelection}
            onColorSelect={handleColorSelection}
            setIsCaseDropdownOpen={setIsCaseDropdownOpen}
            Products={productsWithQuantities}
            cart={cart}
          />

          <div className="md:mt-auto pt-6">
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

          <CaseSelectionSection
            isOpen={isCaseDropdownOpen}
            onToggle={() => setIsCaseDropdownOpen((prev) => !prev)}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCase={selectedCase}
            onCaseSelect={handleCaseTypeSelection}
            onColorSelect={handleColorSelection}
            setIsCaseDropdownOpen={setIsCaseDropdownOpen}
            Products={productsWithQuantities}
            cart={cart}
          />
          </div>
        </div>
      </div>

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
        handlePinSelection={handlePinSelection}
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
