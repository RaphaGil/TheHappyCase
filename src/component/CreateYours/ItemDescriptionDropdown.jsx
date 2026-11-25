import React from 'react';

const ItemDescriptionDropdown = ({ selectedCase, onOpenModal }) => {
  if (!selectedCase) return null;

  return (
    <div className="flex-1 min-w-0">
      <button
        onClick={onOpenModal}
        className="btn-happy btn-soft w-full px-3 md:px-4 py-2.5 text-xs xs:text-sm flex items-center justify-center gap-2"
        style={{fontFamily: "'Poppins', sans-serif"}}
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="whitespace-nowrap truncate">Details</span>
      </button>
    </div>
  );
};

export default ItemDescriptionDropdown;


