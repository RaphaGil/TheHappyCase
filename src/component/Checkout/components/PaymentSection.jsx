import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light font-inter">
        Payment
      </h3>
      
      {/* Fast Checkout Section */}
      <div className="p-4 border border-gray-200 rounded-sm bg-gray-50">
        <p className="text-xs text-gray-600 font-light font-inter mb-3">
          Fast checkout with Apple Pay, Google Pay, or Link:
        </p>
        <div className="min-h-[50px] flex items-center justify-center">
          {/* PaymentElement will render Apple Pay, Google Pay, and Link buttons here when available */}
          <div className="text-xs text-gray-500 font-light font-inter italic">
            Fast checkout options will appear above when available on your device
          </div>
        </div>
        <div className="relative flex items-center my-3">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-xs text-gray-500 font-light font-inter">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>

      {/* Payment Element - Apple Pay, Google Pay, Link buttons appear at the top */}
      <div className="p-4 border border-gray-200 rounded-sm">
        {!paymentElementReady && (
          <div className="mb-2 text-xs text-gray-500 font-light font-inter">
            Loading payment form...
          </div>
        )}
        <PaymentElement 
          options={{
            layout: 'tabs',
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
        />
      </div>
      
      <div className="text-[10px] text-gray-500 font-light font-inter px-1">
        💳 Apple Pay is available on Safari (iOS/macOS). Google Pay works on Chrome/Android. Link works on all browsers.
      </div>
      
      {error && (
        <div className="text-red-600 text-xs bg-red-50 p-3 rounded-sm font-light font-inter">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentSection;

