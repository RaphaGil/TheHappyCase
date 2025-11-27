import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light font-inter">
        Payment
      </h3>
      <div className="p-4 border border-gray-200 rounded-sm">
        {!paymentElementReady && (
          <div className="mb-2 text-xs text-gray-500 font-light font-inter">
            Loading payment form...
          </div>
        )}
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
          onReady={onPaymentReady}
        />
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

