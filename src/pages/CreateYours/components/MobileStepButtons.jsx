import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor }) => {
  const getButtonClass = (step, isDisabled, isCompleted) => {
    const baseClass = "aspect-square h-[56px] flex flex-col items-center justify-center gap-1.5 transition-all duration-200 touch-manipulation relative";
    
    if (isDisabled) {
      return `${baseClass} bg-gray-50 text-gray-400 cursor-not-allowed`;
    }
    
    const isActive = mobileCurrentStep === step;
    if (isActive) {
      return `${baseClass} bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border`;
    }
    
    if (isCompleted) {
      return `${baseClass} bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border opacity-80`;
    }
    
    return `${baseClass} bg-btn-primary-blue text-btn-primary-blue-text border border-btn-primary-blue-border hover:bg-btn-primary-blue-hover`;
  };

  return (
    <div className="mb-2 flex justify-center">
      <div className="grid grid-cols-3 gap-6 max-w-fit">
        {/* Choose Case Button */}
        <button
          onClick={() => setMobileCurrentStep('case')}
          className={`${getButtonClass('case', false, !!selectedCaseType)} relative`}
          aria-label="Choose case type"
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className={`text-base transition-transform duration-200 ${mobileCurrentStep === 'case' ? 'scale-110' : ''}`}
          />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{fontFamily: "'Poppins', sans-serif"}}>
            Case
          </span>
        
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => setMobileCurrentStep('color')}
          disabled={!selectedCaseType}
          className={getButtonClass('color', !selectedCaseType, !!selectedColor)}
          aria-label="Choose color"
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-base transition-transform duration-200 ${mobileCurrentStep === 'color' ? 'scale-110' : ''}`}
          />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{fontFamily: "'Poppins', sans-serif"}}>
            Color
          </span>
         
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => {
            setMobileCurrentStep('charms');
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
          }}
          disabled={!selectedCaseType || !selectedColor}
          className={`${getButtonClass('charms', !selectedCaseType || !selectedColor, false)} relative`}
          aria-label="Choose charms"
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-base transition-transform duration-200 ${mobileCurrentStep === 'charms' ? 'scale-110' : ''}`}
          />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{fontFamily: "'Poppins', sans-serif"}}>
            Charms
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;
