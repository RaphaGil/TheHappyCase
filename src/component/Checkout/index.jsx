import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { createPaymentIntent } from '../../utils/mockPaymentAPI';
import InternationalNote from '../InternationalNote';

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

  const renderOrderSummary = () => (
    <div>
      {cart.map((item, index) => {
        // Handle standalone charm items
        if (item.type === 'charm') {
          const charm = item.pin || item;
          const charmPrice = item.price || item.totalPrice || 0;
          const qty = item.quantity || 1;
          const total = charmPrice * qty;

          return (
            <div key={index} className="py-2">
              <div className="flex items-start gap-3">
                <div className="relative w-20 h-22 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-visible">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || "Charm"}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : charm?.src ? (
                    <img
                      src={charm.src}
                      alt={charm.name || "Charm"}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="w-8 h-14 rounded border border-gray-200 bg-gray-100" />
                  )}
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {qty}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {item.name || charm?.name || "Charm"}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1" style={{fontFamily: "'Poppins', sans-serif"}}>
                    {item.category === 'bronze' ? 'Bronze Charm' : 
                     item.category === 'flags' ? 'Flag' : 
                     'Colorful Charm'}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {formatPrice(charmPrice)} {qty > 1 ? `× ${qty}` : ''}
                    </span>
                    <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        // Handle case items (with or without charms)
        const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
        const charms = item.pinsDetails && item.pinsDetails.length
          ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
          : Math.max(0, (item.totalPrice || 0) - base);
        const unit = base + charms;
        const qty = item.quantity || 1;
        const total = unit * qty;

        return (
          <div key={index} className="py-2">
            <div className="flex items-start gap-3">
              <div className="relative w-20 h-22 bg-gray-50 border border-gray-200 flex items-center justify-center overflow-visible">
                {item.designImage ? (
                  <img
                    src={item.designImage}
                    alt="Custom Case Design"
                    className="w-full h-full object-contain p-2"
                  />
                ) : item.caseImage ? (
                  <img src={item.caseImage} alt="Custom Case" className="w-full h-full object-contain p-2" />
                ) : (
                  <div className="w-8 h-14 rounded border border-gray-200" style={{ background: item.color }} />
                )}
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
                  {item.quantity || 1}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{item.caseName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Color:</span>
                      <span
                        className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-gray-300"
                        style={{ backgroundColor: item.color }}
                        aria-label={`Selected color ${item.color}`}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(base)}</span>
                </div>
              </div>
            </div>
            {item.pinsDetails && item.pinsDetails.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-col gap-1">
                  {Object.values(item.pinsDetails.reduce((acc, pin) => {
                    acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
                    acc[pin.src].quantity++;
                    return acc;
                  }, {})).map((groupedPin, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <img src={groupedPin.src} alt={groupedPin.name} className="w-12 h-12 object-contain" />
                        <span className="text-sm font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{groupedPin.name} (x{groupedPin.quantity})</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(groupedPin.price * groupedPin.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-100 mt-3">
                  <div className="text-sm font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>Item total:</div>
                  <div className="text-sm font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(total)}</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="flex justify-between py-2 text-sm border-t border-gray-100 pt-4">
        <span className="font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>Subtotal</span>
        <span className="font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(subtotal)}</span>
      </div>
      {vatAmount > 0 && (
        <div className="flex justify-between py-2 text-sm">
          <span className="font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>VAT</span>
          <span className="font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(vatAmount)}</span>
        </div>
      )}
      <div className="flex justify-between py-2 text-sm">
        <span className="flex items-center gap-1 font-light text-gray-700" style={{fontFamily: "'Poppins', sans-serif"}}>
          Shipping ({shippingLabel})
          <button
            type="button"
            onClick={() => setShowShippingInfo(true)}
            className="text-gray-500 hover:text-gray-900 transition-colors"
            title="Quick delivery information"
          >
            ?
          </button>
        </span>
        <span className="font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
      </div>
      <div className="flex justify-between py-3 border-t border-gray-200 mt-2 pt-3">
        <span className="text-sm uppercase tracking-wider font-light text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>Total</span>
        <span className="text-lg font-medium text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>{formatPrice(totalWithShipping)}</span>
      </div>
     
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-1 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
        <span>Shipping and taxes are calculated at checkout if applicable.</span>
        <Link
          to="/shipping"
          className="text-gray-500 hover:text-gray-900 underline transition-colors"
          title="Learn more about shipping information"
        >
          Shipping?
        </Link>
        
      </div>
      {showInternationalNote && (
        <InternationalNote
          className="mt-4"
          showOnDesktop={true}
          showOnMobile={false}
          title="Custom Duties & Taxes Included"
          message="The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery."
          variant="gray"
        />
      )}
    </div>
  );

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
      {/* Mobile order summary toggle */}
      <div className="lg:hidden px-6 ">
        <button
          type="button"
          onClick={() => setShowMobileSummary(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 transition-all duration-200 font-light"
          style={{fontFamily: "'Poppins', sans-serif"}}
          aria-expanded={showMobileSummary}
          aria-controls="mobile-order-summary"
        >
          <span>Order Summary ({cart.length} item{cart.length === 1 ? '' : 's'})</span>
          <span className="flex items-center gap-2">
            <span>{formatPrice(totalWithShipping)}</span>
            <svg
              className={`w-4 h-4 transition-transform ${showMobileSummary ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>
      {showMobileSummary && (
        <div id="mobile-order-summary" className="lg:hidden px-6 pb-4">
          <div className="mt-2 border border-gray-200 bg-white p-4">
            {renderOrderSummary()}
          </div>
        </div>
      )}
 
      <div className="flex flex-col lg:flex-row  w-full">
        {/* Checkout form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6  p-6 w-full lg:w-1/2"
        >
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Delivery</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Address Line 1 *
            </label>
            <input
              type="text"
              name="address.line1"
              value={customerInfo.address.line1}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
              style={{fontFamily: "'Poppins', sans-serif"}}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              Address Line 2
            </label>
            <input
              type="text"
              name="address.line2"
              value={customerInfo.address.line2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
              style={{fontFamily: "'Poppins', sans-serif"}}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                City *
              </label>
              <input
                type="text"
                name="address.city"
                value={customerInfo.address.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                Postal Code *
              </label>
              <input
                type="text"
                name="address.postal_code"
                value={customerInfo.address.postal_code}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 placeholder-gray-400 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 mb-1.5 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                Country *
              </label>
              <select
                name="address.country"
                value={customerInfo.address.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gray-400 bg-white text-gray-900 font-light"
                style={{fontFamily: "'Poppins', sans-serif"}}
              >
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="ES">Spain</option>
                <option value="IT">Italy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-4 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Payment</h3>
          <div className="p-4 border border-gray-200 rounded-sm">
            {!paymentElementReady && (
              <div className="mb-2 text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                Loading payment form...
              </div>
            )}
            <PaymentElement 
              options={{
                layout: 'tabs',
              }}
              onReady={() => {
                setPaymentElementReady(true);
              }}
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-xs bg-red-50 p-3 rounded-sm font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
              {error}
            </div>
          )}
        </div>

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
          <h3 className="text-xs uppercase tracking-wider text-gray-900 mb-6 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Order Summary</h3>
          {renderOrderSummary()}
         
          {showShippingInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
              <div className="bg-white border border-gray-200 max-w-md w-full p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm uppercase tracking-wider text-gray-900 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Delivery Information</h3>
                  <button
                    type="button"
                    onClick={() => setShowShippingInfo(false)}
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Close delivery information"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  We dispatch orders within 2 - 3 business days. Shipping costs depend on your delivery country.
                </p>
                <ul className="text-xs text-gray-600 space-y-2 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>
                  <li><span className="font-medium">UK:</span>  3-4 business days</li>
                  <li><span className="font-medium">Europe:</span> 5-10 business days</li>
                  <li><span className="font-medium">USA & Canada:</span> 7-14 business days</li>
                  <li><span className="font-medium">Rest of World: </span> 10-21 business days</li>
                </ul>
                <div className="flex justify-end">
                  <Link
                    to="/shipping"
                    className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors font-light"
                    style={{fontFamily: "'Poppins', sans-serif"}}
                    onClick={() => setShowShippingInfo(false)}
                  >
                    View full shipping policy
                  </Link>
                </div>
              </div>
          </div>
          )}
        </aside>
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
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
              <p className="text-gray-500 font-light" style={{fontFamily: "'Poppins', sans-serif"}}>Loading checkout...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-6 py-5">
          <Link to="/" className="hover:opacity-90 transition-opacity duration-300" aria-label="HappyCase home">
            <div
              className="flex flex-col cursor-pointer transition-all duration-300 text-gray-900"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              <span className="text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900  uppercase">
                THE
              </span>
              <span className="text-xl md:text-3xl font-bold leading-none flex items-center gap-0 text-blue-900  uppercase">
                {'HAPPY'.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block animate-smile-curve"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: '2s',
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span className="text-end text-[10px] md:text-xs font-bold leading-tight tracking-[0.35em] text-blue-900 uppercase">
                CASE
              </span>
            </div>
            <style>{`
              @keyframes smileCurve {
                0%, 100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(var(--curve-height));
                }
              }
              .animate-smile-curve {
                animation: smileCurve 2s ease-in-out infinite;
                display: inline-block;
              }
              .animate-smile-curve:nth-child(1) {
                --curve-height: 0px;
              }
              .animate-smile-curve:nth-child(2) {
                --curve-height: 4px;
              }
              .animate-smile-curve:nth-child(3) {
                --curve-height: 8px;
              }
              .animate-smile-curve:nth-child(4) {
                --curve-height: 4px;
              }
              .animate-smile-curve:nth-child(5) {
                --curve-height: 0px;
              }
            `}</style>
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 rounded-full 0 hover:border-gray-400 transition "
            aria-label="View cart"
          >
            <img src={cartIconSrc} alt="Cart" className="h-6 w-6" />
          </Link>
        </div>
      </div>
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
