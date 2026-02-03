# Why Inventory Updates Don't Show Immediately

## 🔍 The Problem

When you update inventory in the Dashboard, it saves to Supabase immediately. However, the **Passport Cases page uses a 5-minute cache**, so changes don't appear instantly.

## 📊 Current Flow

```
Dashboard saves → Supabase updated ✅
                    ↓
Passport Cases page → Checks localStorage cache
                    ↓
Cache is < 5 minutes old → Uses cached data ❌
                    ↓
Shows OLD inventory (not updated)
```

## 🐛 Root Cause

**File**: `src/utils/inventory.js` (line 143)

```javascript
const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 5 * 60 * 1000; // 5 minutes

if (savedQuantities && isRecent) {
  return; // Already initialized and recent - SKIPS REFRESH
}
```

The cache check only refreshes if:
- Cache doesn't exist
- Cache is older than 5 minutes
- Page is manually refreshed

**Problem**: `getMaxAvailableQuantity()` reads from cache without checking if Supabase was updated.

## ✅ Immediate Solutions

### Solution 1: Clear Cache Manually (Quick Fix)

After updating Dashboard, clear the cache in browser console:

```javascript
// Open browser console (F12) and run:
localStorage.removeItem('productQuantities');
localStorage.removeItem('productQuantitiesTimestamp');

// Then refresh the Passport Cases page
```

### Solution 2: Reduce Cache Time (Temporary Fix)

**File**: `src/utils/inventory.js` (line 143)

Change from 5 minutes to 30 seconds:

```javascript
// OLD:
const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 5 * 60 * 1000; // 5 minutes

// NEW:
const isRecent = timestamp && (Date.now() - parseInt(timestamp)) < 30 * 1000; // 30 seconds
```

**Trade-off**: More API calls, but faster updates.

### Solution 3: Add Refresh Button (User-Friendly)

Add a "Refresh Inventory" button to the Passport Cases page that calls `refreshInventoryFromSupabase()`.

---

## 🚀 Better Solution: Force Refresh on Page Focus

Add automatic refresh when user returns to the page after Dashboard update:

### Implementation

**File**: `src/pages/PassportCases/index.jsx`

Add this useEffect to refresh inventory when page becomes visible:

```javascript
import { refreshInventoryFromSupabase } from '../../utils/inventory';

// Add this useEffect in the PassportCases component
useEffect(() => {
  const handleVisibilityChange = async () => {
    // When user switches back to this tab/window
    if (document.visibilityState === 'visible') {
      // Check if cache is recent (less than 1 minute old)
      const timestamp = localStorage.getItem('productQuantitiesTimestamp');
      if (timestamp) {
        const cacheAge = Date.now() - parseInt(timestamp);
        // If cache is less than 1 minute old, it might be stale after Dashboard update
        // Refresh to get latest data
        if (cacheAge < 60 * 1000) {
          await refreshInventoryFromSupabase();
          // Force component re-render by updating a state
          // (You might need to add a state for this)
        }
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);
```

---

## 🎯 Best Solution: Check Cache Age in getMaxAvailableQuantity

Modify `getMaxAvailableQuantity()` to check cache age and refresh if needed:

**File**: `src/utils/inventory.js`

```javascript
export const getMaxAvailableQuantity = (item, cart) => {
  // Check cache age
  const savedQuantities = localStorage.getItem('productQuantities');
  const timestamp = localStorage.getItem('productQuantitiesTimestamp');
  
  if (savedQuantities && timestamp) {
    const cacheAge = Date.now() - parseInt(timestamp);
    const isRecent = cacheAge < 5 * 60 * 1000; // 5 minutes
    
    if (isRecent) {
      // Cache is recent, use it
      let quantities = JSON.parse(savedQuantities);
      // ... rest of existing code
    } else {
      // Cache is stale, refresh in background
      initializeQuantities(); // Will update cache
      // Still use old cache for now to avoid blocking
      let quantities = JSON.parse(savedQuantities);
      // ... rest of existing code
    }
  } else {
    // No cache, fetch from Supabase
    initializeQuantities();
    return null; // Return unlimited until data loads
  }
  
  // ... rest of function
};
```

---

## 🔧 Recommended Fix: Add Cache Invalidation on Dashboard Save

When Dashboard saves successfully, broadcast an event that other pages can listen to:

### Step 1: Dashboard broadcasts event after save

**File**: `src/pages/Dashboard/index.jsx` (in `saveQuantities` function)

```javascript
// After successful save (around line 489)
if (data.success && data.updatedCount > 0) {
  // ... existing code ...
  
  // Broadcast inventory update event
  window.dispatchEvent(new CustomEvent('inventoryUpdated', {
    detail: { timestamp: Date.now() }
  }));
  
  setSaved(true);
}
```

### Step 2: Passport Cases listens for event

**File**: `src/pages/PassportCases/index.jsx`

```javascript
import { refreshInventoryFromSupabase } from '../../utils/inventory';

// Add this useEffect
useEffect(() => {
  const handleInventoryUpdate = async () => {
    console.log('🔄 Inventory updated in Dashboard, refreshing cache...');
    await refreshInventoryFromSupabase();
    // Force re-render if needed
    window.location.reload(); // Or use state update
  };

  window.addEventListener('inventoryUpdated', handleInventoryUpdate);
  
  return () => {
    window.removeEventListener('inventoryUpdated', handleInventoryUpdate);
  };
}, []);
```

**Note**: This only works if Dashboard and Passport Cases are open in the same browser (same window/tab or different tabs).

---

## 📝 Quick Reference

### Current Behavior:
- ✅ Dashboard saves to Supabase immediately
- ❌ Passport Cases uses 5-minute cache
- ❌ Changes don't show until cache expires or page refreshes

### Quick Fixes:
1. **Manual**: Clear localStorage after Dashboard update
2. **Reduce cache**: Change 5 minutes to 30 seconds
3. **Add refresh button**: Let users manually refresh

### Better Solutions:
1. **Event-based**: Dashboard broadcasts, Passport Cases listens
2. **Visibility check**: Refresh when page becomes visible
3. **Cache age check**: Check cache age in `getMaxAvailableQuantity()`

---

## 🎯 Recommended Implementation

**Best approach**: Combine event-based updates with cache age checking:

1. Dashboard broadcasts `inventoryUpdated` event after save
2. Passport Cases listens and refreshes cache
3. Fallback: Check cache age on page focus/visibility change
4. Keep 5-minute cache for performance, but allow forced refresh

This gives:
- ✅ Immediate updates when Dashboard and Passport Cases are both open
- ✅ Automatic refresh when user returns to page
- ✅ Performance benefits of caching
- ✅ No unnecessary API calls
