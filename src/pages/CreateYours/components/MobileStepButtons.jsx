import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor, onOpenAddText }) => {
  return (
    <div className="mb-0">
      <div className="grid grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className={`aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation rounded-md  ${
            mobileCurrentStep === 'case'
              ? 'bg-gray-100 text-gray-900 border border-gray-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className="text-sm xs:text-base sm:text-lg mb-1 text-gray-700"
          />
          <span className="text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>
            Case
          </span>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation rounded-md  ${
            !selectedCaseType
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : mobileCurrentStep === 'color'
              ? 'bg-gray-100 text-gray-900 border border-gray-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-sm xs:text-base sm:text-lg mb-1 ${
              !selectedCaseType ? 'text-gray-400' : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType ? 'text-gray-400' : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Color
          </span>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => setMobileCurrentStep('charms')}
          disabled={!selectedCaseType || !selectedColor}
          className={`aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation rounded-md ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : mobileCurrentStep === 'charms'
              ? 'bg-gray-100 text-gray-900 border border-gray-300'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-sm xs:text-base sm:text-lg mb-1 ${
              !selectedCaseType || !selectedColor ? 'text-gray-400' : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType || !selectedColor ? 'text-gray-400' : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </span>
        </button>
        
        {/* Add Text Button */}
        <button
          onClick={onOpenAddText}
          className="aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200 touch-manipulation rounded-md"
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className="text-sm xs:text-base sm:text-lg mb-1 text-gray-700"
          />
          <span className="text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>
            Add Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


