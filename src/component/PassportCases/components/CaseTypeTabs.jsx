import React from 'react';

const CaseTypeTabs = ({ 
  cases, 
  selectedCaseType, 
  onCaseTypeChange, 
  isCaseTypeSoldOut,
  getCaseDisplayName 
}) => {
  return (
    <div className="flex justify-center mb-12 md:mx-0 md:px-0">
      <div className="flex gap-2 flex-nowrap">
        {cases.map((caseItem) => {
          const isSoldOut = isCaseTypeSoldOut(caseItem.type);
          return (
            <button
              key={caseItem.type}
              onClick={() => onCaseTypeChange(caseItem.type)}
              disabled={isSoldOut}
              className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs uppercase tracking-wider transition-all duration-200 relative whitespace-nowrap flex-shrink-0 ${
                selectedCaseType === caseItem.type
                  ? 'border-b-2 border-blue-700 text-white bg-blue-600 font-medium'
                  : 'border-b-2 border-transparent text-white hover:text-white hover:border-blue-300 hover:bg-blue-500 bg-blue-400'
              } ${isSoldOut ? 'opacity-60 cursor-not-allowed' : ''} font-inter`}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                {getCaseDisplayName(caseItem.type)}
                {isSoldOut && (
                  <span className="text-[8px] sm:text-[10px] text-red-300 font-semibold bg-red-900 px-1 sm:px-1.5 py-0.5 rounded">SOLD OUT</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CaseTypeTabs;
