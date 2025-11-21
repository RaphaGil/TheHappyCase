import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor }) => {
  return (
    <div className="mb-0">
      <div className="grid grid-cols-4 gap-1">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className={`py-1.5 px-0.5 rounded transition-all duration-200 ${
            mobileCurrentStep === 'case'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <span className={`text-[10px] font-medium ${
                mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-600'
              }`}>1.</span>
              <FontAwesomeIcon 
                icon={faBriefcase} 
                className={`text-xs ${
                  mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <h3 className={`text-[9px] uppercase tracking-wider font-light ${
              mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Case
            </h3>
          </div>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`py-1.5 px-0.5 rounded transition-all duration-200 ${
            !selectedCaseType
              ? 'bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <span className={`text-[10px] font-medium ${
                !selectedCaseType
                  ? 'text-gray-400'
                  : mobileCurrentStep === 'color'
                  ? 'text-white'
                  : 'text-gray-600'
              }`}>2.</span>
              <FontAwesomeIcon 
                icon={faPalette} 
                className={`text-xs ${
                  !selectedCaseType
                    ? 'text-gray-400'
                    : mobileCurrentStep === 'color'
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              />
            </div>
            <h3 className={`text-[9px] uppercase tracking-wider font-light ${
              !selectedCaseType ? 'text-gray-400' : mobileCurrentStep === 'color' ? 'text-white' : 'text-gray-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Color
            </h3>
          </div>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => setMobileCurrentStep('charms')}
          disabled={!selectedCaseType || !selectedColor}
          className={`py-1.5 px-0.5 rounded transition-all duration-200 ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <span className={`text-[10px] font-medium ${
                !selectedCaseType || !selectedColor
                  ? 'text-gray-400'
                  : mobileCurrentStep === 'charms'
                  ? 'text-white'
                  : 'text-gray-600'
              }`}>3.</span>
              <FontAwesomeIcon 
                icon={faPlane} 
                className={`text-xs ${
                  !selectedCaseType || !selectedColor
                    ? 'text-gray-400'
                    : mobileCurrentStep === 'charms'
                    ? 'text-white'
                    : 'text-gray-600'
                }`}
              />
            </div>
            <h3 className={`text-[9px] uppercase tracking-wider font-light ${
              !selectedCaseType || !selectedColor ? 'text-gray-400' : mobileCurrentStep === 'charms' ? 'text-white' : 'text-gray-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Charms
            </h3>
          </div>
        </button>
        
        {/* Add Text Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mobileCurrentStep === 'text') {
              setMobileCurrentStep(null); // Close text input, don't open case selection
            } else {
              setMobileCurrentStep('text');
            }
          }}
          className={`py-1.5 px-0.5 rounded transition-all duration-200 touch-manipulation ${
            mobileCurrentStep === 'text'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-0.5">
              <span className={`text-[10px] font-medium ${
                mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-600'
              }`}>4.</span>
              <FontAwesomeIcon 
                icon={faFont} 
                className={`text-xs ${
                  mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <h3 className={`text-[9px] uppercase tracking-wider font-light ${
              mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Add Text
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


