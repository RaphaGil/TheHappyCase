import React from 'react';
import CaseSelector from './CaseSelector';
import ColorSelector from '../../../component/ColorSelector/index.jsx';
import PinSelector from '../../../component/PinSelector';
import CustomTextSection from './CustomTextSection';
import PriceSummary from './PriceSummary';
import Products from '../../../data/products.json';

const DesktopControls = ({
  isCaseDropdownOpen,
  isCharmsDropdownOpen,
  isAddTextDropdownOpen,
  setIsCaseDropdownOpen,
  setIsCharmsDropdownOpen,
  setIsAddTextDropdownOpen,
  selectedCaseType,
  selectedColor,
  selectedCase,
  selectedCategory,
  setSelectedCategory,
  pins,
  selectedPins,
  customText,
  setCustomText,
  customTextError,
  setCustomTextError,
  customTextAdded,
  setCustomTextAdded,
  handleCaseTypeSelection,
  handleColorSelection,
  handlePinSelection,
  productsWithQuantities,
  cart,
  // Price Summary props
  totalPrice,
  caseBasePrice,
  groupedPinsList,
  showPriceBreakdown,
  setShowPriceBreakdown,
  quantity,
  setQuantity,
  onIncrementQuantity,
  onDecrementQuantity,
  quantityError,
  charmInventoryError,
  selectedCaseImage,
  pinsPrice,
  onAddToCart,
  onShowTerms,
  inventoryMessage,
  inventoryType,
  agreedToTerms,
  setAgreedToTerms,
  showTermsError
}) => {
  return (
    <div 
      className={`w-full flex flex-col space-y-4 sm:space-y-6 hide-scrollbar ${
        isCaseDropdownOpen || isCharmsDropdownOpen || isAddTextDropdownOpen
          ? 'md:max-h-none md:overflow-visible'
          : 'md:max-h-[calc(100vh-200px)] md:overflow-y-auto'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {/* Passport Case Selection */}
      <div className="pb-6 border-b border-gray-100 flex-shrink-0 mt-6 overflow-visible">
        <button
          onClick={() => {
            setIsCharmsDropdownOpen(false);
            setIsAddTextDropdownOpen(false);
            setIsCaseDropdownOpen(!isCaseDropdownOpen);
          }}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            1. Choose Case
          </h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCaseDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCaseDropdownOpen && (
          <div className="space-y-6 overflow-visible">
            <CaseSelector
              selectedCaseType={selectedCaseType}
              onSelect={handleCaseTypeSelection}
              Products={Products}
              isCaseDropdownOpen={isCaseDropdownOpen}
              setIsCaseDropdownOpen={setIsCaseDropdownOpen}
              cart={cart}
            />
            
            {selectedColor && (
              <div className="mt-10 overflow-visible">
                <ColorSelector
                  colors={selectedCase?.colors || []}
                  selectedColor={selectedColor}
                  onSelect={handleColorSelection}
                  caseType={selectedCaseType}
                  cart={cart}
                />
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Charms Selection */}
      <div className="pb-6 border-b border-gray-100 mt-6">
        <button
          onClick={() => {
            setIsCaseDropdownOpen(false);
            setIsAddTextDropdownOpen(false);
            setIsCharmsDropdownOpen(!isCharmsDropdownOpen);
          }}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            3. Choose Charms
          </h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isCharmsDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCharmsDropdownOpen && (
          <div className="relative z-10">
            <PinSelector
              pins={pins}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedPins={selectedPins}
              onSelect={handlePinSelection}
              Products={Products}
              cart={cart}
            />
          </div>
        )}
      </div>
      
      {/* Personalized Text */}
      <div className="pb-6 border-b border-gray-100 mt-6">
        <button
          onClick={() => {
            setIsCaseDropdownOpen(false);
            setIsCharmsDropdownOpen(false);
            setIsAddTextDropdownOpen(!isAddTextDropdownOpen);
          }}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            4. Add Text
          </h3>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isAddTextDropdownOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isAddTextDropdownOpen && (
          <CustomTextSection
            customText={customText}
            setCustomText={setCustomText}
            customTextError={customTextError}
            setCustomTextError={setCustomTextError}
            customTextAdded={customTextAdded}
            setCustomTextAdded={setCustomTextAdded}
          />
        )}
      </div>
      
      {/* Price Summary */}
      <PriceSummary
        totalPrice={totalPrice}
        caseBasePrice={caseBasePrice}
        groupedPinsList={groupedPinsList}
        showPriceBreakdown={showPriceBreakdown}
        setShowPriceBreakdown={setShowPriceBreakdown}
        quantity={quantity}
        setQuantity={setQuantity}
        onIncrementQuantity={onIncrementQuantity}
        onDecrementQuantity={onDecrementQuantity}
        quantityError={quantityError}
        charmInventoryError={charmInventoryError}
        selectedCase={selectedCase}
        selectedCaseType={selectedCaseType}
        selectedColor={selectedColor}
        selectedPins={selectedPins}
        selectedCaseImage={selectedCaseImage}
        pinsPrice={pinsPrice}
        onAddToCart={onAddToCart}
        onShowTerms={onShowTerms}
        inventoryMessage={inventoryMessage}
        inventoryType={inventoryType}
        agreedToTerms={agreedToTerms}
        setAgreedToTerms={setAgreedToTerms}
        showTermsError={showTermsError}
      />
    </div>
  );
};

export default DesktopControls;

