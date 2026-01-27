import React from 'react';
import OrderItem from './OrderItem';
import { formatDate } from '../../utils/paymentsucess/helpers';

const OrderDetails = ({ orderId, orderDate, subtotal, shippingCost, vatAmount, totalAmount, orderStatus, items }) => {
  return (
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
        
        {/* Order Summary */}
        <div className="pt-2 space-y-2">
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-600 font-medium font-inter">Subtotal:</span>
            <span className="text-gray-900 font-inter">£{subtotal.toFixed(2)}</span>
          </div>
          {shippingCost > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 font-medium font-inter">Shipping:</span>
              <span className="text-gray-900 font-inter">£{shippingCost.toFixed(2)}</span>
            </div>
          )}
          {vatAmount > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600 font-medium font-inter">VAT:</span>
              <span className="text-gray-900 font-inter">£{vatAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2">
            <span className="text-gray-900 font-semibold font-inter">Total:</span>
            <span className="text-gray-900 font-semibold text-lg font-inter">£{totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-2 border-t border-gray-200">
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
              <OrderItem key={index} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
