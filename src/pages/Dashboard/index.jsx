import React, { useState, useEffect } from 'react';
import Products from '../../data/products.json';
import { getApiUrl } from '../../utils/apiConfig';
import DashboardTabs from '../../component/Dashboard/DashboardTabs';
import InventoryTab from '../../component/Dashboard/InventoryTab';
import OrdersTab from '../../component/Dashboard/OrdersTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [products, setProducts] = useState(Products);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [inventorySource, setInventorySource] = useState(null); // 'supabase', 'localStorage', or 'default'

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
  useEffect(() => {
    const loadInventory = async () => {
      setLoadingInventory(true);
      console.log('📥 Dashboard: Loading inventory from Supabase...');
      
      // Always try to fetch from Supabase API first (source of truth for deployment)
      try {
        const response = await fetch(getApiUrl('/api/inventory'));
        
        // Check if response is HTML (404 page from dev server) instead of JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
          console.warn('⚠️ Dashboard: Received HTML response instead of JSON. Backend server may not be running or proxy not configured correctly.');
          console.warn('⚠️ Dashboard: Make sure backend server is running: npm run server');
          console.warn('⚠️ Dashboard: Falling back to localStorage cache');
          throw new Error('Backend server returned HTML (likely 404). Is the server running on port 3001?');
        }
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.inventory) {
            const quantities = {
              cases: data.inventory.cases,
              caseColors: data.inventory.caseColors,
              pins: data.inventory.pins
            };
            
            // Cache in localStorage as backup
            localStorage.setItem('productQuantities', JSON.stringify(quantities));
            localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
            
            // Merge with products
            const mergedProducts = structuredClone(Products);
            mergeQuantities(mergedProducts, quantities);
            setProducts(mergedProducts);
            setInventorySource('supabase');
            
            console.log('✅ Dashboard: Inventory loaded from Supabase inventory_items table');
            console.log('✅ Dashboard: All saved quantities are now displayed');
            console.log('💾 Dashboard: Data source: Supabase (persisted, will be available after deployment)');
            setLoadingInventory(false);
            return;
          }
        } else {
          console.warn('⚠️ Dashboard: Supabase API returned non-OK response:', response.status);
          // Try to parse error response
          try {
            const errorData = await response.json();
            console.warn('⚠️ Dashboard: Error details:', errorData);
          } catch (e) {
            // Not JSON, probably HTML 404 page
            console.warn('⚠️ Dashboard: Non-JSON error response received');
          }
        }
      } catch (error) {
        console.warn('⚠️ Dashboard: Failed to load from Supabase:', error.message);
        console.warn('⚠️ Dashboard: Falling back to localStorage cache');
      }

      // Fallback to localStorage (cached data)
      const savedQuantities = localStorage.getItem('productQuantities');
      if (savedQuantities) {
        try {
          const quantities = JSON.parse(savedQuantities);
          const mergedProducts = structuredClone(Products);
          mergeQuantities(mergedProducts, quantities);
          setProducts(mergedProducts);
          setInventorySource('localStorage');
          console.log('⚠️ Dashboard: Using cached data from localStorage (Supabase unavailable)');
          setLoadingInventory(false);
          return;
        } catch (err) {
          console.error('❌ Dashboard: Error parsing localStorage data:', err);
        }
      }

      // Final fallback: use products.json defaults
      setProducts(Products);
      setInventorySource('default');
      console.log('⚠️ Dashboard: Using default quantities from products.json (no saved data found)');
      setLoadingInventory(false);
    };

    loadInventory();
  }, []);

  /* -------------------- ORDERS -------------------- */
  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setOrdersError(null);

    try {
      const res = await fetch(getApiUrl('/get-orders?limit=100'));
      const data = await res.json();

      if (data.success) setOrders(data.orders || []);
      else setOrdersError(data.error || 'Failed to fetch orders');
    } catch {
      setOrdersError('Failed to fetch orders.');
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
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const errorMsg = contentType?.includes('text/html') 
          ? 'Backend server returned HTML (likely 404). Make sure the backend server is running on port 3001 (npm run server) and the proxy is configured correctly.'
          : `Server returned non-JSON response (${contentType}). Make sure the backend server is running on port 3001.`;
        console.error('❌ Error saving inventory:', errorMsg);
        throw new Error(errorMsg);
      }

      if (response.ok) {
        const data = await response.json();
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
        }
        
        // Also save to localStorage as cache (backup only - Supabase is source of truth)
        localStorage.setItem('productQuantities', JSON.stringify(payload));
        localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
        
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
        alert(`Failed to save to Supabase: ${errorMessage}. Falling back to localStorage.`);
        
        // Fallback to localStorage
        localStorage.setItem('productQuantities', JSON.stringify(payload));
        localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error('Error saving inventory to Supabase:', error);
      const errorMsg = error.message || 'Unknown error';
      
      // Provide helpful troubleshooting message
      const troubleshootingMsg = errorMsg.includes('HTML') || errorMsg.includes('404')
        ? `Error: Backend server not reachable.\n\nTroubleshooting steps:\n1. Check if backend server is running: npm run server\n2. Verify server is on port 3001\n3. Restart React dev server if you just configured proxy\n4. Check setupProxy.js is in src/ directory\n\nFalling back to localStorage for now.`
        : `Error saving to Supabase: ${errorMsg}\n\nFalling back to localStorage.`;
      
      alert(troubleshootingMsg);
      
      // Fallback to localStorage
      localStorage.setItem('productQuantities', JSON.stringify(payload));
      localStorage.setItem('productQuantitiesTimestamp', Date.now().toString());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
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
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
