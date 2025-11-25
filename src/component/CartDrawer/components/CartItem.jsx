import React from 'react';
import CharmItem from './CharmItem';
import CaseItem from './CaseItem';

const CartItem = ({ 
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
    <div className="border-b border-gray-100 pb-4 flex items-start gap-3">
      <div className="flex-1">
        <div className="flex justify-end items-end mb-2">
          <button 
            onClick={() => onRemove(index)} 
            className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors" 
            style={{fontFamily: "'Poppins', sans-serif"}}
          >
            Remove
          </button>
        </div>

        {item.type === 'charm' ? (
          <CharmItem
            item={item}
            index={index}
            formatPrice={formatPrice}
            onRemove={onRemove}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            openNoteIndex={openNoteIndex}
            noteTexts={noteTexts}
            onToggleNote={onToggleNote}
            onNoteChange={onNoteChange}
            onSaveNote={onSaveNote}
            onCancelNote={onCancelNote}
          />
        ) : (
          <CaseItem
            item={item}
            index={index}
            formatPrice={formatPrice}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            openNoteIndex={openNoteIndex}
            noteTexts={noteTexts}
            onToggleNote={onToggleNote}
            onNoteChange={onNoteChange}
            onSaveNote={onSaveNote}
            onCancelNote={onCancelNote}
          />
        )}
      </div>
    </div>
  );
};

export default CartItem;

