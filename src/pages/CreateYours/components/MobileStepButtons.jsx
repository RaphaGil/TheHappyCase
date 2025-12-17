import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor, onOpenAddText }) => {
  return (
    <div className="mb-0 flex justify-center">
      <div className="grid grid-cols-4 gap-2 xs:gap-2.5 sm:gap-3 max-w-fit">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className="aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover"
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className="text-sm xs:text-base sm:text-lg mb-1 text-btn-primary-blue-text"
          />
          <span className="text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight text-btn-primary-blue-text" style={{fontFamily: "'Poppins', sans-serif"}}>
            Case
          </span>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation ${
            !selectedCaseType
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-sm xs:text-base sm:text-lg mb-1 ${
              !selectedCaseType 
                ? 'text-gray-400' 
                : 'text-btn-primary-blue-text'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType 
              ? 'text-gray-400' 
              : 'text-btn-primary-blue-text'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Color
          </span>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => setMobileCurrentStep('charms')}
          disabled={!selectedCaseType || !selectedColor}
          className={`aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-sm xs:text-base sm:text-lg mb-1 ${
              !selectedCaseType || !selectedColor 
                ? 'text-gray-400' 
                : 'text-btn-primary-blue-text'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType || !selectedColor 
              ? 'text-gray-400' 
              : 'text-btn-primary-blue-text'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </span>
        </button>
        
        {/* Add Text Button */}
        <button
          onClick={onOpenAddText}
          className="aspect-square h-[65px] xs:h-[70px] sm:h-[75px] flex flex-col items-center justify-center gap-1.5 xs:gap-2 transition-all duration-200 touch-manipulation bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover"
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className="text-sm xs:text-base sm:text-lg mb-1 text-btn-primary-blue-text"
          />
          <span className="text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight text-btn-primary-blue-text" style={{fontFamily: "'Poppins', sans-serif"}}>
            Add Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


