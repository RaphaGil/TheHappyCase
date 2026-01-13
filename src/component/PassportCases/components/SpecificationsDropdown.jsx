import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SpecificationsDropdown = ({ 
  specifications, 
  isOpen, 
  onToggle 
}) => {
  if (!specifications) return null;

  return (
    <div className="border-b border-gray-100 pb-8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 text-sm uppercase tracking-wider text-gray-900 font-medium hover:text-gray-700 transition-colors font-inter"
      >
        <span>Specifications</span>
        <FontAwesomeIcon 
          icon={isOpen ? faChevronUp : faChevronDown} 
          className="text-xs transition-transform duration-200"
        />
      </button>
      {isOpen && (
        <div className="flex flex-col gap-3 mt-4">
          {specifications.dimensions && (
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-500 font-inter">Dimensions</span>
              <span className="text-sm text-gray-900 font-inter">{specifications.dimensions}</span>
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
  );
};

export default SpecificationsDropdown;
