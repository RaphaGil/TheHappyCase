import React, { useState } from 'react';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../constants';

const CustomTextSection = ({ onTextAdded }) => {
  const [customText, setCustomText] = useState('');
  const [customTextError, setCustomTextError] = useState('');
  const [customTextAdded, setCustomTextAdded] = useState(false);
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
      // Notify parent that text was added
      if (onTextAdded) {
        onTextAdded();
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

  return (
    <div className="space-y-4">
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
          <div className="text-xs text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2">
            {customTextError}
          </div>
        )}
        {customTextAdded && (
          <div className="text-xs text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2">
            Text added to your design! You can drag it to reposition it.
          </div>
        )}
        <div className="flex flex-row gap-2">
          <button
            onClick={handleAddText}
            className="px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded shadow-sm"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
           Add Text
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded shadow-sm"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
           Clear
          </button>
        </div>
    </div>
  );
};

export default CustomTextSection;


