import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart, formatPrice } from "@/lib/cart";
import { sendWhatsAppOrder } from "@/lib/whatsapp.functions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Commande | BYTI Technologie" }] }),
});

type PaymentMethod = "orange_money" | "moov_money" | "wave" | "cash_on_delivery";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string; needsPhone: boolean; hint?: string }[] = [
  { id: "orange_money", label: "Orange Money", icon: "🟠", needsPhone: true, hint: "Notre équipe vous contactera sur WhatsApp avec les instructions de paiement." },
  { id: "moov_money", label: "Moov Money", icon: "🔵", needsPhone: true, hint: "Notre équipe vous contactera sur WhatsApp avec les instructions de paiement." },
  { id: "wave", label: "Wave", icon: "🌊", needsPhone: true, hint: "Notre équipe vous contactera sur WhatsApp avec les instructions de paiement." },
  { id: "cash_on_delivery", label: "Paiement à la livraison", icon: "💵", needsPhone: false },
];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const sendOrder = useServerFn(sendWhatsAppOrder);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("orange_money");
  const [paymentPhone, setPaymentPhone] = useState("");
  const [form, setForm] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    customer_address: "",
    notes: "",
  });

  const selectedPayment = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)!;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Votre panier est vide");
      return;
    }
    if (form.customer_name.trim().length < 2 || form.customer_phone.trim().length < 6) {
      toast.error("Veuillez renseigner votre nom et téléphone");
      return;
    }
    if (selectedPayment.needsPhone && paymentPhone.trim().length < 6) {
      toast.error(`Veuillez renseigner votre numéro ${selectedPayment.label}`);
      return;
    }
    setSubmitting(true);
    const currency = items[0]?.currency ?? "XAF";
    const orderItems = items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price }));

    const res = await sendOrder({
      data: {
        customer_name: form.customer_name.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_email: form.customer_email.trim() || null,
        customer_address: form.customer_address.trim() || null,
        notes: form.notes.trim() || null,
        payment_method: paymentMethod,
        payment_phone: selectedPayment.needsPhone ? paymentPhone.trim() : null,
        items: orderItems,
        total,
        currency,
      },
    });

    setSubmitting(false);

    if (res?.order_id) {
      clear();
      navigate({ to: "/commande/$id", params: { id: res.order_id } });
      return;
    }

    toast.error(res?.error || "Erreur lors de l'envoi de la commande");
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-28 pb-16 px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Finaliser la commande</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Votre panier est vide</p>
            <Button asChild>
              <Link to="/boutique">Voir la boutique</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1fr_400px] gap-8">
            <form onSubmit={submit} className="space-y-4 bg-card border border-border/50 rounded-2xl p-6">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  required
                  value={form.customer_name}
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={form.customer_phone}
                  onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.customer_email}
                  onChange={(e) => setForm({ ...form, customer_email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse de livraison</Label>
                <Textarea
                  id="address"
                  rows={2}
                  value={form.customer_address}
                  onChange={(e) => setForm({ ...form, customer_address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              <div className="pt-2">
                <Label className="mb-2 block">Mode de paiement *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const active = paymentMethod === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`text-left rounded-xl border px-3 py-2.5 text-sm transition-all ${
                          active
                            ? "border-[var(--byti-blue)] bg-[var(--byti-blue)]/5 ring-2 ring-[var(--byti-blue)]/20"
                            : "border-border hover:border-[var(--byti-blue)]/50"
                        }`}
                      >
                        <span className="mr-1.5">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedPayment.needsPhone && (
                  <div className="mt-3">
                    <Label htmlFor="payphone">Numéro {selectedPayment.label} *</Label>
                    <Input
                      id="payphone"
                      type="tel"
                      required
                      placeholder="ex: 6 XX XX XX XX"
                      value={paymentPhone}
                      onChange={(e) => setPaymentPhone(e.target.value)}
                    />
                  </div>
                )}
                {selectedPayment.hint && (
                  <p className="mt-2 text-xs text-muted-foreground">{selectedPayment.hint}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Confirmer la commande via WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Votre commande sera envoyée à BYTI par WhatsApp. Notre équipe vous recontactera rapidement.
              </p>
            </form>

            <div className="bg-card border border-border/50 rounded-2xl p-6 h-fit">
              <h2 className="font-display font-semibold mb-4">Récapitulatif</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3 text-sm">
                    <span className="flex-1">
                      {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                    </span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity, item.currency)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-primary font-bold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
