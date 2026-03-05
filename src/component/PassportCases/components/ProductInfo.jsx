import React from 'react';

// Inline SVGs - avoid FontAwesome flash on page load
const TruckIcon = () => (
  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75zM8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zm9.75-12.75a.75.75 0 00-.75.75v11.25c0 .129.042.248.114.348a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.66 18.66 0 00-3.732-10.104 1.84 1.84 0 00-1.47-.725zM19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const ProductInfo = ({ specifications }) => {
  if (!specifications) return null;

  return (
    <>
      {/* RFID Protection and Material Info */}
      <div className="">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {specifications.rfid && specifications.rfid.toLowerCase() === 'yes' && (
            <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
              <ShieldIcon />
              <span className="font-bold">RFID Protection</span>
            </p>
          )}
          {specifications.material && (
            <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
              <TagIcon />
              <span className="font-bold">Material:</span> {specifications.material}
            </p>
          )}
        </div>
      </div>

      {/* Delivery Info */}
      <div className="pb-4 sm:pb-6">
        <p className="text-sm text-gray-900 font-inter flex items-center gap-2">
          <TruckIcon />
          <span>Standard UK Delivery 2-4 Days</span>
        </p>
      </div>
    </>
  );
};

export default ProductInfo;
