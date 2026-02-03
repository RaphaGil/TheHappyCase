# Supabase Realtime Setup for Instant Inventory Updates

## 🎯 What This Does

The Passport Cases page now listens to Supabase Realtime changes. When inventory is updated in the Dashboard (or directly in Supabase), the Passport Cases page **updates immediately** without needing to refresh or wait for cache to expire.

## ✅ Implementation Complete

The code is already implemented in `src/pages/PassportCases/index.jsx`. It:
- Subscribes to `inventory_items` table changes
- Automatically refreshes cache when changes are detected
- Updates the UI immediately

## 🔧 Setup Required: Enable Realtime in Supabase

Supabase Realtime is **not enabled by default**. You need to enable it:

### Step 1: Enable Realtime for the Table

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Find the `inventory_items` table
4. Toggle **Replication** to **ON** (or enable it)

**Alternative Method:**
1. Go to **Database** → **Tables**
2. Click on `inventory_items` table
3. Go to **Settings** tab
4. Enable **Realtime** or **Replication**

### Step 2: Verify Realtime is Enabled

You should see a green indicator or checkmark next to `inventory_items` in the Replication section.

### Step 3: Test It

1. Open Passport Cases page
2. Open Dashboard in another tab
3. Update inventory in Dashboard
4. **Passport Cases should update within 1-2 seconds!** ✨

## 📊 How It Works

```
Dashboard saves → Supabase inventory_items updated
                    ↓
Supabase Realtime broadcasts change
                    ↓
Passport Cases subscription receives event
                    ↓
Cache refreshed automatically
                    ↓
UI updates immediately ✅
```

## 🔍 Code Details

### Subscription Setup

```javascript
const channel = supabase
  .channel('inventory-changes')
  .on(
    'postgres_changes',
    {
      event: '*', // Listen to INSERT, UPDATE, DELETE
      schema: 'public',
      table: 'inventory_items'
    },
    async (payload) => {
      // Refresh cache when change detected
      await refreshInventoryFromSupabase();
      setRefreshKey(prev => prev + 1); // Force re-render
    }
  )
  .subscribe();
```

### Events Listened To

- **INSERT**: New inventory items added
- **UPDATE**: Inventory quantities changed
- **DELETE**: Inventory items removed

## 🐛 Troubleshooting

### Issue: Updates not appearing immediately

**Possible Causes:**

1. **Realtime not enabled in Supabase**
   - Check Database → Replication
   - Enable for `inventory_items` table

2. **Supabase environment variables not set**
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Check browser console for errors

3. **RLS (Row Level Security) blocking**
   - Realtime requires proper RLS policies
   - Check Supabase logs for permission errors

4. **Network/Connection issues**
   - Check browser console for subscription errors
   - Verify Supabase project is active

### Check Subscription Status

Open browser console on Passport Cases page. You should see:
```
✅ Subscribed to inventory_items changes
```

If you see errors, check:
- Supabase dashboard → Replication is enabled
- Environment variables are correct
- Network connection is stable

## 🔐 Security Note

Realtime subscriptions use the **anon key**, which is safe for public read access. The subscription only listens to changes - it doesn't modify data.

If you have RLS enabled, make sure your policies allow:
- **SELECT** on `inventory_items` (for reading)
- Realtime access (usually enabled by default with SELECT)

## 📝 Fallback Behavior

If Realtime is not enabled or fails:
- Falls back to the event-based system (Dashboard broadcasts)
- Still uses 5-minute cache as backup
- Manual refresh still works

## 🎉 Benefits

✅ **Instant Updates**: Changes appear within 1-2 seconds  
✅ **Works from Anywhere**: Updates even if Dashboard is closed  
✅ **No Manual Refresh**: Automatic and seamless  
✅ **Real-time Sync**: Multiple users see updates simultaneously  

## 📚 Additional Resources

- [Supabase Realtime Documentation](https://supabase.com/docs/guides/realtime)
- [Postgres Changes Guide](https://supabase.com/docs/guides/realtime/postgres-changes)
- [Realtime Setup Tutorial](https://supabase.com/docs/guides/realtime/quickstart)
