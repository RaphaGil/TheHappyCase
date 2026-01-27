import React, { useEffect, useRef } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady, onPaymentError }) => {
  const expressCheckoutRef = useRef(null);
  const paymentElementRef = useRef(null);

  useEffect(() => {
    if (!expressCheckoutRef.current) return;

    const moveExpressButtons = () => {
      const paymentElement = document.querySelector('[data-testid="payment-element"]');
      if (!paymentElement) return;

      const firstChild = paymentElement.querySelector('> div:first-child');
      if (!firstChild) return;

      // Find Apple Pay and Google Pay buttons
      const expressButtons = firstChild.querySelectorAll(
        '[data-testid="payment-request-button"], ' +
        'iframe[title*="Apple Pay"], ' +
        'iframe[title*="Google Pay"], ' +
        'iframe[title*="PayPal"]'
      );

      if (expressButtons.length > 0 && expressCheckoutRef.current) {
        // Clear loading message
        const loadingMsg = expressCheckoutRef.current.querySelector('.text-gray-500');
        if (loadingMsg) {
          loadingMsg.remove();
        }

        // Move buttons (not clone) to express checkout container
        expressButtons.forEach((button) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'express-checkout-button-wrapper';
          wrapper.style.width = '100%';
          expressCheckoutRef.current.appendChild(wrapper);
          wrapper.appendChild(button);
        });
      }
    };

    if (paymentElementReady) {
      // Try immediately
      setTimeout(moveExpressButtons, 100);
      
      // Also watch for changes
      const observer = new MutationObserver(moveExpressButtons);
      const paymentElement = document.querySelector('[data-testid="payment-element"]');
      if (paymentElement) {
        observer.observe(paymentElement, {
          childList: true,
          subtree: true,
        });
      }

      return () => observer.disconnect();
    }
  }, [paymentElementReady]);
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-sm sm:text-md uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 font-bold font-inter">
        Payment
      </h3>
      
      {/* Express Checkout Section */}
      <div className="express-checkout-wrapper">
        <div className="p-4 sm:p-5 border border-gray-200 rounded-sm bg-white">
          <p className="text-xs sm:text-sm text-gray-700 font-medium font-inter mb-4 text-center">
            Express Checkout
          </p>
          <div ref={expressCheckoutRef} className="express-checkout-container min-h-[60px]">
            {!paymentElementReady && (
              <div className="text-xs sm:text-sm text-gray-500 font-light font-inter italic text-center py-4">
                Express checkout options will appear here when available
              </div>
            )}
          </div>
        </div>
   
      </div>

      {/* Payment Element - Klarna, Clearpay, and other payment methods (Apple Pay & Google Pay shown above) */}
      <div ref={paymentElementRef} className="p-3 sm:p-4 border border-gray-200 rounded-sm overflow-hidden">
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

