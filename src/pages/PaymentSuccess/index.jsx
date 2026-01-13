import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useOrderProcessing } from '../../hooks/paymentsucess/useOrderProcessing';
import { calculateTotalAmount } from '../../utils/paymentsucess/helpers';
import LoadingState from '../../component/PaymentSucess/LoadingState';
import InvalidAccess from '../../component/PaymentSucess/InvalidAccess';
import SuccessHeader from '../../component/PaymentSucess/SuccessHeader';
import OrderDetails from '../../component/PaymentSucess/OrderDetails';
import ShippingInfo from '../../component/PaymentSucess/ShippingInfo';
import ActionButtons from '../../component/PaymentSucess/ActionButtons';
import ContactInfo from '../../component/PaymentSucess/ContactInfo';

const PaymentSuccess = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { paymentIntent, customerInfo, items } = location.state || {};
  const sessionId = searchParams.get('session_id');

  const { loading } = useOrderProcessing(paymentIntent, customerInfo, items);

  if (loading) {
    return <LoadingState />;
  }

  // If no paymentIntent and no session_id, show invalid access
  if (!paymentIntent && !sessionId) {
    return <InvalidAccess />;
  }

  const totalAmount = calculateTotalAmount(items);
  const orderId = paymentIntent?.id || sessionId || 'N/A';
  const orderDate = paymentIntent?.created || Date.now() / 1000;
  const orderStatus = paymentIntent?.status || 'succeeded';

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SuccessHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <OrderDetails
            orderId={orderId}
            orderDate={orderDate}
            totalAmount={totalAmount}
            orderStatus={orderStatus}
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
