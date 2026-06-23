import { createFileRoute, Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, Package, Users, LayoutDashboard, ShoppingBag, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import bytiLogo from "@/assets/byti-logo.png";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({ meta: [{ title: "Espace admin | BYTI" }, { name: "robots", content: "noindex" }] }),
});

function AdminLayout() {
  const { user, isStaff, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Accès non autorisé</h1>
          <p className="text-muted-foreground mb-6">
            Votre compte n'a pas les droits d'accès. Contactez l'administrateur.
          </p>
          <Button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}>
            Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Produits", icon: Package },
    { to: "/admin/orders", label: "Commandes", icon: ShoppingBag },
    { to: "/admin/partners", label: "Partenaires", icon: Handshake },
    ...(isAdmin ? [{ to: "/admin/users" as const, label: "Personnel", icon: Users }] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-byti-blue text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={bytiLogo} alt="BYTI" className="h-8 bg-white rounded p-1" />
            <span className="font-semibold tracking-wide">Espace personnel</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80 hidden sm:block">{user.email}</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
            >
              <LogOut className="h-4 w-4 mr-1" /> Déconnexion
            </Button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const active = t.exact ? location.pathname === t.to : location.pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  active ? "border-byti-yellow text-white" : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
