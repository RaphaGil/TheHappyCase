'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/utils/supabaseClient';
import { getApiUrl } from '@/utils/apiConfig';
import Products from '@/data/products.json';
import DashboardTabs from './DashboardTabs';
import InventoryTab from './InventoryTab';
import OrdersTab from './OrdersTab';

const AUTHORIZED_EMAIL = 'thehappycase.shop@gmail.com';

function mergeInventoryWithProducts(products, inventory) {
  if (!inventory) return products;
  const merged = JSON.parse(JSON.stringify(products));
  if (inventory.caseColors) {
    merged.cases = merged.cases.map((caseItem, caseIndex) => {
      const updated = { ...caseItem };
      if (inventory.caseColors[caseIndex] && Array.isArray(caseItem.colors)) {
        updated.colors = caseItem.colors.map((color, colorIndex) => ({
          ...color,
          quantity: inventory.caseColors[caseIndex][colorIndex] ?? color.quantity,
        }));
      }
      if (inventory.cases && inventory.cases[caseIndex] !== undefined && inventory.cases[caseIndex] !== null) {
        updated.quantity = inventory.cases[caseIndex];
      }
      return updated;
    });
  }
  if (inventory.pins) {
    merged.pins = {
      flags: (merged.pins?.flags || []).map((p, i) => ({
        ...p,
        image: p.src || p.image,
        quantity: inventory.pins?.flags?.[i] ?? p.quantity,
      })),
      colorful: (merged.pins?.colorful || []).map((p, i) => ({
        ...p,
        image: p.src || p.image,
        quantity: inventory.pins?.colorful?.[i] ?? p.quantity,
      })),
      bronze: (merged.pins?.bronze || []).map((p, i) => ({
        ...p,
        image: p.src || p.image,
        quantity: inventory.pins?.bronze?.[i] ?? p.quantity,
      })),
    };
  }
  return merged;
}

function buildInventoryPayload(products) {
  const cases = products.cases.map((c) => c.quantity ?? null);
  const caseColors = products.cases.map((c) =>
    (c.colors || []).map((col) => (col.quantity !== undefined && col.quantity !== null ? col.quantity : null))
  );
  const pins = {
    flags: (products.pins?.flags || []).map((p) => p.quantity ?? null),
    colorful: (products.pins?.colorful || []).map((p) => p.quantity ?? null),
    bronze: (products.pins?.bronze || []).map((p) => p.quantity ?? null),
  };
  return { cases, caseColors, pins };
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inventory');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [products, setProducts] = useState(mergeInventoryWithProducts(Products, null));
  const [inventorySource, setInventorySource] = useState(null);
  const [loadingInventory, setLoadingInventory] = useState(true);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');

  const fetchInventory = useCallback(async () => {
    setLoadingInventory(true);
    try {
      const res = await fetch(getApiUrl('/api/inventory'));
      const data = await res.json();
      if (res.ok && data.success && data.inventory) {
        setProducts(mergeInventoryWithProducts(Products, data.inventory));
        setInventorySource('supabase');
      } else {
        setInventorySource(null);
      }
    } catch (err) {
      console.error('Dashboard: fetch inventory error', err);
      setInventorySource(null);
    } finally {
      setLoadingInventory(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true);
    setOrdersError('');
    try {
      const res = await fetch(getApiUrl('/get-orders'));
      const data = await res.json();
      if (res.ok && data.success && data.orders) {
        setOrders(data.orders);
      } else {
        setOrdersError(data?.error || 'Failed to load orders');
      }
    } catch (err) {
      setOrdersError(err.message || 'Failed to load orders');
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setCheckingAuth(false);
      setIsAuthorized(false);
      return;
    }
    supabase.auth.getUser().then(({ data, error }) => {
      setCheckingAuth(false);
      if (error || !data?.user) {
        router.push('/login?redirect=/dashboard');
        return;
      }
      const email = (data.user?.email || '').toLowerCase().trim();
      if (email !== AUTHORIZED_EMAIL.toLowerCase().trim()) {
        router.push('/login?redirect=/dashboard');
        return;
      }
      setIsAuthorized(true);
    });
  }, [router]);

  useEffect(() => {
    if (isAuthorized) {
      fetchInventory();
      fetchOrders();
    }
  }, [isAuthorized, fetchInventory, fetchOrders]);

  const handleQuantityChange = useCallback((type, index, category, value, colorIndex) => {
    setSaved(false);
    setProducts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      if (type === 'case') {
        if (colorIndex !== undefined && colorIndex !== null) {
          const qty = value === '' ? null : parseInt(value, 10);
          if (!isNaN(qty) || value === '') {
            next.cases[index].colors[colorIndex].quantity = value === '' ? null : qty;
          }
        } else {
          const qty = value === '' ? null : parseInt(value, 10);
          if (!isNaN(qty) || value === '') {
            next.cases[index].quantity = value === '' ? null : qty;
          }
        }
      } else if (type === 'charm' && category) {
        const qty = value === '' ? null : parseInt(value, 10);
        if (!isNaN(qty) || value === '') {
          next.pins[category][index].quantity = value === '' ? null : qty;
        }
      }
      return next;
    });
  }, []);

  const handleSave = useCallback(async () => {
    setLoadingInventory(true);
    try {
      const payload = buildInventoryPayload(products);
      const res = await fetch(getApiUrl('/api/inventory'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaved(true);
      } else {
        console.error('Save failed:', data);
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoadingInventory(false);
    }
  }, [products]);

  if (checkingAuth || !isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-inter">Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 font-inter">Dashboard</h1>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900 font-inter"
          >
            ← Back to Home
          </Link>
        </div>

        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'inventory' && (
          <InventoryTab
            products={products}
            inventorySource={inventorySource}
            loadingInventory={loadingInventory}
            saved={saved}
            onRefresh={fetchInventory}
            onSave={handleSave}
            onQuantityChange={handleQuantityChange}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersTab
            orders={orders}
            loadingOrders={loadingOrders}
            ordersError={ordersError}
            onRefresh={fetchOrders}
          />
        )}
      </div>
    </div>
  );
}
