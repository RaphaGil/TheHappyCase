import React, { useState, useMemo } from 'react';
import { getApiUrl } from '../../utils/apiConfig';

const OrdersTab = ({ orders, loadingOrders, ordersError, onRefresh }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [updatingOrders, setUpdatingOrders] = useState(new Set());

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount, currency = 'gbp') => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleDispatchedToggle = async (orderId, currentDispatched) => {
    const newDispatched = !currentDispatched;
    setUpdatingOrders(prev => new Set(prev).add(orderId));

    try {
      const apiUrl = getApiUrl(`/api/orders/${orderId}/dispatched`);
      console.log('Updating dispatched status:', { orderId, dispatched: newDispatched, apiUrl });

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dispatched: newDispatched }),
      });

      // Check if response is HTML (404 page from dev server) instead of JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Backend server returned HTML (likely 404). Is the server running on port 3001?');
      }

      if (!response.ok) {
        let errorMessage = 'Failed to update dispatched status';
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || errorMessage;
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ Dispatched status updated:', data);
      
      // Update local orders state
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error updating dispatched status:', error);
      const errorMsg = error.message || 'Failed to update dispatched status. Make sure the backend server is running.';
      alert(`Failed to update dispatched status: ${errorMsg}`);
    } finally {
      setUpdatingOrders(prev => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };

  const isDispatched = (order) => {
    return order.metadata?.dispatched === true;
  };

  // Get unique months/years from orders
  const availableMonths = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    
    const monthMap = new Map();
    orders.forEach(order => {
      if (order.order_date) {
        const date = new Date(order.order_date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const key = `${year}-${String(month + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        
        if (!monthMap.has(key)) {
          monthMap.set(key, { key, label, year, month });
        }
      }
    });
    
    // Sort by date (newest first)
    return Array.from(monthMap.values()).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  }, [orders]);

  // Filter orders by selected month
  const filteredOrders = useMemo(() => {
    if (selectedMonth === 'all') return orders;
    
    const [year, month] = selectedMonth.split('-').map(Number);
    return orders.filter(order => {
      if (!order.order_date) return false;
      const date = new Date(order.order_date);
      return date.getFullYear() === year && date.getMonth() === month - 1;
    });
  }, [orders, selectedMonth]);

  // Calculate totals for filtered orders
  const filteredTotal = useMemo(() => {
    return filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  }, [filteredOrders]);

  if (loadingOrders) {
    return (
      <div className="bg-white border rounded-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <p className="text-red-800 font-medium">Error loading orders</p>
          <p className="text-red-600 text-sm mt-1">{ordersError}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-8 text-center">
        <p className="text-gray-600">No orders found.</p>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  if (filteredOrders.length === 0 && selectedMonth !== 'all') {
    return (
      <div className="space-y-4">
        {/* Header with filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border rounded-lg p-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-sm text-gray-600">
              {orders.length} total order(s) • {filteredOrders.length} in selected period
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
            >
              <option value="all">All Orders</option>
              {availableMonths.map((month) => (
                <option key={month.key} value={month.key}>
                  {month.label}
                </option>
              ))}
            </select>
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm"
              >
                Refresh
              </button>
            )}
          </div>
        </div>

        <div className="bg-white border rounded-lg p-8 text-center">
          <p className="text-gray-600">No orders found for the selected period.</p>
          <button
            onClick={() => setSelectedMonth('all')}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm"
          >
            Show All Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with filter and refresh */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border rounded-lg p-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Orders</h2>
          <div className="text-sm text-gray-600">
            {selectedMonth === 'all' ? (
              <span>{filteredOrders.length} order(s) found</span>
            ) : (
              <span>
                {filteredOrders.length} order(s) in {availableMonths.find(m => m.key === selectedMonth)?.label || 'selected period'}
                {filteredTotal > 0 && filteredOrders.length > 0 && (
                  <span className="ml-2 font-medium">
                    • Total: {formatCurrency(filteredTotal, filteredOrders[0]?.currency || 'gbp')}
                  </span>
                )}
              </span>
            )}
            {selectedMonth !== 'all' && (
              <span className="text-gray-400 ml-2">
                (of {orders.length} total)
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white"
          >
            <option value="all">All Orders</option>
            {availableMonths.map((month) => (
              <option key={month.key} value={month.key}>
                {month.label}
              </option>
            ))}
          </select>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 text-sm"
            >
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.map((order) => {
        const isExpanded = expandedOrder === order.order_id;
        const items = order.items || [];
        const shippingAddress = order.shipping_address || {};

        return (
          <div
            key={order.order_id}
            className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Order Header - Always Visible */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => toggleOrder(order.order_id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">Order #{order.order_id?.substring(0, 20)}...</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        order.status === 'succeeded'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status || 'unknown'}
                    </span>
                    {isDispatched(order) && (
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Dispatched
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Customer:</span>{' '}
                      {order.customer_name || order.customer_email}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {formatDate(order.order_date)}
                    </div>
                    <div>
                      <span className="font-medium">Total:</span>{' '}
                      {formatCurrency(order.total_amount, order.currency)}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {items.length} item(s) • {order.customer_email}
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  {/* Dispatched Checkbox */}
                  <div 
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDispatchedToggle(order.order_id, isDispatched(order));
                    }}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isDispatched(order)}
                        onChange={() => {}} // Handled by parent onClick
                        disabled={updatingOrders.has(order.order_id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer disabled:opacity-50"
                      />
                      <span className="text-sm text-gray-600">
                        {updatingOrders.has(order.order_id) ? 'Updating...' : 'Dispatched'}
                      </span>
                    </label>
                  </div>
                  {/* Expand/Collapse Arrow */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => toggleOrder(order.order_id)}
                  >
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        isExpanded ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t bg-gray-50 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Name:</span>{' '}
                        {order.customer_name || 'N/A'}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>{' '}
                        <a
                          href={`mailto:${order.customer_email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {order.customer_email}
                        </a>
                      </div>
                      {order.customer_phone && (
                        <div>
                          <span className="font-medium text-gray-700">Phone:</span>{' '}
                          <a
                            href={`tel:${order.customer_phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {order.customer_phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Shipping Address</h4>
                    {shippingAddress.line1 ? (
                      <div className="text-sm space-y-1">
                        <div>{shippingAddress.line1}</div>
                        {shippingAddress.line2 && <div>{shippingAddress.line2}</div>}
                        <div>
                          {shippingAddress.city}
                          {shippingAddress.state && `, ${shippingAddress.state}`}
                        </div>
                        <div>
                          {shippingAddress.postal_code} {shippingAddress.country}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No shipping address provided</p>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-gray-900">Order Items</h4>
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded p-4 flex gap-4"
                      >
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          {item.design_image ? (
                            <img
                              src={item.design_image}
                              alt={item.name || 'Custom design'}
                              className="w-24 h-24 object-cover rounded border"
                              onError={(e) => {
                                // Fallback to case image if design image fails
                                if (item.case_image && e.target.src !== item.case_image) {
                                  e.target.src = item.case_image;
                                } else {
                                  e.target.style.display = 'none';
                                }
                              }}
                            />
                          ) : item.case_image ? (
                            <img
                              src={item.case_image}
                              alt={item.name || 'Case'}
                              className="w-24 h-24 object-cover rounded border"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gray-200 rounded border flex items-center justify-center">
                              <span className="text-xs text-gray-500">No image</span>
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {item.name || 'Custom Case'}
                          </h5>
                          <div className="mt-1 space-y-1 text-sm text-gray-600">
                            {item.case_type && (
                              <div>
                                <span className="font-medium">Type:</span> {item.case_type}
                              </div>
                            )}
                            {item.color && (
                              <div>
                                <span className="font-medium">Color:</span> {item.color}
                              </div>
                            )}
                            <div>
                              <span className="font-medium">Quantity:</span> {item.quantity || 1}
                            </div>
                            {item.pins && item.pins.length > 0 && (
                              <div>
                                <span className="font-medium">Pins:</span>{' '}
                                {item.pins.map((pin, i) => (
                                  <span key={i}>
                                    {pin.name || pin}
                                    {i < item.pins.length - 1 ? ', ' : ''}
                                  </span>
                                ))}
                              </div>
                            )}
                            {item.custom_design && (
                              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded mt-1">
                                Custom Design
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Item Price */}
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(item.total_price || item.unit_price || 0, order.currency)}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-sm text-gray-500 mt-1">
                              {formatCurrency(item.unit_price || 0, order.currency)} each
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Payment Intent:</span>{' '}
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {order.payment_intent_id || 'N/A'}
                        </code>
                      </div>
                      <div className="mt-1">
                        <span className="font-medium">Order ID:</span>{' '}
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {order.order_id}
                        </code>
                      </div>
                      {isDispatched(order) && order.metadata?.dispatched_at && (
                        <div className="mt-1">
                          <span className="font-medium">Dispatched:</span>{' '}
                          <span className="text-blue-600">
                            {formatDate(order.metadata.dispatched_at)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Amount</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(order.total_amount, order.currency)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrdersTab;
