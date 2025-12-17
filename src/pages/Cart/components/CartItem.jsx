import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { groupPinsByKey, getItemTotal } from "../../../data/helpers";

const CharmLineItem = ({ item, formatPrice }) => (
  <div className="mt-2 flex flex-col gap-2">
    <div className="flex items-start justify-between px-2 py-2 gap-2">
      <div className="flex items-start gap-2 flex-1 min-w-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name || "Charm"}
            className="w-24 h-24 object-contain"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="96"
            height="96"
          />
        ) : item.pin?.src ? (
          <img
            src={item.pin.src}
            alt={item.pin.name || "Charm"}
            className="w-24 h-24 object-contain"
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

        <div className="text-xs font-light text-gray-900 mb-1 font-inter flex-1 min-w-0">
          <div className="break-words">{item.name || item.pin?.name || "Charm"}</div>
          <div className="text-gray-500 font-light font-inter text-[10px]">
            {item.category === "bronze"
              ? "Bronze Charm"
              : item.category === "flags"
              ? "Flag"
              : "Colorful Charm"}
          </div>
        </div>
      </div>
      <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
        {formatPrice(item.price || item.totalPrice || 0)}
      </div>
    </div>
  </div>
);

const CustomCaseWithCharms = ({ item, formatPrice }) => {
  const grouped = groupPinsByKey(item.pinsDetails);
  const groupedList = Object.values(grouped);
  const base = typeof item.basePrice === "number" ? item.basePrice : 8;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex items-start px-2 py-2 gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          {item.designImage ? (
            <img
              src={item.designImage}
              alt="Your Design"
              className="w-24 h-18 object-contain"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="72"
            />
          ) : item.caseImage || item.image ? (
            <img
              src={item.caseImage || item.image}
              alt="Case"
              className="w-24 h-18 object-contain"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="72"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: item.color }}
            />
          )}
          <div className="text-xs font-light text-gray-900 mb-1 font-inter flex-1 min-w-0">
            <div className="break-words">{item.caseName || item.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-light font-inter">
                Color:
              </span>
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        </div>
        <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
          {formatPrice(base)}
        </div>
      </div>

      {groupedList.map((pin, i) => (
        <div
          key={i}
          className="flex items-start justify-between px-2 py-2 gap-2"
        >
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <img
              src={pin.src}
              alt={pin.name || 'Charm'}
              className="w-24 h-24 object-contain"
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              width="96"
              height="96"
            />
            <div className="text-xs font-light text-gray-900 mb-1 font-inter flex-1 min-w-0">
              <div className="break-words">
                {pin.name || 'Charm'} {pin.count > 1 ? `(x${pin.count})` : ""}
              </div>
          
            </div>
          </div>
          <div className="text-xs font-medium text-gray-900 font-inter flex-shrink-0">
            {formatPrice(pin.price * pin.count)}
          </div>
        </div>
      ))}
    </div>
  );
};

const StandaloneCase = ({ item, formatPrice }) => (
  <div className="mt-2 flex flex-col gap-2">
    <div className="flex items-start justify-between px-2 py-2 gap-2">
      <div className="flex items-start gap-2 flex-1 min-w-0">
        {item.designImage ? (
          <img
            src={item.designImage}
            alt="Your Design"
            className="w-24 h-18 object-contain"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="96"
            height="72"
          />
        ) : item.caseImage || item.image ? (
          <img
            src={item.caseImage || item.image}
            alt={item.caseName || item.name || "Case"}
            className="w-24 h-18 object-contain"
            loading="lazy"
            fetchPriority="low"
            decoding="async"
            width="96"
            height="72"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: item.color }}
          />
        )}
        <div className="text-xs font-light text-gray-900 mb-1 font-inter flex-1 min-w-0">
          <div className="break-words">{item.caseName || item.name || "Passport Case"}</div>
          {item.color && (
            <div className="flex items-center gap-2">
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
  errorMessage,
}) => (
  <div>
    <div className="text-xs text-gray-500 mb-2 font-light font-inter">
      Quantity:
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex items-center border border-gray-200 rounded-sm p-1 w-fit">
        <button
          onClick={() => decrementItemQty(item.id || index)}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          title="Decrease"
        >
          −
        </button>
        <div className="px-3 py-1 text-sm text-gray-900 font-light font-inter">
          {item.quantity || 1}
        </div>
        <button
          onClick={() => incrementItemQty(item.id || index)}
          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          title="Add one more"
        >
          +
        </button>
      </div>
      
      {/* Inline Error Message */}
      {errorMessage && (
        <p className="text-xs text-red-600 font-inter">
          {errorMessage}
        </p>
      )}
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
}) => (
  <div className="border border-gray-200 p-6 bg-white">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        {item.type === "charm" ? (
          <CharmLineItem item={item} formatPrice={formatPrice} />
        ) : item.pinsDetails && item.pinsDetails.length > 0 ? (
          <CustomCaseWithCharms item={item} formatPrice={formatPrice} />
        ) : (
          <StandaloneCase item={item} formatPrice={formatPrice} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
          <QuantityControls
            index={index}
            item={item}
            incrementItemQty={incrementItemQty}
            decrementItemQty={decrementItemQty}
            errorMessage={errorMessage}
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



