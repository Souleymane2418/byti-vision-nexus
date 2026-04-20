import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, formatPrice } from "@/lib/cart";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: "smartphones" | "televisions" | "security" | "toys" | "energy";
  price: number | null;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  stock: number;
  featured: boolean;
  model?: string | null;
};

const CATEGORIES = [
  { id: "all", label: "Tout" },
  { id: "energy", label: "Énergie & batteries" },
  { id: "smartphones", label: "Smartphones" },
  { id: "televisions", label: "Téléviseurs" },
  { id: "security", label: "Sécurité & vidéo" },
  { id: "toys", label: "Jouets enfants" },
] as const;

export const Route = createFileRoute("/boutique")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Boutique | BYTI Technologie SARL" },
      {
        name: "description",
        content:
          "Achetez en ligne smartphones, téléviseurs, vidéosurveillance et jouets enfants de haute qualité chez BYTI Technologie.",
      },
      { property: "og:title", content: "Boutique BYTI Technologie" },
      {
        property: "og:description",
        content: "Matériel électronique et jouets premium — livraison rapide.",
      },
    ],
  }),
});

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const { add } = useCart();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Impossible de charger les produits");
      } else {
        setProducts((data ?? []) as Product[]);
      }
      setLoading(false);
    })();
  }, []);

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Boutique
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
            Matériel électronique & jouets premium
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une sélection rigoureuse de produits de haute qualité pour les particuliers et les professionnels.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <Button
              key={c.id}
              variant={filter === c.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(c.id)}
              className="rounded-full"
            >
              {c.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Aucun produit dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <Link
                  to="/produit/$id"
                  params={{ id: product.id }}
                  className="block aspect-square overflow-hidden bg-muted relative"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="absolute top-3 right-3 bg-primary">Top</Badge>
                  )}
                </Link>
                <div className="p-4">
                  <Link to="/produit/$id" params={{ id: product.id }}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-primary font-bold font-display">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.compare_at_price && product.price && product.compare_at_price > product.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.compare_at_price, product.currency)}
                      </span>
                    )}
                  </div>
                  {!product.price ? (
                    <Link
                      to="/"
                      hash="contact"
                      className="btn-byti-red w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
                    >
                      Demander un devis
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      className="w-full"
                      disabled={product.stock <= 0}
                      onClick={() => {
                        add({
                          id: product.id,
                          name: product.name,
                          price: Number(product.price),
                          currency: product.currency,
                          image_url: product.image_url,
                        });
                        toast.success("Ajouté au panier");
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.stock > 0 ? "Ajouter" : "Rupture"}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
