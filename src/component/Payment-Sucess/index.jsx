'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SuccessHeader from './SuccessHeader';
import { initializeQuantities } from '../../utils/inventory';
import { getApiUrl } from '../../utils/apiConfig';
import { getOrderNumberFromPaymentIntentId } from '../../utils/paymentsucess/helpers';
import OrderDetails from './OrderDetails';
import ShippingInfo from './ShippingInfo';
import ContactInfo from './ContactInfo';
import ActionButtons from './ActionButtons';
import InvalidAccess from './InvalidAccess';
import LoadingState from './LoadingState';
import { useOrderProcessing } from '../../hooks/paymentsucess/useOrderProcessing';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const paymentIntentIdFromUrl = searchParams?.get('payment_intent');
  const redirectStatus = searchParams?.get('redirect_status');

  const [data, setData] = useState(null);
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);

  // Refresh inventory after purchase (no cache clear - fetch updates cache)
  useEffect(() => {
    initializeQuantities().catch(() => {});
  }, []);

  // Recover cart/customer from sessionStorage and attach payment_intent from Klarna/3DS redirect URL
  useEffect(() => {
    let cancelled = false;

    const recover = async () => {
      let parsed = null;
      try {
        const stored = sessionStorage.getItem('paymentSuccessData');
        if (stored) parsed = JSON.parse(stored);
      } catch (e) {
        console.warn('Could not recover payment success data:', e);
      }

      if (paymentIntentIdFromUrl && redirectStatus !== 'failed') {
        const orderNumber = getOrderNumberFromPaymentIntentId(paymentIntentIdFromUrl);
        let paymentIntent = parsed?.paymentIntent && parsed.paymentIntent.id
          ? { ...parsed.paymentIntent, id: paymentIntentIdFromUrl }
          : {
              id: paymentIntentIdFromUrl,
              status: redirectStatus || 'succeeded',
              created: Math.floor(Date.now() / 1000),
            };

        try {
          const res = await fetch(
            getApiUrl(`/api/payment-intent-details?payment_intent=${encodeURIComponent(paymentIntentIdFromUrl)}`)
          );
          if (res.ok) {
            const details = await res.json();
            paymentIntent = {
              ...paymentIntent,
              id: details.id || paymentIntentIdFromUrl,
              status: details.status || paymentIntent.status,
              created: details.created || paymentIntent.created,
              currency: details.currency || paymentIntent.currency,
            };
          }
        } catch (e) {
          console.warn('Could not fetch payment intent details:', e);
        }

        parsed = {
          ...(parsed || {}),
          paymentIntent,
          orderNumber: parsed?.orderNumber || orderNumber,
        };

        try {
          sessionStorage.setItem('paymentSuccessData', JSON.stringify(parsed));
        } catch (e) {
          console.warn('Could not persist recovered payment success data:', e);
        }
      }

      const hasOrderPayload =
        parsed?.customerInfo?.email && Array.isArray(parsed?.items) && parsed.items.length > 0;

      if (!cancelled && hasOrderPayload) {
        setData(parsed);
      }
      if (!cancelled) setRecoveryAttempted(true);
    };

    recover();
    return () => {
      cancelled = true;
    };
  }, [paymentIntentIdFromUrl, redirectStatus]);

  const paymentIntent = data?.paymentIntent;
  const customerInfo = data?.customerInfo;
  const items = data?.items || [];
  const orderNumber = data?.orderNumber;
  const shippingCost = data?.shippingCost ?? 0;
  const totalWithShipping = data?.totalWithShipping ?? 0;
  const subtotal = data?.subtotal ?? 0;

  const { loading } = useOrderProcessing(paymentIntent, customerInfo, items, orderNumber, shippingCost);

  if (!recoveryAttempted || (loading && !data)) {
    return <LoadingState />;
  }

  if (!data && !sessionId && !paymentIntentIdFromUrl) {
    return <InvalidAccess />;
  }

  if (!data && (sessionId || paymentIntentIdFromUrl)) {
    return <LoadingState />;
  }

  const orderDate = paymentIntent?.created ?? Math.floor(Date.now() / 1000);
  const vatAmount = 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessHeader />
        <div className="space-y-6 md:space-y-8">
          <OrderDetails
            orderNumber={orderNumber || 'N/A'}
            orderDate={orderDate}
            subtotal={subtotal}
            shippingCost={shippingCost}
            vatAmount={vatAmount}
            totalAmount={totalWithShipping}
            orderStatus="succeeded"
            items={items}
          />
          <ShippingInfo customerInfo={customerInfo} />
        </div>
        <ActionButtons />
        <ContactInfo />
      </div>
    </div>
  );
};

export default PaymentSuccess;
