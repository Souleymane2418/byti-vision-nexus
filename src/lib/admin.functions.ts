import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
  role: z.enum(["admin", "staff"]),
});

export const createStaffUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => CreateUserSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const { data: roles, error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (roleErr) throw new Error(roleErr.message);
    if (!roles?.some((r) => r.role === "admin")) {
      throw new Error("Seul un administrateur peut créer des comptes.");
    }

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName },
    });
    if (error || !created.user) throw new Error(error?.message ?? "Création impossible");

    const newId = created.user.id;

    await supabaseAdmin
      .from("profiles")
      .upsert({ user_id: newId, email: data.email, full_name: data.fullName }, { onConflict: "user_id" });

    const { error: rErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: newId, role: data.role });
    if (rErr) throw new Error(rErr.message);

    return { ok: true, userId: newId };
  });

const SetRoleSchema = z.object({
  targetUserId: z.string().uuid(),
  role: z.enum(["admin", "staff"]),
  action: z.enum(["add", "remove"]),
});

export const setUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => SetRoleSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (!roles?.some((r) => r.role === "admin")) {
      throw new Error("Seul un administrateur peut modifier les rôles.");
    }

    if (data.action === "add") {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: data.targetUserId, role: data.role });
      if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.targetUserId)
        .eq("role", data.role);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteStaffUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ targetUserId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { userId } = context;
    if (data.targetUserId === userId) throw new Error("Vous ne pouvez pas vous supprimer.");
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (!roles?.some((r) => r.role === "admin")) {
      throw new Error("Seul un administrateur peut supprimer un compte.");
    }
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.targetUserId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listStaffUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { data: myRoles } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (!myRoles?.some((r) => r.role === "admin")) {
      throw new Error("Accès réservé à l'administrateur.");
    }

    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("user_id,email,full_name,created_at")
      .order("created_at", { ascending: false });

    const { data: allRoles } = await supabaseAdmin
      .from("user_roles")
      .select("user_id,role");

    const byUser: Record<string, string[]> = {};
    (allRoles ?? []).forEach((r) => {
      byUser[r.user_id] = [...(byUser[r.user_id] ?? []), r.role];
    });

    return (profiles ?? []).map((p) => ({
      user_id: p.user_id,
      email: p.email,
      full_name: p.full_name,
      created_at: p.created_at,
      roles: byUser[p.user_id] ?? [],
    }));
  });
