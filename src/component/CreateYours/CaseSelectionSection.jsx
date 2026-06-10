import React from 'react';
import CaseSelector from './CaseSelector';
import ColorSelector from '../ColorSelector';

const CaseSelectionSection = ({
  isOpen,
  onToggle,
  selectedCaseType,
  selectedColor,
  selectedCase,
  onCaseSelect,
  onColorSelect,
  setIsCaseDropdownOpen,
  Products,
  cart,
  isCaseImageLoading = false,
  showOnMobile = false,
  panelMode = false,
}) => {
  const showContent = panelMode || isOpen;

  return (
    <div className={`pb-3 sm:pb-4 flex-shrink-0 pt-2 overflow-visible ${panelMode ? '' : 'border-b border-gray-100'} ${showOnMobile ? 'block' : 'hidden md:block'}`}>
      {!panelMode && (
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between mb-2 py-1 -my-1 rounded-md transition-colors duration-200"
        >
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium flex items-center gap-2" style={{fontFamily: "'Poppins', sans-serif"}}>
            1. Case & Color
            {selectedCaseType && selectedColor && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600" aria-hidden="true">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </h3>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {showContent && (
        <div className="space-y-4 overflow-visible">
          <CaseSelector
            selectedCaseType={selectedCaseType}
            onSelect={onCaseSelect}
            Products={Products}
            isCaseDropdownOpen={isOpen}
            setIsCaseDropdownOpen={setIsCaseDropdownOpen}
            cart={cart}
          />

          {selectedCaseType && (
            <div className="mt-4 overflow-visible">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Choose Color
              </h4>
              <ColorSelector
                colors={selectedCase?.colors || []}
                selectedColor={selectedColor}
                onSelect={onColorSelect}
                caseType={selectedCaseType}
                cart={cart}
                isLoading={isCaseImageLoading}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseSelectionSection;
