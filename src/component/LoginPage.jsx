'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseClient } from '../utils/supabaseClient';
import { getApiUrl } from '../utils/apiConfig';
import OrderItem from './PaymentSucess/OrderItem';
import { getOrderDisplayId } from '../utils/paymentsucess/helpers';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

// Helper to format order date (handles both ISO string and timestamp)
const formatOrderDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  
  let date;
  if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput * 1000);
  } else {
    return 'N/A';
  }
  
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState('');
  const [step, setStep] = useState(initialEmail ? 'code' : 'email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const userEmail = localStorage.getItem('userEmail');
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    
    if (loggedInStatus && userEmail) {
      setIsLoggedIn(true);
      setEmail(userEmail);
      fetchUserOrders(userEmail);
    }
    
    if (initialEmail && !loggedInStatus) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(initialEmail)) {
        handleSendCodeAutomatically(initialEmail);
      }
    }
  }, [router, searchParams, initialEmail]);

  const fetchUserOrders = async (userEmail) => {
    setOrdersLoading(true);
    setOrdersError('');

    try {
      if (!userEmail) throw new Error('Email is required to fetch orders');
      const url = getApiUrl(`/get-orders?email=${encodeURIComponent(userEmail)}`);
      const response = await fetch(url);
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('Backend server returned HTML (likely 404). Is the server running on port 3001?');
      }
      const responseText = await response.text();
      if (!responseText || responseText.trim() === '') {
        throw new Error(`Server returned empty response (${response.status}). Check server logs for errors.`);
      }
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Server returned invalid JSON (${response.status}): ${parseError.message}`);
      }
      if (!response.ok) {
        const errorMsg = data?.error || data?.message || `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMsg);
      }
      if (data.success && data.orders !== undefined) {
        setOrders(data.orders || []);
      } else if (data.error) {
        setOrdersError(data.error || 'Failed to load orders');
      } else {
        setOrders(Array.isArray(data) ? data : (data.orders || []));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrdersError(err.message || 'Failed to load your orders. Please try again later.');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSendCodeAutomatically = async (emailToUse) => {
    setLoading(true);
    setError('');
    try {
      if (!supabase) throw new Error('Supabase is not configured. Please check your environment variables.');
      const { data, error } = await supabase.auth.signInWithOtp({ email: emailToUse, options: { emailRedirectTo: null } });
      if (error) {
        setError(error.message || 'Failed to send verification code. Please try again.');
        setLoading(false);
        return;
      }
      setLoading(false);
      setStep('code');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to send verification code. Please try again.');
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email address'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setError('Please enter a valid email address'); return; }
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      if (!supabase) throw new Error('Supabase is not configured. Please check your environment variables.');
      const { data, error } = await supabase.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: null } });
      if (error) {
        setError(error.message || 'Failed to send verification code. Please try again.');
        setLoading(false);
        return;
      }
      setLoading(false);
      setStep('code');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to send verification code. Please try again.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) { setError('Please enter the 6-digit code'); return; }
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      if (!supabase) throw new Error('Supabase is not configured. Please check your environment variables.');
      const { data, error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' });
      if (error) {
        setError(error.message || 'Invalid code. Please try again.');
        setLoading(false);
        return;
      }
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('Failed to get user information. Please try again.');
        setLoading(false);
        return;
      }
      const userEmail = user.email || email;
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', user.id);
      setIsLoggedIn(true);
      setStep('orders');
      await fetchUserOrders(userEmail);
    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setCode('');
    setError('');
    setSuccess(false);
    handleSendCode({ preventDefault: () => {} });
  };

  const handleBackToEmail = () => {
    setStep('email');
    setCode('');
    setError('');
    setSuccess(false);
    router.push('/Login');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setOrders([]);
    setStep('email');
    setEmail('');
    setCode('');
  };

  return (
    <div className="min-h-screen bg-white py-12 md:py-16">
      <div className={`${isLoggedIn ? 'max-w-6xl' : 'max-w-md'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-8">
          <h1 className="text-title md:text-title-lg font-light text-gray-900 mb-2 font-inter tracking-title">
            {isLoggedIn ? 'My Orders' : step === 'email' ? 'Log In' : 'Verify Code'}
          </h1>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          {isLoggedIn && (
            <div className="mb-4">
              <p className="text-gray-600 font-inter">{email}</p>
              <button onClick={handleLogout} className="mt-2 text-sm text-gray-600 hover:text-gray-900 font-light font-inter underline">Sign Out</button>
            </div>
          )}
        </div>

        {success && step === 'code' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-light font-inter">Verification code sent to <strong>{email}</strong></p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-light font-inter">{error}</p>
          </div>
        )}

        {step === 'email' && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2 font-light font-inter">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="your.email@example.com"
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-base"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 text-sm uppercase tracking-wider font-light font-inter bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </button>
            <p className="text-xs text-gray-500 text-center font-light font-inter">By continuing, you agree to our Terms of Use and Privacy Policy.</p>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 font-light font-inter mb-4 text-center">We've sent a 6-digit verification code to <strong>{email}</strong>. Please enter it below.</p>
              <label className="block text-sm text-gray-700 mb-2 font-light font-inter">Verification Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => { const value = e.target.value.replace(/\D/g, '').slice(0, 6); setCode(value); setError(''); }}
                placeholder="000000"
                maxLength={6}
                autoFocus
                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-400 font-light font-inter text-2xl text-center tracking-widest"
                required
              />
            </div>
            <button type="submit" disabled={loading || code.length !== 6} className="w-full px-4 py-3 text-sm uppercase tracking-wider font-light font-inter bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>
            <div className="flex flex-col gap-3">
              <button type="button" onClick={handleResendCode} disabled={loading} className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter underline disabled:opacity-50">Resend Code</button>
              <button type="button" onClick={handleBackToEmail} className="text-sm text-gray-600 hover:text-gray-900 font-light font-inter">← Back to email</button>
            </div>
          </form>
        )}

        {isLoggedIn && (
          <div className="mt-8">
            {ordersLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-4 text-gray-600 font-inter">Loading your orders...</p>
              </div>
            ) : ordersError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-sm text-red-800 font-light font-inter">{ordersError}</p>
                <button onClick={() => fetchUserOrders(email)} className="mt-4 px-6 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter">Try Again</button>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-gray-50 rounded-lg shadow-sm p-8 md:p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 font-inter">No Orders Yet</h2>
                <p className="text-gray-600 mb-6 font-inter">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                <button onClick={() => router.push('/')} className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.order_id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 font-inter">Order #{getOrderDisplayId(order)}</h3>
                          <p className="text-sm text-gray-600 font-inter">Placed on {formatOrderDate(order.order_date)}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${order.status === 'succeeded' || order.status === 'complete' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                          </span>
                          <p className="text-lg font-bold text-gray-900 font-inter">£{parseFloat(order.total_amount).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                          order.items.map((item, index) => <OrderItem key={index} item={item} />)
                        ) : (
                          <p className="text-gray-600 font-inter">No items found in this order.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
