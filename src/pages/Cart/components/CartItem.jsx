import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { groupPinsByKey, getItemTotal } from "../../../data/helpers";
import { normalizeImagePath } from "../../../utils/imagePath";

// Helper function to extract base charm name (remove suffixes like " Flag", " - Flag", etc.)
const getBaseCharmName = (name) => {
  if (!name) return '';
  let baseName = name;
  // Remove common suffixes
  baseName = baseName.replace(/\s*-\s*(Flag|Colorful Charm|Bronze Charm)$/i, '');
  baseName = baseName.replace(/\s+Flag$/i, '');
  return baseName.trim();
};

const CharmLineItem = ({ item, formatPrice, errorMessage }) => {
  const displayName = getBaseCharmName(item.name || item.pin?.name);
  const quantity = item.quantity || 1;
  const unitPrice = item.price || item.totalPrice || 0;
  const totalPrice = unitPrice * quantity;
  
  return (
  <div className="mt-2 flex flex-col gap-2">
    <div className="flex items-start justify-between px-2 py-2 gap-2">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          {item.image ? (
            <img
              src={normalizeImagePath(item.image)}
              alt={item.name || "Charm"}
              className="w-24 h-24 object-contain rounded"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="96"
            />
          ) : item.pin?.src ? (
            <img
              src={normalizeImagePath(item.pin.src)}
              alt={item.pin.name || "Charm"}
              className="w-24 h-24 object-contain rounded"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="96"
            />
          ) : (
            <div className="w-24 h-24 rounded bg-gray-50 border border-gray-200 flex items-center justify-center">
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
          <div className="text-xs font-light text-gray-900 mb-1 font-inter">
            <div className="break-words">{displayName || "Charm"}</div>
            <div className="text-gray-500 font-light font-inter text-[10px]">
              {item.category === "bronze"
                ? "Bronze Charm"
                : item.category === "flags"
                ? "Flag"
                : "Colorful Charm"}
            </div>
          </div>
          {/* Error Message Alert Box next to charm */}
          {errorMessage && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-sm animate-pulse">
              <p className="text-xs text-red-700 font-inter leading-tight font-medium">
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
        {formatPrice(totalPrice)}
      </div>
    </div>
  </div>
  );
};

const CustomCaseWithCharms = ({ item, formatPrice, errorMessage, charmErrors = {} }) => {
  const grouped = groupPinsByKey(item.pinsDetails);
  const groupedList = Object.values(grouped);
  const base = typeof item.basePrice === "number" ? item.basePrice : 8;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-start px-2 py-2 gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            {item.designImage ? (
              <img
                src={item.designImage}
                alt="Your Design"
                className="w-24 h-18 object-contain rounded"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width="96"
                height="72"
              />
            ) : item.caseImage || item.image ? (
              <img
                src={normalizeImagePath(item.caseImage || item.image)}
                alt="Case"
                className="w-24 h-18 object-contain rounded"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width="96"
                height="72"
              />
            ) : (
              <div
                className="w-24 h-18 rounded border-2 border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              />
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
            <div className="text-xs font-light text-gray-900 mb-1 font-inter">
              <div className="break-words">{item.caseName || item.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-500 font-light font-inter">
                  Color:
                </span>
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </div>
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
        <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
          {formatPrice(base)}
        </div>
      </div>

      {groupedList.map((pin, i) => {
        // Match charm error by name-category (matching the key format used in increment handler)
        // In increment handler: charmName = pin.name || pin.src || ''
        // Normalize empty category to 'colorful' to match increment handler logic
        const charmName = pin.name || pin.src || '';
        const charmCategory = (pin.category && pin.category.trim() !== '') ? pin.category : 'colorful';
        const charmKey = `${charmName}-${charmCategory}`;
        const charmError = charmErrors[charmKey];
        const displayName = getBaseCharmName(pin.name);
        
        return (
          <div
            key={i}
            className="flex items-start justify-between px-2 py-2 gap-2"
          >
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src={normalizeImagePath(pin.src)}
                  alt={displayName || 'Charm'}
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                  width="96"
                  height="96"
                />
                {/* Error Alert Badge near charm image */}
                {charmError && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 shadow-lg">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="text-xs font-light text-gray-900 mb-1 font-inter flex-1 min-w-0">
                <div className="break-words">
                  {displayName || 'Charm'} {pin.count > 1 ? `(x${pin.count})` : ""}
                </div>
                {/* Error Message Alert Box next to charm */}
                {charmError && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-sm animate-pulse">
                    <p className="text-xs text-red-700 font-inter leading-tight font-medium">
                      {charmError}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
              {formatPrice(pin.price * pin.count)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const StandaloneCase = ({ item, formatPrice, errorMessage }) => (
  <div className="mt-2 flex flex-col gap-2">
    <div className="flex items-start justify-between px-2 py-2 gap-2">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          {item.designImage ? (
            <img
              src={item.designImage}
              alt="Your Design"
              className="w-24 h-18 object-contain rounded"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="72"
            />
          ) : item.caseImage || item.image ? (
            <img
              src={normalizeImagePath(item.caseImage || item.image)}
              alt={item.caseName || item.name || "Case"}
              className="w-24 h-18 object-contain rounded"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="72"
            />
          ) : (
            <div
              className="w-24 h-18 rounded border-2 border-gray-300 flex items-center justify-center"
              style={{ backgroundColor: item.color }}
            />
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
            <div className="text-xs font-light text-gray-900 mb-1 font-inter">
              <div className="break-words">{item.caseName || item.name || "Passport Case"}</div>
              {item.color && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 font-light font-inter">
                    Color:
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              )}
            </div>
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
      <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
        {formatPrice(
          item.basePrice || item.price || item.totalPrice || 0
        )}
      </div>
    </div>
  </div>
);

const QuantityControls = ({
  index,
  item,
  incrementItemQty,
  decrementItemQty,
}) => (
  <div>
    <div className="text-xs text-gray-500 mb-2 font-light font-inter">
      Quantity:
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center border border-gray-200 rounded-sm p-1 w-fit">
        <button
          onClick={() => decrementItemQty(item.id !== undefined ? item.id : index)}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          title="Decrease"
        >
          −
        </button>
        <div className="px-3 py-1 text-sm text-gray-900 font-light font-inter">
          {item.quantity || 1}
        </div>
        <button
          onClick={() => incrementItemQty(item.id !== undefined ? item.id : index)}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          title="Add one more"
        >
          +
        </button>
      </div>
      
    </div>
  </div>
);

const NoteEditor = ({
  index,
  item,
  openNoteIndex,
  noteTexts,
  setOpenNoteIndex,
  setNoteTexts,
  handleNoteChange,
  handleSaveNote,
}) => {
  const isOpen = openNoteIndex === index;

  return (
    <>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-2 font-light font-inter">
            Add a note for this item:
          </div>
          <textarea
            value={
              noteTexts[index] !== undefined
                ? noteTexts[index]
                : item.note || ""
            }
            onChange={(e) => handleNoteChange(index, e.target.value)}
            placeholder="Add any special instructions or notes..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-light resize-none font-inter"
            rows="3"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setOpenNoteIndex(null);
                setNoteTexts({
                  ...noteTexts,
                  [index]: item.note || "",
                });
              }}
              className="px-4 py-1.5 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors font-inter"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveNote(index)}
              className="px-4 py-1.5 text-xs uppercase tracking-wider font-light font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {item.note && openNoteIndex !== index && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1 font-light font-inter">
            Note:
          </div>
          <div className="text-sm text-gray-700 font-light whitespace-pre-wrap font-inter">
            {item.note}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() =>
            setOpenNoteIndex(openNoteIndex === index ? null : index)
          }
          className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors font-inter"
        >
          {item.note ? "Edit Note" : "Add Note"}
          <FontAwesomeIcon
            icon={openNoteIndex === index ? faChevronUp : faChevronDown}
            className="ml-2 text-xs"
          />
        </button>
      </div>
    </>
  );
};

const CartItem = ({
  item,
  index,
  formatPrice,
  incrementItemQty,
  decrementItemQty,
  removeFromCart,
  openNoteIndex,
  setOpenNoteIndex,
  noteTexts,
  setNoteTexts,
  handleNoteChange,
  handleSaveNote,
  errorMessage,
  charmErrors = {},
}) => (
  <div className="border border-gray-200 p-6 bg-white" data-item-id={item.id || index}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {item.type === "charm" ? (
          <CharmLineItem item={item} formatPrice={formatPrice} errorMessage={errorMessage} />
        ) : item.pinsDetails && item.pinsDetails.length > 0 ? (
          <CustomCaseWithCharms item={item} formatPrice={formatPrice} errorMessage={errorMessage} charmErrors={charmErrors} />
        ) : (
          <StandaloneCase item={item} formatPrice={formatPrice} errorMessage={errorMessage} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
          <QuantityControls
            index={index}
            item={item}
            incrementItemQty={incrementItemQty}
            decrementItemQty={decrementItemQty}
          />
          <div className="flex items-center justify-end">
            <button
              onClick={() => removeFromCart(index)}
              className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 text-xs uppercase tracking-wider font-light transition-colors font-inter"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2 text-xs" />
              Remove
            </button>
          </div>
        </div>

        <NoteEditor
          index={index}
          item={item}
          openNoteIndex={openNoteIndex}
          noteTexts={noteTexts}
          setOpenNoteIndex={setOpenNoteIndex}
          setNoteTexts={setNoteTexts}
          handleNoteChange={handleNoteChange}
          handleSaveNote={handleSaveNote}
        />

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-light text-gray-700 font-inter">
              Item Total:
            </span>
            <span className="text-sm font-medium text-gray-900 font-inter">
              {getItemTotal(item, formatPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItem;



