# Supabase Inventory Setup Guide

## Step 1: Create Inventory Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. Click **Create a new table**
4. Name it: `inventory`
5. Add the following columns:

| Column Name | Type | Default Value | Nullable | Description |
|------------|------|---------------|----------|-------------|
| `id` | `bigint` | Auto (Primary Key) | No | Auto-incrementing ID |
| `created_at` | `timestamptz` | `now()` | No | Creation timestamp |
| `updated_at` | `timestamptz` | `now()` | No | Update timestamp |
| `cases` | `jsonb` | `null` | Yes | Array of case quantities |
| `case_colors` | `jsonb` | `null` | Yes | 2D array of color-specific quantities |
| `pins` | `jsonb` | `null` | Yes | Object with flags, colorful, bronze arrays |

6. Click **Save**

## Step 2: Create Row Level Security (RLS) Policy

1. Go to **Authentication** > **Policies**
2. Select the `inventory` table
3. Create a new policy:

**Policy Name:** `Allow public read access`
- **Allowed operation:** SELECT
- **Policy definition:** `true` (allow everyone to read)

**Policy Name:** `Allow service role write access`
- **Allowed operation:** INSERT, UPDATE, DELETE
- **Policy definition:** Use service role key (this will be handled server-side)

OR disable RLS if you're using service role key for all operations (recommended for admin operations).

## Step 3: Create Table with SQL (Alternative Method)

Instead of using the Table Editor, you can run this SQL in Supabase SQL Editor:

```sql
-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  cases JSONB,
  case_colors JSONB,
  pins JSONB
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial inventory record
INSERT INTO inventory (cases, case_colors, pins)
VALUES (
  NULL, -- Will be set via Dashboard
  NULL, -- Will be set via Dashboard
  NULL  -- Will be set via Dashboard
)
ON CONFLICT DO NOTHING;
```

## Step 4: Set Up Row Level Security (RLS)

For production, you have two options:

### Option A: Disable RLS (Recommended for Admin-Only Access)
```sql
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
```

### Option B: Enable RLS with Policies
```sql
-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON inventory
FOR SELECT USING (true);

-- Allow service role full access (handled via service role key)
-- Note: Service role key bypasses RLS, so no policy needed for writes
```

## Step 4: Environment Variables

Add to your `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important:** 
- Use `SUPABASE_ANON_KEY` for frontend (read-only)
- Use `SUPABASE_SERVICE_ROLE_KEY` for backend/admin operations (read/write)

## Step 5: Install Supabase Client (Frontend)

If not already installed:

```bash
npm install @supabase/supabase-js
```

## Step 6: API Endpoints

The server.js already has Supabase setup. You'll need to add these endpoints:

- `GET /api/inventory` - Get current inventory
- `POST /api/inventory` - Update inventory (admin only)

## Step 7: Update Frontend Code

The code has been updated to:
1. Fetch inventory from Supabase API
2. Fallback to localStorage if API fails
3. Save to Supabase via API from Dashboard

## Testing

1. Set quantities in Dashboard
2. Check Supabase table to verify data is saved
3. Clear localStorage and refresh - inventory should load from Supabase
4. Test on different browsers/devices - inventory should be consistent
