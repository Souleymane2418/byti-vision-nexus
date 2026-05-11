import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart, formatPrice } from "@/lib/cart";
import { ShoppingCart, Loader2, ArrowRight, Search, X } from "lucide-react";
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
  created_at?: string | null;
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
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sort, setSort] = useState<"recent" | "old" | "price_asc" | "price_desc">("recent");
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

  const min = minPrice ? Number(minPrice) : null;
  const max = maxPrice ? Number(maxPrice) : null;
  const q = search.trim().toLowerCase();

  const filtered = products
    .filter((p) => filter === "all" || p.category === filter)
    .filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.model ?? "").toLowerCase().includes(q)
      );
    })
    .filter((p) => {
      if (min !== null && (p.price ?? 0) < min) return false;
      if (max !== null && (p.price ?? Infinity) > max) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price_asc":
          return (a.price ?? Infinity) - (b.price ?? Infinity);
        case "price_desc":
          return (b.price ?? -Infinity) - (a.price ?? -Infinity);
        case "old":
          return (a.created_at ?? "").localeCompare(b.created_at ?? "");
        case "recent":
        default:
          return (b.created_at ?? "").localeCompare(a.created_at ?? "");
      }
    });

  const hasActiveFilters = !!q || !!minPrice || !!maxPrice || filter !== "all" || sort !== "recent";
  const resetFilters = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setFilter("all");
    setSort("recent");
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="pill-badge">★ Catalogue BYTI</span>

          <h1 className="editorial-title mt-6 text-4xl md:text-6xl">
            Du matériel pensé pour{" "}
            <span className="editorial-accent">tous vos besoins</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto mt-6 text-base md:text-lg leading-relaxed">
            Une sélection rigoureuse de produits électroniques, énergétiques et de sécurité,
            distribués par BYTI Technologie avec un contrôle qualité strict.
          </p>

          <div className="dot-divider">
            <span className="dot-divider-dot" />
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <span className="pill-badge">🛡️ Garantie BYTI</span>
            <span className="pill-badge pill-badge-red">🇨🇲 Livraison locale</span>
            <span className="pill-badge">⚡ Stock disponible</span>
          </div>
        </motion.div>

        {/* Search + advanced filters */}
        <div className="mb-8 rounded-2xl border border-border bg-white shadow-sm p-4 md:p-5">
          <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit, une marque, un modèle…"
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-[var(--byti-blue)] focus:ring-2 focus:ring-[var(--byti-blue)]/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Effacer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Prix min"
                  className="w-24 px-3 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-[var(--byti-blue)]"
                />
                <span className="text-muted-foreground text-sm">—</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Prix max"
                  className="w-24 px-3 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-[var(--byti-blue)]"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="px-3 py-2 rounded-full border border-border bg-white text-sm focus:outline-none focus:border-[var(--byti-blue)]"
              >
                <option value="recent">Plus récents</option>
                <option value="old">Plus anciens</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 rounded-full text-sm text-[var(--byti-red)] hover:bg-[var(--byti-red)]/5 transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === c.id
                  ? "bg-[var(--byti-blue)] text-white shadow-md"
                  : "bg-white text-foreground border border-border hover:border-[var(--byti-blue)] hover:text-[var(--byti-blue)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {!loading && (
          <p className="text-center text-xs text-muted-foreground mb-6">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">Aucun produit dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                className="product-card-clean group flex flex-col"
              >
                <Link
                  to="/produit/$id"
                  params={{ id: product.id }}
                  className="product-card-image block relative"
                >
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} loading="lazy" />
                  )}
                  {product.price && product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="tag-pill tag-pill-red absolute top-3 left-3 shadow-sm">
                      -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                    </span>
                  )}
                  {product.featured && (
                    <span className="tag-pill tag-pill-yellow absolute top-3 right-3 shadow-sm">★ Top</span>
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <Link to="/produit/$id" params={{ id: product.id }}>
                    <h3 className="font-serif text-lg leading-snug text-foreground hover:text-[var(--byti-blue)] transition-colors title-underline">
                      {product.name}
                    </h3>
                  </Link>

                  {product.description && (
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-5">
                    <div>
                      <div className="text-base font-semibold text-[var(--byti-blue)] font-display">
                        {formatPrice(product.price, product.currency)}
                      </div>
                      {product.compare_at_price && product.price && product.compare_at_price > product.price && (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatPrice(product.compare_at_price, product.currency)}
                        </div>
                      )}
                    </div>

                    {!product.price ? (
                      <Link to="/produit/$id" params={{ id: product.id }} className="round-arrow-btn">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <button
                        type="button"
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
                        className="round-arrow-btn disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label="Ajouter au panier"
                      >
                        {product.stock > 0 ? <ShoppingCart className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </button>
                    )}
                  </div>
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
