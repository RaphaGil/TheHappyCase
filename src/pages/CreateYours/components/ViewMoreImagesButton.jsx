import React from 'react';

const ViewMoreImagesButton = ({ caseImages, onOpenModal }) => {
  if (!caseImages || caseImages.length === 0) return null;

  return (
    <button
      onClick={onOpenModal}
      className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] px-3 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 rounded shadow-sm"
      style={{fontFamily: "'Poppins', sans-serif"}} 
    >
      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>View More Images</span>
    </button>
  );
};

export default ViewMoreImagesButton;


