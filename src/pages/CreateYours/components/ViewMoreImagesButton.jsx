import React from 'react';

const ViewMoreImagesButton = ({ caseImages, onOpenModal }) => {
  if (!caseImages || caseImages.length === 0) return null;

  return (
    <button
      onClick={onOpenModal}
      className="flex-1 px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 text-[10px] xs:text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 shadow-sm hover:shadow-md" 
      style={{fontFamily: "'Poppins', sans-serif"}}
    >
      <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="whitespace-nowrap">VIEW MORE IMAGES</span>
      {caseImages.length > 0 && (
        <span className="text-[9px] xs:text-xs text-gray-500 bg-gray-100 px-1.5 xs:px-2 py-0.5 rounded-full flex-shrink-0">
          {caseImages.length}
        </span>
      )}
    </button>
  );
};

export default ViewMoreImagesButton;


