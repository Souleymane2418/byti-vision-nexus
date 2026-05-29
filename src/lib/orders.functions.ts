import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data: myRoles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const isStaff = myRoles?.some((r) => r.role === "admin" || r.role === "staff");
    if (!isStaff) throw new Error("Forbidden");

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("id, customer_name, customer_phone, customer_email, customer_address, items, total, currency, status, notes, stock_validated, validated_at, validated_by, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return { orders: data ?? [] };
  });

export const validateOrderStock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ order_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { data: myRoles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const isStaff = myRoles?.some((r) => r.role === "admin" || r.role === "staff");
    if (!isStaff) throw new Error("Forbidden");

    const { data: order, error: fetchErr } = await supabaseAdmin
      .from("orders")
      .select("id, items, stock_validated")
      .eq("id", data.order_id)
      .maybeSingle();
    if (fetchErr || !order) return { ok: false as const, error: "Commande introuvable" };
    if (order.stock_validated) return { ok: false as const, error: "Stock déjà validé" };

    const items = (order.items as Array<{ id?: string | null; product_id?: string | null; name?: string; quantity: number }>) ?? [];
    const resolvedItems: Array<{ productId: string; quantity: number; name: string }> = [];

    for (const item of items) {
      let productId = item.product_id || item.id || null;
      const name = item.name?.trim() || "Article";
      const quantity = Number(item.quantity || 0);

      if (quantity <= 0) return { ok: false as const, error: `Quantité invalide pour ${name}` };

      if (!productId && item.name) {
        const { data: matchedProducts, error: matchErr } = await supabaseAdmin
          .from("products")
          .select("id, name")
          .ilike("name", `%${item.name.trim()}%`)
          .limit(10);
        if (matchErr) return { ok: false as const, error: matchErr.message };

        const normalizedName = item.name.trim().toLowerCase();
        const matchedProduct =
          matchedProducts?.find((p) => p.name?.trim().toLowerCase() === normalizedName) ?? matchedProducts?.[0];
        productId = matchedProduct?.id ?? null;
      }

      if (!productId) return { ok: false as const, error: `Produit introuvable dans le stock : ${name}` };
      resolvedItems.push({ productId, quantity, name });
    }

    for (const item of resolvedItems) {
      const { error: stockErr } = await supabaseAdmin.rpc("decrement_product_stock", {
        _product_id: item.productId,
        _qty: item.quantity,
      });
      if (stockErr) return { ok: false as const, error: `Stock non déduit pour ${item.name}: ${stockErr.message}` };
    }

    const { error: updErr } = await supabaseAdmin
      .from("orders")
      .update({ stock_validated: true, validated_at: new Date().toISOString(), validated_by: userId, status: "validated" })
      .eq("id", data.order_id);
    if (updErr) return { ok: false as const, error: updErr.message };

    return { ok: true as const };
  });
