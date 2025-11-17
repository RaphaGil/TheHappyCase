import React from 'react';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../constants';

const AddTextModal = ({ 
  show,
  onClose,
  customText, 
  setCustomText, 
  customTextError, 
  setCustomTextError, 
  customTextAdded, 
  setCustomTextAdded 
}) => {
  if (!show) return null;

  const handleAddText = () => {
    if (!customText.trim()) {
      setCustomTextError('Please enter the text you want to add.');
      return;
    }

    if (typeof window !== 'undefined' && window.addTextToCanvas) {
      window.addTextToCanvas(customText, {
        fill: CUSTOM_TEXT_COLOR,
        fontSize: CUSTOM_TEXT_SIZE,
      });
      setCustomTextAdded(true);
      setCustomTextError('');
      // Close modal after adding text
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setCustomTextError('Canvas is still loading. Please try again in a moment.');
    }
  };

  const handleClear = () => {
    setCustomText('');
    setCustomTextAdded(false);
    setCustomTextError('');
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-sm max-w-md w-full border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider" style={{fontFamily: "'Poppins', sans-serif"}}>
            4. Add Text
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors rounded"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-4 space-y-4">
          <div>
            <input
              type="text"
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCustomTextError('');
                setCustomTextAdded(false);
              }}
              placeholder="e.g. Your name"
              className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm"
              style={{fontFamily: "'Poppins', sans-serif"}}
              maxLength={40}
            />
            <p className="mt-1 text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>
              Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
            </p>
          </div>
         
          {customTextError && (
            <div className="text-xs text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded">
              {customTextError}
            </div>
          )}
          {customTextAdded && (
            <div className="text-xs text-green-600 border border-green-200 bg-green-50 px-3 py-2 rounded">
              Text added to your design! You can drag it to reposition it.
            </div>
          )}
          
          <div className="flex flex-row gap-2">
            <button
              onClick={handleAddText}
              className="flex-1 px-4 py-2 text-xs uppercase tracking-wider text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200"
              style={{fontFamily: "'Poppins', sans-serif"}}
            >
              Add Text
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200"
              style={{fontFamily: "'Poppins', sans-serif"}}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTextModal;

