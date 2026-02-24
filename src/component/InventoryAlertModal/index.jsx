'use client';

import React, { useEffect } from 'react';

const InventoryAlertModal = ({ show, onClose, message, type = 'warning' }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [show]);

  if (!show) return null;

  const isError = type === 'error' || message?.toLowerCase().includes('out of stock');

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-md w-full p-6 border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
            isError ? 'bg-red-100' : 'bg-orange-100'
          }`}>
            {isError ? (
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <h3 className={`text-lg font-medium mb-2 font-inter ${
            isError ? 'text-red-900' : 'text-orange-900'
          }`}>
            {isError ? 'Out of Stock' : 'Limited Inventory'}
          </h3>
          <div className={`w-12 h-px ${isError ? 'bg-red-300' : 'bg-orange-300'}`}></div>
        </div>
        
        {/* Modal Content */}
        <div className="mb-6">
          <p className={`text-sm font-inter ${
            isError ? 'text-red-800' : 'text-gray-700'
          }`}>
            {message}
          </p>
        </div>
        
        {/* Modal Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 text-sm uppercase tracking-wider font-inter transition-all duration-200 ${
              isError 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-900 hover:bg-gray-800 text-white'
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryAlertModal;


