import React from 'react';
import CustomTextSection from './CustomTextSection';

const AddTextSection = ({
  isOpen,
  onToggle,
  customText,
  setCustomText,
  customTextError,
  setCustomTextError,
  customTextAdded,
  setCustomTextAdded
}) => {
  return (
    <div className="pb-6 border-b border-gray-100 mt-6 hidden md:block">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-gray-900 font-medium" style={{fontFamily: "'Poppins', sans-serif"}}>
          4. Add Text
        </h3>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <CustomTextSection
          customText={customText}
          setCustomText={setCustomText}
          customTextError={customTextError}
          setCustomTextError={setCustomTextError}
          customTextAdded={customTextAdded}
          setCustomTextAdded={setCustomTextAdded}
        />
      )}
    </div>
  );
};

export default AddTextSection;
