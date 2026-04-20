-- Add 'energy' to product_category enum
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'energy';

-- Make price nullable for "on quote" products
ALTER TABLE public.products ALTER COLUMN price DROP NOT NULL;

-- Add model and specs fields
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS model TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specs JSONB DEFAULT '{}'::jsonb;