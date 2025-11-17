import React, { useRef, useEffect } from 'react';

const ItemDescriptionDropdown = ({ selectedCase, showDescriptionDropdown, setShowDescriptionDropdown }) => {
  const descriptionDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (descriptionDropdownRef.current && !descriptionDropdownRef.current.contains(e.target)) {
        setShowDescriptionDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowDescriptionDropdown]);

  if (!selectedCase) return null;

  return (
    <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] relative" ref={descriptionDropdownRef}>
      <button
        onClick={() => setShowDescriptionDropdown(!showDescriptionDropdown)}
        className="w-full px-3 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2"
        style={{fontFamily: "'Poppins', sans-serif"}} 
      >
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Item Description</span>
        <svg 
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showDescriptionDropdown ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDescriptionDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg md:shadow-xl" style={{zIndex: 99999, maxHeight: 'calc(100vh - 200px)'}}>
          <div className="p-3 sm:p-4 md:px-6 space-y-3 sm:space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto">
            {/* Case Name */}
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                {selectedCase.name}
              </h4>
            </div>
            
            {/* Specifications */}
            {selectedCase.specifications && (
              <div className="space-y-2 sm:space-y-3 border-t border-gray-100 pt-3 sm:pt-4">
                <h5 className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mb-2 sm:mb-3 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Specifications
                </h5>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {selectedCase.specifications.dimensions && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Dimensions</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.dimensions}</span>
                    </div>
                  )}
                  {selectedCase.specifications.material && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Material</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.material}</span>
                    </div>
                  )}
                  {selectedCase.specifications.closure && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Closure</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.closure}</span>
                    </div>
                  )}
                  {selectedCase.specifications.cardSlots && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Card Slots</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.cardSlots}</span>
                    </div>
                  )}
                  {selectedCase.specifications.interior && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Interior</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 text-left sm:text-right font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.interior}</span>
                    </div>
                  )}
                  {selectedCase.specifications.rfid && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>RFID Protection</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.rfid}</span>
                    </div>
                  )}
                  {selectedCase.specifications.features && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Features</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 text-left font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.features}</span>
                    </div>
                  )}
                  {selectedCase.specifications.passportCapacity && (
                    <div className="flex flex-col justify-between py-1 border-b border-gray-50 gap-0.5 sm:gap-0">
                      <span className="text-[10px] sm:text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>Capacity</span>
                      <span className="text-[10px] sm:text-xs text-gray-900 font-medium sm:font-normal" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.passportCapacity}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDescriptionDropdown;


