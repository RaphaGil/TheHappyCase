import React, { useState, useEffect, useMemo } from 'react';
import { ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import ErrorBoundary from './ErrorBoundary';

const ExpressCheckout = ({ amount, currency, paymentElementReady }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Express Checkout options - Only Apple Pay, Google Pay, and Klarna
  // Memoize options to prevent unnecessary re-renders
  const expressCheckoutOptions = useMemo(() => ({
    buttonType: {
      applePay: 'buy',
      googlePay: 'buy',
      klarna: 'pay',
    },
    // Only show these payment methods, hide all others
    // Note: paymentMethods only accepts 'auto' or 'never', not 'always'
    paymentMethods: {
      applePay: 'auto',
      googlePay: 'auto',
      klarna: 'auto',
      link: 'never',
      paypal: 'auto',
      cashapp: 'never',
      afterpayClearpay: 'never',
      amazonPay: 'never', // Disable Amazon Pay to avoid CORS errors
    }
  }), []);

  useEffect(() => {
    // Reset error when stripe/elements become available
    if (stripe && elements) {
      setError(null);
    }
  }, [stripe, elements]);

  useEffect(() => {
    // Hide any payment methods that aren't Apple Pay, Google Pay, or Klarna
    // Also ensure Klarna buttons are clickable
    if (isReady && stripe && elements && paymentElementReady) {
      const hideOtherPaymentMethods = () => {
        const expressCheckoutContainer = document.querySelector('[data-testid="express-checkout-element"]') || 
                                        document.querySelector('[id*="express-checkout"]') ||
                                        document.querySelector('.express-checkout-container');
        
        if (expressCheckoutContainer) {
          // Hide Link, PayPal, Cash App, Afterpay/Clearpay, Amazon Pay, and other payment methods
          const elementsToHide = expressCheckoutContainer.querySelectorAll(
            '[aria-label*="Link"], ' +
            '[aria-label*="link"], ' +
            '[aria-label*="PayPal"], ' +
            '[aria-label*="paypal"], ' +
            '[aria-label*="Cash App"], ' +
            '[aria-label*="cashapp"], ' +
            '[aria-label*="Afterpay"], ' +
            '[aria-label*="Clearpay"], ' +
            '[aria-label*="afterpay"], ' +
            '[aria-label*="clearpay"], ' +
            '[aria-label*="Amazon"], ' +
            '[aria-label*="amazon"], ' +
            '[data-testid*="link"], ' +
            '[data-testid*="paypal"], ' +
            '[data-testid*="cashapp"], ' +
            '[data-testid*="afterpay"], ' +
            '[data-testid*="clearpay"], ' +
            '[data-testid*="amazon"], ' +
            '[id*="amazon"], ' +
            'iframe[src*="amazon"]'
          );
          
          elementsToHide.forEach((element) => {
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
          });
          
          // Ensure Klarna buttons are visible and clickable
          const klarnaElements = expressCheckoutContainer.querySelectorAll(
            '[aria-label*="Klarna"], ' +
            '[aria-label*="klarna"], ' +
            '[data-testid*="klarna"], ' +
            '[id*="klarna"], ' +
            'button[aria-label*="Klarna"], ' +
            'button[aria-label*="klarna"], ' +
            '[role="button"][aria-label*="Klarna"], ' +
            '[role="button"][aria-label*="klarna"]'
          );
          
          klarnaElements.forEach((element) => {
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
            element.setAttribute('aria-hidden', 'false');
            element.removeAttribute('disabled');
            // Remove any styles that might prevent clicking
            element.style.opacity = '';
            element.style.cursor = 'pointer';
          });
          
          console.log(`✅ Found ${klarnaElements.length} Klarna element(s) in ExpressCheckout`);
        }
      };

      // Run immediately and set up observer
      hideOtherPaymentMethods();
      
      const observer = new MutationObserver(() => {
        hideOtherPaymentMethods();
      });

      const container = document.querySelector('.express-checkout-container');
      if (container) {
        observer.observe(container, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      }

      return () => observer.disconnect();
    }
  }, [isReady, stripe, elements, paymentElementReady]);

  // Don't render if prerequisites aren't met
  // ExpressCheckoutElement needs PaymentIntent to be created first
  if (!stripe || !elements || !paymentElementReady) {
    return null;
  }

  if (!amount || amount <= 0 || !currency) {
    return null;
  }

  return (
    <ErrorBoundary 
      errorMessage="Express checkout is temporarily unavailable. Please use the payment form below."
    >
      <div className="mb-6 express-checkout-container">
        {error && (
          <div className="text-red-600 text-xs sm:text-sm bg-red-50 p-2 sm:p-3 rounded-sm font-light font-inter mb-2">
            {error}
          </div>
        )}
        <React.Suspense fallback={<div className="text-xs text-gray-500">Loading express checkout...</div>}>
          <ExpressCheckoutElement
            options={expressCheckoutOptions}
            onReady={() => {
              setIsReady(true);
              setError(null);
              console.log('✅ ExpressCheckoutElement ready');
            }}
            onConfirm={async (event) => {
              try {
                // Handle express checkout confirmation
                console.log('Express checkout confirmed:', event);
                
                // For Klarna, the event might contain redirect information
                if (event.billingDetails?.paymentMethod?.type === 'klarna' || 
                    event.paymentMethod?.type === 'klarna') {
                  console.log('Klarna payment initiated');
                  // Klarna will redirect the user to complete payment
                  // Stripe handles the redirect automatically
                }
                
                // The payment will be processed by Stripe automatically
                // For Klarna, this will trigger a redirect flow
              } catch (err) {
                console.error('Express checkout error:', err);
                setError(err.message || 'An error occurred with express checkout');
              }
            }}
            onError={(error) => {
              console.error('ExpressCheckoutElement error:', error);
              
              // Check if it's a Klarna-specific error
              if (error.message?.toLowerCase().includes('klarna')) {
                console.warn('⚠️ Klarna error detected:', error.message);
                // Klarna might not be available for this country/currency combination
                // Don't show error to user, just log it
                setError(null);
              } else {
                setError(error.message || 'Failed to load express checkout options');
                setIsReady(false);
              }
            }}
          />
        </React.Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default ExpressCheckout;
