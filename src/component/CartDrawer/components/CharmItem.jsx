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
  onCancelNote
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
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
              {item.name}
            </span>
            <span className="text-xs text-gray-500 font-light font-inter">
              {item.category ? `${item.category.charAt(0).toUpperCase() + item.category.slice(1)} Charm` : 'Charm'}
            </span>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-900 font-inter">
          {formatPrice(item.price || item.totalPrice || 0)}
        </span>
      </div>

      {/* Qty and price for charm */}
      <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
        <QuantityControls
          quantity={item.quantity || 1}
          onDecrement={() => onDecrement(item.id)}
          onIncrement={() => onIncrement(item.id)}
        />
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 font-inter">
            {formatPrice((item.price || item.totalPrice || 0) * (item.quantity || 1))}
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

