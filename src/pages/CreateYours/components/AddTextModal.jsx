import React, { useEffect } from 'react';
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
  // Prevent page movement when modal is open - especially on mobile
  useEffect(() => {
    if (show) {
      // Save current scroll position
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const isMobile = window.innerWidth < 768;
      
      // Prevent scrolling on body and html
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.right = '0';
      document.body.style.touchAction = 'none';
      document.body.style.overscrollBehavior = 'none';
      
      // Also prevent scrolling on html element
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      document.documentElement.style.touchAction = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      
      // Prevent viewport movement on mobile when keyboard appears
      if (isMobile) {
        // Prevent zoom on input focus (iOS)
        const viewport = document.querySelector('meta[name="viewport"]');
        const originalContent = viewport ? viewport.getAttribute('content') : '';
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        // Prevent scroll on touch
        const preventScroll = (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('touchstart', preventScroll, { passive: false });
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('scroll', preventScroll, { passive: false });
        
        return () => {
          // Restore viewport
          if (viewport && originalContent) {
            viewport.setAttribute('content', originalContent);
          }
          
          // Remove event listeners
          document.removeEventListener('touchmove', preventScroll);
          document.removeEventListener('touchstart', preventScroll);
          document.removeEventListener('wheel', preventScroll);
          document.removeEventListener('scroll', preventScroll);
          
          // Restore scrolling
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.height = '';
          document.body.style.top = '';
          document.body.style.left = '';
          document.body.style.right = '';
          document.body.style.touchAction = '';
          document.body.style.overscrollBehavior = '';
          
          document.documentElement.style.overflow = '';
          document.documentElement.style.position = '';
          document.documentElement.style.width = '';
          document.documentElement.style.height = '';
          document.documentElement.style.touchAction = '';
          document.documentElement.style.overscrollBehavior = '';
          
          window.scrollTo(scrollX, scrollY);
        };
      }
      
      return () => {
        // Restore scrolling when modal closes
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.touchAction = '';
        document.body.style.overscrollBehavior = '';
        
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';
        document.documentElement.style.touchAction = '';
        document.documentElement.style.overscrollBehavior = '';
        
        window.scrollTo(scrollX, scrollY);
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
      className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{position: 'fixed', touchAction: 'none'}}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div 
        className="bg-white rounded-sm max-w-md w-full border border-gray-200 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        style={{touchAction: 'none'}}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-caption font-medium text-gray-900 uppercase tracking-wider font-inter">
            4. Add Text
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded"
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
              onFocus={(e) => {
                // Prevent page movement when input is focused on mobile
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                  // Lock scroll position
                  const scrollY = window.scrollY;
                  const scrollX = window.scrollX;
                  
                  // Prevent any movement
                  document.body.style.position = 'fixed';
                  document.body.style.top = `-${scrollY}px`;
                  document.body.style.left = `-${scrollX}px`;
                  document.body.style.width = '100%';
                  document.body.style.height = '100%';
                  document.body.style.overflow = 'hidden';
                  document.body.style.touchAction = 'none';
                  
                  // Prevent viewport zoom on iOS
                  const viewport = document.querySelector('meta[name="viewport"]');
                  if (viewport) {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                  }
                  
                  // Lock scroll
                  window.scrollTo(scrollX, scrollY);
                }
              }}
              onBlur={() => {
                // Restore when input loses focus (but keep modal locked)
                // The useEffect will handle cleanup when modal closes
              }}
              placeholder="e.g. Your name"
              className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-thin text-sm font-inter"
              style={{touchAction: 'manipulation'}}
              maxLength={40}
            />
            <p className="mt-1 text-caption text-gray-500 font-inter">
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
              className="flex-1 px-4 py-2 text-xs uppercase tracking-wider font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
            >
              Add Text
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 font-inter"
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

