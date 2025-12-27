import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor }) => {
  return (
    <div className="mb-4 flex justify-center">
      <div className="grid grid-cols-3 gap-1.5 xs:gap-2 sm:gap-2.5 max-w-fit">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className="aspect-square h-[55px] xs:h-[60px] sm:h-[65px] flex flex-col items-center justify-center gap-1 xs:gap-1.5 transition-all duration-200 touch-manipulation bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover"
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className="text-xs xs:text-sm sm:text-base mb-0.5 text-btn-primary-blue-text"
          />
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-medium uppercase tracking-wide leading-tight text-btn-primary-blue-text" style={{fontFamily: "'Poppins', sans-serif"}}>
            Case
          </span>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={`aspect-square h-[55px] xs:h-[60px] sm:h-[65px] flex flex-col items-center justify-center gap-1 xs:gap-1.5 transition-all duration-200 touch-manipulation ${
            !selectedCaseType
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-xs xs:text-sm sm:text-base mb-0.5 ${
              !selectedCaseType 
                ? 'text-gray-400' 
                : 'text-btn-primary-blue-text'
            }`}
          />
          <span className={`text-[9px] xs:text-[10px] sm:text-xs font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType 
              ? 'text-gray-400' 
              : 'text-btn-primary-blue-text'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Color
          </span>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => {
            setMobileCurrentStep('charms');
            // Scroll to top when clicking charm options
            window.scrollTo({ 
              top: 0, 
              behavior: 'smooth' 
            });
          }}
          disabled={!selectedCaseType || !selectedColor}
          className={`aspect-square h-[55px] xs:h-[60px] sm:h-[65px] flex flex-col items-center justify-center gap-1 xs:gap-1.5 transition-all duration-200 touch-manipulation ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : 'bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-xs xs:text-sm sm:text-base mb-0.5 ${
              !selectedCaseType || !selectedColor 
                ? 'text-gray-400' 
                : 'text-btn-primary-blue-text'
            }`}
          />
          <span className={`text-[9px] xs:text-[10px] sm:text-xs font-medium uppercase tracking-wide leading-tight ${
            !selectedCaseType || !selectedColor 
              ? 'text-gray-400' 
              : 'text-btn-primary-blue-text'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


