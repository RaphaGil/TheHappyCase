import React from 'react';
import QuantityControls from './QuantityControls';
import NoteSection from './NoteSection';
import { normalizeImagePath } from '../../../utils/imagePath';

// Helper function to extract base charm name (remove suffixes like " Flag", " - Flag", etc.)
const getBaseCharmName = (name) => {
  if (!name) return '';
  let baseName = name;
  // Remove common suffixes
  baseName = baseName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
  baseName = baseName.replace(/\s+Flag$/i, '');
  return baseName.trim();
};

const CharmItem = ({ 
  item, 
  index, 
  formatPrice, 
  onRemove, 
  onIncrement, 
  onDecrement,
  openNoteIndex,
  noteTexts,
  onToggleNote,
  onNoteChange,
  onSaveNote,
  onCancelNote,
  errorMessage
}) => {
  const displayName = getBaseCharmName(item.name || item.pin?.name);
  const quantity = item.quantity || 1;
  
  return (
    <div className="mt-2">
      <div className="flex items-start justify-between px-2 py-1">
        <div className="flex items-start gap-3 flex-1">
          <div className="relative flex-shrink-0">
            {item.image ? (
              <img
                src={normalizeImagePath(item.image)}
                alt={displayName || 'Charm'}
                className="w-20 h-20 object-contain rounded"
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-20 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div>
            )}
            {/* Quantity Badge */}
          
            {/* Error Alert Badge near image */}
            {errorMessage && (
              <div className={`absolute ${quantity > 1 ? '-bottom-1 -right-1' : '-top-1 -right-1'} bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 shadow-lg`}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-light text-gray-900 font-inter">
              {displayName || 'Charm'}
            </span>
            {/* Error Message Alert Box next to charm */}
            {errorMessage && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-sm">
                <p className="text-xs text-red-700 font-inter leading-tight">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
        
      </div>

      {/* Qty and price for charm */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <QuantityControls
            quantity={item.quantity || 1}
            item={item}
            onDecrement={() => onDecrement(item.id !== undefined ? item.id : index)}
            onIncrement={() => onIncrement(item.id !== undefined ? item.id : index)}
          />
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 font-inter">
              {formatPrice((item.price || item.totalPrice || 0) * (item.quantity || 1))}
            </div>
          </div>
        </div>
      </div>

      {/* Note Section */}
      <NoteSection
        item={item}
        index={index}
        openNoteIndex={openNoteIndex}
        noteTexts={noteTexts}
        onToggleNote={onToggleNote}
        onNoteChange={onNoteChange}
        onSaveNote={onSaveNote}
        onCancelNote={onCancelNote}
      />
    </div>
  );
};

export default CharmItem;

