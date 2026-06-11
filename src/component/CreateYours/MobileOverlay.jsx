'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ColorSelector from '../ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../../data/constants.js';
import { filterPinsByCategory } from '../../data/filterHelpers.js';
import { getMaxAvailableQuantity } from '../../utils/inventory.js';
import { normalizeImagePath } from '../../utils/imagePath.js';
import { getCaseLinePins } from '../../utils/cartHelpers.js';
import {
  OPTION_CHARM_FIELD,
  OPTION_CHARM_TOOLBAR,
  OPTION_FONT_STYLE,
  OPTION_SELECTION_CARD_ACTIVE,
  OPTION_SELECTION_CARD_INACTIVE,
} from './designOptionStyles';

const SearchIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ClearIcon = () => (
  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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
  cart,
  isCaseImageLoading = false
}) => {
  const [visiblePinsCount, setVisiblePinsCount] = useState(24);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [loadedCharmImages, setLoadedCharmImages] = useState({});
  const charmsGridScrollRef = useRef(null);

  useEffect(() => {
    // Reset batching when user changes the viewed charm set
    setVisiblePinsCount(24);
  }, [selectedCategory, mobileSubCategory, mobileSearchQuery, mobileCurrentStep]);

  useEffect(() => {
    // Clear loaded-image tracking when charm set changes
    setLoadedCharmImages({});
  }, [selectedCategory, mobileSubCategory, mobileSearchQuery]);

  useEffect(() => {
    setMobileSearchQuery('');
  }, [selectedCategory]);

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
  }, [selectedCategory, mobileSubCategory, mobileSearchQuery]);

  if (!mobileCurrentStep) return null;

  const filteredPinsForMobile = filterPinsByCategory(pins, selectedCategory, mobileSubCategory);
  const searchedPinsForMobile = mobileSearchQuery.trim()
    ? filteredPinsForMobile.filter((pin) =>
        (pin.name || '').toLowerCase().includes(mobileSearchQuery.trim().toLowerCase())
      )
    : filteredPinsForMobile;
  const visiblePinsForMobile = searchedPinsForMobile.slice(0, visiblePinsCount);

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  const filterTabs = getFilterTabs();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-contain">
      <div className={`bg-white rounded-sm p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 w-full overflow-y-auto border border-gray-200 ${
        mobileCurrentStep === 'charms' 
          ? 'max-w-[calc(100vw-1rem)] xs:max-w-sm md:max-w-md lg:max-w-lg h-fit' 
          : mobileCurrentStep === 'case'
          ? 'max-w-[calc(100vw-1rem)] xs:max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[85vh] xs:max-h-[80vh] md:max-h-[75vh]'
          : 'max-w-[calc(100vw-1rem)] xs:max-w-sm md:max-w-md lg:max-w-lg max-h-[85vh] xs:max-h-[80vh] md:max-h-[75vh]'
      }`}>
        <div className="flex justify-between items-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 border-b border-gray-100 pb-3 xs:pb-4 md:pb-5">
          <h2
            className={`uppercase tracking-wider text-gray-900 font-medium ${
              mobileCurrentStep === 'charms' ||
              mobileCurrentStep === 'case' ||
              mobileCurrentStep === 'color'
                ? 'text-[10px] xs:text-xs'
                : 'text-xs xs:text-sm md:text-base lg:text-lg'
            }`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {mobileCurrentStep === 'case' && 'Choose Case'}
            {mobileCurrentStep === 'color' && 'Choose Color'}
            {mobileCurrentStep === 'charms' && 'Choose Charms'}
          </h2>
          <button
            onClick={() => setMobileCurrentStep(null)}
            className="p-0.5 xs:p-1 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
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
                      className={`p-1.5 xs:p-2 text-center transition-all duration-200 flex flex-col items-center gap-1.5 xs:gap-2 rounded-lg ${
                        isSelected ? OPTION_SELECTION_CARD_ACTIVE : OPTION_SELECTION_CARD_INACTIVE
                      } ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {caseImage && (
                        <div className="relative w-full aspect-square overflow-hidden ">
                          <Image
                            src={normalizeImagePath(caseImage)}
                            alt={opt.label}
                            fill
                            sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 220px"
                            className={`w-full h-full object-contain p-0 xs:p-0.5 sm:p-1.5 md:p-3 lg:p-4 xl:p-5 ${soldOut ? 'opacity-50' : ''}`}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.visibility = 'hidden';
                            }}
                          />
                        </div>
                      )}
                      <span className={`text-[10px] xs:text-[11px] font-medium mt-0.5 xs:mt-1 ${soldOut ? 'text-gray-500' : ''}`}>
                        {opt.label}
                      </span>
                      {soldOut && (
                        <span className="text-[9px] xs:text-[10px] text-red-600 font-medium mt-0.5">Sold Out</span>
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
                isLoading={isCaseImageLoading}
              />
            </div>
          )}
          
          {mobileCurrentStep === 'charms' && selectedCaseType && selectedColor && (
            <div className="space-y-3 xs:space-y-4">
              <div className="grid grid-cols-3 gap-1.5 xs:gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.value || 'all'}
                      type="button"
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`p-1.5 xs:p-2 text-[10px] xs:text-xs text-center transition-all duration-200 flex flex-col items-center gap-1.5 xs:gap-2 relative rounded-lg ${
                        selectedCategory === cat.value
                          ? 'border border-gray-900 bg-gray-50 shadow-sm ring-1 ring-gray-900/10'
                          : 'border border-gray-100 hover:border-gray-200 hover:bg-gray-50/60'
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {cat.image && (
                        <div className="relative flex h-16 w-16 xs:h-20 xs:w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded">
                          <Image
                            src={normalizeImagePath(cat.image)}
                            alt={cat.label}
                            fill
                            sizes="(max-width: 640px) 64px, 80px"
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <span className="text-[10px] font-bold xs:text-[11px]">{cat.label}</span>
                    </button>
                  ))}
              </div>

              {selectedCategory && filterTabs.length > 0 && (
                <div>
                  <div className={`${OPTION_CHARM_TOOLBAR} flex flex-row gap-2`}>
                    <div className="relative min-w-0 flex-1">
                      <label htmlFor="mobile-charm-filter-select" className="sr-only">
                        Filter charms
                      </label>
                      <select
                        id="mobile-charm-filter-select"
                        value={mobileSubCategory}
                        onChange={(e) => setMobileSubCategory(e.target.value)}
                        className={`${OPTION_CHARM_FIELD} appearance-none pr-8`}
                        style={OPTION_FONT_STYLE}
                      >
                        {filterTabs.map(({ key, label }) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>

                    <div className="relative min-w-0 flex-1">
                      <label htmlFor="mobile-charm-search-input" className="sr-only">
                        Search charms
                      </label>
                      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon />
                      </span>
                      <input
                        id="mobile-charm-search-input"
                        type="search"
                        value={mobileSearchQuery}
                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                        placeholder="Search by name..."
                        className={`${OPTION_CHARM_FIELD} pl-8 pr-8 placeholder:text-gray-400`}
                        style={OPTION_FONT_STYLE}
                      />
                      {mobileSearchQuery.trim() && (
                        <button
                          type="button"
                          onClick={() => setMobileSearchQuery('')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 transition-colors hover:text-gray-700"
                          aria-label="Clear search"
                        >
                          <ClearIcon />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Charms Grid */}
              {selectedCategory && (
                <div>
                  {mobileSearchQuery.trim() && searchedPinsForMobile.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="text-xs font-medium text-gray-800" style={OPTION_FONT_STYLE}>
                        No charms found
                      </p>
                      <p className="mt-1 text-[10px] text-gray-500" style={OPTION_FONT_STYLE}>
                        Try another name, category, or clear your filters.
                      </p>
                    </div>
                  ) : (
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
                            <span className={`text-[10px] xs:text-[11px] text-center line-clamp-2 mt-0.5 xs:mt-1 ${
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
                    {searchedPinsForMobile.length > visiblePinsCount && (
                      <div className="mt-3 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setVisiblePinsCount((prev) => prev + 24)}
                          className="px-4 py-2 text-[10px] xs:text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                          Load more charms
                        </button>
                      </div>
                    )}
                  </div>
                  )}
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


