'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '../utils/supabaseClient';
import { getApiUrl } from '../utils/apiConfig';
import OrderItem from './Payment-Sucess/OrderItem';
import AirplaneLoading from './Shared/AirplaneLoading';
import { getOrderDisplayId } from '../utils/paymentsucess/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const supabase = getSupabaseClient();
const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

const formatOrderDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput * 1000);
  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const isOrderRefunded = (order) => {
  return order?.status === 'refunded' || order?.metadata?.refunded === true;
};

const MyOrders = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const emailFromStorage = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setUserEmail(emailFromStorage || '');

    if (!isLoggedIn || !emailFromStorage) {
      router.push('/login?redirect=/my-orders');
      return;
    }

    const emailLower = emailFromStorage?.toLowerCase().trim();
    setIsAuthorized(emailLower === AUTHORIZED_EMAIL.toLowerCase().trim());

    const fetchOrders = async () => {
      try {
        const url = getApiUrl(`/get-orders?email=${encodeURIComponent(emailFromStorage)}`);
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok && data.success) {
          setOrders(data.orders || []);
        } else {
          setError(data?.error || 'Failed to load orders');
        }
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const fetchUserOrders = async () => {
    if (!userEmail) return;
    setLoading(true);
    setError('');
    try {
      const url = getApiUrl(`/get-orders?email=${encodeURIComponent(userEmail)}`);
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data?.error || 'Failed to load orders');
      }
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <AirplaneLoading size="sm" />
            </div>
            <p className="text-gray-600 font-inter">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 font-inter">Error Loading Orders</h2>
            <p className="text-gray-600 mb-6 font-inter">{error}</p>
            <button onClick={fetchUserOrders} className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 font-inter">My Orders</h1>
            <div className="flex gap-3">
              {isAuthorized && (
                <button onClick={() => router.push('/dashboard')} className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-md font-inter flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" /> Dashboard
                </button>
              )}
              <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 font-inter">Sign Out</button>
            </div>
          </div>
          {userEmail && <p className="text-gray-600 text-sm font-inter mb-6">{userEmail}</p>}
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 font-inter">No Orders Yet</h2>
              <p className="text-gray-600 mb-6 font-inter">You haven&apos;t placed any orders yet.</p>
              <button onClick={() => router.push('/')} className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md font-inter">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.order_id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 font-inter">Order #{getOrderDisplayId(order)}</h3>
                        <p className="text-sm text-gray-600 font-inter">Placed on {formatOrderDate(order.order_date)}</p>
                        <p className="text-sm text-gray-500 font-inter mt-0.5">
                          {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''} • {order.currency?.toUpperCase() || 'GBP'}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${
                            isOrderRefunded(order)
                              ? 'bg-red-100 text-red-800'
                              : order.status === 'succeeded' || order.status === 'complete'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                        <p className="text-lg font-bold text-gray-900 font-inter">£{parseFloat(order.total_amount || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {isOrderRefunded(order) && (
                      <div className="mb-4 p-3 bg-red-50 rounded-md border border-red-200 text-sm text-red-800 font-inter">
                        This order was refunded{order.metadata?.refunded_at ? ` on ${formatOrderDate(order.metadata.refunded_at)}` : ''}.
                      </div>
                    )}
                    <div className="flex flex-wrap justify-end gap-3 mb-4">
                      {(order.tracking?.tracking_link || order.tracking?.tracking_number || order.tracking?.carrier || order.metadata?.tracking_link || order.metadata?.carrier) && (
                        <a
                          href={order.tracking?.tracking_link || order.metadata?.tracking_link || 'https://www.evri.com/track-a-parcel'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors font-inter"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Track Parcel
                        </a>
                      )}
                      <a
                        href={`mailto:thehappycase.shop@gmail.com?subject=Return - Order #${getOrderDisplayId(order)}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-inter"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Return
                      </a>
                    </div>
                    {((order.tracking?.carrier || order.metadata?.carrier) || order.tracking?.tracking_number) ? (
                      <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm font-inter">
                        {(order.tracking?.carrier || order.metadata?.carrier) && (
                          <div><span className="text-gray-600">Carrier:</span> <span className="text-gray-900 font-medium">{order.tracking?.carrier || order.metadata?.carrier}</span></div>
                        )}
                        {order.tracking?.tracking_number && (
                          <div className="mt-1"><span className="text-gray-600">Tracking #:</span> <span className="text-gray-900 font-mono text-xs bg-white px-2 py-0.5 rounded border border-gray-200">{order.tracking.tracking_number}</span></div>
                        )}
                      </div>
                    ) : (
                      <div className="mb-4 p-3 bg-amber-50 rounded-md border border-amber-200 text-sm text-amber-800 font-inter">
                        Your order hasn&apos;t been dispatched yet. You&apos;ll receive tracking information once it ships.
                      </div>
                    )}
                    {(order.shipping_address?.line1 || order.shipping_address?.city) && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Shipping address</h4>
                        <div className="text-sm text-gray-700 font-inter space-y-0.5">
                          {order.shipping_address.line1 && <div>{order.shipping_address.line1}</div>}
                          {order.shipping_address.line2 && <div>{order.shipping_address.line2}</div>}
                          <div>
                            {[order.shipping_address.city, order.shipping_address.state].filter(Boolean).join(', ')}
                            {order.shipping_address.postal_code && ` ${order.shipping_address.postal_code}`}
                          </div>
                          {order.shipping_address.country && <div>{order.shipping_address.country}</div>}
                        </div>
                      </div>
                    )}
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 font-inter">Items</h4>
                    {order.items?.length > 0 ? order.items.map((item, i) => <OrderItem key={i} item={item} />) : <p className="text-gray-600 font-inter">No items in this order.</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
