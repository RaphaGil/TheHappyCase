import React, { useState, useEffect, useRef } from 'react';
import { normalizeImagePath } from '../../../utils/imagePath';

const OrderSummaryItem = ({ item, index, formatPrice, onIncrement, onDecrement, onRemove, errorMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const itemRef = useRef(null);

  // Handle click outside to close edit mode
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on any button or input
      const target = event.target;
      const isButton = target.tagName === 'BUTTON' || 
                      target.closest('button') !== null ||
                      target.closest('[role="button"]') !== null ||
                      target.closest('[aria-label*="quantity"]') !== null;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      
      if (isButton || isInput) {
        return; // Don't close when clicking buttons or inputs
      }
      
      // Check if click is outside the item element
      if (isEditing && itemRef.current && !itemRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      // Add listener with a delay to ensure button clicks are processed first
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 200);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isEditing]);
  // Handle standalone charm items
  if (item.type === 'charm') {
    const charm = item.pin || item;
    // Get unit price (always use item.price as the base unit price)
    const unitPrice = item.price || 0;
    const qty = item.quantity || 1;
    // Always calculate total based on unit price and current quantity
    const total = unitPrice * qty;

    return (
      <div key={index} className=" pb-4 " ref={itemRef}>
        <div className="flex items-start gap-4">
          {/* Image with quantity badge */}
          <div className="relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible">
            {item.image ? (
              <img
                src={normalizeImagePath(item.image)}
                alt={item.name || "Charm"}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : charm?.src ? (
              <img
                src={normalizeImagePath(charm.src)}
                alt={charm.name || "Charm"}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-sm bg-gray-100" />
            )}
            <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
              {qty}
            </span>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 font-inter leading-tight">
                  {item.name || charm?.name || "Charm"}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 font-inter">
                  {item.category === 'bronze' ? 'Bronze Charm' : 
                   item.category === 'flags' ? 'Flag' : 
                   'Colorful Charm'}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-sm font-medium text-gray-900 font-inter">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            
            {/* Edit Button */}
            {!isEditing && (
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="text-xs text-gray-600 hover:text-gray-900 font-light font-inter uppercase tracking-wider transition-colors"
                >
                  Edit
                </button>
              </div>
            )}
            
            {/* Quantity Controls and Remove Button - Shown when editing */}
            {isEditing && onIncrement && onDecrement && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const identifier = item.id !== undefined ? item.id : index;
                      console.log('➖ Charm item decrement clicked:', { 
                        identifier, 
                        itemId: item.id, 
                        index, 
                        currentQty: item.quantity,
                        itemName: item.name,
                        itemType: item.type,
                        hasOnDecrement: !!onDecrement
                      });
                      if (onDecrement) {
                        onDecrement(identifier);
                      }
                    }} 
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    −
                  </button>
                  <div className="px-2 py-0.5 text-xs text-gray-900 font-light font-inter min-w-[1.5rem] text-center">
                    {qty}
                  </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const identifier = item.id !== undefined ? item.id : index;
                    console.log('➕ Charm item increment clicked:', { 
                      identifier, 
                      itemId: item.id, 
                      index, 
                      currentQty: item.quantity,
                      itemName: item.name,
                      itemType: item.type,
                      hasOnIncrement: !!onIncrement
                    });
                    if (onIncrement) {
                      onIncrement(identifier);
                    }
                  }} 
                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                  type="button"
                >
                  +
                </button>
                </div>
                {onRemove && (
                  <button
                    onClick={() => {
                      onRemove(index);
                      setIsEditing(false);
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
            
            {/* Error Message */}
            {errorMessage && (
              <p className="text-xs text-red-600 font-inter mt-2">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Handle case items (with or without charms)
  // Get base price - prefer basePrice, then casePrice, then price, fallback to 8
  const base = typeof item.basePrice === 'number' 
    ? item.basePrice 
    : (typeof item.casePrice === 'number' 
      ? item.casePrice 
      : (typeof item.price === 'number' ? item.price : 8));
  
  // Calculate charms total from pinsDetails if available
  const charms = item.pinsDetails && item.pinsDetails.length
    ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
    : 0;
  
  // Unit price = base + charms
  const unit = base + charms;
  const qty = item.quantity || 1;
  
  // Always calculate total based on unit price and current quantity
  const total = unit * qty;

  return (
    <div key={index} className=" pb-4 last:border-b-0" ref={itemRef}>
      <div className="flex items-start gap-4">
        {/* Image with quantity badge */}
        <div className="relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible">
          {item.designImage ? (
            <img
              src={item.designImage}
              alt="Custom Case Design"
              className="w-full h-full object-contain p-2 rounded-sm"
              loading="lazy"
            />
          ) : item.caseImage ? (
            <img 
              src={item.caseImage} 
              alt="Custom Case" 
              className="w-full h-full object-contain p-2 rounded-sm" 
              loading="lazy" 
            />
          ) : (
            <div 
              className="w-full h-full rounded-sm" 
              style={{ background: item.color }} 
            />
          )}
          <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
            {qty}
          </span>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 font-inter leading-tight">
                {item.caseName || item.name || 'Passport Case'}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 font-inter">Color:</span>
                <span
                  className="inline-flex h-4 w-4 rounded-full border border-gray-300 shadow-sm"
                  style={{ backgroundColor: item.color }}
                  aria-label={`Selected color ${item.color}`}
                />
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="text-sm font-medium text-gray-900 font-inter">
                {formatPrice(total)}
              </span>
            </div>
          </div>
          
          {/* Edit Button */}
          {!isEditing && (
            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="text-xs text-gray-600 hover:text-gray-900 font-light font-inter uppercase tracking-wider transition-colors"
              >
                Edit
              </button>
            </div>
          )}
          
          {/* Quantity Controls and Remove Button - Shown when editing */}
          {isEditing && onIncrement && onDecrement && (
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const identifier = item.id !== undefined ? item.id : index;
                    console.log('➖ Case item decrement clicked:', { 
                      identifier, 
                      itemId: item.id, 
                      index, 
                      currentQty: item.quantity,
                      itemName: item.caseName || item.name,
                      hasOnDecrement: !!onDecrement
                    });
                    if (onDecrement) {
                      onDecrement(identifier);
                    } else {
                      console.error('❌ onDecrement handler is missing!');
                    }
                  }} 
                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Decrease quantity"
                  type="button"
                >
                  −
                </button>
                <div className="px-2 py-0.5 text-xs text-gray-900 font-light font-inter min-w-[1.5rem] text-center">
                  {qty}
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const identifier = item.id !== undefined ? item.id : index;
                    console.log('➕ Case item increment clicked:', { 
                      identifier, 
                      itemId: item.id, 
                      index, 
                      currentQty: item.quantity,
                      itemName: item.caseName || item.name,
                      hasOnIncrement: !!onIncrement
                    });
                    if (onIncrement) {
                      onIncrement(identifier);
                    } else {
                      console.error('❌ onIncrement handler is missing!');
                    }
                  }} 
                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                  type="button"
                >
                  +
                </button>
              </div>
              {onRemove && (
                <button
                  onClick={() => {
                    onRemove(index);
                    setIsEditing(false);
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          )}
          
          {/* Charms list */}
          {item.pinsDetails && item.pinsDetails.length > 0 && (
            <div className="mt-3 pt-3 ">
              <div className="flex flex-col gap-2">
                {Object.values(item.pinsDetails.reduce((acc, pin) => {
                  acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
                  acc[pin.src].quantity++;
                  return acc;
                }, {})).map((groupedPin, i) => {
                  const pinPrice = groupedPin.price || 0;
                  const pinTotal = pinPrice * groupedPin.quantity;
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible">
                          <img 
                            src={groupedPin.src} 
                            alt={groupedPin.name} 
                            className="w-full h-full object-contain p-1" 
                            loading="lazy" 
                          />
                          <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center font-inter">
                            {groupedPin.quantity}
                          </span>
                        </div>
                        <span className="text-xs font-light text-gray-700 font-inter">
                          {groupedPin.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-900 font-inter">
                        {formatPrice(pinTotal)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;

