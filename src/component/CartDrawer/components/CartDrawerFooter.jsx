import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CartDrawerFooter = ({ totalPrice, formatPrice, cartLength, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleContinueShopping = () => {
    onClose();
    // If on Create Yours page, refresh it
    if (location.pathname === '/CreateYours') {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <div className="text-sm font-light text-gray-700 uppercase tracking-wider font-inter">
          Subtotal:
        </div>
        <div className="text-lg font-medium text-gray-900 font-inter">
          {formatPrice(totalPrice)}
        </div>
      </div>
     
      <p className="text-xs text-gray-500 text-center mb-4 font-light font-inter">
        <Link to="/shipping" className="text-gray-500 hover:text-gray-900 underline transition-colors">
          Shipping
        </Link> calculated at checkout.
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          className="w-full py-2.5 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light font-inter"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button
          className="w-full py-2.5 text-xs uppercase tracking-wider font-light disabled:opacity-50 disabled:cursor-not-allowed font-inter bg-green-600 hover:bg-green-700 text-white border border-green-600 hover:border-green-700 transition-all duration-200"
          disabled={cartLength === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawerFooter;

