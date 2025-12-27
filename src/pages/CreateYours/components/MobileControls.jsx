import React from 'react';
import MobileStepButtons from './MobileStepButtons';
import PriceSummary from './PriceSummary';
import { MAX_TEXT_LENGTH } from '../../../data/constants';

const MobileControls = ({
  mobileCurrentStep,
  setMobileCurrentStep,
  selectedCaseType,
  selectedColor,
  isAddTextDropdownOpen,
  setIsAddTextDropdownOpen,
  customText,
  setCustomText,
  customTextError,
  setCustomTextError,
  customTextAdded,
  setCustomTextAdded,
  handleMobileAddText,
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
  selectedCase,
  selectedPins,
  selectedCaseImage,
  pinsPrice,
  onAddToCart,
  onShowTerms,
  agreedToTerms,
  setAgreedToTerms,
  showTermsError,
  setShowTermsError,
  inventoryMessage,
  inventoryType
}) => {
  return (
    <>
      {/* Fixed Mobile Step Buttons */}
      <div className="fixed left-0 right-0 z-30 bg-white md:hidden w-full" style={{bottom: 'calc(80px + 0.5rem)'}}>
        <div className="px-3 py-1.5">
          <MobileStepButtons
            mobileCurrentStep={mobileCurrentStep}
            setMobileCurrentStep={setMobileCurrentStep}
            selectedCaseType={selectedCaseType}
            selectedColor={selectedColor}
          />
          
          {/* Add Text Section */}
          <div className="mt-2">
            <button
              onClick={() => setIsAddTextDropdownOpen(!isAddTextDropdownOpen)}
              className="w-full flex items-center justify-between mb-1.5 px-2 py-1.5 text-left"
            >
              <span className="text-[10px] uppercase tracking-wide text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
                Add Text
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isAddTextDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isAddTextDropdownOpen && (
              <div className="space-y-1.5 pt-1.5">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => {
                      setCustomText(e.target.value);
                      setCustomTextError('');
                      setCustomTextAdded(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && customText.trim()) {
                        handleMobileAddText();
                      }
                    }}
                    placeholder="e.g. Your name"
                    className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300 focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400"
                    style={{ fontSize: '16px' }}
                    maxLength={MAX_TEXT_LENGTH}
                  />
                  <button
                    onClick={handleMobileAddText}
                    disabled={!customText.trim()}
                    className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed border border-gray-300 disabled:border-gray-200 bg-white hover:bg-gray-50 text-gray-900 transition-colors"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    Add
                  </button>
                </div>
                {customTextError && (
                  <div className="text-[10px] text-gray-600 border border-gray-200 bg-gray-50 px-2 py-1.5">
                    {customTextError}
                  </div>
                )}
                {customTextAdded && (
                  <div className="text-[10px] text-gray-600 border border-gray-200 bg-gray-50 px-2 py-1.5">
                    Text added. Double-tap to edit.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fixed Price Summary */}
      <div className="fixed left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden max-h-[55vh] overflow-y-auto w-full safe-area-inset-bottom" style={{bottom: '0', paddingBottom: 'calc(env(safe-area-inset-bottom) + 0.5rem)'}}>
        <div className="px-4 py-3">
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
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={(value) => {
              setAgreedToTerms(value);
              if (value) {
                setShowTermsError(false);
              }
            }}
            showTermsError={showTermsError}
            inventoryMessage={inventoryMessage}
            inventoryType={inventoryType}
            isMobile={true}
          />
        </div>
      </div>
    </>
  );
};

export default MobileControls;
