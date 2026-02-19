'use client';

import React, { useState } from 'react';
import ColorSelector from '../ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../../data/constants.js';
import { filterPinsByCategory } from '../../data/filterHelpers.js';
import { getMaxAvailableQuantity } from '../../utils/inventory.js';
import { normalizeImagePath } from '../../utils/imagePath.js';

const MobileOverlay = ({
  mobileCurrentStep,
  setMobileCurrentStep,
  selectedCaseType,
  selectedColor,
  selectedCategory,
  setSelectedCategory,
  mobileSubCategory,
  setMobileSubCategory,
  pins,
  selectedPins,
  handleCaseTypeSelection,
  handleColorSelection,
  handlePinSelection,
  Products,
  cart
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!mobileCurrentStep) return null;

  const filteredPinsForMobile = filterPinsByCategory(pins, selectedCategory, mobileSubCategory);

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  const filterTabs = getFilterTabs();
  const selectedFilterLabel = filterTabs.find(tab => tab.key === mobileSubCategory)?.label || 'ALL';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6">
      <div className={`bg-white rounded-sm p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full overflow-y-auto border border-gray-200 ${
        mobileCurrentStep === 'charms' 
          ? 'max-w-[calc(100vw-1rem)] xs:max-w-sm md:max-w-md lg:max-w-lg h-fit' 
          : mobileCurrentStep === 'case'
          ? 'max-w-[calc(100vw-1rem)] xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[85vh] xs:max-h-[80vh] md:max-h-[75vh]'
          : 'max-w-[calc(100vw-1rem)] xs:max-w-sm md:max-w-md lg:max-w-lg max-h-[85vh] xs:max-h-[80vh] md:max-h-[75vh]'
      }`}>
        <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 border-b border-gray-100 pb-3 xs:pb-4 md:pb-5">
          <h2 className="text-xs xs:text-sm md:text-base lg:text-lg uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            {mobileCurrentStep === 'case' && 'Choose Case'}
            {mobileCurrentStep === 'color' && 'Choose Color'}
            {mobileCurrentStep === 'charms' && 'Choose Charms'}
          </h2>
          <button
            onClick={() => setMobileCurrentStep(null)}
            className="p-0.5 xs:p-1 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Step Content */}
        <div className="space-y-3 xs:space-y-4 md:space-y-5">
          {mobileCurrentStep === 'case' && (
            <div className="w-full">
              <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3 md:gap-5 lg:gap-6 xl:gap-8">
                {CASE_OPTIONS.map((opt) => {
                  // Get case image from Products or use fallback
                  const getCaseImage = () => {
                    if (Products && Products.cases) {
                      const caseData = Products.cases.find(c => c.type === opt.value);
                      if (caseData && caseData.colors && caseData.colors.length > 0) {
                        return caseData.colors[0].image;
                      }
                    }
                    return opt.image || null;
                  };
                  
                  // Check if case is sold out
                  // Shows "Sold Out" if no more items can be added to the basket
                  const isCaseTypeSoldOut = () => {
                    const caseData = Products && Products.cases ? Products.cases.find(c => c.type === opt.value) : null;
                    if (!caseData) return false;
                    
                    // Note: We check inventory through getMaxAvailableQuantity below
                    // which properly handles localStorage quantities, product data, and cart items
                    // to determine if cases can be added to the basket
                    
                    // Check if all colors are sold out (considering cart inventory)
                    // This uses getMaxAvailableQuantity which checks both color-level and case-level quantities
                    if (caseData.colors && caseData.colors.length > 0) {
                      // Check if at least one color has available inventory that can be added to basket
                      // This considers items already in the basket/cart
                      const hasAvailableColor = caseData.colors.some(color => {
                        // Check available inventory considering cart (items in basket)
                        // getMaxAvailableQuantity returns how many MORE can be added to the basket
                        // It checks: color-level quantity -> case-level quantity -> product data
                        // Returns: null (unlimited), > 0 (can add more), or 0 (cannot add any more)
                        const productForInventory = {
                          caseType: opt.value,
                          color: color.color,
                        };
                        const maxAvailable = getMaxAvailableQuantity(productForInventory, cart || []);
                        
                        // If maxAvailable is null, it means unlimited inventory (can add to basket)
                        // If maxAvailable > 0, there's inventory available (can add to basket)
                        // If maxAvailable === 0, no more can be added (all in basket or sold out) - SOLD OUT
                        return maxAvailable === null || maxAvailable > 0;
                      });
                      
                      // If no color has available inventory (maxAvailable === 0 for all colors), 
                      // it means no cases can be added to the basket - show as SOLD OUT
                      return !hasAvailableColor;
                    }
                    
                    return false;
                  };
                  
                  const caseImage = getCaseImage();
                  const soldOut = isCaseTypeSoldOut();
                  const isSelected = selectedCaseType === opt.value;
                  
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        if (!soldOut) {
                          handleCaseTypeSelection(opt.value);
                        }
                      }}
                      disabled={soldOut}
                      className={`p-0.5 xs:p-1 sm:p-2.5 md:p-4 lg:p-5 xl:p-6 text-center transition-all duration-200 flex flex-col items-center gap-0.5 xs:gap-1 sm:gap-2 md:gap-3 lg:gap-4 ${
                        selectedCaseType === opt.value
                          ? ' text-gray-900'
                          : ' hover:border-gray-300'
                      } ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {caseImage && (
                        <div className="relative w-full aspect-square overflow-hidden ">
                          <img
                            src={normalizeImagePath(caseImage)}
                            alt={opt.label}
                            className={`w-full h-full object-contain p-0 xs:p-0.5 sm:p-1.5 md:p-3 lg:p-4 xl:p-5 ${soldOut ? 'opacity-50' : ''}`}
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          {isSelected && !soldOut && (
                            <div className="absolute top-0.5 right-0.5 xs:top-1 xs:right-1 sm:top-1.5 sm:right-1.5 md:top-2 md:right-2 lg:top-3 lg:right-3 xl:top-4 xl:right-4 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 bg-gray-900 rounded-full flex items-center justify-center shadow-md">
                              <svg className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                      <span className={`text-xs xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-xl font-medium mt-0.5 xs:mt-1 md:mt-2 ${soldOut ? 'text-gray-500' : ''}`}>
                        {opt.label}
                      </span>
                      {soldOut && (
                        <span className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs text-red-600 font-medium mt-0.5 xs:mt-1">Sold Out</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {mobileCurrentStep === 'color' && selectedCaseType && (
            <div>
              <ColorSelector
                colors={Products.cases.find(c => c.type === selectedCaseType)?.colors || []}
                selectedColor={selectedColor}
                onSelect={handleColorSelection}
                caseType={selectedCaseType}
                cart={cart}
              />
            </div>
          )}
          
          {mobileCurrentStep === 'charms' && selectedCaseType && selectedColor && (
            <div>
              {/* Category Selection */}
              <div className="mb-3 xs:mb-4">
                <div className="grid grid-cols-3 gap-1.5 xs:gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.value || 'all'}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`p-1.5 xs:p-2 text-[10px] xs:text-xs text-center transition-all duration-200 flex flex-col items-center gap-1.5 xs:gap-2 relative`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {cat.image && (
                        <div className={`w-16 h-16 xs:w-20 xs:h-20 flex-shrink-0 rounded flex items-center justify-center overflow-hidden relative ${
                          selectedCategory === cat.value ? 'bg-gray-100' : 'bg-white'
                        }`}>
                          <img
                            src={normalizeImagePath(cat.image)}
                            alt={cat.label}
                            className="w-full h-full object-contain"
                          />
                          {selectedCategory === cat.value && (
                            <div className="absolute top-0 right-0 bg-gray-900 text-white w-4 h-4 xs:w-5 xs:h-5 flex items-center justify-center rounded-full shadow-md">
                              <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                      <span className="font-medium text-xs xs:text-sm">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Dropdown */}
              {selectedCategory && filterTabs.length > 0 && (
                <div className="mb-3 xs:mb-4 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 xs:px-4 py-2 xs:py-2.5 bg-gray-100 border border-gray-300 text-left transition-all duration-200 hover:bg-gray-200 hover:border-gray-400"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    <span className="text-xs xs:text-sm font-medium text-gray-900 uppercase tracking-wider">
                      {selectedFilterLabel}
                    </span>
                    <svg 
                      className={`w-4 h-4 xs:w-5 xs:h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      {/* Dropdown Menu */}
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                        {filterTabs.map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => {
                              setMobileSubCategory(key);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm uppercase tracking-wider transition-all duration-200 ${
                              mobileSubCategory === key
                                ? 'bg-gray-100 text-gray-900 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            style={{fontFamily: "'Poppins', sans-serif"}}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Charms Grid */}
              {selectedCategory && (
                <div>
                
                  <div className="max-h-[60vh] xs:max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3">
                      {filteredPinsForMobile.map((pin) => {
                        const isSelected = selectedPins.some((p) => p.pin === pin);
                        // Get size label based on pin.size from products.json
                        const getSizeLabel = (size) => {
                          if (!size) return '';
                          if (size <= 0.3) return 'XS';
                          if (size <= 0.45) return 'S';
                          if (size <= 0.6) return 'M';
                          if (size <= 0.75) return 'L';
                          return 'XL';
                        };
                        const sizeLabel = getSizeLabel(pin.size);
                        
                        // Check if charm is sold out
                        const checkCharmSoldOut = () => {
                          const charmCategory = pin.category || selectedCategory || 'colorful';
                          const charmName = pin.name || pin.src || '';
                          
                          const product = {
                            type: 'charm',
                            category: charmCategory,
                            pin: pin,
                            name: charmName
                          };
                          
                          const maxAvailable = getMaxAvailableQuantity(product, cart || []);
                          
                          // If no inventory limit, not sold out
                          if (maxAvailable === null) {
                            return false;
                          }
                          
                          // Count standalone charms already in cart
                          let standaloneCharmsInCart = 0;
                          (cart || []).forEach(cartItem => {
                            if (cartItem.type === 'charm') {
                              const cartPin = cartItem.pin || cartItem;
                              const cartPinName = cartPin.name || cartPin.src;
                              const cartPinCategory = cartPin.category || cartItem.category || charmCategory;
                              if ((cartPinName === charmName || cartPinName === pin.src) && 
                                  cartPinCategory === charmCategory) {
                                standaloneCharmsInCart += (cartItem.quantity || 1);
                              }
                            }
                          });
                          
                          // Count how many of this charm are in custom designs already in cart
                          let charmCountInCustomDesigns = 0;
                          (cart || []).forEach(cartItem => {
                            if (cartItem.pins && Array.isArray(cartItem.pins)) {
                              cartItem.pins.forEach(cartPin => {
                                const cartPinName = cartPin.name || cartPin.src;
                                const cartPinCategory = cartPin.category || charmCategory;
                                if ((cartPinName === charmName || cartPinName === pin.src) && 
                                    cartPinCategory === charmCategory) {
                                  charmCountInCustomDesigns += (cartItem.quantity || 1);
                                }
                              });
                            }
                          });
                          
                          // Count how many of this charm are already selected in the current design
                          const charmCountInDesign = selectedPins.filter(p => {
                            const pPin = p.pin || p;
                            const pPinName = pPin.name || pPin.src;
                            const pPinCategory = pPin.category || charmCategory;
                            return (pPinName === charmName || pPinName === pin.src) && 
                                   pPinCategory === charmCategory;
                          }).length;
                          
                          // Calculate total inventory: maxAvailable + standalone charms in cart
                          const totalInventory = maxAvailable + standaloneCharmsInCart;
                          
                          // Calculate total usage: standalone + in custom designs + in current design
                          const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign;
                          
                          // Sold out if maxAvailable is 0 or total usage equals or exceeds total inventory
                          return maxAvailable === 0 || totalUsage >= totalInventory;
                        };
                        
                        const isSoldOut = checkCharmSoldOut();
                        
                        return (
                          <button
                            key={pin.name}
                            onClick={() => !isSoldOut && handlePinSelection(pin)}
                            disabled={isSoldOut}
                            className={`p-1.5 xs:p-2 transition-all duration-200 flex flex-col items-center ${
                              isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <div className={`relative w-16 h-16 xs:w-20 xs:h-20 flex items-center justify-center transition-all duration-200 overflow-visible ${isSelected ? 'rounded' : ''}`}>
                              <img
                                src={normalizeImagePath(pin.src)}
                                alt={pin.name}
                                className={`max-w-full max-h-full object-contain ${isSoldOut ? 'opacity-50' : ''}`}
                              />
                              {isSelected && !isSoldOut && (
                                <div className="absolute top-0 right-0 bg-gray-900 text-white w-5 h-5 xs:w-6 xs:h-6 flex items-center justify-center text-[10px] xs:text-xs rounded-full shadow-md z-10">
                                  <svg className="w-3 h-3 xs:w-4 xs:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                              {sizeLabel && (
                                <div className="absolute top-0 left-0 bg-gray-100 text-gray-700 text-[8px] xs:text-[9px] font-medium px-1 xs:px-1.5 py-0.5 rounded-full z-10 border border-gray-300">
                                  {sizeLabel}
                                </div>
                              )}
                            </div>
                            <span className={`text-xs xs:text-sm sm:text-base text-center line-clamp-2 mt-0.5 xs:mt-1 ${
                              isSoldOut ? 'text-gray-500' : 'text-gray-700'
                            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
                              {pin.name}
                            </span>
                            {isSoldOut && (
                              <span className="text-[8px] xs:text-[9px] text-red-600 font-medium mt-0.5">Sold Out</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;


