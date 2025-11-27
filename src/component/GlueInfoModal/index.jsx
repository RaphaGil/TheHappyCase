import React from 'react';
import { Link } from 'react-router-dom';

const GlueInfoModal = ({ show, onClose, onProceed, productType = 'item' }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-md w-full p-6 border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 font-inter">
            Important Information
          </h3>
          <div className="w-12 h-px bg-gray-300"></div>
        </div>
        
        {/* Modal Content */}
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-4 font-inter">
            {productType === 'charm' 
              ? 'If you would like your charm to come pre-glued to your passport case, please use our "Create Yours" page where you can design your complete case with charms already attached.'
              : 'If you would like your charms to come pre-glued to your passport case, please use our "Create Yours" page where you can design your complete case with charms already attached.'}
          </p>
          <p className="text-sm text-gray-700 font-inter">
            Otherwise, you will receive the {productType === 'charm' ? 'charm' : 'items'} separately and will need to glue them yourself.
          </p>
        </div>
        
        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onProceed}
            className="flex-1 px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-inter"
          >
            Continue to Cart
          </button>
          <Link
            to="/CreateYours"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-xs uppercase tracking-wider text-center font-inter bg-btn-success hover:bg-btn-success-hover text-btn-success-text border border-btn-success-border hover:border-btn-success-hover transition-all duration-200"
          >
            Go to Create Yours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GlueInfoModal;








