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
          <h1 className="text-subtitle font-bold text-gray-800 mb-4 lazy-dog-title font-fredoka">Invalid Access</h1>
          <p className="text-body text-gray-600 mb-6 student-text font-inter">This page can only be accessed after a successful payment.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-md bg-btn-primary-blue-dark hover:bg-btn-primary-blue-dark-hover text-btn-primary-blue-dark-text border border-btn-primary-blue-dark-border hover:border-btn-primary-blue-dark-hover transition-all duration-200"
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
          <h1 className="text-title font-bold text-gray-800 mb-2 lazy-dog-title font-fredoka">
            Payment Successful!
          </h1>
          <p className="text-body text-gray-600">
            Thank you for your order. We've received your payment and will process your items shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-heading-sm font-semibold mb-4 text-gray-800">Order Details</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Order ID:</span>
                <span>{paymentIntent.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Date:</span>
                <span>{formatDate(paymentIntent.created)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Amount:</span>
                <span>£{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-green-600 capitalize">Status:</span>
                <span>
                  {paymentIntent.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 font-semibold mb-3">
              <h3>Items Ordered:</h3>
              {items?.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded mb-2 font-medium">
                  <p>Custom Phone Case</p>
                  <p className="text-body-sm text-gray-600 font-medium">
                    Color: <span>{item.color}</span>
                  </p>
                  <p className="text-body-sm text-gray-600 font-medium">
                    Pins: <span>{item.pins?.length || 0} pins</span>
                  </p>
                  <p className="text-body-sm font-semibold text-blue-800">
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
                  <span className="text-gray-600 font-medium">Name:</span>
                  <p>{customerInfo.name}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Email:</span>
                  <p>{customerInfo.email}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Address:</span>
                  <p>
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

            <div className="mt-6 p-4 bg-blue-50 rounded-lg font-semibold text-blue-800 mb-2">
              <h3>Shipping Information</h3>
              <p className="text-body-sm text-blue-700">
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
            className="px-6 py-3 rounded-md font-semibold inline-flex items-center bg-btn-primary-blue-dark hover:bg-btn-primary-blue-dark-hover text-btn-primary-blue-dark-text border border-btn-primary-blue-dark-border hover:border-btn-primary-blue-dark-hover transition-all duration-200"
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-md font-semibold inline-flex items-center bg-btn-gray-medium hover:bg-btn-gray-medium-hover text-btn-gray-medium-text border border-btn-gray-medium-border hover:border-btn-gray-medium-hover transition-all duration-200"
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
