'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '../utils/supabaseClient';
import { getApiUrl } from '../utils/apiConfig';
import OrderItem from './PaymentSucess/OrderItem';
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
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${order.status === 'succeeded' || order.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                        <p className="text-lg font-bold text-gray-900 font-inter">£{parseFloat(order.total_amount || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
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
