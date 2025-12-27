import React, { useState } from 'react';
import ColorSelector from '../../../component/ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../../../data/constants';
import { filterPinsByCategory } from '../../../data/filterHelpers';
import { getMaxAvailableQuantity } from '../../../utils/inventory';

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={() => setMobileCurrentStep(null)}
    >
      <div 
        className={`bg-white rounded-lg p-4 w-full overflow-y-auto border border-gray-200 ${
          mobileCurrentStep === 'charms' 
            ? 'max-w-sm h-fit max-h-[90vh]' 
            : mobileCurrentStep === 'case'
            ? 'max-w-sm sm:max-w-md max-h-[90vh]'
            : 'max-w-sm max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
          <h2 className="text-sm uppercase tracking-wide text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            {mobileCurrentStep === 'case' && 'Choose Case'}
            {mobileCurrentStep === 'color' && 'Choose Color'}
            {mobileCurrentStep === 'charms' && 'Choose Charms'}
          </h2>
          <button
            onClick={() => setMobileCurrentStep(null)}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          {mobileCurrentStep === 'case' && (
            <div className="grid grid-cols-3 gap-3">
              {CASE_OPTIONS.map((opt) => {
                const getCaseImage = () => {
                  if (Products && Products.cases) {
                    const caseData = Products.cases.find(c => c.type === opt.value);
                    if (caseData && caseData.colors && caseData.colors.length > 0) {
                      return caseData.colors[0].image;
                    }
                  }
                  return opt.image || null;
                };
                
                const isCaseTypeSoldOut = () => {
                  const caseData = Products && Products.cases ? Products.cases.find(c => c.type === opt.value) : null;
                  if (!caseData) return false;
                  
                  if (caseData.colors && caseData.colors.length > 0) {
                    const hasAvailableColor = caseData.colors.some(color => {
                      const productForInventory = {
                        caseType: opt.value,
                        color: color.color,
                      };
                      const maxAvailable = getMaxAvailableQuantity(productForInventory, cart || []);
                      return maxAvailable === null || maxAvailable > 0;
                    });
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
                    className={`p-2 text-center flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'bg-gray-100'
                        : soldOut
                        ? 'opacity-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {caseImage && (
                      <div className="relative w-full aspect-square">
                        <img
                          src={caseImage}
                          alt={opt.label}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                    <span className={`text-[10px] font-medium ${soldOut ? 'text-gray-400' : 'text-gray-700'}`}>
                      {opt.label}
                    </span>
                    {soldOut && (
                      <span className="text-[9px] text-gray-400">Sold Out</span>
                    )}
                  </button>
                );
              })}
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
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    return (
                      <button
                        key={cat.value || 'all'}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`p-2 flex flex-col items-center gap-2 ${
                          isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        {cat.image && (
                          <div className="relative w-16 h-16 flex items-center justify-center">
                            <img
                              src={cat.image}
                              alt={cat.label}
                              className="w-full h-full object-contain"
                            />
                            {isSelected && (
                              <div className="absolute top-0 right-0 w-3 h-3 bg-gray-900 rounded-full flex items-center justify-center">
                                <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <span className={`text-[10px] font-medium ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Dropdown */}
              {selectedCategory && filterTabs.length > 0 && (
                <div className="mb-4 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-300 text-left"
                  >
                    <span className="text-xs uppercase tracking-wide text-gray-900 font-medium">
                      {selectedFilterLabel}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 max-h-60 overflow-y-auto">
                        {filterTabs.map(({ key, label }) => (
                          <button
                            key={key}
                            onClick={() => {
                              setMobileSubCategory(key);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wide ${
                              mobileSubCategory === key
                                ? 'bg-gray-100 text-gray-900 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
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
                <div className="max-h-[60vh] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-3">
                    {filteredPinsForMobile.map((pin) => {
                      const isSelected = selectedPins.some((p) => p.pin === pin);
                      const getSizeLabel = (size) => {
                        if (!size) return '';
                        if (size <= 0.3) return 'XS';
                        if (size <= 0.45) return 'S';
                        if (size <= 0.6) return 'M';
                        if (size <= 0.75) return 'L';
                        return 'XL';
                      };
                      const sizeLabel = getSizeLabel(pin.size);
                      
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
                        if (maxAvailable === null) return false;
                        
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
                        
                        const charmCountInDesign = selectedPins.filter(p => {
                          const pPin = p.pin || p;
                          const pPinName = pPin.name || pPin.src;
                          const pPinCategory = pPin.category || charmCategory;
                          return (pPinName === charmName || pPinName === pin.src) && 
                                 pPinCategory === charmCategory;
                        }).length;
                        
                        const totalInventory = maxAvailable + standaloneCharmsInCart;
                        const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign;
                        
                        return maxAvailable === 0 || totalUsage >= totalInventory;
                      };
                      
                      const isSoldOut = checkCharmSoldOut();
                      
                      return (
                        <button
                          key={pin.name}
                          onClick={() => !isSoldOut && handlePinSelection(pin)}
                          disabled={isSoldOut}
                          className={`p-2 flex flex-col items-center ${
                            isSelected
                              ? 'bg-gray-100'
                              : isSoldOut
                              ? 'opacity-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            <img
                              src={pin.src}
                              alt={pin.name}
                              className="max-w-full max-h-full object-contain"
                            />
                            {isSelected && (
                              <div className="absolute top-0 right-0 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                            {sizeLabel && (
                              <div className="absolute top-0 left-0 bg-gray-100 text-gray-600 text-[8px] font-medium px-1 py-0.5 rounded">
                                {sizeLabel}
                              </div>
                            )}
                          </div>
                          <span className={`text-[10px] text-center line-clamp-2 mt-1 ${
                            isSoldOut ? 'text-gray-400' : 'text-gray-700'
                          }`}>
                            {pin.name}
                          </span>
                          {isSoldOut && (
                            <span className="text-[9px] text-gray-400 mt-0.5">Sold Out</span>
                          )}
                        </button>
                      );
                    })}
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
