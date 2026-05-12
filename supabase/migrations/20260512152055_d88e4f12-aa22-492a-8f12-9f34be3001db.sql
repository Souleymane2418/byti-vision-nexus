
CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL,
  position int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_product_images_product ON public.product_images(product_id, position);
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product images" ON public.product_images FOR SELECT TO public
USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_id AND p.active = true));
CREATE POLICY "Staff can view all product images" ON public.product_images FOR SELECT TO authenticated
USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff can insert product images" ON public.product_images FOR INSERT TO authenticated
WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff can update product images" ON public.product_images FOR UPDATE TO authenticated
USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff can delete product images" ON public.product_images FOR DELETE TO authenticated
USING (public.is_staff(auth.uid()));
