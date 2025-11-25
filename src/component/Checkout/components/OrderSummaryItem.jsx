import React from 'react';

const OrderSummaryItem = ({ item, index, formatPrice }) => {
  // Handle standalone charm items
  if (item.type === 'charm') {
    const charm = item.pin || item;
    const charmPrice = item.price || item.totalPrice || 0;
    const qty = item.quantity || 1;
    const total = charmPrice * qty;

    return (
      <div key={index} className="py-2">
        <div className="flex items-start gap-3">
          <div className="relative w-20 h-22 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-visible">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name || "Charm"}
                className="w-full h-full object-contain p-2"
              />
            ) : charm?.src ? (
              <img
                src={charm.src}
                alt={charm.name || "Charm"}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="w-8 h-14 rounded border border-gray-200 bg-gray-100" />
            )}
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
              {qty}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              {item.name || charm?.name || "Charm"}
            </h4>
            <p className="text-xs text-gray-500 mt-1" style={{fontFamily: "'Poppins', sans-serif"}}>
              {item.category === 'bronze' ? 'Bronze Charm' : 
               item.category === 'flags' ? 'Flag' : 
               'Colorful Charm'}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600" style={{fontFamily: "'Poppins', sans-serif"}}>
                {formatPrice(charmPrice)} {qty > 1 ? `× ${qty}` : ''}
              </span>
              <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                {formatPrice(total)}
              </span>
            </div>
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
  const total = unit * qty;

  return (
    <div key={index} className="py-2">
      <div className="flex items-start gap-3">
        <div className="relative w-20 h-22 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-visible">
          {item.designImage ? (
            <img
              src={item.designImage}
              alt="Custom Case Design"
              className="w-full h-full object-contain p-2"
            />
          ) : item.caseImage ? (
            <img src={item.caseImage} alt="Custom Case" className="w-full h-full object-contain p-2" />
          ) : (
            <div className="w-8 h-14 rounded border border-gray-200" style={{ background: item.color }} />
          )}
          <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
            {item.quantity || 1}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{item.caseName}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Color:</span>
                <span
                  className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color }}
                  aria-label={`Selected color ${item.color}`}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(base)}</span>
          </div>
        </div>
      </div>
      {item.pinsDetails && item.pinsDetails.length > 0 && (
        <div className="mt-2">
          <div className="flex flex-col gap-1">
            {Object.values(item.pinsDetails.reduce((acc, pin) => {
              acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
              acc[pin.src].quantity++;
              return acc;
            }, {})).map((groupedPin, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <img src={groupedPin.src} alt={groupedPin.name} className="w-12 h-12 object-contain" />
                  <span className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{groupedPin.name} (x{groupedPin.quantity})</span>
                </div>
                <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(groupedPin.price * groupedPin.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-100 mt-3">
            <div className="text-sm font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>Item total:</div>
            <div className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(total)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryItem;

