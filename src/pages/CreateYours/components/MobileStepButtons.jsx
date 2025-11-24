import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPalette, faPlane, faFont } from '@fortawesome/free-solid-svg-icons';

const MobileStepButtons = ({ mobileCurrentStep, setMobileCurrentStep, selectedCaseType, selectedColor }) => {
  return (
    <div className="mb-0 flex justify-center">
      <div className="grid grid-cols-4 gap-4">
        {/* Choose Case Button */}
        <button
          onClick={() => {
            // Close canvas controls if open
            if (typeof window !== 'undefined' && window.closeCanvasControls) {
              window.closeCanvasControls();
            }
            setMobileCurrentStep('case');
          }}
          className={`w-16 rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center py-3 ${
            mobileCurrentStep === 'case'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <FontAwesomeIcon 
            icon={faBriefcase} 
            className={`text-lg mb-1.5 ${
              mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] uppercase tracking-wide font-medium ${
            mobileCurrentStep === 'case' ? 'text-white' : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
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
          className={`w-16 rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center py-3 ${
            !selectedCaseType
              ? 'bg-gray-100 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'color'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <FontAwesomeIcon 
            icon={faPalette} 
            className={`text-lg mb-1.5 ${
              !selectedCaseType
                ? 'text-gray-400'
                : mobileCurrentStep === 'color'
                ? 'text-white'
                : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] uppercase tracking-wide font-medium ${
            !selectedCaseType
              ? 'text-gray-400'
              : mobileCurrentStep === 'color'
              ? 'text-white'
              : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
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
          className={`w-16 rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center py-3 ${
            !selectedCaseType || !selectedColor
              ? 'bg-gray-100 opacity-50 cursor-not-allowed'
              : mobileCurrentStep === 'charms'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <FontAwesomeIcon 
            icon={faPlane} 
            className={`text-lg mb-1.5 ${
              !selectedCaseType || !selectedColor
                ? 'text-gray-400'
                : mobileCurrentStep === 'charms'
                ? 'text-white'
                : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] uppercase tracking-wide font-medium ${
            !selectedCaseType || !selectedColor
              ? 'text-gray-400'
              : mobileCurrentStep === 'charms'
              ? 'text-white'
              : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
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
          className={`w-16 rounded-sm transition-all duration-200 touch-manipulation flex flex-col items-center justify-center py-3 ${
            mobileCurrentStep === 'text'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <FontAwesomeIcon 
            icon={faFont} 
            className={`text-lg mb-1.5 ${
              mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-700'
            }`}
          />
          <span className={`text-[10px] uppercase tracking-wide font-medium ${
            mobileCurrentStep === 'text' ? 'text-white' : 'text-gray-700'
          }`} style={{fontFamily: "'Poppins', sans-serif"}}>
            Text
          </span>
        </button>
      </div>
    </div>
  );
};

export default MobileStepButtons;


