-- Orders Table Schema for Supabase
-- This table stores all order information including payment details, customer info, shipping, and items

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL UNIQUE, -- Stripe Payment Intent ID or generated order ID
  payment_intent_id VARCHAR(255), -- Stripe Payment Intent ID
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'gbp',
  status VARCHAR(50) DEFAULT 'succeeded', -- Payment status from Stripe
  order_date TIMESTAMPTZ NOT NULL,
  shipping_address JSONB, -- Stores shipping address as JSON
  items JSONB NOT NULL, -- Array of ordered items
  metadata JSONB, -- Additional metadata from Stripe
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent_id ON orders(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_date ON orders(order_date DESC);

-- Auto-update timestamp function
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_orders_updated_at 
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_orders_updated_at();

-- Disable RLS (or set up policies if needed)
-- Note: Service role key bypasses RLS, so this is safe for backend operations
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Optional: Enable RLS with policies for more security
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow service role full access" ON orders
-- FOR ALL USING (true);

COMMENT ON TABLE orders IS 'Stores all customer orders with payment and shipping information';
COMMENT ON COLUMN orders.order_id IS 'Unique order identifier (usually Stripe Payment Intent ID)';
COMMENT ON COLUMN orders.payment_intent_id IS 'Stripe Payment Intent ID for reference';
COMMENT ON COLUMN orders.shipping_address IS 'JSON object containing shipping address details';
COMMENT ON COLUMN orders.items IS 'JSON array of ordered items with details';
COMMENT ON COLUMN orders.metadata IS 'Additional metadata from Stripe payment intent';





