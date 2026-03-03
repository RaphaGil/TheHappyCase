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
    <div className="min-h-screen bg-white flex flex-col">
      <CreateYoursHeader />

      <div className="flex flex-col md:flex-row flex-1 w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
        <div className="flex flex-col md:w-1/2">
          <CanvasSection
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedCaseImage={selectedCaseImage}
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

        <div className="flex flex-col md:w-1/2 md:pl-6 lg:pl-8 md:border-l md:border-gray-100">
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
