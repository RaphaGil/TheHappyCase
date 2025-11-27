import React from 'react';
import QuantityControls from './QuantityControls';
import NoteSection from './NoteSection';

const CaseItem = ({ 
  item, 
  index, 
  formatPrice, 
  onIncrement, 
  onDecrement,
  openNoteIndex,
  noteTexts,
  onToggleNote,
  onNoteChange,
  onSaveNote,
  onCancelNote
}) => {
  const base = typeof item.basePrice === 'number' ? item.basePrice : (item.price || 0);
  const groupedPins = Object.values(
    (item.pinsDetails || []).reduce((acc, pin) => {
      const key = pin.src || pin.name;
      acc[key] = acc[key] || { ...pin, quantity: 0 };
      acc[key].quantity += 1;
      return acc;
    }, {})
  );
  const basePreview = item.designImage || item.caseImage || item.image;

  const basePrice = typeof item.basePrice === 'number' ? item.basePrice : 8;
  const charms = item.pinsDetails && item.pinsDetails.length
    ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
    : Math.max(0, (item.totalPrice || 0) - basePrice);
  const unit = basePrice + charms;
  const qty = item.quantity || 1;

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            {basePreview ? (
              <img
                src={basePreview}
                alt="Case preview"
                className="w-20 h-22 object-contain rounded"
                loading="lazy"
              />
            ) : item.color ? (
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: item.color }}
              />
            ) : (
              <div className="w-20 h-22 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Image</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-light text-gray-900 font-inter">
                {item.caseName || item.name || 'Passport Case'}
              </span>
              {item.color && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-gray-500 font-light font-inter">Color:</span>
                  <div className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: item.color}}></div>
                </div>
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-900 font-inter">
            {formatPrice(base)}
          </span>
        </div>

        {groupedPins.length > 0 && groupedPins.map((groupedPin, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-2 py-1"
          >
            <div className="flex items-center gap-2">
              {groupedPin.src ? (
                <img
                  src={groupedPin.src}
                  alt={groupedPin.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-gray-200" />
              )}
              <span className="text-sm font-light text-gray-900 font-inter">
                {groupedPin.name} (x{groupedPin.quantity})
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 font-inter">
              {formatPrice((groupedPin.price || 0) * groupedPin.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Qty and price for case items */}
      <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
        <QuantityControls
          quantity={item.quantity || 1}
          onDecrement={() => onDecrement(item.id)}
          onIncrement={() => onIncrement(item.id)}
        />
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 font-inter">
            {formatPrice(unit * qty)}
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

export default CaseItem;

