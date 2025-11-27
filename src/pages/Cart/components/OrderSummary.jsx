import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = ({ totalPrice, onCheckout }) => (
  <div className="lg:col-span-1">
    <div className="border border-gray-200 p-6 bg-white sticky top-8">
      <div>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <span className="text-sm font-light text-gray-700 uppercase tracking-wider font-inter">
            Subtotal:
          </span>
          <span className="text-lg font-medium text-gray-900 font-inter">
            {totalPrice}
          </span>
        </div>
        <p className="text-xs text-gray-500 text-center mb-4 font-light font-inter">
          <Link
            to="/shipping"
            className="text-gray-500 hover:text-gray-900 underline transition-colors"
          >
            Shipping
          </Link>{" "}
          and taxes calculated at checkout.
        </p>
        <button
          onClick={onCheckout}
          className="w-full py-3 text-xs uppercase tracking-wider font-light font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
        >
          Checkout
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center font-light font-inter">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  </div>
);

export default OrderSummary;



