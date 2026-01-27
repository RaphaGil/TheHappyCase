import React, { useEffect } from 'react';
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
  const { 
    paymentIntent, 
    customerInfo, 
    items, 
    shippingCost = 0, 
    vatAmount = 0, 
    totalWithShipping, 
    subtotal 
  } = location.state || {};
  const sessionId = searchParams.get('session_id');

  const { loading } = useOrderProcessing(paymentIntent, customerInfo, items);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  if (loading) {
    return <LoadingState />;
  }

  // If no paymentIntent and no session_id, show invalid access
  if (!paymentIntent && !sessionId) {
    return <InvalidAccess />;
  }

  // Calculate amounts - use passed values or calculate from items and customer info
  const calculatedSubtotal = subtotal !== undefined ? subtotal : calculateTotalAmount(items);
  
  // Calculate shipping if not provided (fallback for Stripe redirects)
  let calculatedShipping = shippingCost || 0;
  if (!shippingCost && customerInfo?.address?.country && items?.length > 0) {
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
  let calculatedVat = vatAmount || 0;
  if (!vatAmount && customerInfo?.address?.country) {
    const EUROPEAN_COUNTRIES = new Set(['FR', 'DE', 'ES', 'IT']);
    const EUROPEAN_VAT_RATE = 0.2;
    const country = customerInfo.address.country.toUpperCase();
    if (EUROPEAN_COUNTRIES.has(country)) {
      calculatedVat = calculatedSubtotal * EUROPEAN_VAT_RATE;
    }
  }
  
  const calculatedTotal = totalWithShipping !== undefined 
    ? totalWithShipping 
    : calculatedSubtotal + calculatedVat + calculatedShipping;
  
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
            subtotal={calculatedSubtotal}
            shippingCost={calculatedShipping}
            vatAmount={calculatedVat}
            totalAmount={calculatedTotal}
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
