import React from 'react';
import Image from 'next/image';
import { normalizeImagePath } from '../../utils/imagePath';
import { OPTION_FONT_STYLE, OPTION_SECTION_LABEL } from './designOptionStyles';

const SelectedCharmsList = ({ selectedPins = [], onRemove }) => {
  if (!selectedPins.length) return null;

  return (
    <div className="mb-3 pb-3 border-b border-gray-100">
      <h4 className={`${OPTION_SECTION_LABEL} mb-2`} style={OPTION_FONT_STYLE}>
        Selected ({selectedPins.length})
      </h4>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {selectedPins.map(({ pin, imgInstance }, index) => {
          const key = pin?.src ? `${pin.src}-${index}` : `pin-${index}`;
          return (
            <div
              key={key}
              className="relative flex-shrink-0 flex flex-col items-center gap-1 w-16"
            >
              <div className="relative h-14 w-14 rounded-md border border-gray-200 bg-white p-0.5">
                {pin?.src && (
                  <Image
                    src={normalizeImagePath(pin.src)}
                    alt={pin.name || 'Charm'}
                    width={52}
                    height={52}
                    className="h-full w-full object-contain"
                  />
                )}
                <button
                  type="button"
                  onClick={() => onRemove?.(imgInstance)}
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs leading-none hover:bg-gray-700 transition-colors"
                  aria-label={`Remove ${pin?.name || 'charm'}`}
                >
                  ×
                </button>
              </div>
              <span
                className="text-[10px] text-gray-600 text-center leading-tight line-clamp-2 w-full"
                style={OPTION_FONT_STYLE}
              >
                {pin?.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedCharmsList;
