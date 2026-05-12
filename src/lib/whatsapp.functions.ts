import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const QuoteSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  customer_phone: z.string().trim().min(6).max(30),
  product_name: z.string().trim().min(1).max(200),
  product_model: z.string().trim().max(100).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
});

const OrderItemSchema = z.object({
  name: z.string().trim().min(1).max(200),
  quantity: z.number().int().min(1).max(999),
  price: z.number().min(0),
});

const OrderSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  customer_phone: z.string().trim().min(6).max(30),
  customer_email: z.string().trim().max(150).optional().nullable(),
  customer_address: z.string().trim().max(500).optional().nullable(),
  notes: z.string().trim().max(1000).optional().nullable(),
  payment_method: z.enum(["orange_money", "moov_money", "wave", "cash_on_delivery"]),
  payment_phone: z.string().trim().max(30).optional().nullable(),
  items: z.array(OrderItemSchema).min(1).max(50),
  total: z.number().min(0),
  currency: z.string().trim().min(2).max(10),
});

const PAYMENT_LABELS: Record<string, string> = {
  orange_money: "🟠 Orange Money",
  moov_money: "🔵 Moov Money",
  wave: "🌊 Wave",
  cash_on_delivery: "💵 Paiement à la livraison",
};

// BYTI WhatsApp number (international format, digits only)
const BYTI_WHATSAPP_NUMBER = "22676038813";

export const sendWhatsAppOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => OrderSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const notesWithPayment =
      (data.notes?.trim() ? data.notes.trim() + "\n\n" : "") +
      `Paiement: ${PAYMENT_LABELS[data.payment_method] ?? data.payment_method}` +
      (data.payment_phone ? ` (${data.payment_phone})` : "");

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email ?? null,
        customer_address: data.customer_address ?? null,
        notes: notesWithPayment,
        items: data.items,
        total: data.total,
        currency: data.currency,
        status: "created",
      })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Order insert failed:", insertError);
      return {
        ok: false as const,
        order_id: null,
        status: "error" as const,
        wa_url: null,
        error: "Impossible d'enregistrer la commande.",
      };
    }

    const orderId = inserted.id;

    const itemsText = data.items
      .map(
        (i) =>
          `  • ${i.name} x ${i.quantity} - ${(i.price * i.quantity).toLocaleString("fr-FR")} ${data.currency}`,
      )
      .join("\n");

    const text =
      `🛒 *NOUVELLE COMMANDE - BYTI*\n\n` +
      `🆔 Réf: ${orderId.slice(0, 8).toUpperCase()}\n` +
      `👤 Client: ${data.customer_name}\n` +
      `📞 Téléphone: ${data.customer_phone}\n` +
      (data.customer_email ? `📧 Email: ${data.customer_email}\n` : "") +
      (data.customer_address ? `📍 Adresse: ${data.customer_address}\n` : "") +
      `\n💳 Paiement: ${PAYMENT_LABELS[data.payment_method] ?? data.payment_method}` +
      (data.payment_phone ? `\n📱 N° paiement: ${data.payment_phone}` : "") +
      `\n\n📦 Articles:\n${itemsText}\n\n` +
      `💰 TOTAL: ${data.total.toLocaleString("fr-FR")} ${data.currency}` +
      (data.notes ? `\n\n📝 Notes:\n${data.notes}` : "");

    const wa_url = `https://wa.me/${BYTI_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    await supabaseAdmin
      .from("orders")
      .update({ status: "whatsapp_sent" })
      .eq("id", orderId);

    return {
      ok: true as const,
      order_id: orderId,
      status: "whatsapp_sent" as const,
      wa_url,
    };
  });

const OrderStatusInput = z.object({ id: z.string().uuid() });

export const getOrderStatus = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => OrderStatusInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("orders")
      .select("id, status, customer_name, customer_phone, total, currency, items, notes, created_at, updated_at")
      .eq("id", data.id)
      .maybeSingle();
    if (error) {
      console.error("getOrderStatus error:", error);
      return { ok: false as const, error: "Commande introuvable" };
    }
    if (!row) return { ok: false as const, error: "Commande introuvable" };
    return { ok: true as const, order: row };
  });

export const sendWhatsAppQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuoteSchema.parse(input))
  .handler(async ({ data }) => {
    const text =
      `🛒 *Nouvelle demande de devis - BYTI*\n\n` +
      `👤 Client: ${data.customer_name}\n` +
      `📞 Téléphone: ${data.customer_phone}\n\n` +
      `📦 Produit: ${data.product_name}` +
      (data.product_model ? `\n🔖 Réf: ${data.product_model}` : "") +
      (data.message ? `\n\n💬 Message:\n${data.message}` : "");

    const wa_url = `https://wa.me/${BYTI_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    return { ok: true as const, wa_url };
  });
