import React from 'react';

const OrdersTab = ({ orders, loadingOrders, ordersError }) => {
  return (
    <div className="bg-white border p-6">
      {loadingOrders && <p>Loading...</p>}
      {ordersError && <p className="text-red-600">{ordersError}</p>}
      {!loadingOrders && !ordersError && orders.length === 0 && (
        <p>No orders found.</p>
      )}
      {!loadingOrders &&
        orders.map((o) => (
          <div key={o.id} className="border-b py-4">
            <p>{o.customer_email}</p>
          </div>
        ))}
    </div>
  );
};

export default OrdersTab;
