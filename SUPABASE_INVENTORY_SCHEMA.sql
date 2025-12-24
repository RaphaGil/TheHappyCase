-- New Inventory Items Table Schema
-- This stores each item individually with id, name, color, price, and qty

CREATE TABLE IF NOT EXISTS inventory_items (
  id BIGSERIAL PRIMARY KEY,
  item_id VARCHAR(100) NOT NULL, -- Unique identifier for the item (e.g., "case-1-color-#f49f90" or "pin-flags-1")
  item_type VARCHAR(50) NOT NULL, -- 'case', 'case_color', 'pin_flags', 'pin_colorful', 'pin_bronze'
  product_id INTEGER, -- ID from products.json
  name VARCHAR(255) NOT NULL,
  color VARCHAR(50), -- Hex color code for cases, null for pins
  price DECIMAL(10, 2) NOT NULL,
  qty_in_stock INTEGER, -- NULL means unlimited
  category VARCHAR(100), -- For pins: 'flags', 'colorful', 'bronze'
  case_type VARCHAR(50), -- For cases: 'economy', 'business', 'firstclass'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(item_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_inventory_items_item_id ON inventory_items(item_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_item_type ON inventory_items(item_type);
CREATE INDEX IF NOT EXISTS idx_inventory_items_product_id ON inventory_items(product_id);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_inventory_items_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inventory_items_updated_at 
BEFORE UPDATE ON inventory_items
FOR EACH ROW EXECUTE FUNCTION update_inventory_items_updated_at();

-- Disable RLS (or set up policies if needed)
ALTER TABLE inventory_items DISABLE ROW LEVEL SECURITY;



