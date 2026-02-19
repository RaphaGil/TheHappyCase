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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 font-light font-inter">
          We dispatch orders within 2 - 3 business days. Shipping costs depend on your delivery country.
        </p>
        <p className="text-xs text-gray-500 font-light font-inter">
          Including Ireland, Europe, Asia, North America, South America, Canada, Australia and New Zealand. Shipping charges are calculated at the checkout depending on location and parcel size.
        </p>
        <ul className="text-xs text-gray-600 space-y-2 font-light font-inter font-medium">
          <li><span>UK:</span> 3-4 business days</li>
          <li><span className="font-medium font-medium">Europe:</span> 5-10 business days</li>
          <li><span>USA & Canada:</span> 7-14 business days</li>
          <li><span className="font-medium">Rest of World:</span> 10-21 business days</li>
        </ul>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-light font-inter leading-relaxed">
            Orders delivered outside of the UK may be subject to import duties and taxes. These are levied when the delivery reaches its specific destination, and you will be responsible for the payment of any such duties and taxes. For more information, please contact your local customs office.
          </p>
        </div>
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

