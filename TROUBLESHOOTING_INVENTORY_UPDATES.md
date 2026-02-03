# Troubleshooting: Why Passport Cases Page Not Updating

## 🔍 Problem

After updating inventory in Dashboard, the Passport Cases page doesn't show the updated stock immediately.

## ✅ What Was Fixed

The code has been updated to make inventory updates reactive. Here's what changed:

### 1. **Made `productsWithQuantities` Reactive**
- Changed from direct function call to `useMemo` hook
- Now re-computes when inventory cache changes
- Depends on `inventoryRefreshKey` and `cacheTimestamp`

### 2. **Added Multiple Update Triggers**
- **Supabase Realtime**: Listens to database changes
- **Custom Events**: Dashboard broadcasts `inventoryUpdated` event
- **Storage Events**: Cross-tab updates
- **Timestamp Polling**: Fallback for same-tab updates (every 2 seconds)

## 🧪 Testing Steps

1. **Open Browser Console** (F12) on Passport Cases page
2. **Look for these messages**:
   ```
   🔔 Setting up Supabase Realtime subscription...
   ✅ Subscribed to inventory_items changes
   ```

3. **Update inventory in Dashboard**
4. **Check console for**:
   ```
   📢 Inventory change detected: UPDATE
   ✅ Inventory cache refreshed from Supabase Realtime
   🔄 Re-computing productsWithQuantities
   ```

5. **Verify update appears** on Passport Cases page

## 🐛 Common Issues & Solutions

### Issue 1: No Realtime Subscription Message

**Symptoms**: Console doesn't show "✅ Subscribed to inventory_items changes"

**Solutions**:
1. **Check Supabase Realtime is enabled**:
   - Go to Supabase Dashboard → Database → Replication
   - Enable for `inventory_items` table
   - See `SUPABASE_REALTIME_SETUP.md` for details

2. **Check environment variables**:
   ```javascript
   // In browser console:
   console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
   console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
   ```

3. **Check browser console for errors**:
   - Look for subscription errors
   - Check network tab for failed requests

### Issue 2: Cache Refreshes But UI Doesn't Update

**Symptoms**: Console shows "✅ Inventory cache refreshed" but page doesn't change

**Solutions**:
1. **Check if hook is re-computing**:
   - Look for "🔄 Re-computing productsWithQuantities" in console
   - If missing, the hook isn't detecting the change

2. **Force manual refresh**:
   ```javascript
   // In browser console:
   localStorage.removeItem('productQuantities');
   localStorage.removeItem('productQuantitiesTimestamp');
   location.reload();
   ```

3. **Check React DevTools**:
   - Verify `inventoryRefreshKey` state is updating
   - Check if component is re-rendering

### Issue 3: Updates Work But Are Delayed

**Symptoms**: Updates appear but take 2+ seconds

**Solutions**:
1. **Realtime might not be enabled** - falls back to polling (2-second delay)
2. **Enable Supabase Realtime** for instant updates
3. **Check network connection** - slow connection delays updates

### Issue 4: Updates Only Work When Dashboard is Open

**Symptoms**: Updates only appear when Dashboard tab is also open

**Solutions**:
1. **This is expected** if Realtime is not enabled
2. **Enable Supabase Realtime** to get updates even when Dashboard is closed
3. **Or wait 2 seconds** - polling will catch the update

## 🔧 Debugging Commands

### Check Current Cache
```javascript
// In browser console:
const cache = localStorage.getItem('productQuantities');
const timestamp = localStorage.getItem('productQuantitiesTimestamp');
console.log('Cache timestamp:', new Date(parseInt(timestamp)));
console.log('Cache data:', JSON.parse(cache));
```

### Manually Trigger Refresh
```javascript
// In browser console:
import { refreshInventoryFromSupabase } from './src/utils/inventory';
await refreshInventoryFromSupabase();
window.dispatchEvent(new CustomEvent('inventoryUpdated'));
```

### Check Supabase Connection
```javascript
// In browser console:
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log('Supabase configured:', !!supabaseUrl && !!supabaseKey);
```

### Test Realtime Subscription
```javascript
// In browser console (on Passport Cases page):
// Should see subscription status in console
// Try updating inventory in Dashboard and watch for events
```

## 📊 Update Flow Verification

### Expected Flow:
```
1. Dashboard saves → Supabase updated ✅
2. Realtime event fires → Passport Cases receives event ✅
3. Cache refreshed → localStorage updated ✅
4. Hook detects change → inventoryRefreshKey updated ✅
5. useMemo re-computes → productsWithQuantities updated ✅
6. Component re-renders → UI shows new stock ✅
```

### Check Each Step:
1. **Step 1**: Check Supabase dashboard - data should be updated
2. **Step 2**: Check console for "📢 Inventory change detected"
3. **Step 3**: Check localStorage - `productQuantitiesTimestamp` should change
4. **Step 4**: Check React DevTools - `inventoryRefreshKey` should increment
5. **Step 5**: Check console for "🔄 Re-computing productsWithQuantities"
6. **Step 6**: Check UI - "Sold Out" badges should appear/disappear

## 🎯 Quick Fixes

### Immediate Fix (Manual):
```javascript
// After updating Dashboard, run in Passport Cases console:
localStorage.removeItem('productQuantities');
localStorage.removeItem('productQuantitiesTimestamp');
location.reload();
```

### Permanent Fix:
1. **Enable Supabase Realtime** (see `SUPABASE_REALTIME_SETUP.md`)
2. **Verify environment variables** are set correctly
3. **Check browser console** for any errors
4. **Test with both tabs open** first, then test with Dashboard closed

## 📝 Summary

The page should now update automatically when:
- ✅ Supabase Realtime is enabled (instant, 1-2 seconds)
- ✅ Dashboard broadcasts event (instant, when Dashboard is open)
- ✅ Polling detects timestamp change (2-second delay, fallback)

If updates still don't work:
1. Check browser console for errors
2. Verify Supabase Realtime is enabled
3. Check environment variables
4. Try manual refresh (clear localStorage + reload)
