import React from 'react';
import { Link } from 'react-router-dom';
import OrderSummaryItem from './OrderSummaryItem';
import InternationalNote from '../../InternationalNote';

const OrderSummary = ({ 
  cart, 
  formatPrice, 
  subtotal, 
  vatAmount, 
  shippingCost, 
  shippingLabel, 
  totalWithShipping, 
  showInternationalNote,
  onShowShippingInfo,
  onIncrement,
  onDecrement,
  onRemove,
  itemErrors
}) => {
  return (
    <div className="flex flex-col h-full min-h-0 mt-4">
      {/* Scrollable items list */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-0 order-summary-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f3f4f6' }}>
        <div className="pr-2 pb-2">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 font-inter py-8 text-center">Your cart is empty</p>
          ) : (
            <div className="space-y-0 mt-2">
              {cart.map((item, index) => (
                <OrderSummaryItem
                  key={item.id || `item-${index}`}
                  item={item}
                  index={index}
                  formatPrice={formatPrice}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                  errorMessage={itemErrors?.[item.id || index]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed totals section */}
      <div className="flex-shrink-0 pt-6  mt-4 ">
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-light text-gray-700 font-inter">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900 font-inter">{formatPrice(subtotal)}</span>
          </div>
          
          {vatAmount > 0 && (
            <div className="flex justify-between text-sm font-light text-gray-700 font-inter">
              <span>VAT</span>
              <span className="font-medium text-gray-900 font-inter">{formatPrice(vatAmount)}</span>
            </div>
          )}
          
          <div className="flex justify-between text-sm font-light text-gray-700 font-inter">
            <span className="flex items-center gap-1.5">
              Shipping ({shippingLabel})
              <button
                type="button"
                onClick={onShowShippingInfo}
                className="text-gray-400 hover:text-gray-600 transition-colors w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] leading-none"
                title="Quick delivery information"
              >
                ?
              </button>
            </span>
            <span className="font-medium text-gray-900 font-inter">
              {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between py-4 border-t border-gray-200 mt-4 pt-4">
          <span className="text-base font-medium text-gray-900 font-inter uppercase tracking-wider">Total</span>
          <span className="text-xl font-semibold text-gray-900 font-inter">{formatPrice(totalWithShipping)}</span>
        </div>
       
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-light font-inter leading-relaxed">
            Shipping and taxes are calculated at checkout if applicable.{' '}
            <Link
              to="/shipping"
              className="text-gray-600 hover:text-gray-900 underline transition-colors"
              title="Learn more about shipping information"
            >
              Learn more
            </Link>
          </p>
        </div>
        
        {showInternationalNote && (
          <div className="mt-4">
            <InternationalNote
              showOnDesktop={true}
              showOnMobile={false}
              title="Custom Duties & Taxes Included"
              message="The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery."
              variant="gray"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;

