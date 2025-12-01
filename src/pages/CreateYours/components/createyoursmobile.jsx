import React from 'react';
import { useNavigate } from 'react-router-dom';
import Canvas from '../../../component/Canvas/index.jsx';
import MobileStepButtons from './MobileStepButtons';
import MobileOverlay from './MobileOverlay';
import PriceSummary from './PriceSummary';

const CreateYoursMobile = ({
  selectedCaseType,
  selectedColor,
  mobileCurrentStep,
  setMobileCurrentStep,
  selectedCategory,
  setSelectedCategory,
  mobileSubCategory,
  setMobileSubCategory,
  pins,
  selectedPins,
  handleCaseTypeSelection,
  handleColorSelection,
  handlePinSelection,
  handlePinSelect,
  handlePinRemove,
  handleSaveImageFunction,
  productsWithQuantities,
  Products,
  totalPrice,
  caseBasePrice,
  groupedPinsList,
  showPriceBreakdown,
  setShowPriceBreakdown,
  quantity,
  setQuantity,
  selectedCase,
  selectedCaseImage,
  pinsPrice,
  handleAddToCart,
  showTermsModal,
  setShowTermsModal,
  agreedToTerms,
  setAgreedToTerms,
  showTermsError,
  setShowTermsError,
  bottomSectionRef
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Div 1: Title Section */}
      <div className="relative  bg-white  px-4 py-4">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-title font-light text-gray-900 tracking-title text-center mt-6">
          CREATE YOURS
        </h1>
      </div>

      {/* Div 2: Canvas Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[240px] flex items-center justify-center" style={{touchAction: 'none'}}>
          <Canvas
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            onPinSelect={handlePinSelect}
            onPinRemove={handlePinRemove}
            onSaveImage={handleSaveImageFunction}
            products={Products}
          />
        </div>
      </div>

      {/* Div 3: Buttons Section */}
      <div className=" bg-white  px-4">
        <MobileStepButtons
          mobileCurrentStep={mobileCurrentStep}
          setMobileCurrentStep={setMobileCurrentStep}
          selectedCaseType={selectedCaseType}
          selectedColor={selectedColor}
        />
        
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
        />
      </div>

      {/* Div 4: Add to Cart Area */}
      <div 
        ref={bottomSectionRef}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <PriceSummary
            totalPrice={totalPrice}
            caseBasePrice={caseBasePrice}
            groupedPinsList={groupedPinsList}
            showPriceBreakdown={showPriceBreakdown}
            setShowPriceBreakdown={setShowPriceBreakdown}
            quantity={quantity}
            setQuantity={setQuantity}
            selectedCase={selectedCase}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
            selectedPins={selectedPins}
            selectedCaseImage={selectedCaseImage}
            pinsPrice={pinsPrice}
            onAddToCart={handleAddToCart}
            onShowTerms={() => setShowTermsModal(true)}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={(value) => {
              setAgreedToTerms(value);
              if (value) {
                setShowTermsError(false);
              }
            }}
            showTermsError={showTermsError}
            isMobile={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateYoursMobile;
