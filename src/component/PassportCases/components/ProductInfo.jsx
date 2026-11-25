import React from 'react';

// Inline SVGs - avoid FontAwesome flash on page load
const TruckIcon = () => (
  <svg className="w-5 h-5 text-[#30279f] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75zM8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zm9.75-12.75a.75.75 0 00-.75.75v11.25c0 .129.042.248.114.348a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.66 18.66 0 00-3.732-10.104 1.84 1.84 0 00-1.47-.725zM19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
  </svg>
);
const ShieldIcon = () => (
  <svg className="w-5 h-5 text-[#30279f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const PassportsIcon = () => (
  <svg className="w-5 h-5 text-[#30279f] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
    <rect x="8" y="3" width="11" height="15" rx="2" />
    <path d="M5 6v13a2 2 0 0 0 2 2h9" />
    <circle cx="13.5" cy="9.5" r="2" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-5 h-5 text-[#30279f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const ProductInfo = ({ specifications }) => {
  if (!specifications) return null;

  return (
    <ul className="space-y-3 rounded-2xl bg-[#eef0ff] p-5 text-sm text-gray-800 font-inter">
      {specifications.passportCapacity && (
        <li className="flex items-center gap-3">
          <PassportsIcon />
          <span><span className="font-semibold">{specifications.passportCapacity}</span>, perfect for couples or family trips</span>
        </li>
      )}
      {specifications.rfid && specifications.rfid.toLowerCase() === 'yes' && (
        <li className="flex items-center gap-3">
          <ShieldIcon />
          <span><span className="font-semibold">RFID protection</span> keeps your details safe</span>
        </li>
      )}
      {specifications.material && (
        <li className="flex items-center gap-3">
          <TagIcon />
          <span><span className="font-semibold">Material:</span> {specifications.material}</span>
        </li>
      )}
      <li className="flex items-center gap-3">
        <TruckIcon />
        <span><span className="font-semibold">UK delivery</span> in 2–4 days</span>
      </li>
    </ul>
  );
};

export default ProductInfo;
