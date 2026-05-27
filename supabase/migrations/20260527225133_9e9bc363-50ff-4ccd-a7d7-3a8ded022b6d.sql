CREATE OR REPLACE FUNCTION public.decrement_product_stock(_product_id uuid, _qty integer)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.products
  SET stock = GREATEST(stock - _qty, 0),
      updated_at = now()
  WHERE id = _product_id;
$$;

REVOKE ALL ON FUNCTION public.decrement_product_stock(uuid, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.decrement_product_stock(uuid, integer) TO service_role;