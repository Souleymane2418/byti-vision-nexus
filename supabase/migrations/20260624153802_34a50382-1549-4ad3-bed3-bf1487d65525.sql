
-- Public read access for partner logos (bucket served via public URLs on the marketing site)
CREATE POLICY "Public read partner-logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'partner-logos');

-- Staff can upload partner logos
CREATE POLICY "Staff insert partner-logos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'partner-logos' AND public.is_staff(auth.uid()));

-- Staff can update partner logos
CREATE POLICY "Staff update partner-logos"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'partner-logos' AND public.is_staff(auth.uid()))
WITH CHECK (bucket_id = 'partner-logos' AND public.is_staff(auth.uid()));

-- Staff can delete partner logos
CREATE POLICY "Staff delete partner-logos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'partner-logos' AND public.is_staff(auth.uid()));
