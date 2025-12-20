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
  onCancelNote,
  errorMessage,
  charmErrors
}) => {
  return (
    <div className=" pb-4 flex items-start gap-3">
      <div className="flex-1">
        <div className="flex justify-end items-end mb-2">
          <button 
            onClick={() => onRemove(index)} 
            className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors font-inter"
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
            errorMessage={errorMessage}
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
            errorMessage={errorMessage}
            charmErrors={charmErrors}
          />
        )}
      </div>
    </div>
  );
};

export default CartItem;

