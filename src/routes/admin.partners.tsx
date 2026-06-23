import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
} from "lucide-react";

export const Route = createFileRoute("/admin/partners")({
  component: PartnersAdmin,
  head: () => ({ meta: [{ title: "Partenaires | Admin BYTI" }] }),
});

type PartnerRow = {
  id: string;
  name: string;
  logo_url: string | null;
  position: number;
  active: boolean;
};

type FormState = {
  id?: string;
  name: string;
  logo_url: string;
  active: boolean;
};

const empty: FormState = { name: "", logo_url: "", active: true };

function PartnersAdmin() {
  const [list, setList] = useState<PartnerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) toast.error(error.message);
    setList((data ?? []) as PartnerRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => {
    setForm(empty);
    setOpen(true);
  };
  const openEdit = (p: PartnerRow) => {
    setForm({ id: p.id, name: p.name, logo_url: p.logo_url ?? "", active: p.active });
    setOpen(true);
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `partners/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("product-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, logo_url: data.publicUrl }));
      toast.success("Logo téléchargé");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur d'upload");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      logo_url: form.logo_url.trim() || null,
      active: form.active,
    };
    if (!payload.name) {
      setSaving(false);
      return toast.error("Le nom est requis");
    }
    if (form.id) {
      const { error } = await supabase.from("partners").update(payload).eq("id", form.id);
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
    } else {
      const nextPos = list.length > 0 ? Math.max(...list.map((p) => p.position)) + 1 : 0;
      const { error } = await supabase
        .from("partners")
        .insert({ ...payload, position: nextPos });
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
    }
    setSaving(false);
    toast.success(form.id ? "Partenaire mis à jour" : "Partenaire ajouté");
    setOpen(false);
    load();
  };

  const remove = async (p: PartnerRow) => {
    if (!confirm(`Supprimer "${p.name}" ?`)) return;
    const { error } = await supabase.from("partners").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Partenaire supprimé");
      load();
    }
  };

  const toggleActive = async (p: PartnerRow) => {
    const { error } = await supabase
      .from("partners")
      .update({ active: !p.active })
      .eq("id", p.id);
    if (error) toast.error(error.message);
    else load();
  };

  const move = async (p: PartnerRow, dir: -1 | 1) => {
    const idx = list.findIndex((x) => x.id === p.id);
    const j = idx + dir;
    if (j < 0 || j >= list.length) return;
    const other = list[j];
    const { error } = await supabase.from("partners").upsert([
      { ...p, position: other.position },
      { ...other, position: p.position },
    ]);
    if (error) toast.error(error.message);
    else load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Partenaires</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Logos affichés en défilement sur la page d'accueil.
          </p>
        </div>
        <Button onClick={openNew} className="bg-byti-blue hover:bg-byti-blue-deep">
          <Plus className="h-4 w-4 mr-1" /> Nouveau partenaire
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3 w-20">Ordre</th>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">État</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p, idx) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={idx === 0}
                        onClick={() => move(p, -1)}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={idx === list.length - 1}
                        onClick={() => move(p, 1)}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {p.logo_url ? (
                      <img
                        src={p.logo_url}
                        alt={p.name}
                        className="h-12 w-24 object-contain bg-white border rounded p-1"
                      />
                    ) : (
                      <div className="h-12 w-24 bg-slate-100 rounded flex items-center justify-center text-xs text-muted-foreground">
                        sans logo
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 font-medium">{p.name}</td>
                  <td className="px-4 py-2">
                    {p.active ? (
                      <span className="text-green-700">visible</span>
                    ) : (
                      <span className="text-muted-foreground">masqué</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-right space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => toggleActive(p)} title={p.active ? "Masquer" : "Afficher"}>
                      {p.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(p)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-muted-foreground">
                    Aucun partenaire pour le moment. Cliquez sur "Nouveau partenaire".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {form.id ? "Modifier le partenaire" : "Nouveau partenaire"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Nom de la marque</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex. Samsung"
              />
            </div>

            <div>
              <Label>Logo</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Téléchargez un fichier PNG/SVG transparent, ou collez une URL.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-slate-50">
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Téléverser un logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])}
                  />
                </label>
              </div>
              <Input
                placeholder="ou URL du logo (https://...)"
                value={form.logo_url}
                onChange={(e) => setForm({ ...form, logo_url: e.target.value })}
              />
              {form.logo_url && (
                <div className="mt-3 p-4 border rounded-lg bg-slate-50 flex items-center justify-center">
                  <img
                    src={form.logo_url}
                    alt="Aperçu"
                    className="h-16 max-w-[200px] object-contain"
                  />
                </div>
              )}
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span className="text-sm">Visible sur le site</span>
            </label>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-byti-blue hover:bg-byti-blue-deep"
              >
                {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
                {form.id ? "Mettre à jour" : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
