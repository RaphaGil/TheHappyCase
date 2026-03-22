'use client';

import React, { useState, useEffect, useRef } from 'react';
import { normalizeImagePath } from '../../../utils/imagePath';
import { getCaseLinePins } from '../../../utils/cartHelpers';

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
    const unitPrice = item.price || 0;
    const qty = item.quantity || 1;
    const total = unitPrice * qty;

    return (
      <div key={index} className="pb-4" ref={itemRef}>
        <div className="flex items-start gap-4">
          {/* Image with quantity badge */}
          <div className="relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible">
            {item.image ? (
              <img
                src={normalizeImagePath(item.image)}
                alt={item.name || 'Charm'}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : charm?.src ? (
              <img
                src={normalizeImagePath(charm.src)}
                alt={charm.name || 'Charm'}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-sm bg-gray-100" />
            )}
            <span className="absolute -top-1.5 -right-1.5 bg-btn-primary-blue text-btn-primary-blue-text text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
              {qty}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 font-inter leading-tight">
                  {item.name || charm?.name || 'Charm'}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 font-inter">
                  {item.category === 'bronze'
                    ? 'Bronze Charm'
                    : item.category === 'flags'
                    ? 'Flag'
                    : 'Colorful Charm'}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="text-sm font-medium text-gray-900 font-inter">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            {/* Remove Button only */}
            {onRemove && (
              <div className="mt-3">
                <button
                  onClick={() => onRemove(index)}
                  className="text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors"
                >
                  Remove
                </button>
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
  
  const caseLinePins = getCaseLinePins(item);
  const charms = caseLinePins.length
    ? caseLinePins.reduce((s, p) => s + (p.price || 0), 0)
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
              src={normalizeImagePath(item.designImage)}
              alt="Custom Case Design"
              className="w-full h-full object-contain p-2 rounded-sm"
              loading="lazy"
            />
          ) : item.caseImage ? (
            <img 
              src={normalizeImagePath(item.caseImage)} 
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
          <span className="absolute -top-1.5 -right-1.5 bg-btn-primary-blue text-btn-primary-blue-text text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
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
          
          {/* Remove Button only (no edit / quantity controls for checkout) */}
          {onRemove && (
            <div className="mt-3">
              <button
                onClick={() => onRemove(index)}
                className="text-xs text-red-600 hover:text-red-700 font-light font-inter uppercase tracking-wider transition-colors"
              >
                Remove
              </button>
            </div>
          )}
          
          {/* Charms list */}
          {caseLinePins.length > 0 && (
            <div className="mt-3 pt-3 ">
              <div className="flex flex-col gap-2">
                {Object.values(caseLinePins.reduce((acc, pin) => {
                  acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
                  acc[pin.src].quantity++;
                  return acc;
                }, {})).map((groupedPin, i) => {
                  const pinPrice = groupedPin.price || 0;
                  const totalPinQty = groupedPin.quantity * qty;
                  const pinLineTotal = pinPrice * groupedPin.quantity * qty;
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
                        </div>
                        <span className="text-xs font-light text-gray-700 font-inter">
                          {groupedPin.name}
                          {totalPinQty > 1 && (
                            <span className="text-gray-500"> (×{totalPinQty} total)</span>
                          )}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-900 font-inter">
                        {formatPrice(pinLineTotal)}
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

