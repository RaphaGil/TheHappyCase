'use client';

import React, { useEffect, useRef } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

const PaymentSection = ({
  paymentElementReady,
  error,
  onPaymentReady,
  onPaymentError,
}) => {
  const paymentElementRef = useRef(null);

  useEffect(() => {
    if (!paymentElementReady) return;

    // Force Card tab open (accordion layout)
    const openCardPayment = () => {
      const paymentElement = document.querySelector(
        '[data-testid="payment-element"]'
      );
      if (!paymentElement) return;

      // Stripe usually labels card tab like this
      const cardTab =
        paymentElement.querySelector('[role="tab"][aria-label*="Card"]') ||
        paymentElement.querySelector('[role="tab"][aria-label*="card"]') ||
        paymentElement.querySelector('[role="tab"][data-testid*="card"]');

      if (!cardTab) return;

      const isExpanded = cardTab.getAttribute("aria-expanded") === "true";
      if (!isExpanded) cardTab.click();
    };

    // Hide blocked payment methods and ensure allowed ones are visible
    const hideAllExceptAllowed = () => {
      const paymentElement = document.querySelector(
        '[data-testid="payment-element"]'
      );
      if (!paymentElement) return;

      const blockedKeywords = [
        "revolut",
        "amazon",
        "link",
        "cash app",
        "cashapp",
      ];

      const allowedKeywords = [
        "card",
        "klarna",
        "clearpay",
        "afterpay",
        "apple pay",
        "google pay",
      ];

      // Hide blocked payment methods aggressively
      const allElements = paymentElement.querySelectorAll(
        '[role="tab"], ' +
        '[role="button"], ' +
        'button, ' +
        '[aria-label*="Revolut"], ' +
        '[aria-label*="revolut"], ' +
        '[aria-label*="Amazon"], ' +
        '[aria-label*="amazon"], ' +
        '[aria-label*="Link"], ' +
        '[aria-label*="link"], ' +
        '[data-testid*="revolut"], ' +
        '[data-testid*="amazon"], ' +
        '[data-testid*="link"], ' +
        '[id*="revolut"], ' +
        '[id*="amazon"], ' +
        '[id*="RevolutPay"], ' +
        '[id*="AmazonPay"], ' +
        '[class*="revolut"], ' +
        '[class*="amazon"], ' +
        'iframe[src*="revolut"], ' +
        'iframe[src*="Revolut"], ' +
        'iframe[src*="amazon"], ' +
        'iframe[src*="Amazon"], ' +
        'iframe[title*="revolut"], ' +
        'iframe[title*="Revolut"], ' +
        'iframe[title*="amazon"], ' +
        'iframe[title*="Amazon"]'
      );

      allElements.forEach((element) => {
        const label = (
          element.getAttribute("aria-label") ||
          element.textContent ||
          element.getAttribute("data-testid") ||
          ""
        ).toLowerCase();

        const isBlocked = blockedKeywords.some((k) => label.includes(k));

        if (isBlocked) {
          element.style.display = "none !important";
          element.style.visibility = "hidden !important";
          element.style.opacity = "0 !important";
          element.style.height = "0 !important";
          element.style.margin = "0 !important";
          element.style.padding = "0 !important";
          element.setAttribute("aria-hidden", "true");
          element.setAttribute("hidden", "true");

          // Hide panel linked to that tab too
          const panelId = element.getAttribute("aria-controls");
          if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) {
              panel.style.display = "none";
              panel.style.visibility = "hidden";
              panel.setAttribute("aria-hidden", "true");
            }
          }
        }
      });

      // Ensure allowed payment methods are visible
      const tabs = paymentElement.querySelectorAll('[role="tab"]');

      tabs.forEach((tab) => {
        const label = (
          tab.getAttribute("aria-label") ||
          tab.textContent ||
          ""
        ).toLowerCase();

        const isAllowed = allowedKeywords.some((k) => label.includes(k));
        const isBlocked = blockedKeywords.some((k) => label.includes(k));

        if (isBlocked) {
          tab.style.display = "none";
          tab.style.visibility = "hidden";
          tab.setAttribute("aria-hidden", "true");
          
          const panelId = tab.getAttribute("aria-controls");
          if (panelId) {
            const panel = document.getElementById(panelId);
            if (panel) {
              panel.style.display = "none";
              panel.style.visibility = "hidden";
              panel.setAttribute("aria-hidden", "true");
            }
          }
        } else if (isAllowed) {
          tab.style.display = "";
          tab.style.visibility = "visible";
          tab.setAttribute("aria-hidden", "false");
          
          // Ensure Klarna stays visible
          if (label.includes("klarna")) {
            tab.style.display = "block";
            tab.style.visibility = "visible";
            tab.style.opacity = "1";
          }
        }
      });
    };

    // Run once after render
    const run = () => {
      openCardPayment();
      hideAllExceptAllowed();
    };

    // Run immediately and with delays to catch all rendering phases
    setTimeout(run, 100);
    setTimeout(run, 250);
    setTimeout(run, 500);
    setTimeout(run, 1000);

    // Keep enforcing (Stripe re-renders often)
    const paymentElement = document.querySelector(
      '[data-testid="payment-element"]'
    );

    if (!paymentElement) return;

    const observer = new MutationObserver(() => {
      setTimeout(run, 50);
    });

    observer.observe(paymentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-hidden', 'style', 'class'],
    });

    return () => observer.disconnect();
  }, [paymentElementReady]);

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-md sm:text-md uppercase tracking-wider text-gray-900 mb-3 sm:mb-4 font-bold font-inter">
        Payment
      </h3>

      <div
        ref={paymentElementRef}
        className="p-3 sm:p-4 border border-gray-200 rounded-sm overflow-hidden"
      >
        {!paymentElementReady && (
          <div className="mb-2 text-xs sm:text-sm text-gray-500 font-light font-inter">
            Loading payment form...
          </div>
        )}

        <div className="w-full flex flex-col space-y-2">
          <PaymentElement
            options={{
              layout: "accordion",
              fields: {
                billingDetails: {
                  email: "never",
                  phone: "never",
                  address: "never",
                },
              },
              wallets: {
                applePay: "auto",
                googlePay: "auto",
              },
              paymentMethodTypes: {
                card: "always",
                klarna: "always",
                afterpayClearpay: "always",
                paypal: "never",
                link: "never",
                amazonPay: "never",
                revolutPay: "never",
              },
              business: {
                name: "The Happy Case",
              },
            }}
            onReady={onPaymentReady}
            onError={(error) => {
              if (
                error?.message?.includes("hcaptcha") ||
                error?.message?.includes("hCaptcha")
              ) {
                return;
              }
              onPaymentError?.(
                error.message ||
                  "Failed to load payment form. Please refresh the page."
              );
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
