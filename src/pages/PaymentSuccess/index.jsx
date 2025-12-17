import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { paymentIntent, customerInfo, items } = location.state || {};
  const sessionId = searchParams.get('session_id');

  // Handle Stripe redirect with session_id
  useEffect(() => {
    if (sessionId && !paymentIntent) {
      setLoading(true);
      // Fetch session status from backend
      fetch(`/session-status?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'complete') {
            // Session is complete, but we don't have full details
            // For now, show success message
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch(err => {
          console.error('Error fetching session:', err);
          setLoading(false);
        });
    }
  }, [sessionId, paymentIntent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Loading payment details...</p>
        </div>
      </div>
    );
  }

  // If no paymentIntent and no session_id, show invalid access
  if (!paymentIntent && !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>Invalid Access</h1>
          <p className="text-gray-600 mb-6 font-inter">This page can only be accessed after a successful payment.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-md bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-inter"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalAmount = items?.reduce((sum, item) => sum + (item.totalPrice || item.price || 0) * (item.quantity || 1), 0) || 0;
  const orderId = paymentIntent?.id || sessionId || 'N/A';
  const orderDate = paymentIntent?.created || Date.now() / 1000;
  const orderStatus = paymentIntent?.status || 'succeeded';

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-100 mb-6">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-green-600 text-4xl md:text-5xl"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3" style={{fontFamily: "'Poppins', sans-serif"}}>
            Payment Successful!
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Thank you for your order. We've received your payment and will process your items shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Order Details
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium font-inter">Order ID:</span>
                <span className="text-gray-900 font-mono text-sm">{orderId}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium font-inter">Date:</span>
                <span className="text-gray-900 font-inter">{formatDate(orderDate)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 font-medium font-inter">Amount:</span>
                <span className="text-gray-900 font-semibold font-inter">£{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-green-600 capitalize font-inter">Status:</span>
                <span className="text-green-600 font-semibold capitalize font-inter">
                  {orderStatus}
                </span>
              </div>
            </div>

            {items && items.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 font-inter">Items Ordered:</h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-start gap-4">
                        {(item.image || item.caseImage || item.designImage) && (
                          <img 
                            src={item.designImage || item.caseImage || item.image} 
                            alt={item.name || item.caseName || 'Item'}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1 font-inter">
                            {item.caseName || item.name || 'Custom Case'}
                          </p>
                          {item.color && (
                            <p className="text-sm text-gray-600 mb-1 font-inter">
                              Color: <span className="font-medium">{item.color}</span>
                            </p>
                          )}
                          {item.pinsDetails && item.pinsDetails.length > 0 && (
                            <p className="text-sm text-gray-600 mb-1 font-inter">
                              Charms: <span className="font-medium">{item.pinsDetails.length}</span>
                            </p>
                          )}
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-600 mb-1 font-inter">
                              Quantity: <span className="font-medium">{item.quantity}</span>
                            </p>
                          )}
                          <p className="text-sm font-semibold text-gray-900 mt-2 font-inter">
                            £{((item.totalPrice || item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900" style={{fontFamily: "'Poppins', sans-serif"}}>
              Shipping Information
            </h2>
            
            {customerInfo && customerInfo.name && (
              <div className="space-y-4 mb-6">
                <div className="py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-medium font-inter block mb-1">Name:</span>
                  <p className="text-gray-900 font-inter">{customerInfo.name}</p>
                </div>
                {customerInfo.email && (
                  <div className="py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium font-inter block mb-1">Email:</span>
                    <p className="text-gray-900 font-inter">{customerInfo.email}</p>
                  </div>
                )}
                {customerInfo.address && customerInfo.address.line1 && (
                  <div className="py-2">
                    <span className="text-gray-600 font-medium font-inter block mb-1">Address:</span>
                    <p className="text-gray-900 font-inter">
                      {customerInfo.address.line1}
                      {customerInfo.address.line2 && <><br />{customerInfo.address.line2}</>}
                      <br />
                      {customerInfo.address.city} {customerInfo.address.postal_code}
                      <br />
                      {customerInfo.address.country}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 p-4 md:p-5 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 font-inter">What's Next?</h3>
              <p className="text-sm md:text-base text-blue-800 mb-3 font-inter">
                Your order will be processed within 1-2 business days. 
                You will receive a shipping confirmation email with tracking details 
                once your items are dispatched.
              </p>
              <p className="text-sm md:text-base text-blue-800 font-inter">
                <strong>Estimated delivery:</strong> 3-5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 md:mt-12">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-md font-medium inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 font-inter"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-md font-medium inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 hover:border-gray-400 transition-all duration-200 font-inter"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
            Print Receipt
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-gray-600 font-inter">
            Questions about your order? Contact us at{' '}
            <a href="mailto:support@thehappycase.com" className="text-gray-900 hover:underline font-medium">
              support@thehappycase.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
