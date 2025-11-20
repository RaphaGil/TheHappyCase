import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../CreateYours/constants';

const AddText = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [customText, setCustomText] = useState('');
  const [customTextError, setCustomTextError] = useState('');

  // Get text from location state if coming back
  useEffect(() => {
    if (location.state?.text) {
      setCustomText(location.state.text);
    }
  }, [location.state]);

  const handleAddText = () => {
    if (!customText.trim()) {
      setCustomTextError('Please enter the text you want to add.');
      return;
    }

    // Navigate back to CreateYours with the text
    navigate('/CreateYours', {
      state: { 
        addText: true,
        text: customText.trim()
      }
    });
  };

  const handleBack = () => {
    navigate('/CreateYours');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-light text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '0.05em'}}>
            Add Text
          </h1>
          <div className="w-16 h-px bg-gray-300"></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
              Enter your text
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCustomTextError('');
              }}
              placeholder="e.g. Your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-base"
              style={{fontFamily: "'Poppins', sans-serif"}}
              maxLength={MAX_TEXT_LENGTH}
              autoFocus
            />
            <p className="mt-2 text-xs text-gray-500" style={{fontFamily: "'Poppins', sans-serif"}}>
              Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
            </p>
          </div>

          {customTextError && (
            <div className="text-sm text-red-600 border border-red-200 bg-red-50 px-4 py-3 rounded">
              {customTextError}
            </div>
          )}

          <div className="flex flex-row gap-3">
            <button
              onClick={handleAddText}
              className="flex-1 px-6 py-3 text-sm uppercase tracking-wider text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              style={{fontFamily: "'Poppins', sans-serif"}}
            >
              Add Text
            </button>
            <button
              onClick={() => {
                setCustomText('');
                setCustomTextError('');
              }}
              className="px-6 py-3 text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-colors"
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

export default AddText;

