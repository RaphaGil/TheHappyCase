'use client';

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
      applePay: 'auto', // Apple Pay will only show on Safari (macOS/iOS) or Chrome on iOS
      googlePay: 'auto',
      klarna: 'auto',
      link: 'never',
      paypal: 'never', // Hide PayPal in Express Checkout
      cashapp: 'never',
      afterpayClearpay: 'never', // Hide Afterpay/Clearpay in Express Checkout
      amazonPay: 'never', // Disable Amazon Pay to avoid CORS errors
      revolutPay: 'never', // Disable Revolut Pay
    },
    // Business information for Apple Pay and Klarna
    business: {
      name: 'The Happy Case',
    },
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
          const iframes = expressCheckoutContainer.querySelectorAll('iframe');
          
          // Hide Link, PayPal, Cash App, Afterpay/Clearpay, Amazon Pay, Revolut Pay, and other payment methods
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
            '[aria-label*="Revolut"], ' +
            '[aria-label*="revolut"], ' +
            '[data-testid*="link"], ' +
            '[data-testid*="paypal"], ' +
            '[data-testid*="cashapp"], ' +
            '[data-testid*="afterpay"], ' +
            '[data-testid*="clearpay"], ' +
            '[data-testid*="amazon"], ' +
            '[data-testid*="revolut"], ' +
            '[id*="amazon"], ' +
            '[id*="revolut"], ' +
            'iframe[src*="amazon"], ' +
            'iframe[src*="revolut"]'
          );
          
          elementsToHide.forEach((element) => {
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
          });
          
          // Check for iframes (Stripe often renders payment methods in iframes)
          let applePayIframes = 0;
          let klarnaIframes = 0;
          
          iframes.forEach((iframe) => {
            const title = (iframe.title || iframe.getAttribute('title') || '').toLowerCase();
            const src = (iframe.src || '').toLowerCase();
            const name = (iframe.name || '').toLowerCase();
            
            if (title.includes('apple pay') || title.includes('apple') || 
                src.includes('apple') || name.includes('apple')) {
              applePayIframes++;
              // Ensure iframe is visible and properly sized
              iframe.style.display = 'block';
              iframe.style.visibility = 'visible';
              iframe.style.opacity = '1';
              iframe.style.width = '100%';
              iframe.style.maxWidth = '100%';
              iframe.style.height = 'auto';
              iframe.style.minHeight = '44px';
              iframe.style.border = 'none';
              iframe.setAttribute('aria-hidden', 'false');
              iframe.removeAttribute('hidden');
              
              // Ensure all parent containers allow interaction
              let parent = iframe.parentElement;
              let depth = 0;
              while (parent && depth < 5 && parent !== expressCheckoutContainer) {
                parent.style.display = 'block';
                parent.style.visibility = 'visible';
                parent.style.opacity = '1';
                parent.style.pointerEvents = 'auto';
                parent.setAttribute('aria-hidden', 'false');
                parent.removeAttribute('hidden');
                parent = parent.parentElement;
                depth++;
              }
            }
            
            if (title.includes('google pay') || title.includes('google') || 
                src.includes('google') || name.includes('google')) {
              // Ensure iframe is visible and properly sized
              iframe.style.display = 'block';
              iframe.style.visibility = 'visible';
              iframe.style.opacity = '1';
              iframe.style.width = '100%';
              iframe.style.maxWidth = '100%';
              iframe.style.height = 'auto';
              iframe.style.minHeight = '44px';
              iframe.style.border = 'none';
              iframe.setAttribute('aria-hidden', 'false');
              iframe.removeAttribute('hidden');
              
              // Ensure all parent containers allow interaction
              let parent = iframe.parentElement;
              let depth = 0;
              while (parent && depth < 5 && parent !== expressCheckoutContainer) {
                parent.style.display = 'block';
                parent.style.visibility = 'visible';
                parent.style.opacity = '1';
                parent.style.pointerEvents = 'auto';
                parent.setAttribute('aria-hidden', 'false');
                parent.removeAttribute('hidden');
                parent = parent.parentElement;
                depth++;
              }
            }
            
            if (title.includes('klarna') || src.includes('klarna')) {
              klarnaIframes++;
              // Ensure iframe is visible and properly sized
              iframe.style.display = 'block';
              iframe.style.visibility = 'visible';
              iframe.style.opacity = '1';
              iframe.style.width = '100%';
              iframe.style.maxWidth = '100%';
              iframe.style.height = 'auto';
              iframe.style.minHeight = '40px';
              iframe.style.border = 'none';
              iframe.setAttribute('aria-hidden', 'false');
              // Ensure parent container allows interaction
              const parent = iframe.parentElement;
              if (parent) {
                parent.style.display = 'block';
                parent.style.visibility = 'visible';
                parent.style.pointerEvents = 'auto';
              }
            }
          });
          
          // Ensure Apple Pay buttons are visible and clickable
          const applePayElements = expressCheckoutContainer.querySelectorAll(
            '[aria-label*="Apple Pay"], ' +
            '[aria-label*="apple pay"], ' +
            '[aria-label*="Apple"], ' +
            '[data-testid*="apple"], ' +
            '[id*="apple"], ' +
            '[id*="ApplePay"], ' +
            'button[aria-label*="Apple"], ' +
            'button[aria-label*="apple"], ' +
            '[role="button"][aria-label*="Apple"], ' +
            '[role="button"][aria-label*="apple"], ' +
            '[class*="ApplePay"], ' +
            '[class*="apple-pay"], ' +
            '[class*="Apple"], ' +
            'div[class*="apple"], ' +
            'div[id*="apple"]'
          );
          
          applePayElements.forEach((element) => {
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
            element.setAttribute('aria-hidden', 'false');
            element.removeAttribute('disabled');
            element.style.opacity = '1';
            element.style.cursor = 'pointer';
            element.style.width = '100%';
            element.style.minHeight = '44px';
            
            // Ensure parent containers are visible
            let parent = element.parentElement;
            let depth = 0;
            while (parent && depth < 5 && parent !== expressCheckoutContainer) {
              parent.style.display = 'block';
              parent.style.visibility = 'visible';
              parent.style.opacity = '1';
              parent.style.pointerEvents = 'auto';
              parent.setAttribute('aria-hidden', 'false');
              parent = parent.parentElement;
              depth++;
            }
          });
          
          // Ensure Google Pay buttons are visible and clickable
          const googlePayElements = expressCheckoutContainer.querySelectorAll(
            '[aria-label*="Google Pay"], ' +
            '[aria-label*="google pay"], ' +
            '[aria-label*="Google"], ' +
            '[data-testid*="google"], ' +
            '[id*="google"], ' +
            '[id*="GooglePay"], ' +
            'button[aria-label*="Google"], ' +
            'button[aria-label*="google"], ' +
            '[role="button"][aria-label*="Google"], ' +
            '[role="button"][aria-label*="google"], ' +
            '[class*="GooglePay"], ' +
            '[class*="google-pay"], ' +
            '[class*="Google"], ' +
            'div[class*="google"], ' +
            'div[id*="google"]'
          );
          
          googlePayElements.forEach((element) => {
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.pointerEvents = 'auto';
            element.setAttribute('aria-hidden', 'false');
            element.removeAttribute('disabled');
            element.style.opacity = '1';
            element.style.cursor = 'pointer';
            element.style.width = '100%';
            element.style.minHeight = '44px';
            
            // Ensure parent containers are visible
            let parent = element.parentElement;
            let depth = 0;
            while (parent && depth < 5 && parent !== expressCheckoutContainer) {
              parent.style.display = 'block';
              parent.style.visibility = 'visible';
              parent.style.opacity = '1';
              parent.style.pointerEvents = 'auto';
              parent.setAttribute('aria-hidden', 'false');
              parent = parent.parentElement;
              depth++;
            }
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
            '[role="button"][aria-label*="klarna"], ' +
            'a[href*="klarna"], ' +
            'a[aria-label*="Klarna"], ' +
            '[class*="Klarna"], ' +
            '[class*="klarna"]'
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
            // Ensure links are clickable
            if (element.tagName === 'A') {
              element.style.textDecoration = 'none';
            }
          });
          
          // Ensure the container itself is visible and properly styled
          expressCheckoutContainer.style.display = 'block';
          expressCheckoutContainer.style.visibility = 'visible';
          expressCheckoutContainer.style.opacity = '1';
        }
      };

      // Run immediately with a delay to allow Stripe to render
      setTimeout(() => {
        hideOtherPaymentMethods();
      }, 500);
      
      // Also run immediately
      hideOtherPaymentMethods();
      
      // Additional check specifically for Apple Pay after a longer delay
      setTimeout(() => {
        hideOtherPaymentMethods();
      }, 1500);
      
      const observer = new MutationObserver(() => {
        // Debounce to avoid too many calls
        setTimeout(() => {
          hideOtherPaymentMethods();
        }, 100);
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
              
              // Ensure Apple Pay buttons are visible after ready
              // Apple Pay only shows on Safari (macOS/iOS) or Chrome on iOS
              setTimeout(() => {
                const container = document.querySelector('.express-checkout-container');
                if (container) {
                  // Find all Apple Pay elements (buttons, iframes, divs, etc.)
                  const applePaySelectors = [
                    '[aria-label*="Apple Pay"]',
                    '[aria-label*="apple pay"]',
                    '[aria-label*="Apple"]',
                    '[data-testid*="apple"]',
                    '[id*="apple"]',
                    '[id*="ApplePay"]',
                    'button[aria-label*="Apple"]',
                    'button[aria-label*="apple"]',
                    '[role="button"][aria-label*="Apple"]',
                    '[role="button"][aria-label*="apple"]',
                    '[class*="ApplePay"]',
                    '[class*="apple-pay"]',
                    '[class*="Apple"]',
                    'iframe[title*="Apple Pay"]',
                    'iframe[title*="apple pay"]',
                    'iframe[title*="Apple"]',
                    'iframe[name*="apple"]',
                    'div[class*="apple"]',
                    'div[id*="apple"]'
                  ];
                  
                  applePaySelectors.forEach(selector => {
                    try {
                      const elements = container.querySelectorAll(selector);
                      elements.forEach(element => {
                        element.style.display = 'block';
                        element.style.visibility = 'visible';
                        element.style.opacity = '1';
                        element.style.pointerEvents = 'auto';
                        element.style.width = '100%';
                        element.style.minHeight = '44px';
                        element.setAttribute('aria-hidden', 'false');
                        element.removeAttribute('disabled');
                        element.removeAttribute('hidden');
                        
                        // Ensure all parent containers are visible
                        let parent = element.parentElement;
                        let depth = 0;
                        while (parent && depth < 5 && parent !== container) {
                          parent.style.display = 'block';
                          parent.style.visibility = 'visible';
                          parent.style.opacity = '1';
                          parent.style.pointerEvents = 'auto';
                          parent.setAttribute('aria-hidden', 'false');
                          parent.removeAttribute('hidden');
                          parent = parent.parentElement;
                          depth++;
                        }
                      });
                    } catch (e) {
                      // Ignore selector errors
                    }
                  });
                }
              }, 1000);
              
              // Also check again after a longer delay to catch late-rendering Apple Pay buttons
              setTimeout(() => {
                const container = document.querySelector('.express-checkout-container');
                if (container) {
                  const applePayElements = container.querySelectorAll(
                    '[aria-label*="Apple Pay"], ' +
                    '[aria-label*="apple pay"], ' +
                    '[aria-label*="Apple"], ' +
                    '[data-testid*="apple"], ' +
                    '[id*="apple"], ' +
                    'iframe[title*="Apple Pay"], ' +
                    'iframe[title*="apple pay"]'
                  );
                  
                  applePayElements.forEach(element => {
                    element.style.display = 'block';
                    element.style.visibility = 'visible';
                    element.style.opacity = '1';
                    element.style.pointerEvents = 'auto';
                    element.setAttribute('aria-hidden', 'false');
                    
                    let parent = element.parentElement;
                    let depth = 0;
                    while (parent && depth < 5) {
                      parent.style.display = 'block';
                      parent.style.visibility = 'visible';
                      parent.style.opacity = '1';
                      parent = parent.parentElement;
                      depth++;
                    }
                  });
                }
              }, 2000);
            }}
            onConfirm={async (event) => {
              try {
                // Handle express checkout confirmation
                // The payment will be processed by Stripe automatically
                // For Apple Pay: Payment is confirmed immediately
                // For Klarna: User is redirected to Klarna's site to complete payment
              } catch (err) {
                setError(err.message || 'An error occurred with express checkout');
              }
            }}
            onError={(error) => {
              // Check if it's a Klarna-specific error
              if (error.message?.toLowerCase().includes('klarna')) {
                // Klarna might not be available for this country/currency combination
                // Don't show error to user
                setError(null);
              } else if (error.message?.toLowerCase().includes('apple')) {
                // Apple Pay might not be available (wrong device, not enabled, etc.)
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
