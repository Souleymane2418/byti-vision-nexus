
-- 1. Tighten orders INSERT policy: prevent setting status/stock_validated/validated_by
DROP POLICY IF EXISTS "Anyone can create valid orders" ON public.orders;
CREATE POLICY "Anyone can create valid orders"
ON public.orders
FOR INSERT
TO public
WITH CHECK (
  length(TRIM(BOTH FROM customer_name)) > 0
  AND length(TRIM(BOTH FROM customer_phone)) >= 6
  AND total > 0
  AND jsonb_array_length(items) > 0
  AND status = 'pending'
  AND stock_validated = false
  AND validated_by IS NULL
  AND validated_at IS NULL
);

-- 2. Add INSERT policy for profiles
CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. Revoke EXECUTE on sensitive SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.validate_order_stock(uuid, uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.ensure_direction_admin_role() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.prevent_direction_admin_role_removal() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
-- has_role and is_staff are safe utility helpers used in RLS; keep them executable for authenticated checks

-- 4. Restrict public listing of product-images bucket: allow viewing individual files but not listing
-- The bucket stays public for direct URL access; we drop any broad SELECT-all policy on storage.objects for this bucket.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND (qual ILIKE '%product-images%' OR policyname ILIKE '%product%image%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Staff can manage (upload/update/delete) product images
CREATE POLICY "Staff can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_staff(auth.uid()));

CREATE POLICY "Staff can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND public.is_staff(auth.uid()));
