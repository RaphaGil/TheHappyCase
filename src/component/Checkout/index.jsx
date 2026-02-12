// React & Router
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Contexts
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

// Utils
import { createPaymentIntent } from '../../utils/mockPaymentAPI';
import { getMaxAvailableQuantity, refreshInventoryFromSupabase } from '../../utils/inventory';

// Components
import InternationalNote from '../InternationalNote';
import CheckoutHeader from './components/CheckoutHeader';
import LoadingState from './components/LoadingState';
import CustomerInfoForm from './components/CustomerInfoForm';
import PaymentSection from './components/PaymentSection';
import OrderSummary from './components/OrderSummary';
import MobileOrderSummary from './components/MobileOrderSummary';
import ShippingInfoModal from './components/ShippingInfoModal';

// --- Constants ---
// Get Stripe publishable key from environment
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Validate Stripe key format (silent validation)

const stripePromise = loadStripe(
  stripePublishableKey || 
  'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890'
);

// European countries list
const EUROPEAN_COUNTRIES = new Set([
  'AL', 'AD', 'AT', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 
  'LV', 'LI', 'LT', 'LU', 'MT', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH'
]);

const SHIPPING_RATES = {
  GB: 3,
  // All European countries use the same rate
  ...Object.fromEntries(Array.from(EUROPEAN_COUNTRIES).map(code => [code, 10])),
};

const SHIPPING_LABELS = {
  GB: 'England',
  // European countries will use their country name
  AL: 'Albania', AD: 'Andorra', AT: 'Austria', BE: 'Belgium', BA: 'Bosnia and Herzegovina', BG: 'Bulgaria',
  HR: 'Croatia', CY: 'Cyprus', CZ: 'Czech Republic', DK: 'Denmark', EE: 'Estonia', FI: 'Finland',
  FR: 'France', DE: 'Germany', GR: 'Greece', HU: 'Hungary', IS: 'Iceland', IE: 'Ireland', IT: 'Italy',
  LV: 'Latvia', LI: 'Liechtenstein', LT: 'Lithuania', LU: 'Luxembourg', MT: 'Malta', MC: 'Monaco',
  ME: 'Montenegro', NL: 'Netherlands', MK: 'North Macedonia', NO: 'Norway', PL: 'Poland', PT: 'Portugal',
  RO: 'Romania', SM: 'San Marino', RS: 'Serbia', SK: 'Slovakia', SI: 'Slovenia', ES: 'Spain',
  SE: 'Sweden', CH: 'Switzerland',
};

const DEFAULT_SHIPPING_RATE = 12;

const CURRENCY_MULTIPLIERS = {
  'jpy': 1,  // Japanese Yen doesn't use decimals
  'krw': 1,  // South Korean Won doesn't use decimals
  'vnd': 1,  // Vietnamese Dong doesn't use decimals
};

const CheckoutForm = () => {
  // --- Hooks ---
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart, incrementItemQty, decrementItemQty, removeFromCart } = useCart();
  const { formatPrice, setCurrency, currency } = useCurrency();

  // --- State ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentElementReady, setPaymentElementReady] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedEmail, setAuthenticatedEmail] = useState('');
  const [itemErrors, setItemErrors] = useState({});
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

  // --- Refs ---
  const errorTimeoutsRef = useRef({});
  const isNavigatingToSuccessRef = useRef(false);

  // --- Computed Values ---
  const subtotal = getTotalPrice();
  const selectedCountry = customerInfo.address.country;
  
  // Calculate shipping cost
  // Use fixed rates from SHIPPING_RATES
  const shippingCost = cart.length === 0
    ? 0
    : SHIPPING_RATES[selectedCountry] ?? DEFAULT_SHIPPING_RATE;
  
  const shippingLabel = SHIPPING_LABELS[selectedCountry] || 'International';
  const showInternationalNote = selectedCountry && selectedCountry.toUpperCase() !== 'GB' && cart.length > 0;
  const totalWithShipping = subtotal + shippingCost;

  // --- Effects ---
  // Suppress non-critical hCaptcha errors (used internally by Stripe for fraud detection)
  // These 401 errors are harmless - Stripe falls back to other fraud detection methods
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      const errorMessage = event.reason?.message || event.reason?.toString() || '';
      const errorUrl = event.reason?.url || '';
      
      // Suppress hCaptcha 401 errors (non-critical, Stripe handles gracefully)
      if (errorMessage.includes('hcaptcha') || 
          errorMessage.includes('hCaptcha') ||
          errorUrl.includes('api.hcaptcha.com') ||
          (errorMessage.includes('401') && errorMessage.includes('Unauthorized'))) {
        event.preventDefault(); // Prevent error from showing in console
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Automatically change currency based on selected country
  useEffect(() => {
    if (selectedCountry) {
      if (EUROPEAN_COUNTRIES.has(selectedCountry)) {
        // Set currency to EUR for European countries
        setCurrency('EUR');
      } else if (selectedCountry === 'GB') {
        // Set currency to GBP for UK
        setCurrency('GBP');
      }
    }
  }, [selectedCountry, setCurrency]);

  // Check authentication status on mount and when returning from login
  useEffect(() => {
    const checkAuth = () => {
      const userEmail = localStorage.getItem('userEmail');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn && userEmail) {
        setIsAuthenticated(true);
        setAuthenticatedEmail(userEmail);
        // Auto-fill email in customer info if empty
        setCustomerInfo(prev => {
          if (!prev.email) {
            return {
              ...prev,
              email: userEmail
            };
          }
          return prev;
        });
      } else {
        setIsAuthenticated(false);
        setAuthenticatedEmail('');
      }
    };
    
    checkAuth();
    
    // Check auth when window gains focus (user returns from login page)
    const handleFocus = () => {
      checkAuth();
    };
    
    // Also listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'userEmail' || e.key === 'isLoggedIn') {
        checkAuth();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Run once on mount
  
  // Auto-clear error messages after 3 seconds
  useEffect(() => {
    const timeouts = errorTimeoutsRef.current;
    
    Object.keys(itemErrors).forEach((itemKey) => {
      if (timeouts[itemKey]) {
        clearTimeout(timeouts[itemKey]);
      }
      
      timeouts[itemKey] = setTimeout(() => {
        setItemErrors(prev => {
          const newErrors = { ...prev };
          if (typeof newErrors[itemKey] === 'string') {
            delete newErrors[itemKey];
          } else if (newErrors[itemKey] && typeof newErrors[itemKey] === 'object') {
            delete newErrors[itemKey];
          }
          return newErrors;
        });
        delete timeouts[itemKey];
      }, 3000);
    });

    return () => {
      Object.values(timeouts).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, [itemErrors]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !isNavigatingToSuccessRef.current) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Reset payment element ready state when elements change
  useEffect(() => {
    setPaymentElementReady(false);
  }, [elements]);

  // --- Handlers ---
  const handleIncrementWithCheck = (itemId) => {
    // Find item by ID or by index
    const item = typeof itemId === 'string' 
      ? cart.find(i => i.id === itemId)
      : (typeof itemId === 'number' && itemId >= 0 && itemId < cart.length ? cart[itemId] : null);
    
    if (!item) {
      return;
    }
    
    const maxAvailable = getMaxAvailableQuantity(item, cart);
    const canIncrement = maxAvailable === null || maxAvailable > 0;
    
    if (canIncrement) {
      incrementItemQty(itemId);
      // Clear error when successfully incrementing
      setItemErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[itemId];
        return newErrors;
      });
    } else {
      // Show inline error message for out of stock items
      let itemName = '';
      
      if (item.type === 'charm') {
        itemName = item.name || item.pin?.name || 'Charm';
        const errorMessage = `Oops! We don't have any more ${itemName} in stock right now, so you can't add more to your basket.`;
        setItemErrors(prev => ({
          ...prev,
          [itemId]: errorMessage
        }));
      } else {
        // For case items, just increment (they handle their own errors)
        console.log('⚠️ Case item - incrementing anyway despite inventory check');
        incrementItemQty(itemId);
      }
    }
  };

  // Handle decrement with error clearing
  const handleDecrementWithCheck = (itemId) => {
    decrementItemQty(itemId);
    // Clear error when decrementing
    setItemErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[itemId];
      return newErrors;
    });
  };


  // Redirect if cart is empty (but not if we're navigating to success page)
  useEffect(() => {
    // Don't redirect if we're navigating to success page
    if (cart.length === 0 && !isNavigatingToSuccessRef.current) {
      navigate('/cart');
    }
  }, [cart, navigate]);


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
      // Double-check inventory from Supabase before processing payment
      // This prevents race conditions where another customer bought the last item
      await refreshInventoryFromSupabase();
      
      // Check each item in cart against current Supabase inventory
      // Allow purchase if user has the item in their cart (even if it shows as sold out)
      const outOfStockItems = [];
      
      // Group items by their inventory key (case+color or charm identity)
      const itemGroups = new Map();
      
      for (const item of cart) {
        let groupKey = '';
        let itemName = '';
        
        if (item.type === 'charm') {
          const category = item.category || item.pin?.category || 'colorful';
          const pinName = item.pin?.name || item.name || '';
          groupKey = `charm-${category}-${pinName}`;
          itemName = item.name || item.pin?.name || 'Charm';
        } else if (item.caseType && item.color) {
          groupKey = `case-${item.caseType}-${item.color}`;
          itemName = item.caseName || item.name || 'Passport Case';
        } else {
          groupKey = item.id || `item-${item.name}`;
          itemName = item.name || 'Item';
        }
        
        if (!itemGroups.has(groupKey)) {
          itemGroups.set(groupKey, {
            item: item,
            name: itemName,
            totalQuantity: 0
          });
        }
        
        const group = itemGroups.get(groupKey);
        group.totalQuantity += (item.quantity || 1);
      }
      
      // Check each group against base inventory (without cart subtraction)
      for (const [groupKey, group] of itemGroups) {
        // Get base inventory without subtracting cart items
        const baseInventory = getMaxAvailableQuantity(group.item, []);
        
        // If item has limited stock
        if (baseInventory !== null) {
          // Check if base inventory is sufficient for what's in cart
          // If baseInventory is 0, it means truly out of stock
          // If baseInventory > 0 but less than totalQuantity, insufficient stock
          if (baseInventory === 0 || group.totalQuantity > baseInventory) {
            outOfStockItems.push(group.name);
          }
        }
        // If baseInventory is null, it means unlimited stock - always allow
      }
      
      // If any items are out of stock, prevent payment
      if (outOfStockItems.length > 0) {
        const itemsList = outOfStockItems.length === 1 
          ? outOfStockItems[0]
          : outOfStockItems.slice(0, -1).join(', ') + ' and ' + outOfStockItems[outOfStockItems.length - 1];
        
        const errorMessage = `Sorry, ${itemsList} ${outOfStockItems.length === 1 ? 'is' : 'are'} no longer available. Please remove ${outOfStockItems.length === 1 ? 'it' : 'them'} from your cart and try again.`;
        setError(errorMessage);
        setLoading(false);
        return;
      }
      // Confirm the payment with Stripe
      // The clientSecret is automatically retrieved from Elements context
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: null, // Required when fields.billing_details.phone is set to 'never'
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
        // Payment succeeded - navigate to success page
        isNavigatingToSuccessRef.current = true; // Set flag to prevent redirect
        const cartItemsCopy = [...cart]; // Create a copy to preserve cart data
        clearCart(); // Clear cart before navigation
        navigate('/payment-success', { 
          state: { 
            paymentIntent,
            customerInfo,
            items: cartItemsCopy,
            shippingCost,
            totalWithShipping,
            subtotal,
          } 
        });
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // Payment requires additional action (e.g., 3D Secure)
        // Stripe will handle redirect automatically to return_url
        // After redirect completes, user will land on payment-success page
      } else if (paymentIntent) {
        // Other status (processing, requires_confirmation, etc.)
        // For most cases, we still show success as the payment was initiated
        // Note: 'processing' status means payment is being processed and may take time
        isNavigatingToSuccessRef.current = true; // Set flag to prevent redirect
        const cartItemsCopy = [...cart]; // Create a copy to preserve cart data
        clearCart(); // Clear cart before navigation
        navigate('/payment-success', { 
          state: { 
            paymentIntent,
            customerInfo,
            items: cartItemsCopy,
            shippingCost,
            totalWithShipping,
            subtotal,
          } 
        });
      }
      } catch (err) {
        setError('An error occurred while processing your payment.');
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
        shippingCost={shippingCost}
        shippingLabel={shippingLabel}
        showInternationalNote={showInternationalNote}
        onShowShippingInfo={() => setShowShippingInfo(true)}
        onIncrement={handleIncrementWithCheck}
        onDecrement={handleDecrementWithCheck}
        onRemove={removeFromCart}
        itemErrors={itemErrors}
      />
 
      <div className="flex flex-col lg:flex-row  w-full ">
        {/* Checkout form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6  mt-6 lg:mt-0 lg:p-6 w-full lg:w-1/2 lg:flex-shrink-0"
        > 
        {/* Customer Information */}
        <CustomerInfoForm 
          customerInfo={customerInfo}
          onInputChange={handleInputChange}
          isAuthenticated={isAuthenticated}
          authenticatedEmail={authenticatedEmail}
          onSignIn={(email) => {
            setIsAuthenticated(true);
            setAuthenticatedEmail(email);
          }}
          onSignOut={() => {
            setIsAuthenticated(false);
            setAuthenticatedEmail('');
            localStorage.removeItem('userId'); // Clear user ID
          }}
        />

        {/* Payment Information */}
        <PaymentSection
          paymentElementReady={paymentElementReady}
          error={error}
          onPaymentReady={() => setPaymentElementReady(true)}
          onPaymentError={(errorMessage) => {
            setError(errorMessage);
          }}
        />

        <button
          type="submit"
          disabled={!stripe || !elements || loading || !paymentElementReady}
          className="w-full py-3 text-sm uppercase tracking-wider font-light disabled:opacity-50 disabled:cursor-not-allowed font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
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
        <aside className="hidden lg:flex border border-gray-200 bg-yellow-50 p-6 w-full lg:w-1/2 lg:sticky lg:top-20 mt-4 lg:mt-0 flex-col max-h-[calc(100vh-8rem)]">
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <OrderSummary
              cart={cart}
              formatPrice={formatPrice}
              subtotal={subtotal}
              shippingCost={shippingCost}
              shippingLabel={shippingLabel}
              totalWithShipping={totalWithShipping}
              showInternationalNote={showInternationalNote}
              onShowShippingInfo={() => setShowShippingInfo(true)}
              onIncrement={handleIncrementWithCheck}
              onDecrement={handleDecrementWithCheck}
              onRemove={removeFromCart}
              itemErrors={itemErrors}
            />
          </div>
        </aside>
        
        <ShippingInfoModal
          isOpen={showShippingInfo}
          onClose={() => setShowShippingInfo(false)}
        />
      </div>
      
      {/* Footer Links */}
      <div className="w-full border-t border-gray-200 mt-8 pt-6 pb-6">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-gray-600 font-light font-inter">
            <Link 
              to="/returns" 
              className="hover:text-gray-900 transition-colors underline"
            >
              Refund Policy
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/shipping" 
              className="hover:text-gray-900 transition-colors underline"
            >
              Shipping
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/returns" 
              className="hover:text-gray-900 transition-colors underline"
            >
              Cancellations
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/about" 
              className="hover:text-gray-900 transition-colors underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
  const { currency, convertPrice } = useCurrency();
  const navigate = useNavigate();
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentError, setPaymentError] = useState(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Don't redirect to cart if we're already on a different page (e.g., payment-success)
    const currentPath = window.location.pathname;
    if (cart.length === 0 && (currentPath === '/checkout' || currentPath.includes('/checkout'))) {
      navigate('/cart');
      return;
    }

    // Only initialize payment options once when we have items in cart
    if (cart.length === 0 || hasInitializedRef.current || options !== null) {
      return;
    }

    const initializeOptions = async () => {
      try {
        hasInitializedRef.current = true;
        setLoading(true);
        setPaymentError(null); // Clear any previous errors
        
        // Get total price in GBP, then convert to selected currency
        const totalPriceGBP = getTotalPrice();
        const totalPriceInCurrency = convertPrice(totalPriceGBP);
        
        // Convert to smallest currency unit (pence, cents, etc.)
        // For currencies like JPY that don't use decimals, multiply by 1
        const currencyMultipliers = {
          'jpy': 1,  // Japanese Yen doesn't use decimals
          'krw': 1,  // South Korean Won doesn't use decimals
          'vnd': 1,  // Vietnamese Dong doesn't use decimals
        };
        const multiplier = currencyMultipliers[currency.toLowerCase()] || 100;
        const amount = Math.round(totalPriceInCurrency * multiplier);
        const currencyCode = currency.toLowerCase();
        
        const paymentData = {
          amount,
          currency: currencyCode,
          items: cart,
          customerInfo: {},
        };
        
        const result = await createPaymentIntent(paymentData);

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
        // More detailed error message
        let errorMessage = 'Failed to initialize payment. ';
        if (err?.message) {
          errorMessage += err.message;
        } else {
          errorMessage += 'Please ensure the backend server is running on port 3001.';
        }
        
        setPaymentError(errorMessage);
        hasInitializedRef.current = false; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    initializeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.length]); // Only re-run if cart length changes (hasInitializedRef prevents re-init)

  if (loading) {
    return <LoadingState />;
  }

  if (paymentError) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center bg-white py-10">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
                Payment Setup Error
              </h2>
              <p className="text-red-700 mb-4 font-inter">
                {paymentError}
              </p>
              <div className="text-sm text-red-600 mb-4 font-inter">
                <p className="mb-2">To fix this issue:</p>
                <ol className="list-decimal list-inside space-y-1 text-left">
                  <li>Make sure your backend server is running: <code className="bg-red-100 px-1 rounded">npm run server</code></li>
                  <li>Verify the server is running on port 3001</li>
                  <li>Check that the proxy is configured correctly</li>
                  <li>Refresh this page to retry</li>
                </ol>
              </div>
              <button
                onClick={() => {
                  setPaymentError(null);
                  hasInitializedRef.current = false;
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-inter"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!options) {
    return <LoadingState />;
  }

  // Validate Stripe key is set and not the placeholder
  const isPlaceholderKey = stripePublishableKey === 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890';
  if (!stripePublishableKey || isPlaceholderKey) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <CheckoutHeader />
        <div className="flex-1 flex items-center justify-center bg-white py-10">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
                Stripe Configuration Missing
              </h2>
              <p className="text-yellow-700 mb-4 font-inter">
                Please set VITE_STRIPE_PUBLISHABLE_KEY in your environment variables.
              </p>
              <p className="text-sm text-yellow-600 font-inter">
                The Stripe publishable key is required to process payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CheckoutHeader />
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
