import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getOrderStatus } from "@/lib/whatsapp.functions";
import { formatPrice } from "@/lib/cart";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Loader2,
  RefreshCw,
  MessageCircle,
  Package,
} from "lucide-react";

export const Route = createFileRoute("/commande/$id")({
  component: OrderTrackingPage,
  head: () => ({
    meta: [
      { title: "Suivi de commande | BYTI Technologie" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type OrderItem = { name: string; quantity: number; price: number };

type OrderRow = {
  id: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  currency: string;
  items: OrderItem[];
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const STATUS_META: Record<
  string,
  { label: string; tone: "blue" | "green" | "red" | "amber"; icon: typeof Clock; description: string }
> = {
  created: {
    label: "Commande créée",
    tone: "blue",
    icon: Clock,
    description: "Votre commande a été enregistrée. Envoi en cours…",
  },
  whatsapp_sent: {
    label: "Envoyée par WhatsApp",
    tone: "green",
    icon: CheckCircle2,
    description: "Notre équipe a reçu votre commande sur WhatsApp et vous contactera très rapidement.",
  },
  whatsapp_error: {
    label: "Erreur d'envoi WhatsApp",
    tone: "red",
    icon: AlertTriangle,
    description:
      "Votre commande a bien été enregistrée mais l'envoi WhatsApp a échoué. Notre équipe sera notifiée et vous recontactera.",
  },
  pending: {
    label: "En attente",
    tone: "amber",
    icon: Clock,
    description: "Votre commande est en attente de traitement.",
  },
};

const TONE_CLASSES: Record<string, string> = {
  blue: "bg-[var(--byti-blue)]/10 text-[var(--byti-blue)] border-[var(--byti-blue)]/30",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  red: "bg-[var(--byti-red)]/10 text-[var(--byti-red)] border-[var(--byti-red)]/30",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
};

function OrderTrackingPage() {
  const { id } = Route.useParams();
  const fetchStatus = useServerFn(getOrderStatus);
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (silent = false) => {
      if (silent) setRefreshing(true);
      else setLoading(true);
      const res = await fetchStatus({ data: { id } });
      if (res.ok) {
        setOrder(res.order as OrderRow);
        setError(null);
      } else {
        setError(res.error ?? "Commande introuvable");
      }
      setLoading(false);
      setRefreshing(false);
    },
    [fetchStatus, id],
  );

  useEffect(() => {
    load();
  }, [load]);

  const meta = order ? STATUS_META[order.status] ?? STATUS_META.pending : null;
  const Icon = meta?.icon ?? Clock;
  const ref = order ? order.id.slice(0, 8).toUpperCase() : "";

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Suivi de commande</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold mt-1">
            {ref ? `Commande #${ref}` : "Commande"}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error || !order || !meta ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <AlertTriangle className="h-10 w-10 mx-auto text-[var(--byti-red)] mb-3" />
            <h2 className="font-display text-xl mb-2">Commande introuvable</h2>
            <p className="text-sm text-muted-foreground mb-6">{error ?? "Aucune commande ne correspond à cet identifiant."}</p>
            <Button asChild>
              <Link to="/boutique">Retour à la boutique</Link>
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className={`rounded-2xl border p-6 ${TONE_CLASSES[meta.tone]}`}>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/70 p-3">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-semibold">{meta.label}</h2>
                  <p className="text-sm mt-1 opacity-90">{meta.description}</p>
                  <p className="text-xs mt-3 opacity-70">
                    Mis à jour le{" "}
                    {new Date(order.updated_at).toLocaleString("fr-FR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4" /> Récapitulatif
                </h3>
                <button
                  onClick={() => load(true)}
                  disabled={refreshing}
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                  Actualiser
                </button>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <dt className="text-muted-foreground text-xs">Client</dt>
                  <dd className="font-medium">{order.customer_name}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Téléphone</dt>
                  <dd className="font-medium">{order.customer_phone}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Date</dt>
                  <dd className="font-medium">
                    {new Date(order.created_at).toLocaleString("fr-FR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground text-xs">Référence</dt>
                  <dd className="font-mono text-xs">#{ref}</dd>
                </div>
              </dl>

              <div className="border-t border-border pt-4 space-y-2">
                {(order.items ?? []).map((it, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {it.name} <span className="text-muted-foreground">× {it.quantity}</span>
                    </span>
                    <span className="font-medium">{formatPrice(it.price * it.quantity, order.currency)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-primary font-bold">{formatPrice(order.total, order.currency)}</span>
              </div>

              {order.notes && (
                <div className="mt-4 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground whitespace-pre-wrap">
                  {order.notes}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/boutique">Continuer vos achats</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a href="https://wa.me/237000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" /> Contacter BYTI
                </a>
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Conservez votre référence #{ref} pour tout suivi avec notre équipe.
            </p>
          </motion.div>
        )}
      </section>
      <Footer />
    </div>
  );
}
