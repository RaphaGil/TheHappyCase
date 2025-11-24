import React from 'react';

const SaveDesignButton = ({ saveImageFunction }) => {
  if (!saveImageFunction) return null;

  return (
    <button
      onClick={saveImageFunction}
      className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] px-4 sm:px-6 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 mt-4"
      style={{fontFamily: "'Poppins', sans-serif"}} 
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span>Save Design</span>
    </button>
  );
};

export default SaveDesignButton;








