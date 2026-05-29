import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listOrders, validateOrderStock } from "@/lib/orders.functions";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

type OrderItem = { product_id?: string | null; name: string; quantity: number; price: number };

function AdminOrders() {
  const fetchOrders = useServerFn(listOrders);
  const validateFn = useServerFn(validateOrderStock);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: () => fetchOrders(),
  });

  const validate = useMutation({
    mutationFn: (order_id: string) => validateFn({ data: { order_id } }),
    onSuccess: (res) => {
      if (res.ok) {
        toast.success(res.message ?? "Stock validé et déduit");
        qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      } else {
        toast.error(res.error ?? "Erreur");
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  const orders = data?.orders ?? [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><Package className="h-7 w-7" /> Commandes</h1>
      {data?.error && (
        <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {data.error}
        </div>
      )}
      {orders.length === 0 ? (
        <p className="text-muted-foreground">Aucune commande pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const items = (o.items as OrderItem[]) ?? [];
            return (
              <div key={o.id} className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-semibold">{o.customer_name} <span className="text-muted-foreground font-normal">• {o.customer_phone}</span></div>
                    <div className="text-xs text-muted-foreground">
                      Réf {o.id.slice(0, 8).toUpperCase()} · {new Date(o.created_at).toLocaleString("fr-FR")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-byti-blue">{Number(o.total).toLocaleString("fr-FR")} {o.currency}</div>
                    <div className="text-xs text-muted-foreground">Statut: {o.status}</div>
                  </div>
                </div>

                <ul className="text-sm space-y-1 mb-4 border-l-2 border-slate-200 pl-3">
                  {items.map((it, idx) => (
                    <li key={idx} className="flex justify-between gap-4">
                      <span>
                        {it.name} <span className="text-muted-foreground">× {it.quantity}</span>
                        {!it.product_id && <span className="ml-2 text-xs text-amber-600">(hors stock)</span>}
                      </span>
                      <span className="text-muted-foreground">{(it.price * it.quantity).toLocaleString("fr-FR")} {o.currency}</span>
                    </li>
                  ))}
                </ul>

                {o.notes && <p className="text-xs text-muted-foreground whitespace-pre-wrap mb-3">{o.notes}</p>}

                <div className="flex items-center justify-between border-t pt-3">
                  {o.stock_validated ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle2 className="h-4 w-4" /> Stock validé
                      {o.validated_at && <span className="text-xs text-muted-foreground">le {new Date(o.validated_at).toLocaleString("fr-FR")}</span>}
                    </div>
                  ) : (
                    <span className="text-sm text-amber-600">En attente de validation</span>
                  )}
                  <Button
                    size="sm"
                    disabled={o.stock_validated || validate.isPending}
                    onClick={() => validate.mutate(o.id)}
                  >
                    {validate.isPending && validate.variables === o.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                    )}
                    Valider la sortie de stock
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
