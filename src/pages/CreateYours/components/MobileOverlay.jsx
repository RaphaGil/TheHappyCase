import React, { useState, useRef, useEffect } from 'react';
import ColorSelector from '../../../component/ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../constants';
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!mobileCurrentStep) return null;

  const filteredPinsForMobile = filterPinsByCategory(pins, selectedCategory, mobileSubCategory);

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  const filterTabs = getFilterTabs();
  const selectedFilterTab = filterTabs.find(tab => tab.key === mobileSubCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-sm p-6 w-full overflow-y-auto  ${
        mobileCurrentStep === 'charms' 
          ? 'max-w-sm h-fit' 
          : 'max-w-sm max-h-[80vh]'
      }`}>
        <div className="flex justify-between items-center mb-6 pb-4">
          <h2 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
            {mobileCurrentStep === 'case' && 'Choose Case'}
            {mobileCurrentStep === 'color' && 'Choose Color'}
            {mobileCurrentStep === 'charms' && 'Choose Charms'}
          </h2>
          <button
            onClick={() => setMobileCurrentStep(null)}
            className="p-1 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Step Content */}
        <div className="space-y-4">
          {mobileCurrentStep === 'case' && (
            <div>
              <div className="space-y-2">
                {CASE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleCaseTypeSelection(opt.value)}
                    className={`w-full p-3 text-left transition-all duration-200 ${
                      selectedCaseType === opt.value
                        ? ' text-gray-900'
                        : ' hover:border-gray-300'
                    }`}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    {opt.label}
                  </button>
                ))}
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
            <div>
              {/* Category Selection */}
              <div className="mb-4">
                <div className="grid grid-cols-3 gap-2">
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
                        className={`flex flex-col items-center p-3 border transition-all duration-200 ${
                          selectedCategory === cat.value
                            ? 'border-gray-900 bg-gray-50'
                            : ' hover:border-gray-300'
                        }`}
                        style={{fontFamily: "'Poppins', sans-serif"}}
                      >
                        {previewImage && (
                          <div className="w-16 h-16 mb-2 flex items-center justify-center bg-gray-50 overflow-hidden">
                            <img
                              src={previewImage}
                              alt={cat.label}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        )}
                        <span className={`text-xs text-center ${
                          selectedCategory === cat.value
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-700'
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
                <div className="mb-4 relative" ref={filterDropdownRef}>
                  <button
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                    className="w-full px-3 py-2 text-xs uppercase tracking-wider text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-all duration-200 "
                    style={{fontFamily: "'Poppins', sans-serif"}}
                  >
                    <span className="text-gray-900 font-medium">
                      {selectedFilterTab ? selectedFilterTab.label : 'All'}
                    </span>
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-xs text-gray-600 transition-transform duration-200 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {isFilterDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white  shadow-lg z-50 max-h-48 overflow-y-auto">
                      {filterTabs.map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => {
                            setMobileSubCategory(key);
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-xs uppercase tracking-wider text-left transition-all duration-200 ${
                            mobileSubCategory === key 
                              ? ' text-gray-900 font-medium' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          style={{fontFamily: "'Poppins', sans-serif"}}
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
                  <div className="max-h-96 overflow-y-auto">
                    {filteredPinsForMobile.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {filteredPinsForMobile.map((pin) => {
                          const isSelected = selectedPins.some((p) => p.pin === pin);
                          return (
                            <button
                              key={pin.name}
                              onClick={() => handlePinSelection(pin)}
                              className={`p-2 transition-all duration-200 flex flex-col items-center ${
                                isSelected
                                  ? 'bg-gray-50'
                                  : ''
                              }`}
                            >
                              <div className={`relative w-20 h-20 flex items-center justify-center bg-gray-50 transition-all duration-200 overflow-hidden ${isSelected ? 'rounded' : ''}`}>
                                <img
                                  src={pin.src}
                                  alt={pin.name}
                                  className="max-w-full max-h-full object-contain"
                                  loading="lazy"
                                  decoding="async"
                                />
                                {isSelected && (
                                  <div className="absolute -top-1 -right-1 bg-gray-900 text-white w-4 h-4 flex items-center justify-center text-xs rounded-full">
                                    ✓
                                  </div>
                                )}
                              </div>
                              <span className="text-xs text-center text-gray-700 line-clamp-2 mt-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                                {pin.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 text-sm" style={{fontFamily: "'Poppins', sans-serif"}}>
                        No charms found for this filter
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
