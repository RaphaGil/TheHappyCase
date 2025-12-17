import React from 'react';

const OrderSummaryItem = ({ item, index, formatPrice, onIncrement, onDecrement, onRemove, errorMessage }) => {
  // Handle standalone charm items
  if (item.type === 'charm') {
    const charm = item.pin || item;
    const charmPrice = item.price || item.totalPrice || 0;
    const qty = item.quantity || 1;
    // Use item.totalPrice if available (already includes quantity), otherwise calculate
    const total = item.totalPrice ? item.totalPrice * qty : charmPrice * qty;

    return (
      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
        <div className="flex items-start gap-4">
          {/* Image with quantity badge */}
          <div className="relative flex-shrink-0 w-20 h-20 bg-gray-50 rounded-sm border border-gray-200 flex items-center justify-center overflow-visible">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name || "Charm"}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : charm?.src ? (
              <img
                src={charm.src}
                alt={charm.name || "Charm"}
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-sm bg-gray-100" />
            )}
            {qty > 1 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
                {qty}
              </span>
            )}
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
            
            {/* Quantity Controls */}
            {onIncrement && onDecrement && (
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 border border-gray-200 rounded-sm p-1">
                  <button 
                    onClick={() => onDecrement(item.id || index)} 
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="px-2 py-0.5 text-xs text-gray-900 font-light font-inter min-w-[1.5rem] text-center">
                    {qty}
                  </div>
                  <button 
                    onClick={() => onIncrement(item.id || index)} 
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
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
  const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
  const charms = item.pinsDetails && item.pinsDetails.length
    ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
    : Math.max(0, (item.totalPrice || 0) - base);
  const unit = base + charms;
  const qty = item.quantity || 1;
  // Use item.totalPrice if available (already includes quantity), otherwise calculate
  const total = item.totalPrice ? item.totalPrice * qty : unit * qty;

  return (
    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
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
          {qty > 1 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full h-5 w-5 flex items-center justify-center font-inter">
              {qty}
            </span>
          )}
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
          
          {/* Charms list */}
          {item.pinsDetails && item.pinsDetails.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
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
                          {groupedPin.quantity > 1 && (
                            <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center font-inter">
                              {groupedPin.quantity}
                            </span>
                          )}
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

