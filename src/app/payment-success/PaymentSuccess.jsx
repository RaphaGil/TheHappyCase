'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useOrderProcessing } from '../../hooks/paymentsucess/useOrderProcessing';
import { calculateTotalAmount, getDisplayOrderNumber } from '../../utils/paymentsucess/helpers';
import { getApiUrl } from '../../utils/apiConfig';
import LoadingState from '../../component/PaymentSucess/LoadingState';
import InvalidAccess from '../../component/PaymentSucess/InvalidAccess';
import SuccessHeader from '../../component/PaymentSucess/SuccessHeader';
import OrderDetails from '../../component/PaymentSucess/OrderDetails';
import ShippingInfo from '../../component/PaymentSucess/ShippingInfo';
import ActionButtons from '../../component/PaymentSucess/ActionButtons';
import ContactInfo from '../../component/PaymentSucess/ContactInfo';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const paymentIntentIdFromUrl = searchParams?.get('payment_intent');

  const [paymentData, setPaymentData] = React.useState(null);
  const [mergedPiFromUrl, setMergedPiFromUrl] = React.useState(false);
  const [storageLoaded, setStorageLoaded] = React.useState(false);
  // When true, stop waiting for payment-intent-details fetch (e.g. after timeout or on Netlify where endpoint may 404)
  const [redirectFallback, setRedirectFallback] = React.useState(false);

  // Load payment data from sessionStorage (set by checkout before confirm or after success)
  // Also try backup key 'thehappycase_order_data' so we recover order data if primary key was cleared
  useEffect(() => {
    let data = null;
    try {
      const primary = sessionStorage.getItem('paymentSuccessData');
      if (primary) {
        const parsed = JSON.parse(primary);
        if (parsed && (parsed.paymentIntent || parsed.customerInfo || parsed.items)) {
          data = parsed;
        }
      }
      if (!data) {
        const backup = sessionStorage.getItem('thehappycase_order_data');
        if (backup) {
          const parsed = JSON.parse(backup);
          if (parsed && (parsed.paymentIntent || parsed.customerInfo || parsed.items)) {
            data = {
              paymentIntent: parsed.paymentIntent,
              customerInfo: parsed.customerInfo,
              items: parsed.items,
              orderNumber: parsed.orderNumber,
              shippingCost: parsed.shippingCost,
              totalWithShipping: parsed.totalWithShipping,
              subtotal: parsed.subtotal,
            };
          }
        }
      }
      if (data) setPaymentData(data);
    } catch (e) {
      console.error('Failed to parse payment data from sessionStorage:', e);
    }
    setStorageLoaded(true);
  }, []);

  // After redirect (3DS, Klarna): we have stored order data but paymentIntent was null — fetch PI and merge (best-effort; don't block if endpoint missing e.g. on Netlify)
  useEffect(() => {
    if (!paymentData || paymentData.paymentIntent != null || !paymentIntentIdFromUrl || mergedPiFromUrl) return;

    let cancelled = false;
    setMergedPiFromUrl(true);

    const fallbackTimer = setTimeout(() => {
      if (!cancelled) setRedirectFallback(true);
    }, 2500);

    fetch(getApiUrl(`/payment-intent-details?payment_intent=${encodeURIComponent(paymentIntentIdFromUrl)}`))
      .then((res) => {
        if (!res.ok) throw new Error(`payment-intent-details ${res.status}`);
        return res.json();
      })
      .then((pi) => {
        if (!cancelled && pi?.id) {
          setPaymentData((prev) => ({
            ...prev,
            paymentIntent: { id: pi.id, status: pi.status, created: pi.created },
          }));
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('Payment intent details not available (e.g. on Netlify):', err?.message || err);
          setRedirectFallback(true);
        }
      });

    return () => {
      cancelled = true;
      clearTimeout(fallbackTimer);
    };
  }, [paymentData, paymentIntentIdFromUrl, mergedPiFromUrl]);
  
  const { 
    paymentIntent, 
    customerInfo, 
    items, 
    shippingCost = 0, 
    vatAmount = 0, 
    totalWithShipping, 
    subtotal 
  } = paymentData || {};

  // Use URL payment_intent when we have redirect + session data but fetch failed (e.g. Netlify has no payment-intent-details)
  const effectivePaymentIntent = paymentIntent || (paymentIntentIdFromUrl && paymentData
    ? { id: paymentIntentIdFromUrl, status: 'succeeded', created: Math.floor(Date.now() / 1000) }
    : null);

  const { loading } = useOrderProcessing(effectivePaymentIntent, customerInfo, items, paymentData?.orderNumber);

  // Show loading only briefly while we try to fetch payment intent after redirect; stop after timeout or fetch error
  const resolvingRedirect = Boolean(
    paymentIntentIdFromUrl && paymentData && !paymentIntent && mergedPiFromUrl && !redirectFallback
  );

  // Always wait for sessionStorage read before showing Invalid Access (avoids flash when same-tab success has data)
  const waitingForStorage = !storageLoaded;

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (loading || resolvingRedirect || waitingForStorage) {
    return <LoadingState />;
  }

  // Invalid access only after we've loaded storage and confirmed we have no payment/session info
  if (!paymentIntent && !sessionId && !paymentIntentIdFromUrl) {
    return <InvalidAccess />;
  }
  // Redirect with no stored order data (only after we've tried loading from sessionStorage)
  if (paymentIntentIdFromUrl && !paymentData) {
    return <InvalidAccess />;
  }

  // Defensive: ensure we have an array for items so OrderDetails never receives undefined
  const safeItems = Array.isArray(items) ? items : [];

  // Calculate amounts - use passed values or calculate from items and customer info
  const calculatedSubtotal = subtotal !== undefined && Number.isFinite(subtotal) ? subtotal : calculateTotalAmount(safeItems);
  
  // Calculate shipping if not provided (fallback for Stripe redirects)
  let calculatedShipping = Number.isFinite(shippingCost) ? shippingCost : 0;
  if (calculatedShipping === 0 && customerInfo?.address?.country && safeItems.length > 0) {
    const SHIPPING_RATES = {
      GB: 3,
      US: 16,
      FR: 7,
    };
    const DEFAULT_SHIPPING_RATE = 12;
    const country = customerInfo.address.country.toUpperCase();
    calculatedShipping = SHIPPING_RATES[country] ?? DEFAULT_SHIPPING_RATE;
  }
  
  // Calculate VAT if not provided (fallback for Stripe redirects)
  let calculatedVat = Number.isFinite(vatAmount) ? vatAmount : 0;
  if (calculatedVat === 0 && customerInfo?.address?.country) {
    const EUROPEAN_COUNTRIES = new Set(['FR', 'DE', 'ES', 'IT']);
    const EUROPEAN_VAT_RATE = 0.2;
    const country = customerInfo.address.country.toUpperCase();
    if (EUROPEAN_COUNTRIES.has(country)) {
      calculatedVat = calculatedSubtotal * EUROPEAN_VAT_RATE;
    }
  }
  
  const calculatedTotal = Number.isFinite(totalWithShipping)
    ? totalWithShipping
    : (calculatedSubtotal + calculatedVat + calculatedShipping);
  const safeSubtotal = Number.isFinite(calculatedSubtotal) ? calculatedSubtotal : 0;
  const safeTotal = Number.isFinite(calculatedTotal) ? calculatedTotal : safeSubtotal + calculatedVat + calculatedShipping;
  
  const orderId = effectivePaymentIntent?.id || sessionId || 'N/A';
  const orderNumber = getDisplayOrderNumber(orderId, paymentData?.orderNumber);
  const orderDate = effectivePaymentIntent?.created || Date.now() / 1000;
  const orderStatus = effectivePaymentIntent?.status || 'succeeded';

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <OrderDetails
            orderNumber={orderNumber}
            orderDate={orderDate}
            subtotal={safeSubtotal}
            shippingCost={calculatedShipping}
            vatAmount={calculatedVat}
            totalAmount={safeTotal}
            orderStatus={orderStatus}
            items={safeItems}
          />

          <ShippingInfo customerInfo={customerInfo || {}} />
        </div>

        <ActionButtons />
        <ContactInfo />
      </div>
    </div>
  );
};

export default PaymentSuccess;
