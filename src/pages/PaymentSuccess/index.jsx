import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentIntent, customerInfo, items } = location.state || {};

  if (!paymentIntent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>Invalid Access</h1>
          <p className="text-gray-600 mb-6 student-text" style={{fontFamily: "'Poppins', sans-serif"}}>This page can only be accessed after a successful payment.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalAmount = items?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <FontAwesomeIcon 
            icon={faCheckCircle} 
            className="text-green-500 text-6xl mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2 lazy-dog-title" style={{fontFamily: "'Fredoka One', cursive"}}>
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your order. We've received your payment and will process your items shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">{paymentIntent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{formatDate(paymentIntent.created)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">£{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {paymentIntent.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Items Ordered:</h3>
              {items?.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded mb-2">
                  <p className="font-medium">Custom Phone Case</p>
                  <p className="text-sm text-gray-600">
                    Color: <span className="font-medium">{item.color}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Pins: <span className="font-medium">{item.pins?.length || 0} pins</span>
                  </p>
                  <p className="text-sm font-semibold text-blue-800">
                    £{item.totalPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
            
            {customerInfo && (
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{customerInfo.name}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{customerInfo.email}</p>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <p className="font-medium">
                    {customerInfo.address.line1}
                    {customerInfo.address.line2 && <><br />{customerInfo.address.line2}</>}
                    <br />
                    {customerInfo.address.city} {customerInfo.address.postal_code}
                    <br />
                    {customerInfo.address.country}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Shipping Information</h3>
              <p className="text-sm text-blue-700">
                Your order will be processed within 1-2 business days. 
                You will receive a shipping confirmation email with tracking details 
                once your items are dispatched.
              </p>
              <p className="text-sm text-blue-700 mt-2">
                <strong>Estimated delivery:</strong> 3-5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold inline-flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-semibold inline-flex items-center"
          >
            <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
            Print Receipt
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            Questions about your order? Contact us at{' '}
            <a href="mailto:support@thehappycase.com" className="text-blue-800 hover:underline">
              support@thehappycase.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
