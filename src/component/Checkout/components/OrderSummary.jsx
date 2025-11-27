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
  onShowShippingInfo 
}) => {
  return (
    <div>
      {cart.map((item, index) => (
        <OrderSummaryItem
          key={index}
          item={item}
          index={index}
          formatPrice={formatPrice}
        />
      ))}
      
      <div className="flex justify-between py-2 text-sm border-t border-gray-100 pt-4 font-light text-gray-700 font-inter">
        <span>Subtotal</span>
        <span className="font-medium text-gray-900 font-inter">{formatPrice(subtotal)}</span>
      </div>
      
      {vatAmount > 0 && (
        <div className="flex justify-between py-2 text-sm font-light text-gray-700 font-inter">
          <span>VAT</span>
          <span className="font-medium text-gray-900 font-inter">{formatPrice(vatAmount)}</span>
        </div>
      )}
      
      <div className="flex justify-between py-2 text-sm">
        <span className="flex items-center gap-1 font-light text-gray-700 font-inter">
          Shipping ({shippingLabel})
          <button
            type="button"
            onClick={onShowShippingInfo}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            title="Quick delivery information"
          >
            ?
          </button>
        </span>
        <span className="font-medium text-gray-900 font-inter">
          {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
        </span>
      </div>
      
      <div className="flex justify-between py-3 border-t border-gray-200 mt-2 pt-3">
        <span className="text-sm uppercase tracking-wider font-light text-gray-900 font-inter">Total</span>
        <span className="text-lg font-medium text-gray-900 font-inter">{formatPrice(totalWithShipping)}</span>
      </div>
     
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-1 font-light font-inter">
        <span>Shipping and taxes are calculated at checkout if applicable.</span>
        <Link
          to="/shipping"
          className="text-gray-500 hover:text-gray-900 underline transition-colors"
          title="Learn more about shipping information"
        >
          Shipping?
        </Link>
      </div>
      
      {showInternationalNote && (
        <InternationalNote
          className="mt-4"
          showOnDesktop={true}
          showOnMobile={false}
          title="Custom Duties & Taxes Included"
          message="The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery."
          variant="gray"
        />
      )}
    </div>
  );
};

export default OrderSummary;

