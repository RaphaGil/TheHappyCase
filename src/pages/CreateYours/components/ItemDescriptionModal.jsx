import React, { useState } from 'react';

const ItemDescriptionModal = ({ show, onClose, selectedCase }) => {
  const [isSpecificationsOpen, setIsSpecificationsOpen] = useState(true);

  if (!show || !selectedCase) return null;

  const specifications = selectedCase.specifications || {};

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 font-inter">
            {selectedCase.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
   

          {/* Specifications Section */}
          {Object.keys(specifications).length > 0 && (
            <div className="">
              <button
                onClick={() => setIsSpecificationsOpen(!isSpecificationsOpen)}
                className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider text-gray-900 font-medium hover:text-gray-700 transition-colors font-inter"
              >
                <span>Specifications</span>
              
              </button>
              
              {isSpecificationsOpen && (
                <div className="flex flex-col gap-3 mt-4">
                  {specifications.dimensions && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Dimensions</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.dimensions}</span>
                    </div>
                  )}
                  
                  {specifications.size && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Size</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.size}</span>
                    </div>
                  )}
                  
                  {specifications.weight && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Weight</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.weight}</span>
                    </div>
                  )}
                  
                  {specifications.material && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Material</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.material}</span>
                    </div>
                  )}
                  
                  {specifications.closure && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Closure</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.closure}</span>
                    </div>
                  )}
                  
                  {specifications.cardSlots && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Card Slots</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.cardSlots}</span>
                    </div>
                  )}
                  
                  {specifications.interior && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Interior</span>
                      <span className="text-sm text-gray-900 text-right font-inter">{specifications.interior}</span>
                    </div>
                  )}
                  
                  {specifications.rfid && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">RFID Protection</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.rfid}</span>
                    </div>
                  )}
                  
                  {specifications.features && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Features</span>
                      <span className="text-sm text-gray-900 text-right font-inter">{specifications.features}</span>
                    </div>
                  )}
                  
                  {specifications.passportCapacity && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Capacity</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.passportCapacity}</span>
                    </div>
                  )}
                  
                  {specifications.care && (
                    <div className="flex justify-between items-start py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-inter">Care Instructions</span>
                      <span className="text-sm text-gray-900 text-right font-inter">{specifications.care}</span>
                    </div>
                  )}
                  
                  {specifications.warranty && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-500 font-inter">Warranty</span>
                      <span className="text-sm text-gray-900 font-inter">{specifications.warranty}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;













