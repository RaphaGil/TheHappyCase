import React, { useRef, useEffect } from 'react';
import { CASE_OPTIONS } from '../constants';

const CaseSelector = ({ selectedCaseType, onSelect, isCaseDropdownOpen, setIsCaseDropdownOpen, Products }) => {
  const caseDropdownRef = useRef(null);
  
  // Get image for a case type
  const getCaseImage = (caseType) => {
    if (!Products || !Products.cases) return null;
    const caseData = Products.cases.find(c => c.type === caseType);
    if (caseData && caseData.colors && caseData.colors.length > 0) {
      return caseData.colors[0].image;
    }
    return null;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (caseDropdownRef.current && !caseDropdownRef.current.contains(e.target)) {
        setIsCaseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsCaseDropdownOpen]);

  const getSelectedLabel = () => {
    const option = CASE_OPTIONS.find(opt => opt.value === selectedCaseType);
    return option ? option.label : 'Select Case';
  };

  return (
    <div className="relative" ref={caseDropdownRef}>
      <button
        type="button"
        className={`w-full px-4 py-3 border rounded-sm bg-white text-gray-900 flex items-center justify-between focus:outline-none focus:border-gray-400 transition-all duration-200 text-sm ${
          isCaseDropdownOpen 
            ? 'border-gray-400 bg-gray-50' 
            : 'border-gray-200 hover:border-gray-300'
        }`}
        style={{fontFamily: "'Poppins', sans-serif"}}
        onClick={() => setIsCaseDropdownOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isCaseDropdownOpen}
      >
        <span>{getSelectedLabel()}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${isCaseDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.216l3.71-3.0a.75.75 0 111.06 1.06l-4.24 3.43a.75.75 0 01-.96 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>
      {isCaseDropdownOpen && (
        <div
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-lg focus:outline-none p-3"
          role="listbox"
        >
          <div className="grid grid-cols-3 gap-3">
            {CASE_OPTIONS.map((opt) => {
              const caseImage = getCaseImage(opt.value);
              const caseData = Products.cases.find(c => c.type === opt.value);
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
                <div key={opt.value} className="flex flex-col items-center gap-1">
                  <button
                    role="option"
                    aria-selected={selectedCaseType === opt.value}
                    disabled={soldOut}
                    className={`p-3 cursor-pointer transition-all duration-200 border rounded flex flex-col items-center gap-2 w-full ${
                      selectedCaseType === opt.value 
                        ? 'bg-gray-50 text-gray-900 font-medium  ring-2 ring-gray-300' 
                        : 'text-gray-700 hover:bg-gray-50  hover:border-gray-300'
                    } ${soldOut ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{fontFamily: "'Poppins', sans-serif"}}
                    onClick={() => {
                      if (!soldOut) {
                        onSelect(opt.value);
                        setIsCaseDropdownOpen(false);
                      }
                    }}
                  >
                    {caseImage && (
                      <div className="w-full aspect-square  overflow-hidden">
                        <img
                          src={caseImage}
                          alt={opt.label}
                          className={`w-full h-full object-contain p-2 ${soldOut ? 'opacity-50' : ''}`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <span className="text-xs text-center">{opt.label}</span>
                  </button>
                  {soldOut && (
                    <span className="text-[10px] text-red-600 font-medium">Sold Out</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseSelector;



