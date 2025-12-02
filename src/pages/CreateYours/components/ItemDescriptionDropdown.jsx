import React, { useRef, useEffect } from 'react';

const ItemDescriptionDropdown = ({ selectedCase, showDescriptionDropdown, setShowDescriptionDropdown }) => {
  const descriptionDropdownRef = useRef(null);
  
  // Function to format case type to display name
  const getCaseDisplayName = (caseType) => {
    const caseTypeMap = {
      'economy': 'Economy Class',
      'business': 'Business Class',
      'firstclass': 'First Class'
    };
    return caseTypeMap[caseType] || caseType;
  };

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
    <div className="flex-1 relative" ref={descriptionDropdownRef}>
      <button
        onClick={() => setShowDescriptionDropdown(!showDescriptionDropdown)}
        className={`w-full px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md ${
          showDescriptionDropdown 
            ? 'bg-gray-50 border-gray-400' 
            : 'hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100'
        }`}
        style={{fontFamily: "'Poppins', sans-serif"}}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>ITEM DESCRIPTION</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 text-gray-500 ${showDescriptionDropdown ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {showDescriptionDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50" style={{maxHeight: 'calc(100vh - 200px)'}}>
          <div className="p-4 md:p-5 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto">
            {/* Case Name */}
            <div className="border-b border-gray-200 pb-3">
              <h4 className="text-sm md:text-base font-semibold text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                {getCaseDisplayName(selectedCase.type)}
              </h4>
            </div>
            
            {/* Specifications */}
            {selectedCase.specifications && (
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-wider text-gray-500 font-medium mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Specifications
                </h5>
                <div className="space-y-2.5">
                  {selectedCase.specifications.dimensions && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Dimensions</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.dimensions}</span>
                    </div>
                  )}
                  {selectedCase.specifications.material && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Material</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.material}</span>
                    </div>
                  )}
                  {selectedCase.specifications.closure && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Closure</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.closure}</span>
                    </div>
                  )}
                  {selectedCase.specifications.cardSlots && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Card Slots</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.cardSlots}</span>
                    </div>
                  )}
                  {selectedCase.specifications.interior && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Interior</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.interior}</span>
                    </div>
                  )}
                  {selectedCase.specifications.rfid && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>RFID Protection</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.rfid}</span>
                    </div>
                  )}
                  {selectedCase.specifications.features && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Features</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.features}</span>
                    </div>
                  )}
                  {selectedCase.specifications.passportCapacity && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-100">
                      <span className="text-xs text-gray-600 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>Capacity</span>
                      <span className="text-xs text-gray-900 text-right ml-4" style={{fontFamily: "'Poppins', sans-serif"}}>{selectedCase.specifications.passportCapacity}</span>
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


