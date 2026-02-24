import React from 'react';

const CloseButton = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-2 xs:right-3 sm:right-4 z-50 w-7 h-7 xs:w-8 xs:h-8 flex items-center justify-center transition-colors"
      aria-label="Close and go back to home"
    >
      <svg className="w-12 h-12 xs:w-5 xs:h-5 mt-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
};

export default CloseButton;
