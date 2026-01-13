import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import AddToCartBtn from '../AddToCartBtn';

const PriceSummary = ({ 
  totalPrice, 
  caseBasePrice, 
  groupedPinsList, 
  showPriceBreakdown, 
  quantity,
  setQuantity,
  onIncrementQuantity,
  onDecrementQuantity,
  selectedCase,
  selectedCaseType,
  selectedColor,
  selectedPins,
  selectedCaseImage,
  pinsPrice,
  onAddToCart,
  onShowTerms,
  agreedToTerms,
  setAgreedToTerms,
  showTermsError,
  inventoryMessage,
  inventoryType,
  isMobile = false
}) => {
  const { formatPrice } = useCurrency();

  return (
      <div className={`${isMobile ? 'pt-0 mt-0 bg-gray-100' : 'pt-14'} flex-shrink-0 relative z-0  ${isMobile ? '' : 'mt-auto flex flex-col justify-between'}`}>
        {/* Mobile: Price + Quantity + Add to Cart in same row, then Terms below */}
        {isMobile ? (
          <>
            {/* Subtotal Price, Quantity Selector, and Add to Cart Button - All in same row */}
            <div className="flex flex-row items-start justify-between mt-2 ">
              {/* Subtotal Price and Terms - Left */}
              <div className="flex flex-col gap-1.5">
                {/* Total Price */}
                <div className="flex flex-row items-center gap-1.5 mb-1">
                  <h3 className="text-[14px] xs:text-sm text-gray-400 font-light font-inter">
                    Total:
                  </h3>
                  <h3 className={`text-md font-bold xs:text-base sm:text-lg text-gray-900  font-inter leading-none mb-1`}>
                    {formatPrice(totalPrice)}
                  </h3>
                </div>
                
                {/* Terms Agreement Checkbox - Below Total Price */}
                <div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms || false}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-900 border-gray-300 rounded"
                    />
                    <span className="text-xs xs:text-sm text-gray-700 leading-tight font-light font-inter">
                      <button
                        type="button"
                        onClick={onShowTerms}
                        className="text-gray-900 underline hover:text-gray-700 transition-colors font-light"
                      >
                        Terms of Use
                      </button>
                    </span>
                  </label>
                  {/* Error message when trying to add to cart without accepting terms */}
                  {showTermsError && (
                    <div className="mt-1 text-xs xs:text-sm text-red-600 font-light font-inter">
                      You must accept the terms to add items to cart.
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Selector and Add to Cart Button - Right */}
              <div className="flex flex-row items-center gap-2">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-200 rounded-sm py-2.5 xs:py-2 px-0.5 flex-shrink-0 gap-0"> 
                  <button
                    onClick={onDecrementQuantity || (() => setQuantity(Math.max(0, quantity - 1)))}
                    className="w-6 h-6 xs:w-7 xs:h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                  > 
                    −
                  </button>
                  <div className="px-1 xs:px-1.5 py-0.5 text-sm xs:text-base text-gray-900 font-light font-inter min-w-[1.5rem] xs:min-w-[2rem] text-center">
                    {Math.max(quantity, 1)}
                  </div>
                  <button
                    onClick={onIncrementQuantity || (() => setQuantity(quantity + 1))}
                    className="w-6 h-6 xs:w-7 xs:h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="flex-1 min-w-0 ">
                  <AddToCartBtn 
                    product={{
                      id: `custom-${Date.now()}`,
                      name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
                      caseType: selectedCaseType,
                      caseName: selectedCase?.name || 'Custom Case',
                      color: selectedColor,
                      pins: selectedPins.map(({ pin }) => pin),
                      pinsDetails: selectedPins.map(({ pin }) => pin),
                      basePrice: caseBasePrice,
                      casePrice: caseBasePrice,
                      pinsPrice: pinsPrice,
                      totalPrice: parseFloat(totalPrice),
                      price: parseFloat(totalPrice),
                      image: selectedCaseImage,
                      caseImage: selectedCaseImage,
                      customDesign: true,
                      quantity: quantity
                    }}
                    onAdd={onAddToCart}
                    className="!w-full cursor-pointer bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200 py-2.5 px-8 text-sm font-light whitespace-nowrap"
                    disabled={false}
                  />
                </div>
              </div>
            </div>
            
            {/* Inventory Alert Message - Mobile only, shown inline */}
            {inventoryMessage && (
              <div className={`mt-1.5 text-xs xs:text-sm font-light font-inter ${
                inventoryType === 'error' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {inventoryMessage}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Desktop: Price on top */}
            <div className={`flex items-end flex-row mb-4 gap-2`}>
              <h3 className={`text-sm text-gray-400 font-light  `}>
                Total: 
              </h3>
              <h3 className={`text-md font-bold text-gray-900 font-inter `}>
                {formatPrice(totalPrice)}
              </h3>
            </div>

            {/* Desktop: Terms Agreement Checkbox - Before Add to Cart */}
            <div className="mb-4 ">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms || false}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-gray-900 border-gray-300 rounded "
                />
                <span className="text-sm text-gray-700 leading-relaxed font-light font-inter">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={onShowTerms}
                    className="text-gray-900 underline hover:text-gray-700 transition-colors text-sm font-light"
                  >
                    Terms of Use
                  </button>
                  {' '}and understand that it is my responsibility to create the passport case design, and that as items are handmade, they may vary.
                </span>
              </label>
              {/* Error message when trying to add to cart without accepting terms */}
              {showTermsError && (
                <div className="mt-2 text-sm text-red-600 font-light font-inter">
                  You must accept the terms to add items to cart.
                </div>
              )}
            </div>

            {/* Desktop: Quantity selector and Add to Cart side by side - Pushed to bottom */}
            <div className={`mt-auto flex flex-row gap-1.5 xs:gap-2 items-center`}>
              <div className={`flex items-center border border-gray-200 rounded-sm py-2.5 px-1`}>
                <button
                  onClick={onDecrementQuantity || (() => setQuantity(Math.max(0, quantity - 1)))}
                  className={`w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors`}
                  aria-label="Decrease quantity"
                > 
                  −
                </button>
                <div className={`px-3 py-0 text-sm text-gray-900 font-light font-inter min-w-[2rem] text-center`}>
                  {Math.max(quantity, 1)}
                </div>
                <button
                  onClick={onIncrementQuantity || (() => setQuantity(quantity + 1))}
                  className={`w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors`}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
             
              <div className="flex-1">
                <AddToCartBtn 
                  product={{
                    id: `custom-${Date.now()}`,
                    name: `${selectedCase?.name || 'Custom Case'} with ${selectedPins.length} charms`,
                    caseType: selectedCaseType,
                    caseName: selectedCase?.name || 'Custom Case',
                    color: selectedColor,
                    pins: selectedPins.map(({ pin }) => pin),
                    pinsDetails: selectedPins.map(({ pin }) => pin),
                    basePrice: caseBasePrice,
                    casePrice: caseBasePrice,
                    pinsPrice: pinsPrice,
                    totalPrice: parseFloat(totalPrice),
                    price: parseFloat(totalPrice),
                    image: selectedCaseImage,
                    caseImage: selectedCaseImage,
                    customDesign: true,
                    quantity: quantity
                  }}
                  onAdd={onAddToCart}
                  className="cursor-pointer bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200 py-2.5 text-sm font-light"
                  disabled={false}
                />
              </div>
            </div>

            {/* Inventory Alert Message - Desktop */}
            {inventoryMessage && (
              <div className={`mt-4 text-sm font-light font-inter ${
                inventoryType === 'error' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {inventoryMessage}
              </div>
            )}
          </>
        )}
      
      {/* Price Breakdown Dropdown */}
      {showPriceBreakdown && (
        <div className={`space-y-1 ${isMobile ? 'text-xs xs:text-sm mb-1 pt-1' : 'text-xs mb-4 pt-4'} text-gray-600 border-t border-gray-100`}>
          <div className="flex justify-between font-light font-inter">
            <span>Case:</span>
            <span className="font-light font-inter">{formatPrice(caseBasePrice)}</span>
          </div>
          {groupedPinsList.map((pin, index) => (
            <div key={index} className="flex justify-between font-light font-inter">
              <span>{pin.name}{pin.count > 1 ? ` (x${pin.count})` : ''}:</span>
              <span className="font-light font-inter">{formatPrice(pin.price * pin.count)}</span>
            </div>
          ))}
        </div>
      )}
    
    </div>
  );
};

export default PriceSummary;

