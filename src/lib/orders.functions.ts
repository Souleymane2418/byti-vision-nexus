import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isStaff, error: roleError } = await supabase.rpc("is_staff", { _user_id: userId });
    if (roleError || !isStaff) {
      return { orders: [], error: "Accès réservé au personnel BYTI." };
    }

    const { data, error } = await supabase
      .from("orders")
      .select("id, customer_name, customer_phone, customer_email, customer_address, items, total, currency, status, notes, stock_validated, validated_at, validated_by, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return { orders: [], error: error.message };
    return { orders: data ?? [], error: null };
  });

export const validateOrderStock = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ order_id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { data: result, error } = await supabaseAdmin.rpc("validate_order_stock", {
      _order_id: data.order_id,
      _validator_id: userId,
    });
    if (error) return { ok: false as const, error: error.message };

    const payload = result as { ok?: boolean; message?: string } | null;
    return { ok: payload?.ok === true, message: payload?.message ?? "Stock validé et déduit." };
  });
