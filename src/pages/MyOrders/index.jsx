import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { getApiUrl } from '../../utils/apiConfig';
import OrderItem from '../../component/PaymentSucess/OrderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

// Helper to format order date (handles both ISO string and timestamp)
const formatOrderDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  
  let date;
  if (typeof dateInput === 'string') {
    // If it's an ISO string from Supabase
    date = new Date(dateInput);
  } else if (typeof dateInput === 'number') {
    // If it's a Unix timestamp (in seconds)
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

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn || !userEmail) {
      // Redirect to login with return path
      navigate('/login?redirect=/my-orders');
      return;
    }

    // Check if user is authorized for dashboard access
    // First check localStorage email as fallback
    const emailFromStorage = userEmail?.toLowerCase().trim();
    const authorizedEmail = AUTHORIZED_EMAIL.toLowerCase().trim();
    
    if (emailFromStorage === authorizedEmail) {
      setIsAuthorized(true);
    }

    // Get user ID from Supabase auth if available
    if (supabase) {
      supabase.auth.getUser().then(({ data, error }) => {
        if (!error && data?.user) {
          const email = data.user?.email?.toLowerCase().trim();
          setIsAuthorized(email === authorizedEmail);
          
          // Set user ID for filtering orders
          if (data.user?.id) {
            setUserId(data.user.id);
            // Fetch orders with user_id
            fetchUserOrders(data.user.id, userEmail);
          } else {
            // Fallback to email if no user ID
            fetchUserOrders(null, userEmail);
          }
        } else {
          // If Supabase auth fails, fall back to email filtering
          fetchUserOrders(null, userEmail);
        }
      });
    } else {
      // No Supabase, use email filtering
      fetchUserOrders(null, userEmail);
    }
  }, [navigate]);

  const fetchUserOrders = async (userId = null, email = null) => {
    setLoading(true);
    setError('');

    try {
      // Prefer user_id if available, otherwise use email
      let url;
      if (userId) {
        url = getApiUrl(`/get-orders?user_id=${encodeURIComponent(userId)}`);
        console.log('📡 Fetching orders by user_id:', userId);
      } else if (email) {
        url = getApiUrl(`/get-orders?email=${encodeURIComponent(email)}`);
        console.log('📡 Fetching orders by email:', email);
      } else {
        throw new Error('No user_id or email provided');
      }
      
      console.log('📡 Fetching orders from:', url);
      
      const response = await fetch(url);
      
      // Check if response is HTML (404 page from dev server) instead of JSON
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('Backend server returned HTML (likely 404). Is the server running on port 3001?');
      }
      
      // Get response text first (can be used for both JSON and plain text)
      const responseText = await response.text();
      
      // Check if response is empty
      if (!responseText || responseText.trim() === '') {
        console.error('❌ Empty response received. Status:', response.status, response.statusText);
        console.error('❌ Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(`Server returned empty response (${response.status}). Check server logs for errors. Make sure the backend server is running on port 3001.`);
      }
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        // If not JSON, use text as error message
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('❌ Response status:', response.status, response.statusText);
        console.error('❌ Response text (first 500 chars):', responseText.substring(0, 500));
        throw new Error(`Server returned invalid JSON (${response.status}): ${parseError.message}. Response: ${responseText.substring(0, 200)}`);
      }
      
      if (!response.ok) {
        // Server returned an error response
        console.error('❌ Server error response:', { status: response.status, data });
        const errorMsg = data?.error || data?.message || `Server error: ${response.status} ${response.statusText}`;
        throw new Error(errorMsg);
      }
      
      if (data.success && data.orders !== undefined) {
        setOrders(data.orders || []);
      } else if (data.error) {
        setError(data.error || 'Failed to load orders');
      } else {
        // Fallback: if response structure is different, try to use data directly
        setOrders(Array.isArray(data) ? data : (data.orders || []));
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to load your orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId'); // Clear user ID
    navigate('/login');
  };

  const userEmail = localStorage.getItem('userEmail');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600 font-inter">Loading your orders...</p>
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
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
              Error Loading Orders
            </h2>
            <p className="text-gray-600 mb-6 font-inter">{error}</p>
            <button
              onClick={() => fetchUserOrders(userEmail)}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                My Orders
              </h1>
              <p className="text-gray-600 font-inter">
                {userEmail}
              </p>
            </div>
            <div className="flex items-center gap-3 self-start">
              {isAuthorized && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-sm text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors font-inter flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                  Dashboard
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-inter"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6 font-inter">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.order_id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1 font-inter">
                        Order #{order.order_id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600 font-inter">
                        Placed on {formatOrderDate(order.order_date)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold font-inter ${
                          order.status === 'succeeded' || order.status === 'complete'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-900 font-inter">
                        £{parseFloat(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  {order.items && Array.isArray(order.items) && order.items.length > 0 ? (
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <OrderItem key={index} item={item} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 font-inter">No items found in this order.</p>
                  )}

                  {/* Tracking Information */}
                  {order.metadata?.dispatched && (order.tracking?.tracking_number || order.tracking?.tracking_link) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 font-inter flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tracking Information
                      </h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                        {order.tracking?.tracking_number && (
                          <div className="text-sm font-inter">
                            <span className="font-semibold text-gray-700">Tracking Number:</span>{' '}
                            <span className="text-gray-900 font-mono">{order.tracking.tracking_number}</span>
                          </div>
                        )}
                        {order.tracking?.tracking_link && (
                          <div className="text-sm font-inter">
                            <a
                              href={order.tracking.tracking_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline font-medium"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Track Your Package
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Shipping Address */}
                  {order.shipping_address && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 font-inter">Shipping Address</h4>
                      <div className="text-sm text-gray-600 font-inter">
                        {order.customer_name && <p>{order.customer_name}</p>}
                        {order.shipping_address.line1 && <p>{order.shipping_address.line1}</p>}
                        {order.shipping_address.line2 && <p>{order.shipping_address.line2}</p>}
                        <p>
                          {order.shipping_address.city}
                          {order.shipping_address.postal_code && ` ${order.shipping_address.postal_code}`}
                        </p>
                        {order.shipping_address.country && <p>{order.shipping_address.country}</p>}
                      </div>
                    </div>
                  )}

                  {/* Refund Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowRefundModal(true)}
                      className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-inter"
                    >
                      Request Refund
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refund Policy Modal */}
        {showRefundModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                  Refund Policy
                </h3>
                <div className="w-12 h-px bg-gray-300 mb-4"></div>
              </div>
              
              <div className="mb-6">
               
                <p className="text-gray-700 mt-4 mb-4 leading-relaxed font-inter">
                  If you find there is an issue with your item, please contact us at{' '}
                  <a 
                    href="mailto:thehappycase.shop@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline font-inter"
                  >
                    thehappycase.shop@gmail.com
                  </a>
                  . Please allow us to reply in 5 working days and we will do our best to assist you.
                </p>
                <p className="text-gray-700 leading-relaxed font-inter">
                  Please note that there is no returns or refunds for customised products. We only offer returns/refunds if there has been a fault on our end. This is due to our stock being made-to-order.
                </p>
                <p className="text-gray-700 mt-3 font-semibold font-inter">
                  Thanks for understanding!
                </p>
              </div>

              <button
                onClick={() => setShowRefundModal(false)}
                className="w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter"
              >
                Understood
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
