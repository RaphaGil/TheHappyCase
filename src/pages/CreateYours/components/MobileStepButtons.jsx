import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor, onOpenAddText }) => {
  return (
    <div className="mb-0">
      <div className="grid grid-cols-4 gap-1.5">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className={`py-2 px-1 rounded transition-all duration-200 ${
            mobileCurrentStep === 'case'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faBriefcase} 
              className={`text-sm ${
                mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
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
          className={`py-2 px-1 rounded transition-all duration-200 ${
            !selectedCaseType
              ? 'bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faPalette} 
              className={`text-sm ${
                !selectedCaseType
                  ? 'text-gray-400'
                  : mobileCurrentStep === 'color'
                  ? 'text-white'
                  : 'text-gray-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
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
          className={`py-2 px-1 rounded transition-all duration-200 ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'bg-gray-900 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faPlane} 
              className={`text-sm ${
                !selectedCaseType || !selectedColor
                  ? 'text-gray-400'
                  : mobileCurrentStep === 'charms'
                  ? 'text-white'
                  : 'text-gray-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
              !selectedCaseType || !selectedColor ? 'text-gray-400' : mobileCurrentStep === 'charms' ? 'text-white' : 'text-gray-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Charms
            </h3>
          </div>
        </button>
        
        {/* Add Text Button */}
        <button
          onClick={onOpenAddText}
          className="py-2 px-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition-all duration-200"
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faFont} 
              className="text-sm text-gray-600"
            />
            <h3 className="text-[10px] uppercase tracking-wider font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>
              Add Text
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


