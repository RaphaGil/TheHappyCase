import React from 'react';

/** Small "Remove" text button shown at the top-right of a basket line. */
const RemoveButton = ({ onClick, label = 'Remove this item from cart' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="-mr-1 -mt-1 inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 font-inter"
  >
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
    Remove
  </button>
);

export default RemoveButton;
