import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady, onPaymentError }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-sm sm:text-md uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 font-bold font-inter">
        Payment
      </h3>
      
      {/* Express Checkout Section */}
      <div className="p-3 sm:p-4 border border-gray-200 rounded-sm bg-gray-50">
        <p className="text-xs sm:text-sm text-gray-600 font-light font-inter mb-3 text-center">
          Express Checkout
        </p>
        <div className="express-checkout-container flex flex-col space-y-2 min-h-[60px]">
          {!paymentElementReady && (
            <div className="text-xs sm:text-sm text-gray-500 font-light font-inter italic text-center py-2">
              Express checkout options will appear here when available
            </div>
          )}
        </div>
        <div className="relative flex items-center my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 sm:px-3 text-xs sm:text-sm text-gray-500 font-light font-inter">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* Payment Element - Apple Pay, Google Pay, PayPal, Clearpay, and other payment methods */}
      <div className="p-3 sm:p-4 border border-gray-200 rounded-sm overflow-hidden">
        {!paymentElementReady && (
          <div className="mb-2 text-xs sm:text-sm text-gray-500 font-light font-inter">
            Loading payment form...
          </div>
        )}
        <div className="w-full flex flex-col space-y-2">
          <PaymentElement 
            options={{
              layout: 'accordion',
              fields: {
                billingDetails: {
                  email: 'never',
                  phone: 'never',
                  address: 'never',
                },
              },
              wallets: {
                applePay: 'auto', // Show Apple Pay when available
                googlePay: 'auto', // Show Google Pay when available
              },
              business: {
                name: 'The Happy Case',
              },
            }}
            onReady={onPaymentReady}
            onError={(error) => {
              console.error('❌ Payment Element error:', error);
              if (onPaymentError) {
                onPaymentError(error.message || 'Failed to load payment form. Please refresh the page.');
              }
            }}
          />
        </div>
      </div>
      
      {error && (
        <div className="text-red-600 text-xs sm:text-sm bg-red-50 p-2 sm:p-3 rounded-sm font-light font-inter">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentSection;

