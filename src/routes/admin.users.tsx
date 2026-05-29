import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createStaffUser, listStaffUsers, setUserRole, deleteStaffUser } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Shield, ShieldOff } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin/users")({
  component: UsersAdmin,
});

type StaffUser = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  created_at: string;
  roles: string[];
  protected?: boolean;
};

function UsersAdmin() {
  const { isAdmin, user } = useAuth();
  const list = useServerFn(listStaffUsers);
  const create = useServerFn(createStaffUser);
  const setRole = useServerFn(setUserRole);
  const del = useServerFn(deleteStaffUser);

  const [rows, setRows] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", fullName: "", role: "staff" as "admin" | "staff" });

  const load = async () => {
    setLoading(true);
    try {
      const res = await list();
      setRows(res as StaffUser[]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (!isAdmin) {
    return <p className="text-muted-foreground">Accès réservé à l'administrateur.</p>;
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await create({ data: form });
      toast.success("Compte créé");
      setOpen(false);
      setForm({ email: "", password: "", fullName: "", role: "staff" });
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };

  const toggleRole = async (u: StaffUser, role: "admin" | "staff") => {
    const action = u.roles.includes(role) ? "remove" : "add";
    if (u.protected && role === "admin" && action === "remove") {
      toast.error("Ce compte doit rester administrateur.");
      return;
    }
    try {
      await setRole({ data: { targetUserId: u.user_id, role, action } });
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Erreur"); }
  };

  const remove = async (u: StaffUser) => {
    if (!confirm(`Supprimer le compte ${u.email} ?`)) return;
    try {
      await del({ data: { targetUserId: u.user_id } });
      toast.success("Compte supprimé");
      load();
    } catch (e) { toast.error(e instanceof Error ? e.message : "Erreur"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Personnel</h1>
        <Button onClick={() => setOpen(true)} className="bg-byti-blue hover:bg-byti-blue-deep">
          <Plus className="h-4 w-4 mr-1" /> Nouveau compte
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Rôles</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.user_id} className="border-t">
                  <td className="px-4 py-3">{u.full_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span>{u.email}</span>
                      {u.protected && <span className="text-xs font-semibold text-byti-red">Administrateur principal protégé</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {u.roles.length === 0 && <span className="text-xs text-muted-foreground">aucun</span>}
                      {u.roles.map((r) => (
                        <span key={r} className={`px-2 py-0.5 rounded text-xs ${r === "admin" ? "bg-byti-red/10 text-byti-red" : "bg-byti-blue/10 text-byti-blue"}`}>{r}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => toggleRole(u, "staff")}>
                      {u.roles.includes("staff") ? <ShieldOff className="h-3.5 w-3.5 mr-1" /> : <Shield className="h-3.5 w-3.5 mr-1" />}
                      Staff
                    </Button>
                    <Button size="sm" variant="outline" disabled={u.protected} onClick={() => toggleRole(u, "admin")}>
                      {u.roles.includes("admin") ? <ShieldOff className="h-3.5 w-3.5 mr-1" /> : <Shield className="h-3.5 w-3.5 mr-1" />}
                      Admin
                    </Button>
                    {u.user_id !== user?.id && !u.protected && (
                      <Button size="icon" variant="ghost" onClick={() => remove(u)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && <tr><td colSpan={4} className="text-center py-12 text-muted-foreground">Aucun compte</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Créer un compte personnel</DialogTitle></DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Nom complet</Label>
              <Input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <Label>Mot de passe (min 8)</Label>
              <Input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div>
              <Label>Rôle</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as "admin" | "staff" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff (gérer la boutique)</SelectItem>
                  <SelectItem value="admin">Admin (tous les droits)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit" disabled={saving} className="bg-byti-blue hover:bg-byti-blue-deep">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Créer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
