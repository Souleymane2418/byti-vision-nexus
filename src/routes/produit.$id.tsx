import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart, formatPrice } from "@/lib/cart";
import { sendWhatsAppQuote } from "@/lib/whatsapp.functions";
import { ShoppingCart, Loader2, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number | null;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  stock: number;
  model: string | null;
  specs: Record<string, string> | null;
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
  const sendQuote = useServerFn(sendWhatsAppQuote);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", phone: "", message: "" });

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    if (quoteForm.name.trim().length < 2 || quoteForm.phone.trim().length < 6) {
      toast.error("Nom et téléphone requis");
      return;
    }
    setQuoteSubmitting(true);
    const res = await sendQuote({
      data: {
        customer_name: quoteForm.name.trim(),
        customer_phone: quoteForm.phone.trim(),
        product_name: product.name,
        product_model: product.model,
        message: quoteForm.message.trim() || null,
      },
    });
    setQuoteSubmitting(false);
    if (res.ok) {
      toast.success("Demande envoyée ! BYTI vous recontactera rapidement.");
      setQuoteOpen(false);
      setQuoteForm({ name: "", phone: "", message: "" });
    } else {
      toast.error(res.error ?? "Erreur lors de l'envoi");
    }
  };

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
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 px-6 lg:px-8 max-w-6xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.history.back()} className="mb-8 text-muted-foreground hover:text-[var(--byti-blue)]">
          <ArrowLeft className="h-4 w-4 mr-2" /> Retour
        </Button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-square rounded-3xl overflow-hidden bg-[oklch(0.97_0.005_260)] border border-border/40"
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
            <span className="pill-badge w-fit mb-5">★ Produit BYTI</span>

            {product.model && (
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                Réf. {product.model}
              </div>
            )}

            <h1 className="editorial-title text-3xl md:text-5xl">
              {product.name}
            </h1>

            <div className="dot-divider !my-6 !mx-0 !justify-start">
              <span className="dot-divider-dot" />
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-[var(--byti-blue)] font-display">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.price && product.compare_at_price && product.compare_at_price > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(Number(product.compare_at_price), product.currency)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed text-base">{product.description}</p>

            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mb-6 p-6 rounded-2xl bg-[oklch(0.97_0.005_260)] border border-border/40">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--byti-blue)] mb-4">
                  Caractéristiques techniques
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="text-sm font-semibold text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm mb-6">
              {product.stock > 0 ? (
                <span className="tag-pill tag-pill-blue">
                  <Check className="h-3 w-3" /> En stock ({product.stock} disponibles)
                </span>
              ) : (
                <span className="tag-pill tag-pill-red">Rupture de stock</span>
              )}
            </div>

            {!product.price ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="btn-byti-red flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide"
                >
                  Demander un devis
                </button>
                <Button size="lg" variant="outline" asChild className="rounded-full">
                  <a
                    href={`https://wa.me/22676767663?text=${encodeURIComponent(`Bonjour BYTI, je souhaite plus d'informations sur : ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp BYTI
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm text-muted-foreground">Quantité :</span>
                  <Button size="icon" variant="outline" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-full">
                    −
                  </Button>
                  <span className="w-8 text-center font-medium">{qty}</span>
                  <Button size="icon" variant="outline" onClick={() => setQty(Math.min(product.stock, qty + 1))} className="rounded-full">
                    +
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="flex-1 rounded-full bg-[var(--byti-blue)] hover:bg-[var(--byti-blue-deep)]"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      add(
                        { id: product.id, name: product.name, price: Number(product.price), currency: product.currency, image_url: product.image_url },
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
                    className="rounded-full"
                    disabled={product.stock <= 0}
                    onClick={() => {
                      add(
                        { id: product.id, name: product.name, price: Number(product.price), currency: product.currency, image_url: product.image_url },
                        qty
                      );
                      setOpen(true);
                    }}
                  >
                    Acheter maintenant
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Demander un devis</DialogTitle>
            <DialogDescription>
              Votre demande sera envoyée directement à BYTI via WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitQuote} className="space-y-4">
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Produit : </span>
              <span className="font-medium">{product.name}</span>
              {product.model && (
                <span className="text-muted-foreground"> · {product.model}</span>
              )}
            </div>
            <div>
              <Label htmlFor="q-name">Votre nom *</Label>
              <Input
                id="q-name"
                required
                maxLength={100}
                value={quoteForm.name}
                onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="q-phone">Téléphone (WhatsApp) *</Label>
              <Input
                id="q-phone"
                type="tel"
                required
                maxLength={30}
                placeholder="+226 ..."
                value={quoteForm.phone}
                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="q-message">Message (optionnel)</Label>
              <Textarea
                id="q-message"
                rows={3}
                maxLength={1000}
                value={quoteForm.message}
                onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={quoteSubmitting} className="w-full">
                {quoteSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Envoyer la demande
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
