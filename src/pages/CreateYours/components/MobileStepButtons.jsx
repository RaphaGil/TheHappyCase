import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor }) => {
  return (
    <div className="mb-4 flex justify-center ">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {/* Choose Case Button */}
        <button
          onClick={() => {
            // Close canvas controls if open
            if (typeof window !== 'undefined' && window.closeCanvasControls) {
              window.closeCanvasControls();
            }
            setMobileCurrentStep('case');
          }}
          className={`rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center ${
            mobileCurrentStep === 'case'
              ? 'bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover'
              : 'bg-btn-secondary-light hover:bg-btn-secondary-light-hover text-btn-secondary-light-text border border-btn-secondary-light-border hover:border-btn-secondary-light-hover'
          }`}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            width: '64px',
            height: '64px',
            padding: '10px'
          }}
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className={`text-md sm:text-lg ${
              mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ marginBottom: '6px' }}
          />
          <span className={`text-[10px] sm:text-[10px] uppercase tracking-wide font-medium font-inter ${
            mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-700'
          }`}>
            Case
          </span>
        </button>

        {/* Choose Color Button */}
        <button
          onClick={() => {
            // Close canvas controls if open
            if (typeof window !== 'undefined' && window.closeCanvasControls) {
              window.closeCanvasControls();
            }
            setMobileCurrentStep('color');
          }}
          disabled={!selectedCaseType}
          className={`rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center ${
            !selectedCaseType
              ? 'bg-gray-100 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover'
              : 'bg-btn-secondary-light hover:bg-btn-secondary-light-hover text-btn-secondary-light-text border border-btn-secondary-light-border hover:border-btn-secondary-light-hover'
          }`}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            width: '64px',
            height: '64px',
            padding: '10px'
          }}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-md sm:text-lg ${
              !selectedCaseType
                ? 'text-gray-400'
                : mobileCurrentStep === 'color'
                ? 'text-white'
                : 'text-gray-700'
            }`}
            style={{ marginBottom: '6px' }}
          />
          <span className={`text-[10px] sm:text-[10px] uppercase tracking-wide font-medium font-inter ${
            !selectedCaseType
              ? 'text-gray-400'
              : mobileCurrentStep === 'color'
              ? 'text-white'
              : 'text-gray-700'
          }`}>
            Color
          </span>
        </button>

        {/* Choose Charms Button */}
        <button
          onClick={() => {
            // Close canvas controls if open
            if (typeof window !== 'undefined' && window.closeCanvasControls) {
              window.closeCanvasControls();
            }
            setMobileCurrentStep('charms');
          }}
          disabled={!selectedCaseType || !selectedColor}
          className={`rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-100 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover'
              : 'bg-btn-secondary-light hover:bg-btn-secondary-light-hover text-btn-secondary-light-text border border-btn-secondary-light-border hover:border-btn-secondary-light-hover'
          }`}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            width: '64px',
            height: '64px',
            padding: '10px'
          }}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-md sm:text-lg ${
              !selectedCaseType || !selectedColor
                ? 'text-gray-400'
                : mobileCurrentStep === 'charms'
                ? 'text-white'
                : 'text-gray-700'
            }`}
            style={{ marginBottom: '6px' }}
          />
          <span className={`text-[10px] sm:text-[10px] uppercase tracking-wide font-medium font-inter ${
            !selectedCaseType || !selectedColor
              ? 'text-gray-400'
              : mobileCurrentStep === 'charms'
              ? 'text-white'
              : 'text-gray-700'
          }`}>
            Charms
          </span>
        </button>
        
        {/* Add Text Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Close canvas controls if open
            if (typeof window !== 'undefined' && window.closeCanvasControls) {
              window.closeCanvasControls();
            }
            if (mobileCurrentStep === 'text') {
              setMobileCurrentStep(null); // Close text input, don't open case selection
            } else {
              setMobileCurrentStep('text');
            }
          }}
          className={`rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center ${
            mobileCurrentStep === 'text'
              ? 'bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover'
              : 'bg-btn-secondary-light hover:bg-btn-secondary-light-hover text-btn-secondary-light-text border border-btn-secondary-light-border hover:border-btn-secondary-light-hover'
          }`}
          style={{ 
            WebkitTapHighlightColor: 'transparent',
            width: '64px',
            height: '64px',
            padding: '10px'
          }}
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className={`text-md sm:text-lg ${
              mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ marginBottom: '6px' }}
          />
          <span className={`text-[10px] sm:text-[10px] uppercase tracking-wide font-medium font-inter ${
            mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-700'
          }`}>
            Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


