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
          <div className="mt-3">
            <button
              onClick={() => setIsAddTextDropdownOpen(!isAddTextDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 mb-2 text-left bg-gray-50 hover:bg-gray-100 active:bg-gray-200  transition-colors duration-200 border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-xs uppercase tracking-wide text-gray-900 font-semibold" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Add Text
                </span>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isAddTextDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isAddTextDropdownOpen && (
              <div className="space-y-2.5 pt-2 border-t border-gray-200">
                <div className="flex gap-2">
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
                    className="flex-1 px-3 py-2.5 text-base border border-gray-300 focus:outline-none focus:border-btn-primary-blue focus:ring-2 focus:ring-btn-primary-blue focus:ring-opacity-20 bg-white text-gray-900 placeholder-gray-400  transition-all duration-200"
                    style={{ fontSize: '16px' }}
                    maxLength={MAX_TEXT_LENGTH}
                  />
                  <button
                    onClick={handleMobileAddText}
                    disabled={!customText.trim()}
                    className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-2 border-btn-primary-blue disabled:border-gray-300 bg-btn-primary-blue hover:bg-btn-primary-blue-hover text-white transition-all duration-200  active:scale-95 disabled:scale-100"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500 px-1">
                  Up to {MAX_TEXT_LENGTH} characters. Double-tap to edit.
                </p>
                {customTextError && (
                  <div className="text-xs text-red-700 border-2 border-red-200 bg-red-50 px-3 py-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {customTextError}
                  </div>
                )}
                {customTextAdded && (
                  <div className="text-xs text-green-700 border-2 border-green-200 bg-green-50 px-3 py-2  flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
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
