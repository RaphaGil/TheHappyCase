'use client';

import { useState, useEffect } from 'react';
import { initializeQuantities, getCachedInventory } from '../utils/inventory';

export function useInventoryReady() {
  const [isReady, setIsReady] = useState(() => (typeof window !== 'undefined' && getCachedInventory() != null));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (getCachedInventory() != null) {
      setIsReady(true);
      return;
    }
    const handler = () => setIsReady(true);
    window.addEventListener('inventoryCacheUpdated', handler);
    window.addEventListener('inventoryUpdated', handler);
    initializeQuantities().then(() => getCachedInventory() != null && setIsReady(true));
    return () => {
      window.removeEventListener('inventoryCacheUpdated', handler);
      window.removeEventListener('inventoryUpdated', handler);
    };
  }, []);

  return isReady;
}
