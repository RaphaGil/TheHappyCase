'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SuccessHeader from './SuccessHeader';
import { initializeQuantities } from '../../utils/inventory';
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

  const [data, setData] = useState(null);
  const [recoveryAttempted, setRecoveryAttempted] = useState(false);

  // Refresh inventory after purchase (no cache clear - fetch updates cache)
  useEffect(() => {
    initializeQuantities().catch(() => {});
  }, []);

  // Recover data from sessionStorage (set by Checkout before redirect)
  useEffect(() => {
    if (recoveryAttempted) return;
    setRecoveryAttempted(true);

    try {
      const stored = sessionStorage.getItem('paymentSuccessData');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.customerInfo?.email && Array.isArray(parsed?.items) && parsed.items.length > 0) {
          setData(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not recover payment success data:', e);
    }
  }, [recoveryAttempted]);

  const paymentIntent = data?.paymentIntent;
  const customerInfo = data?.customerInfo;
  const items = data?.items || [];
  const orderNumber = data?.orderNumber;
  const shippingCost = data?.shippingCost ?? 0;
  const totalWithShipping = data?.totalWithShipping ?? 0;
  const subtotal = data?.subtotal ?? 0;

  const { loading } = useOrderProcessing(paymentIntent, customerInfo, items, orderNumber);

  // Show loading while processing or recovering
  if (loading && !data) {
    return <LoadingState />;
  }

  // No valid data after recovery - invalid access
  if (recoveryAttempted && !data && !sessionId) {
    return <InvalidAccess />;
  }

  // Still waiting for data (e.g. Stripe redirect with session_id)
  if (!data && sessionId) {
    return <LoadingState />;
  }

  // Have data - show success page
  const orderDate = paymentIntent?.created ?? Math.floor(Date.now() / 1000);
  const vatAmount = 0; // Add VAT logic if needed

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
