import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, formatPrice } from "@/lib/cart";
import { ShoppingCart, Loader2, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  stock: number;
};

export const Route = createFileRoute("/produit/$id")({
  component: ProductPage,
  head: () => ({
    meta: [{ title: "Produit | BYTI Technologie" }],
  }),
});

function ProductPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .eq("active", true)
        .maybeSingle();
      if (error || !data) {
        setProduct(null);
      } else {
        setProduct(data as Product);
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="text-center py-32">
          <p className="text-muted-foreground mb-4">Produit introuvable</p>
          <Button asChild>
            <Link to="/boutique">Retour à la boutique</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-6 lg:px-8 max-w-6xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.history.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square bg-muted rounded-2xl overflow-hidden"
          >
            {product.image_url && (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.name}</h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary font-display">
                {formatPrice(Number(product.price), product.currency)}
              </span>
              {product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(Number(product.compare_at_price), product.currency)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-2 text-sm mb-6">
              {product.stock > 0 ? (
                <Badge variant="outline" className="border-green-500/40 text-green-600">
                  <Check className="h-3 w-3 mr-1" /> En stock ({product.stock} disponibles)
                </Badge>
              ) : (
                <Badge variant="destructive">Rupture de stock</Badge>
              )}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm">Quantité :</span>
              <Button size="icon" variant="outline" onClick={() => setQty(Math.max(1, qty - 1))}>
                −
              </Button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <Button size="icon" variant="outline" onClick={() => setQty(Math.min(product.stock, qty + 1))}>
                +
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1"
                disabled={product.stock <= 0}
                onClick={() => {
                  add(
                    {
                      id: product.id,
                      name: product.name,
                      price: Number(product.price),
                      currency: product.currency,
                      image_url: product.image_url,
                    },
                    qty
                  );
                  toast.success("Ajouté au panier");
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Ajouter au panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={product.stock <= 0}
                onClick={() => {
                  add(
                    {
                      id: product.id,
                      name: product.name,
                      price: Number(product.price),
                      currency: product.currency,
                      image_url: product.image_url,
                    },
                    qty
                  );
                  setOpen(true);
                }}
              >
                Acheter maintenant
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
