import React from 'react';

const CreateYoursHeader = ({ isMobile = false, onClose }) => {
  return (
    <div className="relative text-center flex-shrink-0 mt-2 xs:mt-3 md:mt-3 md:mb-1 px-2 xs:px-0">
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-sm transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <h1 className="text-xl sm:text-2xl md:text-title text-gray-900 tracking-tight mb-0.5 md:mb-1" style={{fontFamily: "'Poppins', sans-serif"}}>
        Create Yours
      </h1>
      <div className="w-16 sm:w-20 md:w-24 h-px bg-gray-200 mx-auto mb-2 md:mb-4"></div>
      <p className="md:block hidden text-sm text-gray-500 max-w-2xl mx-auto font-light" 
         style={{fontFamily: "'Poppins', sans-serif"}}>
        Design your perfect passport case with our interactive creator
      </p>
    </div>
  );
};

export default CreateYoursHeader;
