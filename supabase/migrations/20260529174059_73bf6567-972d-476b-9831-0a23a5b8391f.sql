CREATE OR REPLACE FUNCTION public.validate_order_stock(_order_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  order_row record;
  item jsonb;
  raw_product_id text;
  item_name text;
  item_qty integer;
  resolved_product_id uuid;
  resolved_product_name text;
  resolved_product_stock integer;
BEGIN
  IF current_user_id IS NULL OR NOT public.is_staff(current_user_id) THEN
    RAISE EXCEPTION 'Accès refusé : seul le personnel BYTI peut valider une commande.';
  END IF;

  SELECT id, items, stock_validated
  INTO order_row
  FROM public.orders
  WHERE id = _order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Commande introuvable.';
  END IF;

  IF order_row.stock_validated THEN
    RETURN jsonb_build_object('ok', true, 'message', 'Stock déjà validé.');
  END IF;

  IF jsonb_typeof(order_row.items) <> 'array' THEN
    RAISE EXCEPTION 'Les articles de cette commande sont invalides.';
  END IF;

  FOR item IN SELECT value FROM jsonb_array_elements(order_row.items)
  LOOP
    raw_product_id := nullif(trim(coalesce(item->>'product_id', item->>'id', '')), '');
    item_name := nullif(trim(coalesce(item->>'name', 'Article')), '');

    BEGIN
      item_qty := coalesce((item->>'quantity')::integer, 0);
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'Quantité invalide pour %.', coalesce(item_name, 'un article');
    END;

    IF item_qty <= 0 THEN
      RAISE EXCEPTION 'Quantité invalide pour %.', coalesce(item_name, 'un article');
    END IF;

    resolved_product_id := NULL;
    resolved_product_name := NULL;
    resolved_product_stock := NULL;

    IF raw_product_id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
      SELECT id, name, stock
      INTO resolved_product_id, resolved_product_name, resolved_product_stock
      FROM public.products
      WHERE id = raw_product_id::uuid
      FOR UPDATE;
    END IF;

    IF resolved_product_id IS NULL AND item_name IS NOT NULL THEN
      SELECT id, name, stock
      INTO resolved_product_id, resolved_product_name, resolved_product_stock
      FROM public.products
      WHERE lower(trim(name)) = lower(trim(item_name))
      ORDER BY active DESC, created_at DESC
      LIMIT 1
      FOR UPDATE;
    END IF;

    IF resolved_product_id IS NULL THEN
      RAISE EXCEPTION 'Produit introuvable dans le stock : %.', coalesce(item_name, raw_product_id, 'article sans nom');
    END IF;

    IF resolved_product_stock < item_qty THEN
      RAISE EXCEPTION 'Stock insuffisant pour % : disponible %, demandé %.', resolved_product_name, resolved_product_stock, item_qty;
    END IF;

    UPDATE public.products
    SET stock = stock - item_qty,
        updated_at = now()
    WHERE id = resolved_product_id;
  END LOOP;

  UPDATE public.orders
  SET stock_validated = true,
      validated_at = now(),
      validated_by = current_user_id,
      status = 'validated',
      updated_at = now()
  WHERE id = _order_id;

  RETURN jsonb_build_object('ok', true, 'message', 'Stock validé et déduit.');
END;
$$;

REVOKE ALL ON FUNCTION public.validate_order_stock(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.validate_order_stock(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_order_stock(uuid) TO service_role;