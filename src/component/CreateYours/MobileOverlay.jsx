'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CaseSelectionSection from './CaseSelectionSection';
import { CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../../data/constants.js';
import { filterPinsByCategory } from '../../data/filterHelpers.js';
import { getMaxAvailableQuantity } from '../../utils/inventory.js';
import { normalizeImagePath } from '../../utils/imagePath.js';
import { getCaseLinePins } from '../../utils/cartHelpers.js';

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
  handlePinRemoveFromList,
  selectedCase,
  Products,
  cart,
  isCaseImageLoading = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visiblePinsCount, setVisiblePinsCount] = useState(24);
  const [loadedCharmImages, setLoadedCharmImages] = useState({});
  const charmsGridScrollRef = useRef(null);

  useEffect(() => {
    // Reset batching when user changes the viewed charm set
    setVisiblePinsCount(24);
  }, [selectedCategory, mobileSubCategory, mobileCurrentStep]);

  useEffect(() => {
    // Clear loaded-image tracking when charm set changes
    setLoadedCharmImages({});
  }, [selectedCategory, mobileSubCategory]);

  useLayoutEffect(() => {
    const scrollToTop = () => {
      if (charmsGridScrollRef.current) {
        charmsGridScrollRef.current.scrollTop = 0;
      }
    };
    scrollToTop();
    const raf = requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(scrollToTop);
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedCategory, mobileSubCategory]);

  if (!mobileCurrentStep) return null;

  const filteredPinsForMobile = filterPinsByCategory(pins, selectedCategory, mobileSubCategory);
  const visiblePinsForMobile = filteredPinsForMobile.slice(0, visiblePinsCount);

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  const filterTabs = getFilterTabs();
  const selectedFilterLabel = filterTabs.find(tab => tab.key === mobileSubCategory)?.label || 'ALL';

  const sheetTitle =
    mobileCurrentStep === 'case'
      ? 'Case & Color'
      : mobileCurrentStep === 'charms'
        ? 'Choose Charms'
        : '';

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end overscroll-contain">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={() => setMobileCurrentStep(null)}
        aria-label="Close options"
      />
      <div
        className="relative flex flex-col bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 max-h-[72vh] w-full"
        role="dialog"
        aria-modal="true"
        aria-label={sheetTitle}
      >
        <div className="flex-shrink-0 pt-2 pb-3 px-4 border-b border-gray-100">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-gray-200" aria-hidden="true" />
          <div className="flex justify-between items-center">
            <h2 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {sheetTitle}
            </h2>
            <button
              type="button"
              onClick={() => setMobileCurrentStep(null)}
              className="p-1 hover:bg-gray-50 rounded-md transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-3">
          {mobileCurrentStep === 'case' && (
            <CaseSelectionSection
              panelMode
              showOnMobile
              isOpen
              selectedCaseType={selectedCaseType}
              selectedColor={selectedColor}
              selectedCase={selectedCase}
              onCaseSelect={handleCaseTypeSelection}
              onColorSelect={handleColorSelection}
              Products={Products}
              cart={cart}
              isCaseImageLoading={isCaseImageLoading}
            />
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
                      className={`p-1.5 xs:p-2 text-[10px] xs:text-xs text-center transition-all duration-200 flex flex-col items-center gap-1.5 xs:gap-2 relative rounded-lg ${
                        selectedCategory === cat.value ? 'border-2 border-gray-900' : 'border-2 border-transparent'
                      }`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {cat.image && (
                        <div className={`w-16 h-16 xs:w-20 xs:h-20 flex-shrink-0 rounded flex items-center justify-center overflow-hidden relative ${
                          selectedCategory === cat.value ? '' : 'bg-white'
                        }`}>
                          <Image
                            src={normalizeImagePath(cat.image)}
                            alt={cat.label}
                            fill
                            sizes="(max-width: 640px) 64px, 80px"
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <span className="font-bold text-xs xs:text-sm">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Dropdown */}
              {selectedCategory && filterTabs.length > 0 && (
                <div className="mb-3 xs:mb-4 relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 xs:px-4 py-2 xs:py-2.5  border border-gray-300 text-left transition-all duration-200 hover:bg-gray-200 hover:border-gray-400"
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
                                ? ' text-gray-900 font-medium'
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
                
                  <div ref={charmsGridScrollRef} className="max-h-[60vh] xs:max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2 xs:gap-2.5 sm:gap-3">
                      {visiblePinsForMobile.map((pin, index) => {
                        const pinImageKey = pin.id ?? pin.src ?? `${pin.name}-${index}`;
                        const isSelected = selectedPins.some((p) => p.pin === pin);

                        // Check if charm is sold out and get inventory info for badges
                        const getCharmInventoryInfo = () => {
                          const charmCategory = pin.category || selectedCategory || 'colorful';
                          const charmName = pin.name || pin.src || '';

                          const product = {
                            type: 'charm',
                            category: charmCategory,
                            pin: pin,
                            name: charmName
                          };

                          const maxAvailable = getMaxAvailableQuantity(product, cart || []);

                          if (maxAvailable === null) {
                            return { isSoldOut: false, remainingAvailable: null, isLowStock: false };
                          }

                          const charmCountInDesign = selectedPins.filter(p => {
                            const pPin = p.pin || p;
                            const pPinName = pPin.name || pPin.src;
                            const pPinCategory = pPin.category || charmCategory;
                            return (pPinName === charmName || pPinName === pin.src) &&
                              pPinCategory === charmCategory;
                          }).length;

                          const remainingAvailable = Math.max(0, maxAvailable - charmCountInDesign);
                          let isSoldOut = maxAvailable === 0 || remainingAvailable === 0;

                          if (!isSoldOut) {
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
                            (cart || []).forEach((cartItem) => {
                              getCaseLinePins(cartItem).forEach((cartPin) => {
                                const cartPinName = cartPin.name || cartPin.src;
                                const cartPinCategory = cartPin.category || charmCategory;
                                if (
                                  (cartPinName === charmName || cartPinName === pin.src) &&
                                  cartPinCategory === charmCategory
                                ) {
                                  charmCountInCustomDesigns += cartItem.quantity || 1;
                                }
                              });
                            });

                            const totalInventory = maxAvailable + standaloneCharmsInCart;
                            const totalUsage = standaloneCharmsInCart + charmCountInCustomDesigns + charmCountInDesign;
                            isSoldOut = maxAvailable === 0 || totalUsage >= totalInventory;
                          }

                          const isLowStock = remainingAvailable > 0 && remainingAvailable < 3;
                          return { isSoldOut, remainingAvailable, isLowStock };
                        };

                        const { isSoldOut, remainingAvailable, isLowStock } = getCharmInventoryInfo();
                        
                        return (
                          <button
                            key={pin.id ?? `${pin.src}-${index}`}
                            onClick={() => !isSoldOut && handlePinSelection(pin)}
                            disabled={isSoldOut}
                            className={`p-1.5 xs:p-2 transition-all duration-200 flex flex-col items-center ${
                              isSoldOut ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            <div className={`relative w-16 h-16 xs:w-20 xs:h-20 flex items-center justify-center transition-all duration-200 overflow-visible rounded-lg p-0.5 ${isSelected && !isSoldOut ? 'border-2 border-gray-900' : 'border-2 border-transparent'}`}>
                              {!loadedCharmImages[pinImageKey] && (
                                <div className="absolute inset-0 rounded bg-gray-100 animate-pulse" aria-hidden="true" />
                              )}
                              <Image
                                src={normalizeImagePath(pin.src)}
                                alt={pin.name}
                                fill
                                sizes="(max-width: 640px) 64px, 80px"
                                className={`object-contain transition-opacity duration-200 ${
                                  loadedCharmImages[pinImageKey]
                                    ? (isSoldOut ? 'opacity-50' : 'opacity-100')
                                    : 'opacity-0'
                                }`}
                                loading="lazy"
                                onLoadingComplete={() => {
                                  setLoadedCharmImages((prev) => {
                                    if (prev[pinImageKey]) return prev;
                                    return { ...prev, [pinImageKey]: true };
                                  });
                                }}
                              />
                              {pin.badge && !isSoldOut && !isSelected && (
                                <div className="absolute top-0 right-0 bg-btn-primary-blue text-white text-[8px] xs:text-[9px] font-medium px-1 xs:px-1.5 py-0.5 rounded z-10 font-inter">
                                  {pin.badge}
                                </div>
                              )}
                              {isLowStock && !isSoldOut && remainingAvailable != null && (
                                <div className={`absolute right-0 bg-amber-500 text-white text-[8px] xs:text-[9px] font-medium px-1 xs:px-1.5 py-0.5 rounded z-10 font-inter ${pin.badge && !isSelected ? 'top-5' : 'top-0'}`}>
                                  {remainingAvailable === 1 ? 'Only 1 left' : `${remainingAvailable} available`}
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
                    {filteredPinsForMobile.length > visiblePinsCount && (
                      <div className="mt-3 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setVisiblePinsCount((prev) => prev + 24)}
                          className="px-4 py-2 text-xs xs:text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          Load more charms
                        </button>
                      </div>
                    )}
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


