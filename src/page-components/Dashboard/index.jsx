'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Products from '../../data/products.json';
import { getApiUrl } from '../../utils/apiConfig';
import DashboardTabs from '../../component/Dashboard/DashboardTabs';
import InventoryTab from '../../component/Dashboard/InventoryTab';
import OrdersTab from '../../component/Dashboard/OrdersTab';
import { getSupabaseClient } from '../../utils/supabaseClient';

// Get shared Supabase client instance
const supabase = getSupabaseClient();

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState(Products);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [inventorySource, setInventorySource] = useState(null); // 'supabase' or 'default'
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Authorized email address
  const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

  // Helper function to merge quantities into products
  const mergeQuantities = (mergedProducts, quantities) => {
    if (quantities.cases) {
      mergedProducts.cases = mergedProducts.cases.map((caseItem, index) => {
        const updatedCase = {
          ...caseItem,
          quantity:
            quantities.cases[index] !== undefined && quantities.cases[index] !== null
              ? quantities.cases[index]
              : caseItem.quantity,
        };

        if (quantities.caseColors?.[index]) {
          updatedCase.colors = updatedCase.colors.map((colorItem, colorIndex) => ({
            ...colorItem,
            quantity:
              quantities.caseColors[index][colorIndex] !== undefined && 
              quantities.caseColors[index][colorIndex] !== null
                ? quantities.caseColors[index][colorIndex]
                : colorItem.quantity,
          }));
        }

        return updatedCase;
      });
    }

    if (quantities.pins) {
      ['flags', 'colorful', 'bronze'].forEach((category) => {
        if (quantities.pins[category]) {
          mergedProducts.pins[category] =
            mergedProducts.pins[category].map((charm, index) => ({
              ...charm,
              quantity:
                quantities.pins[category][index] !== undefined && 
                quantities.pins[category][index] !== null
                  ? quantities.pins[category][index]
                  : charm.quantity,
            }));
        }
      });
    }
  };

  /* -------------------- LOAD INVENTORY FROM SUPABASE -------------------- */
  // Track if inventory is already being loaded to prevent duplicate fetches (React StrictMode)
  // Use module-level variable that persists across component remounts
  // Initialize window variables safely (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.__dashboardInventoryLoading) {
        window.__dashboardInventoryLoading = false;
        window.__dashboardInventoryLoaded = false;
      }
    }
  }, []);

  useEffect(() => {
    // Skip if running on server
    if (typeof window === 'undefined') return;
    
    // Check if already loading/loaded (using module-level variable to persist across StrictMode)
    if (window.__dashboardInventoryLoading) {
      console.log('⏭️ Dashboard: Already loading (skipping StrictMode duplicate)');
      return;
    }
    
    if (window.__dashboardInventoryLoaded) {
      console.log('⏭️ Dashboard: Already loaded (skipping StrictMode duplicate)');
      return;
    }

    // Set loading flag synchronously BEFORE async operations
    window.__dashboardInventoryLoading = true;
    console.log('🔒 Dashboard: Set loading flag (module-level), starting fetch');
    
    const loadInventory = async () => {
      setLoadingInventory(true);
      console.log('📥 Dashboard: Loading inventory from Supabase...');
      
      // Always try to fetch from Supabase API first (source of truth for deployment)
      // Note: Server uses service role key, so RLS is bypassed. However, we add a small
      // delay to prevent race conditions where requests are made before initialization.
      try {
        // Small delay to ensure backend is ready (prevents race condition with session restoration)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const url = getApiUrl('/api/inventory');
        console.log('📡 Dashboard: Fetching from:', url);
        
        const response = await fetch(url);
        const contentType = response.headers.get('content-type') || '';
        
        // Read body once (fetch body can only be consumed once)
        const rawText = await response.text();
        
        // Try to parse as JSON when content-type says JSON or when we have a non-OK response (server may send JSON errors)
        let data = null;
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(rawText);
          } catch (parseErr) {
            console.error('❌ Dashboard: Response claimed JSON but parse failed:', parseErr);
            throw new Error(`Invalid JSON from API: ${rawText.substring(0, 300)}`);
          }
        } else if (!response.ok && rawText.trim().length > 0) {
          try {
            data = JSON.parse(rawText);
          } catch (_) {
            // Plain text error body - use as message
            data = { error: rawText.substring(0, 500), message: rawText.substring(0, 500) };
          }
        }
        
        if (response.ok && data && data.success && data.inventory) {
          const quantities = {
            cases: data.inventory.cases,
            caseColors: data.inventory.caseColors,
            pins: data.inventory.pins
          };
          
          const mergedProducts = structuredClone(Products);
          mergeQuantities(mergedProducts, quantities);
          setProducts(mergedProducts);
          setInventorySource('supabase');
          
          console.log('✅ Dashboard: Inventory loaded from Supabase inventory_items table');
          if (typeof window !== 'undefined') {
            window.__dashboardInventoryLoaded = true;
            window.__dashboardInventoryLoading = false;
          }
          setLoadingInventory(false);
          return;
        }
        
        if (!response.ok) {
          const errorMessage = (data && (data.error || data.message)) || rawText.substring(0, 500) || `HTTP ${response.status}: ${response.statusText}`;
          console.error('❌ Dashboard: Supabase API returned non-OK response:', response.status, errorMessage);
          if (data) console.error('❌ Dashboard: Error details:', data);
          if (response.status === 500) {
            console.error('❌ Dashboard: Server error - check server console (node server.js) for details');
          }
          // Fallback to default products so UI is not stuck loading
          setProducts(Products);
          setInventorySource('default');
          console.warn('⚠️ Dashboard: Using default quantities from products.json');
        }
        if (typeof window !== 'undefined') {
          window.__dashboardInventoryLoaded = true;
          window.__dashboardInventoryLoading = false;
        }
        setLoadingInventory(false);
      } catch (error) {
        console.error('\n❌ ========== DASHBOARD INVENTORY LOAD ERROR ==========');
        console.error('Failed to load from Supabase:', error.message);
        console.error('Error name:', error.name);
        if (error.stack) {
          console.error('Error stack:', error.stack);
        }
        console.error('========================================================\n');
        
        // Reset loading flag on error so retry is possible
        if (typeof window !== 'undefined') {
          window.__dashboardInventoryLoading = false;
        }
        
        // Use default products.json as fallback (no localStorage)
        setProducts(Products);
        setInventorySource('default');
        console.warn('⚠️ Dashboard: Failed to load from Supabase, using default quantities from products.json');
        if (typeof window !== 'undefined') {
          window.__dashboardInventoryLoaded = true;
          window.__dashboardInventoryLoading = false;
        }
        setLoadingInventory(false);
      }
    };

    loadInventory();
  }, []);

  // Reset loading flags when component unmounts (for navigation away/back)
  useEffect(() => {
    return () => {
      // Don't reset on unmount - keep flags for navigation back
      // Only reset if explicitly needed (e.g., manual refresh)
    };
  }, []);

  /* -------------------- AUTH -------------------- */
  useEffect(() => {
    // First check localStorage email as fallback (works with the login system)
    const userEmailFromStorage = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    const authorizedEmail = AUTHORIZED_EMAIL.toLowerCase().trim();
    
    // Check localStorage first
    if (userEmailFromStorage) {
      const emailFromStorage = userEmailFromStorage.toLowerCase().trim();
      if (emailFromStorage === authorizedEmail) {
        setIsAuthorized(true);
        setAuthReady(true);
        console.log('✅ User authorized via localStorage:', emailFromStorage);
        // Still try to get Supabase user for full auth
        if (supabase) {
          supabase.auth.getUser().then(({ data, error }) => {
            if (!error && data?.user) {
              setUser(data.user);
              console.log('✅ Supabase user also authenticated:', data.user?.id);
            }
          });
        }
        return;
      }
    }

    // If Supabase is available, check Supabase auth (more secure)
    if (!supabase) {
      // Only warn in development to avoid console noise in production
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.warn('⚠️ Supabase client not initialized. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
      }
      // Without Supabase and no matching localStorage email, deny access
      setAuthReady(true);
      setIsAuthorized(false);
      return;
    }

    supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.error('❌ Error getting user:', error);
        // If Supabase fails but localStorage email matches, allow access
        if (userEmailFromStorage) {
          const emailFromStorage = userEmailFromStorage.toLowerCase().trim();
          if (emailFromStorage === authorizedEmail) {
            setIsAuthorized(true);
            setAuthReady(true);
            console.log('✅ User authorized via localStorage (Supabase auth failed)');
            return;
          }
        }
        setAuthReady(true);
        setIsAuthorized(false);
        return;
      }
      
      const authenticatedUser = data.user;
      setUser(authenticatedUser);
      setAuthReady(true);
      
      // Check if user's email matches the authorized email
      const userEmail = authenticatedUser?.email?.toLowerCase().trim();
      
      if (userEmail === authorizedEmail) {
        setIsAuthorized(true);
        console.log('✅ User authenticated and authorized via Supabase:', authenticatedUser?.id);
      } else {
        // Also check localStorage as fallback
        if (userEmailFromStorage) {
          const emailFromStorage = userEmailFromStorage.toLowerCase().trim();
          if (emailFromStorage === authorizedEmail) {
            setIsAuthorized(true);
            console.log('✅ User authorized via localStorage (Supabase email different)');
            return;
          }
        }
        setIsAuthorized(false);
        console.warn('❌ Unauthorized access attempt. User email:', userEmail || userEmailFromStorage);
        console.warn('❌ Authorized email:', authorizedEmail);
      }
    });
  }, []);

  /* -------------------- ORDERS -------------------- */
  useEffect(() => {
    // Only fetch orders if authorized and auth check is complete
    // Note: user might be null if authorized via localStorage, but that's okay for dashboard
    if (!authReady || !isAuthorized) return;
    if (activeTab === 'orders') {
      // Pass user.id if available, otherwise null (dashboard shows all orders anyway)
      fetchOrders(user?.id || null);
    }
  }, [activeTab, authReady, isAuthorized, user]);

  const fetchOrders = async (userId = null) => {
    setLoadingOrders(true);
    setOrdersError(null);

    try {
      // Small delay to ensure backend is ready (prevents race condition with session restoration)
      // This prevents 500 errors from RLS checks when Supabase session hasn't fully restored
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Fetch ALL orders from all emails (no email filter for dashboard)
      const url = getApiUrl('/get-orders?limit=100');
      console.log('📡 Fetching all orders from:', url);
      console.log('📊 Dashboard: Fetching all orders (no email filter)');
      if (userId) {
        console.log('👤 User ID:', userId);
      } else {
        console.log('📊 Fetching orders without user ID (showing all orders)');
      }
      
      const res = await fetch(url);
      
      // Check if response is HTML (404 page from dev server) instead of JSON
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        throw new Error('Backend server returned HTML (likely 404). Is the server running on port 3001?');
      }
      
      // Check if response has content before trying to parse JSON
      const responseText = await res.text();
      
      if (!responseText || responseText.trim() === '') {
        console.error('❌ Empty response received. Status:', res.status, res.statusText);
        console.error('❌ Response headers:', Object.fromEntries(res.headers.entries()));
        throw new Error('Server returned empty response. Check server logs for errors. Make sure the backend server is running on port 3001.');
      }
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('❌ Response status:', res.status, res.statusText);
        console.error('❌ Response text (first 500 chars):', responseText.substring(0, 500));
        throw new Error(`Server returned invalid JSON: ${parseError.message}. Response: ${responseText.substring(0, 200)}`);
      }

      if (!res.ok) {
        const errorMsg = data?.error || data?.message || `Server error: ${res.status} ${res.statusText}`;
        console.error('❌ Server error response:', { status: res.status, error: errorMsg, data });
        throw new Error(errorMsg);
      }

      if (data.success) {
        setOrders(data.orders || []);
        console.log(`✅ Loaded ${data.orders?.length || 0} orders from Supabase`);
      } else {
        const errorMsg = data.error || data.message || 'Failed to fetch orders';
        console.error('❌ API returned success=false:', errorMsg);
        setOrdersError(errorMsg);
      }
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Provide more helpful error messages
      let errorMessage = error.message || 'Failed to fetch orders.';
      if (error.message?.includes('HTML') || error.message?.includes('404')) {
        errorMessage = 'Backend server not reachable. Make sure the server is running: npm run server';
      } else if (error.message?.includes('empty response')) {
        errorMessage = 'Server returned empty response. Check if the backend server is running on port 3001.';
      }
      
      setOrdersError(errorMessage);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateQuantity = (type, index, category, value, colorIndex = null) => {
    const next = structuredClone(products);

    if (type === 'case') {
      if (colorIndex !== null) {
        next.cases[index].colors[colorIndex].quantity = parseInt(value) || 0;
      } else {
        next.cases[index].quantity = parseInt(value) || 0;
      }
    }

    if (type === 'charm') {
      next.pins[category][index].quantity = parseInt(value) || 0;
    }

    setProducts(next);
    setSaved(false);
  };

  const saveQuantities = async () => {
    const payload = {
      cases: products.cases.map((c) => c.quantity ?? null),
      caseColors: products.cases.map((c) =>
        c.colors?.map((col) => col.quantity ?? null)
      ),
      pins: {
        flags: products.pins.flags.map((c) => c.quantity ?? null),
        colorful: products.pins.colorful.map((c) => c.quantity ?? null),
        bronze: products.pins.bronze.map((c) => c.quantity ?? null),
      },
    };

    // Save to Supabase API
    try {
      const response = await fetch(getApiUrl('/api/inventory'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if response is JSON (if not, likely a 404 HTML page from dev server)
      const contentType = response.headers.get('content-type') || '';
      
      // Read response body once - either as text or JSON
      let data;
      if (!contentType.includes('application/json')) {
        // Response is not JSON, read as text to see what we got
        let responseText = '';
        try {
          responseText = await response.text();
        } catch (e) {
          responseText = 'Could not read response body';
        }
        
        const errorMsg = contentType.includes('text/html') || contentType.includes('text/plain')
          ? `Backend server returned ${contentType} instead of JSON. This usually means:\n1. The backend server is not running (start with: npm run server)\n2. The proxy is not configured correctly\n3. The endpoint does not exist\n\nResponse preview: ${responseText.substring(0, 200)}`
          : `Server returned non-JSON response (${contentType || 'unknown'}). Make sure the backend server is running on port 3001.\n\nResponse preview: ${responseText.substring(0, 200)}`;
        console.error('❌ Error saving inventory:', errorMsg);
        console.error('❌ Full response text:', responseText);
        throw new Error(`Server returned non-JSON response (${contentType}). Make sure the backend server is running on port 3001.`);
      } else {
        // Response is JSON, parse it
        try {
          data = await response.json();
        } catch (e) {
          console.error('❌ Failed to parse JSON response:', e);
          throw new Error('Server returned invalid JSON response. Make sure the backend server is running on port 3001.');
        }
      }

      if (response.ok) {
        console.log('✅ Inventory saved to Supabase:', data);
        console.log(`📊 Saved ${data.updatedCount || 0} items to inventory_items table`);
        console.log('💾 All inventory data is now persisted in Supabase and will be available after deployment');
        
        // Verify the save was successful
        if (data.success && data.updatedCount > 0) {
          console.log('✅ Verification: Inventory successfully saved to Supabase database');
          console.log('✅ This data will persist after deployment');
          
          // Update the displayed quantities to reflect what was saved
          const quantities = {
            cases: payload.cases,
            caseColors: payload.caseColors,
            pins: payload.pins
          };
          
          // Merge with products to update display
          const mergedProducts = structuredClone(Products);
          mergeQuantities(mergedProducts, quantities);
          setProducts(mergedProducts);
          
          // Mark as loaded from Supabase
          setInventorySource('supabase');
          
          // Broadcast inventory update event so other pages can refresh their cache
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('inventoryUpdated', {
              detail: { 
                timestamp: Date.now(),
                updatedCount: data.updatedCount 
              }
            }));
            console.log('📢 Broadcasted inventoryUpdated event to refresh other pages');
          }
        }
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000); // Show saved message longer
      } else {
        let errorMessage = 'Unknown error';
        try {
          const error = await response.json();
          errorMessage = error.error || error.message || 'Unknown error';
        } catch (e) {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        console.error('Failed to save inventory to Supabase:', errorMessage);
        alert(`Failed to save to Supabase: ${errorMessage}`);
        setSaved(false);
      }
    } catch (error) {
      console.error('Error saving inventory to Supabase:', error);
      const errorMsg = error.message || 'Unknown error';
      
      // Provide helpful troubleshooting message
      const troubleshootingMsg = errorMsg.includes('HTML') || errorMsg.includes('404')
        ? `Error: Backend server not reachable.\n\nTroubleshooting steps:\n1. Check if backend server is running: npm run server\n2. Verify server is on port 3001\n3. Restart React dev server if you just configured proxy\n4. Check setupProxy.js is in src/ directory`
        : `Error saving to Supabase: ${errorMsg}`;
      
      alert(troubleshootingMsg);
      setSaved(false);
    }
  };

  /* -------------------- UI -------------------- */
  const handleRefresh = async () => {
    setLoadingInventory(true);
    setInventorySource(null);
    // Force reload from Supabase
    try {
      const response = await fetch(getApiUrl('/api/inventory'));
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.inventory) {
          const quantities = {
            cases: data.inventory.cases,
            caseColors: data.inventory.caseColors,
            pins: data.inventory.pins
          };
          const mergedProducts = structuredClone(Products);
          mergeQuantities(mergedProducts, quantities);
          setProducts(mergedProducts);
          setInventorySource('supabase');
          console.log('✅ Refreshed: Inventory reloaded from Supabase');
        }
      }
    } catch (error) {
      console.error('Failed to refresh from Supabase:', error);
    } finally {
      setLoadingInventory(false);
    }
  };

  // Show loading state while checking authorization
  if (!authReady) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600 font-inter">Checking authorization...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized message if user is not authorized
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6 font-inter">
              You do not have permission to access the dashboard. This area is restricted to authorized personnel only.
            </p>
            {user?.email && (
              <p className="text-sm text-gray-500 mb-6 font-inter">
                Your email: <span className="font-medium">{user.email}</span>
              </p>
            )}
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-md transition-colors font-inter"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-3xl font-light mb-6 font-inter">Dashboard</h1>

        {/* Tabs */}
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ---------------- INVENTORY ---------------- */}
        {activeTab === 'inventory' && (
          <InventoryTab
            products={products}
            inventorySource={inventorySource}
            loadingInventory={loadingInventory}
            saved={saved}
            onRefresh={handleRefresh}
            onSave={saveQuantities}
            onQuantityChange={updateQuantity}
          />
        )}

        {/* ---------------- ORDERS ---------------- */}
        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            loadingOrders={loadingOrders}
            ordersError={ordersError}
            onRefresh={() => isAuthorized && fetchOrders(user?.id || null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
