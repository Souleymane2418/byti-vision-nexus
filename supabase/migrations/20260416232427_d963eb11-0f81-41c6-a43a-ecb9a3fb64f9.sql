DROP POLICY "Anyone can create orders" ON public.orders;

CREATE POLICY "Anyone can create valid orders"
ON public.orders FOR INSERT
WITH CHECK (
  length(trim(customer_name)) > 0
  AND length(trim(customer_phone)) >= 6
  AND total > 0
  AND jsonb_array_length(items) > 0
);