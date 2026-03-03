import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({
  selectedCaseType,
  selectedColor,
  onCaseClick,
  onColorClick,
  onCharmsClick,
  onTextClick,
  isAddTextDropdownOpen,
  mobileCurrentStep
}) => {
  const isCaseActive = mobileCurrentStep === 'case';
  const isColorActive = mobileCurrentStep === 'color';
  const isCharmsActive = mobileCurrentStep === 'charms';
  return (
    <div className="mb-3 xs:mb-4 flex justify-center overflow-x-auto pb-1">
      <div className="grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-2.5 max-w-fit min-w-0 flex-shrink-0">
        {/* Choose Case Button */}
        <button
          onClick={onCaseClick}
          className={`min-h-[44px] py-2 xs:py-2.5 flex flex-col items-center justify-center gap-0.5 xs:gap-1 transition-all duration-200  touch-manipulation px-2 xs:px-3 sm:px-4 min-w-0 rounded-sm ${
            isCaseActive ? 'bg-btn-primary-blue text-btn-primary-blue-text border-2 border-btn-primary-blue shadow-sm' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className={`w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0 ${isCaseActive ? 'text-btn-primary-blue-text' : 'text-gray-500'}`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight truncate max-w-full ${isCaseActive ? 'text-btn-primary-blue-text' : 'text-gray-600'}`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Case
          </span>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={onColorClick}
          disabled={!selectedCaseType}
          className={`min-h-[44px] py-2 xs:py-2.5 flex flex-col items-center justify-center gap-0.5 xs:gap-1 transition-all duration-200 touch-manipulation px-2 xs:px-3 sm:px-4 min-w-0 rounded-sm ${
            !selectedCaseType
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : isColorActive
                ? 'bg-btn-primary-blue text-btn-primary-blue-text border-2 border-btn-primary-blue shadow-sm'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0 ${
              !selectedCaseType ? 'text-gray-400' : isColorActive ? 'text-btn-primary-blue-text' : 'text-gray-500'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight truncate max-w-full ${
            !selectedCaseType ? 'text-gray-400' : isColorActive ? 'text-btn-primary-blue-text' : 'text-gray-600'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Color
          </span>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={onCharmsClick}
          disabled={!selectedCaseType || !selectedColor}
          className={`min-h-[44px] py-2 xs:py-2.5 flex flex-col items-center justify-center gap-0.5 xs:gap-1 transition-all duration-200 touch-manipulation px-2 xs:px-3 sm:px-4 min-w-0 rounded-sm ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50'
              : isCharmsActive
                ? 'bg-btn-primary-blue text-btn-primary-blue-text border-2 border-btn-primary-blue shadow-sm'
                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0 ${
              !selectedCaseType || !selectedColor ? 'text-gray-400' : isCharmsActive ? 'text-btn-primary-blue-text' : 'text-gray-500'
            }`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight truncate max-w-full ${
            !selectedCaseType || !selectedColor ? 'text-gray-400' : isCharmsActive ? 'text-btn-primary-blue-text' : 'text-gray-600'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </span>
        </button>
        
        {/* Add Text Button - Mobile only */}
        <button
          onClick={onTextClick}
          className={`min-h-[44px] py-2 xs:py-2.5 flex flex-col items-center justify-center gap-0.5 xs:gap-1 transition-all duration-200 touch-manipulation px-2 xs:px-3 sm:px-4 min-w-0 rounded-sm ${
            isAddTextDropdownOpen ? 'bg-btn-primary-blue text-btn-primary-blue-text border-2 border-btn-primary-blue shadow-sm' : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className={`w-3.5 h-3.5 xs:w-4 xs:h-4 flex-shrink-0 ${isAddTextDropdownOpen ? 'text-btn-primary-blue-text' : 'text-gray-500'}`}
          />
          <span className={`text-[10px] xs:text-xs sm:text-sm font-medium uppercase tracking-wide leading-tight truncate max-w-full ${isAddTextDropdownOpen ? 'text-btn-primary-blue-text' : 'text-gray-600'}`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;
