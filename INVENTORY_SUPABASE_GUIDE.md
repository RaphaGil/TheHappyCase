# Inventory Supabase Integration - Quick Start Guide

## ✅ What's Been Set Up

1. **API Endpoints** (`server.js`):
   - `GET /api/inventory` - Fetch inventory from Supabase
   - `POST /api/inventory` - Update inventory in Supabase

2. **Frontend Updates**:
   - `src/utils/inventory.js` - Fetches from Supabase API with localStorage fallback
   - `src/pages/Dashboard/index.jsx` - Saves to Supabase API when clicking "Save Changes"

## 🚀 Setup Steps

### 1. Create Supabase Table

Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS inventory (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  cases JSONB,
  case_colors JSONB,
  pins JSONB
);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Disable RLS (or set up policies if needed)
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;

-- Insert initial record
INSERT INTO inventory (cases, case_colors, pins)
VALUES (NULL, NULL, NULL)
ON CONFLICT DO NOTHING;
```

### 2. Add Environment Variables

Add to your `.env` file:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**Where to find these:**
- Go to Supabase Dashboard → Settings → API
- `SUPABASE_URL` = Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = `service_role` key (keep secret!)

### 3. Configure Proxy (Already Added)

The `package.json` now includes:
```json
"proxy": "http://localhost:3001"
```

This allows React to proxy API requests to your backend server.

### 4. Restart Your Servers

**CRITICAL:** Environment variables are only loaded when the server starts. After adding Supabase variables to `.env`, you MUST restart your backend server:

```bash
# Stop your backend server (Ctrl+C if running)
# Then restart:
npm run server
```

You should see this message when it starts:
```
✅ Supabase client initialized
```

If you see this instead:
```
⚠️ Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env...
```
Then your environment variables are not set correctly.

**For React dev server:**
```bash
# Stop your current React server (Ctrl+C)
# Then restart:
npm start
```

**Or run both together:**
```bash
npm run dev
```

### 4. Test the Setup

1. Go to `/Dashboard`
2. Set some quantities
3. Click "Save Changes"
4. Check Supabase table - you should see the data
5. Refresh the page - quantities should load from Supabase

## 📊 How It Works

### Data Flow:

```
Dashboard → POST /api/inventory → Supabase Database
                ↓
         localStorage (cache)

Frontend → GET /api/inventory → Supabase Database
                ↓
         localStorage (fallback)
```

### Priority Order:

1. **Supabase API** (primary source)
2. **localStorage** (cache, 5-minute TTL)
3. **products.json** (fallback if no quantities set)

## 🔧 Troubleshooting

### Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This means the API request is getting HTML instead of JSON. Fix:

1. **Restart React dev server** - The proxy only works after restart:
   ```bash
   # Stop React server (Ctrl+C)
   npm start
   ```

2. **Check backend server is running**:
   ```bash
   npm run server
   # Should see: "🚀 Stripe Embedded Checkout Server running on http://localhost:3001"
   ```

3. **Verify proxy in package.json**:
   ```json
   "proxy": "http://localhost:3001"
   ```

4. **Test API directly**:
   ```bash
   curl http://localhost:3001/api/inventory
   ```

### Error: "Supabase not configured" or "Failed to save to Supabase"

This means your backend server can't find the Supabase environment variables. Follow these steps:

1. **Check your configuration** (run this in your project root):
   ```bash
   node check-supabase-config.js
   ```
   This will tell you exactly what's missing.

2. **Verify your .env file** has these two lines (replace with your actual values):
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. **Get your Supabase credentials**:
   - Go to https://app.supabase.com
   - Select your project → Settings → API
   - Copy the **Project URL** for `SUPABASE_URL`
   - Copy the **service_role** key (secret) for `SUPABASE_SERVICE_ROLE_KEY`

4. **Restart your backend server** (IMPORTANT - environment variables are only loaded at startup):
   ```bash
   # Stop the server (Ctrl+C)
   npm run server
   ```
   Look for this message: `✅ Supabase client initialized`

5. **Test the configuration**:
   ```bash
   curl http://localhost:3001/api/config-check
   ```
   Should show `"supabaseClient": "initialized"`

### Inventory not saving?
- Check server logs for errors
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`
- **Make sure you restarted the backend server after adding the variables**
- Check Supabase table exists and has correct columns
- Make sure backend server is running on port 3001

### Inventory not loading?
- Check browser console for errors
- Verify API endpoint is accessible: `http://localhost:3001/api/inventory`
- Check network tab for failed requests
- Ensure React dev server was restarted after adding proxy

### Still using localStorage?
- The system falls back to localStorage if Supabase is unavailable
- Check server is running and Supabase credentials are correct
- Check browser console for API errors

## 📝 Notes

- Inventory is cached in localStorage for 5 minutes for performance
- If Supabase is unavailable, the system gracefully falls back to localStorage
- All users see the same inventory (shared across browsers/devices)
- Admin can update inventory from Dashboard, changes sync to all users

