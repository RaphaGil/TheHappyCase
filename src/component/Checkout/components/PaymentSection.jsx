import React, { useEffect, useRef } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentSection = ({ paymentElementReady, error, onPaymentReady, onPaymentError }) => {
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

      // Hide USD cryptocurrency options
      const hideUSDCrypto = () => {
        const paymentElement = document.querySelector('[data-testid="payment-element"]');
        if (!paymentElement) return;

        // Hide USD-related cryptocurrency options
        const cryptoOptions = paymentElement.querySelectorAll(
          '[aria-label*="USD"], ' +
          '[aria-label*="usd"], ' +
          '[aria-label*="USDC"], ' +
          '[aria-label*="usdc"], ' +
          '[data-testid*="usd"], ' +
          '[data-testid*="USD"], ' +
          'button[aria-label*="USD"], ' +
          'button[aria-label*="usd"], ' +
          '[role="tab"][aria-label*="USD"], ' +
          '[role="tab"][aria-label*="usd"]'
        );
        
        cryptoOptions.forEach((option) => {
          // Check if it's a cryptocurrency option (not regular USD currency)
          const text = option.textContent || option.getAttribute('aria-label') || '';
          if (text.toLowerCase().includes('crypto') || 
              text.toLowerCase().includes('usdc') ||
              option.closest('[data-testid*="crypto"]') ||
              option.closest('[class*="crypto"]')) {
            option.style.display = 'none';
            option.setAttribute('aria-hidden', 'true');
          }
        });
      };

      // Hide Amazon Pay
      const hideAmazonPay = () => {
        const paymentElement = document.querySelector('[data-testid="payment-element"]');
        if (!paymentElement) return;

        // Hide Amazon Pay elements
        const amazonPayElements = paymentElement.querySelectorAll(
          '[aria-label*="Amazon"], ' +
          '[aria-label*="amazon"], ' +
          '[role="tab"][aria-label*="Amazon"], ' +
          '[role="tab"][aria-label*="amazon"], ' +
          '[role="button"][aria-label*="Amazon"], ' +
          '[role="button"][aria-label*="amazon"], ' +
          'button[aria-label*="Amazon"], ' +
          'button[aria-label*="amazon"], ' +
          '[data-testid*="amazon"], ' +
          '[id*="amazon"], ' +
          '[id*="AmazonPay"], ' +
          'iframe[src*="amazon"], ' +
          'iframe[src*="Amazon"], ' +
          '[class*="amazon"], ' +
          '[class*="Amazon"]'
        );
        
        amazonPayElements.forEach((element) => {
          element.style.display = 'none';
          element.style.visibility = 'hidden';
          element.setAttribute('aria-hidden', 'true');
          // Also hide parent containers if they only contain Amazon Pay
          const parent = element.parentElement;
          if (parent && parent.textContent && parent.textContent.toLowerCase().includes('amazon')) {
            parent.style.display = 'none';
            parent.setAttribute('aria-hidden', 'true');
          }
        });
      };

      // Ensure Card, Apple Pay, PayPal, Klarna, and Clearpay are always visible
      const ensurePaymentMethodsVisible = () => {
        const paymentElement = document.querySelector('[data-testid="payment-element"]');
        if (!paymentElement) return;

        // Show Card payment method
        const cardTabs = paymentElement.querySelectorAll(
          '[role="tab"][aria-label*="Card"], ' +
          '[role="tab"][aria-label*="card"], ' +
          '[role="tab"][aria-label*="Credit"], ' +
          '[role="tab"][aria-label*="Debit"]'
        );
        cardTabs.forEach(tab => {
          tab.style.display = 'block';
          tab.style.visibility = 'visible';
          tab.setAttribute('aria-hidden', 'false');
        });

        // Show Apple Pay
        const applePayElements = paymentElement.querySelectorAll(
          '[aria-label*="Apple Pay"], ' +
          '[aria-label*="apple pay"], ' +
          '[data-testid*="apple"]'
        );
        applePayElements.forEach(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.setAttribute('aria-hidden', 'false');
        });

        // Show PayPal
        const paypalElements = paymentElement.querySelectorAll(
          '[aria-label*="PayPal"], ' +
          '[aria-label*="paypal"], ' +
          '[data-testid*="paypal"]'
        );
        paypalElements.forEach(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.setAttribute('aria-hidden', 'false');
        });

        // Show Klarna
        const klarnaElements = paymentElement.querySelectorAll(
          '[aria-label*="Klarna"], ' +
          '[aria-label*="klarna"], ' +
          '[data-testid*="klarna"]'
        );
        klarnaElements.forEach(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.setAttribute('aria-hidden', 'false');
        });

        // Show Clearpay
        const clearpayElements = paymentElement.querySelectorAll(
          '[aria-label*="Clearpay"], ' +
          '[aria-label*="clearpay"], ' +
          '[aria-label*="Afterpay"], ' +
          '[aria-label*="afterpay"], ' +
          '[data-testid*="clearpay"], ' +
          '[data-testid*="afterpay"]'
        );
        clearpayElements.forEach(el => {
          el.style.display = 'block';
          el.style.visibility = 'visible';
          el.setAttribute('aria-hidden', 'false');
        });
      };

      // Try to open card payment after a short delay to ensure PaymentElement is fully rendered
      setTimeout(() => {
        openCardPayment();
        hideUSDCrypto();
        hideAmazonPay();
        ensurePaymentMethodsVisible();
      }, 200);
      
      // Also watch for changes and ensure card stays open, hide USD crypto, hide Amazon Pay, and ensure payment methods are visible
      const observer = new MutationObserver(() => {
        setTimeout(() => {
          openCardPayment();
          hideUSDCrypto();
          hideAmazonPay();
          ensurePaymentMethodsVisible();
        }, 100);
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
      <h3 className="text-md sm:text-md uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 font-bold font-inter">
        Payment
      </h3>

      {/* Payment Element - Card payment and other payment methods */}
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
                googlePay: 'auto', // Hide Google Pay (only show in Express Checkout)
              },
              // Show Card, PayPal, Klarna, and Clearpay
              // Note: Apple Pay is controlled via wallets.applePay (not paymentMethodTypes)
              paymentMethodTypes: {
                card: 'always',
                paypal: 'always',
                klarna: 'always',
                afterpayClearpay: 'always',
                link: 'never', // Disable Link payment method
                amazonPay: 'never', // Disable Amazon Pay to avoid CORS errors
              },
              business: {
                name: 'The Happy Case',
              },
            }}
            onReady={onPaymentReady}
            onError={(error) => {
              // Ignore hCaptcha errors as they're handled internally by Stripe
              if (error?.message?.includes('hcaptcha') || error?.message?.includes('hCaptcha')) {
                console.warn('⚠️ hCaptcha error (non-critical, Stripe will use fallback):', error.message);
                return;
              }
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

