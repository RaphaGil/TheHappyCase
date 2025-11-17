import React from 'react';

const TermsOfUseModal = ({ show, onClose, onAgree }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
            Terms of Use - Create Yours
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors rounded"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
              User Responsibility
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed" style={{fontFamily: "'Poppins', sans-serif"}}>
              It is the user's responsibility to create and design the passport case using our interactive creator. 
              Please ensure that your design meets your requirements and preferences before placing your order. 
              We are not responsible for any design choices made by the user through the creator tool.
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
              Handmade Items - Natural Variations
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed" style={{fontFamily: "'Poppins', sans-serif"}}>
              All our passport cases are handmade with care and attention to detail. As each item is individually crafted, 
              there may be natural variations in color, texture, and appearance. These variations are not defects but rather 
              characteristics of handmade products that make each piece unique. Please note that the final product may vary 
              slightly from the digital preview shown in the creator.
            </p>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
            <p className="text-sm text-gray-700 leading-relaxed" style={{fontFamily: "'Poppins', sans-serif"}}>
              By using our "Create Yours" tool and placing an order, you acknowledge that you have read, understood, 
              and agree to these terms of use.
            </p>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 text-sm uppercase tracking-wider hover:bg-gray-300 transition-colors"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Close
          </button>
          <button
            onClick={() => {
              if (onAgree) {
                onAgree();
              } else {
                onClose();
              }
            }}
            className="px-6 py-2 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUseModal;

