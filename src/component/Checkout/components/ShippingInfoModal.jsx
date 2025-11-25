import React from 'react';
import { Link } from 'react-router-dom';

const ShippingInfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white border border-gray-200 max-w-md w-full p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-sm uppercase tracking-wider text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Delivery Information
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Close delivery information"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
          We dispatch orders within 2 - 3 business days. Shipping costs depend on your delivery country.
        </p>
        <ul className="text-xs text-gray-600 space-y-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
          <li><span className="font-medium">UK:</span> 3-4 business days</li>
          <li><span className="font-medium">Europe:</span> 5-10 business days</li>
          <li><span className="font-medium">USA & Canada:</span> 7-14 business days</li>
          <li><span className="font-medium">Rest of World:</span> 10-21 business days</li>
        </ul>
        <div className="flex justify-end">
          <Link
            to="/shipping"
            className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors font-light"
            style={{fontFamily: "'Poppins', sans-serif"}}
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

