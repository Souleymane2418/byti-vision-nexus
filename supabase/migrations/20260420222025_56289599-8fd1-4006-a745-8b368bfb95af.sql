UPDATE public.products
SET image_url = REPLACE(image_url, '/src/assets/products/', '/products/')
WHERE image_url LIKE '/src/assets/products/%';