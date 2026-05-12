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
  payment_method: z.enum(["orange_money", "mtn_momo", "cash_on_delivery", "bank_transfer"]),
  payment_phone: z.string().trim().max(30).optional().nullable(),
  items: z.array(OrderItemSchema).min(1).max(50),
  total: z.number().min(0),
  currency: z.string().trim().min(2).max(10),
});

const PAYMENT_LABELS: Record<string, string> = {
  orange_money: "🟠 Orange Money",
  mtn_momo: "🟡 MTN Mobile Money",
  cash_on_delivery: "💵 Paiement à la livraison",
  bank_transfer: "🏦 Virement bancaire",
};

export const sendWhatsAppOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => OrderSchema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

    if (!token || !phoneNumberId || !recipient) {
      return { ok: false, error: "Configuration WhatsApp manquante côté serveur." };
    }

    const itemsText = data.items
      .map(
        (i) =>
          `  • ${i.name} × ${i.quantity} — ${(i.price * i.quantity).toLocaleString("fr-FR")} ${data.currency}`,
      )
      .join("\n");

    const text =
      `🛒 *NOUVELLE COMMANDE - BYTI*\n\n` +
      `👤 *Client:* ${data.customer_name}\n` +
      `📞 *Téléphone:* ${data.customer_phone}\n` +
      (data.customer_email ? `📧 *Email:* ${data.customer_email}\n` : "") +
      (data.customer_address ? `📍 *Adresse:* ${data.customer_address}\n` : "") +
      `\n💳 *Paiement:* ${PAYMENT_LABELS[data.payment_method] ?? data.payment_method}` +
      (data.payment_phone ? `\n📱 *N° paiement:* ${data.payment_phone}` : "") +
      `\n\n📦 *Articles:*\n${itemsText}\n\n` +
      `💰 *TOTAL: ${data.total.toLocaleString("fr-FR")} ${data.currency}*` +
      (data.notes ? `\n\n📝 *Notes:*\n${data.notes}` : "");

    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipient.replace(/[^0-9]/g, ""),
            type: "text",
            text: { body: text },
          }),
        },
      );
      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const err = (json as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`;
        console.error("WhatsApp order error:", err, json);
        return { ok: false, error: err };
      }
      return { ok: true };
    } catch (e) {
      console.error("WhatsApp order send failed:", e);
      return { ok: false, error: "Erreur réseau lors de l'envoi" };
    }
  });

export const sendWhatsAppQuote = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => QuoteSchema.parse(input))
  .handler(async ({ data }) => {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT_NUMBER;

    if (!token || !phoneNumberId || !recipient) {
      return { ok: false, error: "Configuration WhatsApp manquante côté serveur." };
    }

    const text =
      `🛒 *Nouvelle demande de devis - BYTI*\n\n` +
      `👤 *Client:* ${data.customer_name}\n` +
      `📞 *Téléphone:* ${data.customer_phone}\n\n` +
      `📦 *Produit:* ${data.product_name}` +
      (data.product_model ? `\n🔖 *Réf:* ${data.product_model}` : "") +
      (data.message ? `\n\n💬 *Message:*\n${data.message}` : "");

    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipient.replace(/[^0-9]/g, ""),
            type: "text",
            text: { body: text },
          }),
        }
      );

      const json = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        const err = (json as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`;
        console.error("WhatsApp API error:", err, json);
        return { ok: false, error: err };
      }
      return { ok: true };
    } catch (e) {
      console.error("WhatsApp send failed:", e);
      return { ok: false, error: "Erreur réseau lors de l'envoi" };
    }
  });
