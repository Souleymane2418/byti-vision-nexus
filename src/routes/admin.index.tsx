import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, ShoppingBag, Users } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    (async () => {
      const [{ count: pc }, { count: oc }] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
      ]);
      setStats({ products: pc ?? 0, orders: oc ?? 0 });
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/products" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
          <Package className="h-8 w-8 text-byti-blue mb-3" />
          <div className="text-3xl font-bold">{stats.products}</div>
          <div className="text-sm text-muted-foreground">Produits dans le catalogue</div>
        </Link>
        <Link to="/admin/orders" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
          <ShoppingBag className="h-8 w-8 text-byti-red mb-3" />
          <div className="text-3xl font-bold">{stats.orders}</div>
          <div className="text-sm text-muted-foreground">Commandes reçues</div>
        </Link>
        {isAdmin && (
          <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
            <Users className="h-8 w-8 text-byti-blue mb-3" />
            <div className="text-base font-semibold">Gérer le personnel</div>
            <div className="text-sm text-muted-foreground">Créer ou supprimer des comptes</div>
          </Link>
        )}
      </div>
    </div>
  );
}
