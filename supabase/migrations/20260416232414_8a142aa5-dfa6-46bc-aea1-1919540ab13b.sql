-- Categories enum
CREATE TYPE public.product_category AS ENUM ('smartphones', 'televisions', 'security', 'toys');

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category product_category NOT NULL,
  price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  compare_at_price NUMERIC(12,2),
  currency TEXT NOT NULL DEFAULT 'XAF',
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can view active products
CREATE POLICY "Anyone can view active products"
ON public.products FOR SELECT
USING (active = true);

-- Orders table (guest checkout via WhatsApp / contact)
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT,
  items JSONB NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'XAF',
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can create an order (guest checkout)
CREATE POLICY "Anyone can create orders"
ON public.orders FOR INSERT
WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed products
INSERT INTO public.products (name, description, category, price, compare_at_price, image_url, stock, featured) VALUES
('Smartphone Pro Max 256GB', 'Smartphone haut de gamme avec écran AMOLED 6.7", triple caméra 108MP, 5G.', 'smartphones', 450000, 520000, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800', 25, true),
('Écouteurs Bluetooth Premium', 'Réduction de bruit active, autonomie 30h, son Hi-Fi.', 'smartphones', 45000, 60000, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800', 80, true),
('Chargeur Rapide 65W USB-C', 'Charge ultra-rapide compatible tous appareils.', 'smartphones', 18000, NULL, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800', 150, false),
('Smart TV 55" 4K UHD', 'Téléviseur LED 4K HDR, smart Android TV, 3 HDMI.', 'televisions', 380000, 450000, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800', 12, true),
('Téléviseur 43" Full HD', 'Smart TV abordable, qualité d''image exceptionnelle.', 'televisions', 220000, NULL, 'https://images.unsplash.com/photo-1601944177325-f8867652837f?w=800', 18, false),
('Caméra IP Wifi 4MP', 'Vision nocturne, détection de mouvement, vue 360°.', 'security', 55000, 75000, 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800', 40, true),
('Kit CCTV 8 Caméras', 'Système complet de vidéosurveillance professionnel HD.', 'security', 650000, 780000, 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800', 8, true),
('Alarme Maison Connectée', 'Système d''alarme intelligent contrôlable depuis votre smartphone.', 'security', 120000, NULL, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800', 22, false),
('Jouet Éducatif Robot Programmable', 'Apprentissage du codage pour enfants 6-12 ans, qualité premium.', 'toys', 85000, 110000, 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800', 30, true),
('Circuit de Voitures Électrique', 'Coffret luxe, 2 voitures, piste 6m, son et lumières.', 'toys', 65000, NULL, 'https://images.unsplash.com/photo-1558877385-8c1b8e0648b7?w=800', 25, true),
('Poupée Interactive Premium', 'Parle, chante et interagit. Cheveux à coiffer, accessoires inclus.', 'toys', 42000, 55000, 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800', 45, false),
('Blocs de Construction 1500 pcs', 'Coffret créatif premium pour développer l''imagination.', 'toys', 38000, NULL, 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800', 60, false);