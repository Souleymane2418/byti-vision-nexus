ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS stock_validated boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS validated_at timestamptz,
  ADD COLUMN IF NOT EXISTS validated_by uuid;