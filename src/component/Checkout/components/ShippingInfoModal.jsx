'use client';

import React from 'react';
import Link from 'next/link';

const ShippingInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white border border-gray-200 max-w-md w-full p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-light font-inter">
            Delivery Information
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors font-inter"
            aria-label="Close delivery information"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 font-light font-inter">
          We dispatch orders within 2–3 business days. We ship to the United Kingdom only.
        </p>
        <p className="text-xs text-gray-500 font-light font-inter">
          Standard UK delivery is £3 per order. Orders typically arrive within 3–5 business days after dispatch.
        </p>
        <div className="flex justify-end">
          <Link
            href="/shipping"
            className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors font-light font-inter"
            onClick={onClose}
          >
            View full shipping policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoModal;

