import React from 'react';
import OrderSummary from './OrderSummary';

const MobileOrderSummary = ({ 
  isOpen, 
  onToggle, 
  cartLength, 
  totalWithShipping, 
  formatPrice,
  cart,
  subtotal,
  vatAmount,
  shippingCost,
  shippingLabel,
  showInternationalNote,
  onShowShippingInfo,
  onIncrement,
  onDecrement,
  onRemove
}) => {
  return (
    <>
      <div className="lg:hidden px-6">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light font-inter"
          aria-expanded={isOpen}
          aria-controls="mobile-order-summary"
        >
          <span>Order Summary ({cartLength} item{cartLength === 1 ? '' : 's'})</span>
          <span className="flex items-center gap-2">
            <span>{formatPrice(totalWithShipping)}</span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
      
      {isOpen && (
        <div id="mobile-order-summary" className="lg:hidden px-6 pb-4">
          <div className="mt-2 border border-gray-200 bg-yellow-50 p-4">
            <OrderSummary
              cart={cart}
              formatPrice={formatPrice}
              subtotal={subtotal}
              vatAmount={vatAmount}
              shippingCost={shippingCost}
              shippingLabel={shippingLabel}
              totalWithShipping={totalWithShipping}
              showInternationalNote={showInternationalNote}
              onShowShippingInfo={onShowShippingInfo}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileOrderSummary;

