# Debugging Inventory Cache Issues

## 🔍 Problem: Light Pink Still Shows "Sold Out"

If Light Pink (or any color) still shows as "Sold Out" after updating in Dashboard/Supabase, follow these steps:

---

## ✅ Quick Fix: Clear Cache and Refresh

### Option 1: Clear Cache in Browser Console

1. Open the Passport Cases page
2. Open browser console (F12 or Cmd+Option+I)
3. Run this command:
```javascript
localStorage.removeItem('productQuantities');
localStorage.removeItem('productQuantitiesTimestamp');
location.reload();
```

### Option 2: Hard Refresh Page

- **Chrome/Edge**: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Firefox**: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- **Safari**: `Cmd+Option+R` (Mac)

---

## 🔍 Debug: Check What's in Cache

Open browser console and run:

```javascript
// Check cached inventory data
const cache = localStorage.getItem('productQuantities');
const timestamp = localStorage.getItem('productQuantitiesTimestamp');
const age = timestamp ? Math.round((Date.now() - parseInt(timestamp)) / 1000) : 'N/A';

console.log('📦 Cached Inventory:', JSON.parse(cache || '{}'));
console.log('⏰ Cache Age:', age, 'seconds');
console.log('🕐 Cache Timestamp:', timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'N/A');
```

### Check Specific Color (Light Pink)

```javascript
const cache = JSON.parse(localStorage.getItem('productQuantities') || '{}');
const Products = /* You'll need to import this or check products.json */;

// Find Economy case index
const economyIndex = 0; // Usually Economy is first
const lightPinkColor = '#f49f90';

// Check caseColors array
if (cache.caseColors && cache.caseColors[economyIndex]) {
  const colorIndex = /* Find index of light pink in Products.cases[0].colors */;
  const qty = cache.caseColors[economyIndex][colorIndex];
  console.log('🔍 Light Pink Quantity in Cache:', qty);
}
```

---

## 🐛 Debug: Check Console Logs

After the recent update, the code now logs debug information for Light Pink:

1. Open browser console
2. Navigate to Passport Cases page
3. Select Light Pink color
4. Look for logs like:
   ```
   🔍 [DEBUG] Light Pink inventory check: { caseType: 'economy', color: '#f49f90', maxQuantity: 0, ... }
   ⚠️ [SOLD OUT] Item exists in Supabase but qty is 0: { caseType: 'economy', color: '#f49f90', maxQuantity: 0 }
   ```

This will show you:
- What quantity is in the cache
- Whether the item exists in Supabase
- Why it's showing as sold out

---

## 🔄 Force Refresh Inventory

The page now automatically refreshes inventory on load. But you can also manually trigger it:

```javascript
// In browser console:
import { refreshInventoryFromSupabase } from './src/utils/inventory';

await refreshInventoryFromSupabase();
location.reload();
```

Or use the function directly (if you have access):
```javascript
// Clear cache
localStorage.removeItem('productQuantities');
localStorage.removeItem('productQuantitiesTimestamp');

// Refresh page
location.reload();
```

---

## ✅ Verify Supabase Data

### Check in Supabase Dashboard:

1. Go to Supabase Dashboard
2. Navigate to `inventory_items` table
3. Find the row for Light Pink:
   - `item_id`: `case-1-color-#f49f90` (for Economy)
   - `item_type`: `case_color`
   - `qty_in_stock`: Should be > 0 (not 0 or null)

### Check via API:

```javascript
// In browser console:
const response = await fetch('/api/inventory');
const data = await response.json();
console.log('📦 Inventory from API:', data);

// Find Light Pink
const lightPinkItem = data.inventory?.caseColors?.[0]?.find((qty, idx) => {
  // Check if this index corresponds to Light Pink
  // You'll need to match with Products.cases[0].colors array
});
```

---

## 🎯 Expected Behavior

### If item EXISTS in Supabase:
- `qty_in_stock = 0` → Shows "Sold Out" ✅
- `qty_in_stock > 0` → Shows as available (minus cart items) ✅

### If item DOESN'T EXIST in Supabase:
- `qty_in_stock = null` or row doesn't exist → Shows as unlimited ✅

---

## 🚨 Common Issues

### Issue 1: Cache Not Refreshing
**Symptom**: Updated Supabase but page still shows old data

**Fix**:
1. Clear cache (see Quick Fix above)
2. Check if real-time subscription is working (look for console logs: `✅ Subscribed to inventory_items changes`)
3. Verify Supabase Realtime is enabled for `inventory_items` table

### Issue 2: Data Structure Mismatch
**Symptom**: Console shows `maxQuantity: null` but item exists in Supabase

**Fix**:
1. Check that `item_id` format matches: `case-{caseId}-color-{color}`
2. Verify `caseColors` array structure matches `Products.cases` structure
3. Check that color hex code matches exactly (case-sensitive)

### Issue 3: Real-time Not Working
**Symptom**: Updates from Dashboard don't appear immediately

**Fix**:
1. Verify Supabase Realtime is enabled (see `SUPABASE_REALTIME_SETUP.md`)
2. Check browser console for subscription errors
3. Check network tab for WebSocket connection

---

## 📝 Next Steps

1. **Clear cache** (Quick Fix Option 1)
2. **Check console logs** for debug info
3. **Verify Supabase data** is correct
4. **Check real-time subscription** is working

If issue persists, check:
- Browser console for errors
- Network tab for failed API calls
- Supabase Dashboard for actual data values
