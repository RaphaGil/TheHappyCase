-- Profiles table for customer profile (syncs dispatched order status)
-- Run in Supabase: SQL Editor → New query → paste and run
--
-- Creates profiles if missing, adds dispatched columns.
-- When an order is marked dispatched, we update the customer's profile.

-- Create profiles table if it doesn't exist (standard Supabase pattern)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add dispatched columns (safe if already exist)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_order_dispatched_at TIMESTAMPTZ;

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_order_dispatched_id VARCHAR(255);

-- Add updated_at if missing (for profile sync)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
