import React, { useEffect, useRef } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady, onPaymentError }) => {
  const expressCheckoutRef = useRef(null);
  const paymentElementRef = useRef(null);

  useEffect(() => {
    if (paymentElementReady) {
      const openCardPayment = () => {
        const paymentElement = document.querySelector('[data-testid="payment-element"]');
        if (!paymentElement) return;

        // Find card payment tab/button
        const cardTab = paymentElement.querySelector(
          '[role="tab"][aria-label*="Card"], ' +
          '[role="tab"][aria-label*="card"], ' +
          'button[aria-label*="Card"], ' +
          'button[aria-label*="card"], ' +
          '[data-testid*="card"][role="tab"], ' +
          '[aria-label*="Credit"], ' +
          '[aria-label*="Debit"]'
        );

        if (cardTab) {
          // Check if it's already expanded
          const isExpanded = cardTab.getAttribute('aria-expanded') === 'true';
          
          if (!isExpanded) {
            // Click to expand
            cardTab.click();
          }
          
          // Ensure it stays expanded
          cardTab.setAttribute('aria-expanded', 'true');
          
          // Find the corresponding panel and ensure it's visible
          const panelId = cardTab.getAttribute('aria-controls');
          if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) {
              panel.setAttribute('aria-hidden', 'false');
              panel.style.display = 'block';
            }
          }
        }
      };

      // Try to open card payment after a short delay to ensure PaymentElement is fully rendered
      setTimeout(openCardPayment, 200);
      
      // Also watch for changes and ensure card stays open
      const observer = new MutationObserver(() => {
        setTimeout(openCardPayment, 100);
      });
      
      const paymentElement = document.querySelector('[data-testid="payment-element"]');
      if (paymentElement) {
        observer.observe(paymentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['aria-expanded', 'aria-hidden']
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

