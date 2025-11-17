import React from 'react';
import ColorSelector from '../../../component/ColorSelector/index.jsx';
import { CASE_OPTIONS, CATEGORY_OPTIONS, FLAGS_FILTER_TABS, COLORFUL_FILTER_TABS, BRONZE_FILTER_TABS } from '../constants';
import { filterPinsByCategory } from '../filterHelpers';

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
  if (!mobileCurrentStep) return null;

  const filteredPinsForMobile = filterPinsByCategory(pins, selectedCategory, mobileSubCategory);

  const getFilterTabs = () => {
    if (selectedCategory === 'flags') return FLAGS_FILTER_TABS;
    if (selectedCategory === 'colorful') return COLORFUL_FILTER_TABS;
    if (selectedCategory === 'bronze') return BRONZE_FILTER_TABS;
    return [];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white rounded-sm p-6 w-full overflow-y-auto border border-gray-200 ${
        mobileCurrentStep === 'charms' 
          ? 'max-w-sm h-fit' 
          : 'max-w-sm max-h-[80vh]'
      }`}>
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
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
                    className={`w-full p-3 text-left border transition-all duration-200 ${
                      selectedCaseType === opt.value
                        ? 'border-gray-900 bg-gray-50 text-gray-900'
                        : 'border-gray-200 hover:border-gray-300'
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
                <div className="flex flex-col gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat.value || 'all'}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`p-2 text-sm text-left border transition-all duration-200 ${
                        selectedCategory === cat.value
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Tabs */}
              {selectedCategory && getFilterTabs().length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1 border-b border-gray-200">
                  {getFilterTabs().map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setMobileSubCategory(key)}
                      className={`px-3 py-2 text-xs uppercase tracking-wider transition-all duration-200 ${
                        mobileSubCategory === key 
                          ? 'border-b-2 border-gray-900 text-gray-900 font-medium' 
                          : 'border-b-2 border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      }`}
                      style={{fontFamily: "'Poppins', sans-serif"}}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {/* Charms Grid */}
              {selectedCategory && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
                    Choose Charms
                  </h3>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-3">
                      {filteredPinsForMobile.map((pin) => {
                        const isSelected = selectedPins.some((p) => p.pin === pin);
                        return (
                          <button
                            key={pin.name}
                            onClick={() => handlePinSelection(pin)}
                            className={`p-2 transition-all duration-200 flex flex-col items-center border ${
                              isSelected
                                ? 'border-2 border-gray-900 bg-gray-50'
                                : 'border border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className={`relative w-20 h-20 flex items-center justify-center bg-gray-50 transition-all duration-200 overflow-hidden ${isSelected ? 'rounded' : ''}`}>
                              <img
                                src={pin.src}
                                alt={pin.name}
                                className="max-w-full max-h-full object-contain"
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


