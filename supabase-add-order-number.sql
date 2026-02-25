-- Add order_number column to orders table (Order # shown in order summary)
-- Run this in Supabase: SQL Editor → New query → paste and run

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS order_number VARCHAR(20);

-- Optional: backfill existing rows from payment_intent_id (last 8 chars, uppercase)
UPDATE orders
SET order_number = UPPER(RIGHT(payment_intent_id::text, 8))
WHERE order_number IS NULL AND payment_intent_id IS NOT NULL;
