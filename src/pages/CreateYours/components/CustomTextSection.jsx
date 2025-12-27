import React from 'react';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../../../data/constants';

const CustomTextSection = ({ 
  customText, 
  setCustomText, 
  customTextError, 
  setCustomTextError, 
  customTextAdded, 
  setCustomTextAdded,
  onTextAdded,
  onClose 
}) => {
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
      // Notify parent that text was added - make number 3 black
      if (onTextAdded) {
        onTextAdded();
      }
      // Close dropdown after adding text (with a small delay to show success message)
      if (onClose) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } else {
      setCustomTextError('Canvas is still loading. Please try again in a moment.');
    }
  };

  const handleClear = () => {
    setCustomText('');
    setCustomTextAdded(false);
    setCustomTextError('');
  };

  const handleInputFocus = (e) => {
    // Prevent page scroll/movement when input is focused (like payment forms)
    // Store current scroll position
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;
    
    // Use setTimeout to restore scroll position after browser's default behavior
    setTimeout(() => {
      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'instant'
      });
    }, 0);
    
    // Also use requestAnimationFrame as a backup
    requestAnimationFrame(() => {
      window.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'instant'
      });
    });
  };

  return (
    <div className="space-y-4 ">
        <div>
          <input
            type="text"
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setCustomTextError('');
              setCustomTextAdded(false);
            }}
            onFocus={handleInputFocus}
            placeholder="e.g. Your name"
            className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
            maxLength={40}
          />
          <p className="mt-1 text-sm text-gray-500 font-inter">
            Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
          </p>
        </div>
       
        {customTextError && (
          <div className="text-sm text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2">
            {customTextError}
          </div>
        )}
        {customTextAdded && (
          <div className="text-sm text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2">
            Text added to your design! You can drag it to reposition it.
          </div>
        )}
        <div className="flex flex-row gap-2">
          <button
            onClick={handleAddText}
            disabled={!customText.trim()}
            className="flex-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider active:bg-blue-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-md active:scale-95 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 font-inter bg-btn-light-blue hover:bg-btn-light-blue-hover text-btn-light-blue-text border border-btn-light-blue-border hover:border-btn-light-blue-hover transition-all duration-200"
          >
           Add Text
          </button>
          <button
            onClick={handleClear}
            disabled={!customText.trim()}
            className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider active:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed rounded-md active:scale-95 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 font-inter bg-btn-light-gray hover:bg-btn-light-gray-hover text-btn-light-gray-text border border-btn-light-gray-border hover:border-btn-light-gray-hover transition-all duration-200"
          >
           Clear
          </button>
        </div>
    </div>
  );
};

export default CustomTextSection;


