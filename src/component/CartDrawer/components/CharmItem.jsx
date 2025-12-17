import React from 'react';
import QuantityControls from './QuantityControls';
import NoteSection from './NoteSection';

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
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name || item.pin?.name || 'Charm'}
              className="w-20 h-20 object-contain rounded"
              loading="lazy"
            />
          ) : (
            <div className="w-20 h-20 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">Image</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-light text-gray-900 font-inter">
              {item.name || item.pin?.name || 'Charm'}
            </span>
           
          </div>
        </div>
        
      </div>

      {/* Qty and price for charm */}
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <QuantityControls
            quantity={item.quantity || 1}
            item={item}
            onDecrement={() => onDecrement(item.id)}
            onIncrement={() => onIncrement(item.id)}
          />
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 font-inter">
              {formatPrice((item.price || item.totalPrice || 0) * (item.quantity || 1))}
            </div>
          </div>
        </div>
        
        {/* Inline Error Message */}
        {errorMessage && (
          <p className="text-sm text-red-600 font-inter ml-1">
            {errorMessage}
          </p>
        )}
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

