import React from 'react';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor, onOpenAddText }) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-4 gap-2">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className={`p-3 border transition-all duration-200 ${
            mobileCurrentStep === 'case'
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-center">
            <span className="text-xs text-gray-500 mb-1 block" style={{fontFamily: "'Poppins', sans-serif"}}>1</span>
            <h3 className="text-xs uppercase tracking-wider text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Case
            </h3>
          </div>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`p-3 border transition-all duration-200 ${
            !selectedCaseType
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-center">
            <span className="text-xs text-gray-500 mb-1 block" style={{fontFamily: "'Poppins', sans-serif"}}>2</span>
            <h3 className="text-xs uppercase tracking-wider text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Color
            </h3>
          </div>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => setMobileCurrentStep('charms')}
          disabled={!selectedCaseType || !selectedColor}
          className={`p-3 border transition-all duration-200 ${
            !selectedCaseType || !selectedColor
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'border-gray-900 bg-gray-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-center">
            <span className="text-xs text-gray-500 mb-1 block" style={{fontFamily: "'Poppins', sans-serif"}}>3</span>
            <h3 className="text-xs uppercase tracking-wider text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Charms
            </h3>
          </div>
        </button>
        
        {/* Add Text Button */}
        <button
          onClick={onOpenAddText}
          className="p-3 border border-gray-200 bg-white hover:border-gray-300 transition-all duration-200"
        >
          <div className="text-center">
            <span className="text-xs text-gray-500 mb-1 block" style={{fontFamily: "'Poppins', sans-serif"}}>4</span>
            <h3 className="text-xs uppercase tracking-wider text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Add Text
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


