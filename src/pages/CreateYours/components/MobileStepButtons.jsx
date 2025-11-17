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
          className={`py-2 px-1 rounded border-2 transition-all duration-200 ${
            mobileCurrentStep === 'case'
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 text-blue-700'
          }`}
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faBriefcase} 
              className={`text-sm ${
                mobileCurrentStep === 'case' ? 'text-white' : 'text-blue-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
              mobileCurrentStep === 'case' ? 'text-white' : 'text-blue-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Case
            </h3>
          </div>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`py-2 px-1 rounded border-2 transition-all duration-200 ${
            !selectedCaseType
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 text-blue-700'
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
                  : 'text-blue-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
              !selectedCaseType ? 'text-gray-400' : mobileCurrentStep === 'color' ? 'text-white' : 'text-blue-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Color
            </h3>
          </div>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => setMobileCurrentStep('charms')}
          disabled={!selectedCaseType || !selectedColor}
          className={`py-2 px-1 rounded border-2 transition-all duration-200 ${
            !selectedCaseType || !selectedColor
              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 text-blue-700'
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
                  : 'text-blue-600'
              }`}
            />
            <h3 className={`text-[10px] uppercase tracking-wider font-light ${
              !selectedCaseType || !selectedColor ? 'text-gray-400' : mobileCurrentStep === 'charms' ? 'text-white' : 'text-blue-700'
            }`} style={{fontFamily: "'Poppins', sans-serif"}}>
              Charms
            </h3>
          </div>
        </button>
        
        {/* Add Text Button */}
        <button
          onClick={onOpenAddText}
          className="py-2 px-1 rounded border-2 border-blue-300 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 text-blue-700 transition-all duration-200"
        >
          <div className="text-center flex flex-col items-center gap-0.5">
            <FontAwesomeIcon 
              icon={faFont} 
              className="text-sm text-blue-600"
            />
            <h3 className="text-[10px] uppercase tracking-wider font-light text-blue-700" style={{fontFamily: "'Poppins', sans-serif"}}>
              Add Text
            </h3>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


