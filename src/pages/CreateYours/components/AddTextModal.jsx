import React, { useEffect } from 'react';
import { CUSTOM_TEXT_COLOR, CUSTOM_TEXT_SIZE, MAX_TEXT_LENGTH } from '../../../data/constants';

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
  // Prevent page scroll when modal is open
  useEffect(() => {
    if (show) {
      // Save current scroll position
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollX = window.scrollX || window.pageXOffset;
      
      // Get original styles
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyTop = document.body.style.top;
      const originalBodyWidth = document.body.style.width;
      const originalBodyLeft = document.body.style.left;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      
      // Apply styles to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.left = `-${scrollX}px`;
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.top = originalBodyTop;
        document.body.style.width = originalBodyWidth;
        document.body.style.left = originalBodyLeft;
        document.documentElement.style.overflow = originalHtmlOverflow;
        
        // Restore scroll position after a brief delay to ensure styles are applied
        requestAnimationFrame(() => {
          window.scrollTo(scrollX, scrollY);
        });
      };
    }
  }, [show]);

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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white  max-w-md w-full border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3 xs:p-4 border-b border-gray-200">
          <h3 className="text-xs xs:text-sm font-medium text-gray-900 uppercase tracking-wider" style={{fontFamily: "'Poppins', sans-serif"}}>
             Add Text
          </h3>
          <button
            onClick={onClose}
            className="p-1 xs:p-2 hover:bg-gray-50 transition-colors "
            aria-label="Close modal"
          >
            <svg className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Content - Matching desktop CustomTextSection */}
        <div className="p-3 xs:p-4 space-y-4">
          <div>
            <input
              type="text"
              value={customText || ''}
              onChange={(e) => {
                setCustomText(e.target.value);
                setCustomTextError('');
                setCustomTextAdded(false);
              }}
              onFocus={(e) => {
                // Prevent page scroll on input focus (mobile)
                e.preventDefault();
                setTimeout(() => {
                  e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              placeholder="e.g. Your name"
              className="w-full px-3 py-2 border border-gray-200 focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
              style={{ fontSize: '16px' }}
              maxLength={40}
            />
            <p className="mt-1 text-sm text-gray-500 font-inter">
              Up to {MAX_TEXT_LENGTH} characters. Double-click the text on the case to edit or move it.
            </p>
          </div>
         
          {customTextError && (
            <div className="text-sm text-gray-600 border border-gray-200 bg-gray-50 px-3 py-2 font-inter">
              {customTextError}
            </div>
          )}
          {customTextAdded && (
            <div className="text-sm text-gray-600  px-3 py-2 font-inter">
              Text added to your design! You can drag it to reposition it.
            </div>
          )}
          
          <div className="flex flex-row gap-2">
            <button
              onClick={handleAddText}
              disabled={!customText.trim()}
              className="flex-1 px-3 py-1.5 text-xs font-medium uppercase tracking-wider active:bg-blue-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed  active:scale-95 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1 font-inter bg-btn-light-blue hover:bg-btn-light-blue-hover text-btn-light-blue-text border border-btn-light-blue-border hover:border-btn-light-blue-hover transition-all duration-200"
            >
              Add Text
            </button>
            <button
              onClick={handleClear}
              disabled={!customText.trim()}
              className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider active:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed active:scale-95 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 font-inter bg-btn-light-gray hover:bg-btn-light-gray-hover text-btn-light-gray-text border border-btn-light-gray-border hover:border-btn-light-gray-hover transition-all duration-200"
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

