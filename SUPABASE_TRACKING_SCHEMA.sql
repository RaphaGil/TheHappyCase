-- Tracking Table Schema for Supabase
-- This table stores tracking information for orders separately from order metadata

CREATE TABLE IF NOT EXISTS tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL UNIQUE REFERENCES orders(order_id) ON DELETE CASCADE,
  tracking_number VARCHAR(255),
  tracking_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on order_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_tracking_order_id ON tracking(order_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tracking_updated_at BEFORE UPDATE ON tracking
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add RLS policies (if using Row Level Security)
-- ALTER TABLE tracking ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to do everything (for server-side operations)
-- CREATE POLICY "Service role can manage tracking" ON tracking
--   FOR ALL USING (true);

-- Policy: Allow users to read their own tracking info (if needed)
-- CREATE POLICY "Users can read their own tracking" ON tracking
--   FOR SELECT USING (
--     EXISTS (
--       SELECT 1 FROM orders 
--       WHERE orders.order_id = tracking.order_id 
--       AND orders.customer_email = auth.jwt() ->> 'email'
--     )
--   );
