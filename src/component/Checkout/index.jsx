import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { createPaymentIntent } from '../../utils/mockPaymentAPI';
import InternationalNote from '../InternationalNote';
import CheckoutHeader from './components/CheckoutHeader';
import LoadingState from './components/LoadingState';
import CustomerInfoForm from './components/CustomerInfoForm';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import MobileOrderSummary from './components/MobileOrderSummary';
import ShippingInfoModal from './components/ShippingInfoModal';

// Initialize Stripe with your publishable key
// For demo purposes, we'll use a test key. In production, use your actual key
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890'
);

const SHIPPING_RATES = {
  GB: 3,
  US: 16,
  FR: 7,
};

const SHIPPING_LABELS = {
  GB: 'UK',
  US: 'USA',
  FR: 'France',
};

const DEFAULT_SHIPPING_RATE = 12;

const EUROPEAN_COUNTRIES = new Set(['FR', 'DE', 'ES', 'IT']);
const EUROPEAN_VAT_RATE = 0.2;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentElementReady, setPaymentElementReady] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postal_code: '',
      country: 'GB',
      state: '',
    },
  });

  const subtotal = getTotalPrice();
  const selectedCountry = customerInfo.address.country;
  const shippingCost =
    cart.length === 0
      ? 0
      : SHIPPING_RATES[selectedCountry] ?? DEFAULT_SHIPPING_RATE;
  const shippingLabel = SHIPPING_LABELS[selectedCountry] || 'International';
  const applyEuropeanVat = EUROPEAN_COUNTRIES.has(selectedCountry);
  const vatAmount = applyEuropeanVat ? subtotal * EUROPEAN_VAT_RATE : 0;
  const showInternationalNote =
    selectedCountry && selectedCountry.toUpperCase() !== 'GB' && cart.length > 0;
  const totalWithShipping = subtotal + vatAmount + shippingCost;


  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Reset payment element ready state when elements change
  useEffect(() => {
    setPaymentElementReady(false);
  }, [elements]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCustomerInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe is not loaded. Please wait...');
      return;
    }

    // Check if Payment Element is ready
    const paymentElement = elements.getElement('payment');
    if (!paymentElement) {
      setError('Payment form is not ready. Please wait...');
      return;
    }

    if (!paymentElementReady) {
      setError('Payment form is still loading. Please wait...');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Confirm the payment with Stripe
      // The clientSecret is automatically retrieved from Elements context
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/TheHappyCase/payment-success`,
          payment_method_data: {
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              address: {
                line1: customerInfo.address.line1,
                line2: customerInfo.address.line2,
                city: customerInfo.address.city,
                postal_code: customerInfo.address.postal_code,
                country: customerInfo.address.country,
                state: customerInfo.address.state,
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred while processing your payment.');
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        clearCart();
        navigate('/payment-success', { 
          state: { 
            paymentIntent,
            customerInfo,
            items: cart,
          } 
        });
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Payment requires additional action (e.g., 3D Secure)
        // Stripe will handle this automatically via redirect
        setError('Please complete the additional authentication step.');
      }
    } catch (err) {
      setError('An error occurred while processing your payment.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      <MobileOrderSummary
        isOpen={showMobileSummary}
        onToggle={() => setShowMobileSummary(prev => !prev)}
        cartLength={cart.length}
        totalWithShipping={totalWithShipping}
        formatPrice={formatPrice}
        cart={cart}
        subtotal={subtotal}
        vatAmount={vatAmount}
        shippingCost={shippingCost}
        shippingLabel={shippingLabel}
        showInternationalNote={showInternationalNote}
        onShowShippingInfo={() => setShowShippingInfo(true)}
      />
 
      <div className="flex flex-col lg:flex-row  w-full">
        {/* Checkout form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6  p-6 w-full lg:w-1/2"
        >
        {/* Customer Information */}
        <CustomerInfoForm 
          customerInfo={customerInfo}
          onInputChange={handleInputChange}
        />

        {/* Payment Information */}
        <PaymentSection
          paymentElementReady={paymentElementReady}
          error={error}
          onPaymentReady={() => setPaymentElementReady(true)}
        />

        <button
          type="submit"
          disabled={!stripe || !elements || loading || !paymentElementReady}
          className="w-full py-3 text-xs uppercase tracking-wider bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed"
          style={{fontFamily: "'Poppins', sans-serif"}}
        >
          {loading ? 'Processing...' : 'Complete Payment'}
        </button>
        {showInternationalNote && (
          <InternationalNote
            className="mt-4"
            showOnDesktop={false}
            showOnMobile={true}
            title="Custom Duties & Taxes Included"
            message="The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery."
            variant="gray"
          />
        )}
        </form>

        {/* Order Summary */}
        <aside className="hidden lg:block border border-gray-200 bg-white p-6 w-full lg:w-1/2 lg:sticky lg:top-20 mt-4 lg:mt-0">
          <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-6 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
            Order Summary
          </h3>
          <OrderSummary
            cart={cart}
            formatPrice={formatPrice}
            subtotal={subtotal}
            vatAmount={vatAmount}
            shippingCost={shippingCost}
            shippingLabel={shippingLabel}
            totalWithShipping={totalWithShipping}
            showInternationalNote={showInternationalNote}
            onShowShippingInfo={() => setShowShippingInfo(true)}
          />
        </aside>
        
        <ShippingInfoModal
          isOpen={showShippingInfo}
          onClose={() => setShowShippingInfo(false)}
        />
      </div>
    </div>
  );
};

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const assetBasePath = process.env.PUBLIC_URL || '';
  const cartIconSrc = `${assetBasePath}/images/cart.svg`;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }

    const initializeOptions = async () => {
      try {
        setLoading(true);
        const amount = Math.round(getTotalPrice() * 100);
        const currencyCode = currency.toLowerCase();
        
        const result = await createPaymentIntent({
          amount,
          currency: currencyCode,
          items: cart,
          customerInfo: {},
        });

        setOptions({
          clientSecret: result.client_secret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#3b82f6',
              colorBackground: '#ffffff',
              colorText: '#1f2937',
              colorDanger: '#ef4444',
              fontFamily: 'system-ui, sans-serif',
              spacingUnit: '4px',
              borderRadius: '8px',
            },
          },
        });
      } catch (err) {
        console.error('Failed to initialize payment options:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeOptions();
  }, [cart, getTotalPrice, currency, navigate]);

  if (loading || !options) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CheckoutHeader cartIconSrc={cartIconSrc} />
      <div className="flex-1 flex items-stretch bg-white py-10">
        <div className="flex-1 max-w-6xl mx-auto px-4 lg:px-6">
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
