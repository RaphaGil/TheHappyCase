import React from 'react';

const ItemDescriptionDropdown = ({ selectedCase, onOpenModal }) => {
  if (!selectedCase) return null;

  return (
    <div className="flex-1 min-w-0 mt-12">
      <button
        onClick={onOpenModal}
        className="w-full px-3 md:px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100"
        style={{fontFamily: "'Poppins', sans-serif"}}
      >
        <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="whitespace-nowrap truncate">DETAILS</span>
      </button>
    </div>
  );
};

export default ItemDescriptionDropdown;


