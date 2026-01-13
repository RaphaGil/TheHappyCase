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
  onCancelNote,
  errorMessage,
  charmErrors = {}
}) => {
  const groupedPins = Object.values(
    (item.pinsDetails || []).reduce((acc, pin) => {
      // Ensure pin has all required properties including category
      const pinWithName = {
        name: pin?.name || 'Charm',
        src: pin?.src || '',
        price: pin?.price || 0,
        category: pin?.category || 'colorful', // Ensure category is preserved
        ...pin // Spread to include any other properties (category will override if present)
      };
      const key = pinWithName.src || pinWithName.name;
      acc[key] = acc[key] || { ...pinWithName, quantity: 0 };
      acc[key].quantity += 1;
      return acc;
    }, {})
  );
  // Determine which image to show - prioritize design image (composite) if available, otherwise use case image
  const hasValidDesignImage = item.designImage && 
    typeof item.designImage === 'string' && 
    item.designImage.trim().length > 0;
  // Use designImage if available (could be data URL or file path), otherwise fall back to caseImage/image
  const basePreview = hasValidDesignImage ? item.designImage : (item.caseImage || item.image);
  
  // Debug logging for image display
  if (import.meta.env.DEV || item.customDesign) {
    console.log('🖼️ CaseItem - Image display debug:', {
      itemId: item.id,
      itemName: item.caseName || item.name,
      hasDesignImage: !!item.designImage,
      designImageType: item.designImage ? (item.designImage.startsWith('data:') ? 'data URL' : 'file path') : 'none',
      designImageLength: item.designImage ? item.designImage.length : 0,
      hasCaseImage: !!item.caseImage,
      caseImagePath: item.caseImage,
      hasImage: !!item.image,
      imagePath: item.image,
      basePreview: basePreview ? (basePreview.startsWith('data:') ? 'data URL' : basePreview.substring(0, 50) + '...') : 'none',
      customDesign: item.customDesign
    });
  }

  const basePrice = typeof item.basePrice === 'number' ? item.basePrice : 8;
  const charms = item.pinsDetails && item.pinsDetails.length
    ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
    : Math.max(0, (item.totalPrice || 0) - basePrice);
  const unit = basePrice + charms;
  const qty = item.quantity || 1;

  return (
    <div className="mt-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between px-2 py-1">
          <div className="flex items-start gap-3 flex-1">
            <div className="relative flex-shrink-0">
              {basePreview ? (
                <img
                  src={normalizeImagePath(basePreview)}
                  alt="Case preview"
                  className="w-20 h-22 object-contain rounded"
                  loading="lazy"
                  sizes="80px"
                  onLoad={() => {
                    if (item.customDesign) {
                      console.log('✅ CaseItem - Image loaded successfully:', {
                        itemId: item.id,
                        srcType: basePreview.startsWith('data:') ? 'data URL' : 'file path'
                      });
                    }
                  }}
                  onError={(e) => {
                    console.error('❌ CaseItem - Image failed to load:', {
                      itemId: item.id,
                      itemName: item.caseName || item.name,
                      src: normalizeImagePath(basePreview),
                      srcType: basePreview.startsWith('data:') ? 'data URL' : 'file path',
                      srcLength: basePreview.length,
                      hasDesignImage: !!item.designImage,
                      hasCaseImage: !!item.caseImage,
                      hasImage: !!item.image,
                      customDesign: item.customDesign,
                      error: e
                    });
                  }}
                />
              ) : item.color ? (
                <div
                  className="w-20 h-22 rounded border-2 border-gray-300 flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                />
              ) : (
                <div className="w-20 h-22 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Image</span>
                </div>
              )}
              {/* Error Alert Badge near image */}
              {errorMessage && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 shadow-lg">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-light text-gray-900 font-inter">
                {item.caseName || item.name || 'Passport Case'}
              </span>
              {item.color && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-gray-500 font-light font-inter">Color:</span>
                  <div className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: item.color}}></div>
                </div>
              )}
              {/* Error Message Alert Box next to case */}
              {errorMessage && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-sm animate-pulse">
                  <p className="text-xs text-red-700 font-inter leading-tight font-medium">
                    {errorMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
      
        </div>

      {groupedPins.length > 0 && groupedPins.map((groupedPin, i) => {
        // Match charm error by name-category (matching the key format used in increment handler)
        // In increment handler: charmName = pin.name || pin.src || ''
        // Normalize empty category to 'colorful' to match increment handler logic
        const charmName = groupedPin.name || groupedPin.src || '';
        const charmCategory = (groupedPin.category && groupedPin.category.trim() !== '') ? groupedPin.category : 'colorful';
        const charmKey = `${charmName}-${charmCategory}`;
        const charmError = charmErrors[charmKey];
        
        return (
          <div
            key={i}
            className="flex items-center justify-between px-2 py-1"
          >
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-shrink-0">
                {groupedPin.src ? (
                  <img
                    src={normalizeImagePath(groupedPin.src)}
                    alt={groupedPin.name || 'Charm'}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-8 h-8 rounded bg-gray-200" />
                )}
                {/* Error Alert Badge near charm image */}
                {charmError && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center z-10 shadow-lg">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-light text-gray-900 font-inter">
                  {getBaseCharmName(groupedPin.name) || 'Charm'} {groupedPin.quantity > 1 ? `(x${groupedPin.quantity})` : ''}
                </span>
                {/* Error Message Alert Box next to charm */}
                {charmError && (
                  <div className="mt-1 p-1.5 bg-red-50 border border-red-200 rounded-sm">
                    <p className="text-xs text-red-700 font-inter leading-tight">
                      {charmError}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Qty and price for case items */}
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
              {formatPrice(unit * qty)}
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

export default CaseItem;

