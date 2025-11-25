import React, { useState, useRef, useEffect, useMemo } from 'react';
import ColorSelector from '../../../component/ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../../../data/constants.js';
import { filterPinsByCategory } from '../filterHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  Products
}) => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef(null);

  // Close dropdown when clicking outside (only when dropdown is open)
  useEffect(() => {
    if (!isFilterDropdownOpen) return;

    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };

    // Use setTimeout to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterDropdownOpen]);

  // Filter pins by subcategory - recalculate when pins, selectedCategory, or mobileSubCategory changes
  // Must be before early return to follow React hooks rules
  const filteredPinsForMobile = useMemo(() => {
    if (!mobileCurrentStep || mobileCurrentStep === 'text') return [];
    if (!pins || pins.length === 0) return [];
    if (!selectedCategory) return pins;
    
    // If 'all' is selected, return all pins for the category
    if (mobileSubCategory === 'all') {
      return pins;
    }
    
    // Otherwise, filter by subcategory
    return filterPinsByCategory(pins, selectedCategory, mobileSubCategory);
  }, [pins, selectedCategory, mobileSubCategory, mobileCurrentStep]);

  // Don't show overlay for 'text' step - it's handled inline in the bottom section
  if (!mobileCurrentStep || mobileCurrentStep === 'text') return null;

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  const filterTabs = getFilterTabs();
  const selectedFilterTab = filterTabs.find(tab => tab.key === mobileSubCategory);

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 ${
        mobileCurrentStep === 'charms' ? 'z-[60]' : 'z-50'
      }`}
      onClick={() => setMobileCurrentStep(null)}
    >
      <div 
        className={`bg-white rounded-lg shadow-lg flex flex-col w-full max-w-sm ${
          mobileCurrentStep === 'charms' 
            ? 'max-h-[90vh]' 
            : 'max-h-[85vh] h-fit'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-900 font-light" style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
            {mobileCurrentStep === 'case' && 'Choose Case'}
            {mobileCurrentStep === 'color' && 'Choose Color'}
            {mobileCurrentStep === 'charms' && 'Choose Charms'}
          </h2>
          <button
            onClick={() => setMobileCurrentStep(null)}
            className="p-1.5 hover:bg-gray-50 rounded transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Step Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {mobileCurrentStep === 'case' && (
            <div>
              <div className="grid grid-cols-3 gap-3">
                {CASE_OPTIONS.map((opt) => {
                  const caseData = Products.cases.find(c => c.type === opt.value);
                  const caseImage = caseData && caseData.colors && caseData.colors.length > 0 
                    ? caseData.colors[0].image 
                    : null;
                  const isCaseSoldOut = () => {
                    if (!caseData) return false;
                    // Check case-level quantity
                    if (caseData.quantity !== undefined && caseData.quantity === 0) {
                      return true;
                    }
                    // Check if all colors are sold out
                    if (caseData.colors && caseData.colors.length > 0) {
                      return caseData.colors.every(color => 
                        color.quantity !== undefined && color.quantity === 0
                      );
                    }
                    return false;
                  };
                  const soldOut = isCaseSoldOut();
                  
                  return (
                    <div key={opt.value} className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => !soldOut && handleCaseTypeSelection(opt.value)}
                        disabled={soldOut}
                        className={`p-2.5 flex flex-col items-center gap-2 w-full rounded-lg transition-colors ${
                          selectedCaseType === opt.value
                            ? 'bg-gray-50'
                            : 'hover:bg-gray-50'
                        } ${soldOut ? 'opacity-40 cursor-not-allowed' : ''}`}
                        style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                      >
                        {caseImage && (
                          <div className="relative flex items-center justify-center rounded" style={{ width: '5rem', height: '5rem', overflow: 'visible' }}>
                            <img
                              src={caseImage}
                              alt={opt.label}
                              className={`max-w-full max-h-full object-contain ${soldOut ? 'opacity-50' : ''}`}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            {selectedCaseType === opt.value && !soldOut && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-sm">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <span className={`text-xs text-center line-clamp-2 font-light ${
                          selectedCaseType === opt.value ? 'text-gray-900' : 'text-gray-600'
                        }`} style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>{opt.label}</span>
                      </button>
                      {soldOut && (
                        <span className="text-[10px] text-gray-400 font-light">Sold Out</span>
                      )}
                    </div>
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
              />
            </div>
          )}
          
          {mobileCurrentStep === 'charms' && selectedCaseType && selectedColor && (
            <div className="space-y-3">
              {/* Category Selection */}
              <div>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORY_OPTIONS.map((cat) => {
                    // Get first pin image from each category as preview
                    const getPreviewImage = () => {
                      if (cat.value === 'bronze' && Products.pins.bronze && Products.pins.bronze.length > 0) {
                        return Products.pins.bronze[0].src;
                      }
                      if (cat.value === 'colorful' && Products.pins.colorful && Products.pins.colorful.length > 0) {
                        return Products.pins.colorful[0].src;
                      }
                      if (cat.value === 'flags' && Products.pins.flags && Products.pins.flags.length > 0) {
                        return Products.pins.flags[0].src;
                      }
                      return null;
                    };
                    const previewImage = getPreviewImage();
                    
                    return (
                      <button
                        key={cat.value || 'all'}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                          selectedCategory === cat.value
                            ? 'bg-gray-50'
                            : 'hover:bg-gray-50'
                        }`}
                        style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                      >
                        {previewImage && (
                          <div className="relative mb-1.5 flex items-center justify-center rounded overflow-visible" style={{ width: '3.5rem', height: '3.5rem' }}>
                            <div className="w-full h-full flex items-center justify-center rounded overflow-hidden">
                              <img
                                src={previewImage}
                                alt={cat.label}
                                className="max-w-full max-h-full object-contain p-1"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            {selectedCategory === cat.value && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-sm">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <span className={`text-xs text-center font-light ${
                          selectedCategory === cat.value
                            ? 'text-gray-900'
                            : 'text-gray-600'
                        }`}>
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Tabs - Dropdown on Mobile */}
              {selectedCategory && filterTabs.length > 0 && (
                <div className="relative z-20" ref={filterDropdownRef}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsFilterDropdownOpen(prev => !prev);
                    }}
                    className="w-full px-4 py-2.5 text-xs uppercase tracking-wider text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors font-light"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    <span className="text-gray-900">
                      {selectedFilterTab ? selectedFilterTab.label : 'All'}
                    </span>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-xs text-gray-400 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {isFilterDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] max-h-48 overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {filterTabs.map(({ key, label }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setMobileSubCategory(key);
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-xs uppercase tracking-wider text-left transition-colors border-b border-gray-50 last:border-b-0 ${
                            mobileSubCategory === key 
                              ? 'bg-gray-50 text-gray-900 font-light' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Charms Grid */}
              {selectedCategory && (
                <div>
                  {filteredPinsForMobile.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {filteredPinsForMobile.map((pin, index) => {
                          const isSoldOut = pin.quantity !== undefined && pin.quantity === 0;
                          const isSelected = selectedPins.some((p) => p.pin && p.pin.src === pin.src);
                          // Use src as key since it's unique for each pin (even if names are the same)
                          const uniqueKey = pin.src ? `${pin.src}-${index}` : `${pin.name}-${index}`;
                          return (
                            <div key={uniqueKey} className="flex flex-col items-center gap-2">
                              <button
                                onClick={() => {
                                  if (!isSoldOut) {
                                    // Ensure we pass the correct pin object
                                    handlePinSelection({ ...pin });
                                  }
                                }}
                                disabled={isSoldOut}
                                className={`p-2 flex flex-col items-center w-full rounded-lg transition-colors ${
                                  isSelected
                                    ? 'bg-gray-50'
                                    : 'hover:bg-gray-50'
                                } ${isSoldOut ? 'opacity-40 cursor-not-allowed' : ''}`}
                              >
                                <div className="relative flex items-center justify-center rounded" style={{ width: '4rem', height: '4rem', overflow: 'visible' }}>
                                  <img
                                    src={pin.src}
                                    alt={pin.name}
                                    className={`max-w-full max-h-full object-contain ${isSoldOut ? 'opacity-50' : ''}`}
                                    loading="lazy"
                                    decoding="async"
                                  />
                                  {isSelected && !isSoldOut && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center z-20 shadow-sm">
                                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                                <span className={`text-[10px] text-center line-clamp-2 mt-1 font-light ${
                                  isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'
                                }`} style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
                                  {pin.name}
                                </span>
                              </button>
                              {isSoldOut && (
                                <span className="text-[9px] text-gray-400 font-light">Sold Out</span>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400 text-sm font-light" style={{fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
                      No charms found
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
