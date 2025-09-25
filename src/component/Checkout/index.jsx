import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createPaymentIntent, confirmMockPayment } from '../../utils/mockPaymentAPI';

// Initialize Stripe with your publishable key
// For demo purposes, we'll use a test key. In production, use your actual key
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890'
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postal_code: '',
      country: 'GB',
    },
  });

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
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll use mock payment processing
      // In a real app, you would create a payment intent on your backend
      const { payment_intent_id } = await createPaymentIntent({
        amount: Math.round(getTotalPrice() * 100), // Convert to pence
        currency: 'gbp',
        items: cart,
        customerInfo,
      });

      // Simulate payment confirmation
      const paymentIntent = await confirmMockPayment(payment_intent_id, Math.round(getTotalPrice() * 100));

      if (paymentIntent.status === 'succeeded') {
        // Payment succeeded
        clearCart();
        navigate('/payment-success', { 
          state: { 
            paymentIntent,
            customerInfo,
            items: cart,
          } 
        });
      }
    } catch (err) {
      setError('An error occurred while processing your payment.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>Checkout</h2>
      
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3 lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>Order Summary</h3>
        {cart.map((item, index) => {
          const base = typeof item.basePrice === 'number' ? item.basePrice : 8;
          const charms = item.pinsDetails && item.pinsDetails.length
            ? item.pinsDetails.reduce((s, p) => s + (p.price || 0), 0)
            : Math.max(0, (item.totalPrice || 0) - base);
          const unit = base + charms;
          const qty = item.quantity || 1;
          const total = unit * qty;
          
          return (
            <div key={index} className="py-3 border-b border-gray-200">
              <div className="flex items-start gap-3">
                {/* Case preview */}
                <div className="w-16 h-20 bg-white rounded border flex items-center justify-center">
                  {item.caseImage ? (
                    <img src={item.caseImage} alt="Custom Case" className="w-8 h-14 object-contain rounded" />
                  ) : (
                    <div className="w-8 h-14 rounded" style={{ background: item.color }} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">Custom Passport Case</div>
                      <div className="text-xs text-gray-500">Color: {item.color}</div>
                      <div className="text-xs text-gray-500">Qty: {qty}</div>
                      
                    </div>
                  
                  </div>

                  {/* Charms */}
                  {item.pinsDetails && item.pinsDetails.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-500 mb-1">Purchase Description:</div>
                      <div className="flex flex-col gap-1">
                        {/* Case price row */}
                        <div className="flex items-center justify-between bg-white rounded border px-2 py-1">
                          <div className="flex items-center gap-2">
                            {item.caseImage ? (
                              <img src={item.caseImage} alt="Case" className="w-6 h-6 object-contain rounded" />
                            ) : (
                              <div className="w-6 h-6 rounded" style={{ background: item.color }} />
                            )}
                            <span className="text-sm">Case</span>
                          </div>
                          <span className="text-sm font-medium">£{base.toFixed(2)}</span>
                        </div>
                        {Object.values(item.pinsDetails.reduce((acc, pin) => {
                          acc[pin.src] = acc[pin.src] || { ...pin, quantity: 0 };
                          acc[pin.src].quantity++;
                          return acc;
                        }, {})).map((groupedPin, i) => (
                          <div key={i} className="flex items-center justify-between bg-white rounded border px-2 py-1">
                            <div className="flex items-center gap-2">
                              <img src={groupedPin.src} alt={groupedPin.name} className="w-6 h-6 object-contain" />
                              <span className="text-sm">{groupedPin.name} (x{groupedPin.quantity})</span>
                            </div>
                            <span className="text-sm font-medium">£{(groupedPin.price * groupedPin.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-right">
                      {/* <div className="text-xs text-gray-500">Total = (Case £{base.toFixed(2)} + Charms £{charms.toFixed(2)}) × {qty}</div> */}
                      <div className="font-semibold text-lg mt-4">Total:  £{total.toFixed(2)}</div>
                    </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between py-2 font-bold text-lg">
          <span>Total:</span>
          <span>£{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 student-text" style={{fontFamily: "'Poppins', sans-serif"}}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 student-text" style={{fontFamily: "'Poppins', sans-serif"}}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="address.line1"
              value={customerInfo.address.line1}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2
            </label>
            <input
              type="text"
              name="address.line2"
              value={customerInfo.address.line2}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="address.city"
                value={customerInfo.address.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="address.postal_code"
                value={customerInfo.address.postal_code}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                name="address.country"
                value={customerInfo.address.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <h3 className="font-semibold text-lg lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>Payment Information</h3>
          
          <div className="p-4 border border-gray-300 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details *
            </label>
            <CardElement options={cardElementOptions} />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="happy-button w-full py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          <span className="relative z-10">{loading ? 'Processing...' : `Pay £${getTotalPrice()}`}</span>
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
              animation: 'shine 1.5s ease-in-out'
            }}
          />
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
