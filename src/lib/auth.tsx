import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export type AppRole = "admin" | "staff";

export type AuthState = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  isStaff: boolean;
  isAdmin: boolean;
  loading: boolean;
};

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [rolesUserId, setRolesUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setRoles([]);
      setRolesUserId(null);
      setRolesLoading(false);
      return;
    }
    setRolesLoading(true);
    (async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (!error && data && data.length > 0) {
          setRoles(data.map((r) => r.role as AppRole));
          return;
        }

        const [{ data: isStaff }, { data: isAdmin }] = await Promise.all([
          supabase.rpc("is_staff", { _user_id: user.id }),
          supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
        ]);

        const resolvedRoles: AppRole[] = [];
        if (isAdmin) resolvedRoles.push("admin");
        if (isStaff) resolvedRoles.push("staff");
        setRoles(resolvedRoles);
      } finally {
        setRolesUserId(user.id);
        setRolesLoading(false);
      }
    })();
  }, [user]);

  const loading = authLoading || (!!user && (rolesLoading || rolesUserId !== user.id));

  return {
    user,
    session,
    roles,
    isStaff: roles.includes("admin") || roles.includes("staff"),
    isAdmin: roles.includes("admin"),
    loading,
  };
}
