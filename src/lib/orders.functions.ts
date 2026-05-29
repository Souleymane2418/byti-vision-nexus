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

    const items = (order.items as Array<{ product_id?: string | null; quantity: number }>) ?? [];
    for (const item of items) {
      if (!item.product_id) continue;
      const { error: stockErr } = await supabaseAdmin.rpc("decrement_product_stock", {
        _product_id: item.product_id,
        _qty: item.quantity,
      });
      if (stockErr) console.error("Stock decrement failed:", stockErr);
    }

    const { error: updErr } = await supabaseAdmin
      .from("orders")
      .update({ stock_validated: true, validated_at: new Date().toISOString(), validated_by: userId, status: "validated" })
      .eq("id", data.order_id);
    if (updErr) return { ok: false as const, error: updErr.message };

    return { ok: true as const };
  });
