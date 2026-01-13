import React from 'react';
import { MAX_TEXT_LENGTH } from '../../data/constants';

const MobileAddTextSection = ({
  customText,
  setCustomText,
  customTextError,
  setCustomTextError,
  customTextAdded,
  setCustomTextAdded,
  onAddText
}) => {
  return (
    <div className="px-2 xs:px-3 sm:px-4 space-y-2 pt-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={customText || ''}
          onChange={(e) => {
            setCustomText(e.target.value);
            setCustomTextError('');
            setCustomTextAdded(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && customText.trim()) {
              onAddText();
            }
          }}
          placeholder="e.g. Your name"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
          style={{ fontSize: '16px' }}
          maxLength={MAX_TEXT_LENGTH}
        />
        <button
          onClick={onAddText}
          disabled={!customText.trim()}
          className="px-4 py-2 text-xs font-medium uppercase tracking-wider disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-100 rounded-sm active:scale-95 disabled:scale-100 focus:outline-none font-inter bg-btn-light-blue hover:bg-btn-light-blue-hover text-btn-light-blue-text border border-btn-light-blue-border hover:border-btn-light-blue-hover transition-all duration-200"
        >
          Add
        </button>
      </div>
      <p className="text-xs text-gray-500 font-inter">
        Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
      </p>
      {customTextError && (
        <div className="text-xs text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 rounded">
          {customTextError}
        </div>
      )}
      {customTextAdded && (
        <div className="text-xs text-green-700 bg-green-50 px-1 py-2">
          Text added to your design! You can drag it to reposition it.
        </div>
      )}
    </div>
  );
};

export default MobileAddTextSection;
