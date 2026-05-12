import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Upload, X, ArrowUp, ArrowDown, Star } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdmin,
});

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  category: "smartphones" | "televisions" | "security" | "toys" | "energy";
  price: number | null;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  stock: number;
  featured: boolean;
  active: boolean;
  model: string | null;
};

const CATEGORIES = [
  { value: "energy", label: "Énergie & batteries" },
  { value: "smartphones", label: "Smartphones" },
  { value: "televisions", label: "Téléviseurs" },
  { value: "security", label: "Sécurité & vidéo" },
  { value: "toys", label: "Jouets enfants" },
] as const;

type FormState = {
  id?: string;
  name: string;
  description: string;
  category: ProductRow["category"];
  price: string;
  compare_at_price: string;
  stock: string;
  model: string;
  featured: boolean;
  active: boolean;
  image_url: string;
};

const empty: FormState = {
  name: "",
  description: "",
  category: "smartphones",
  price: "",
  compare_at_price: "",
  stock: "0",
  model: "",
  featured: false,
  active: true,
  image_url: "",
};

function ProductsAdmin() {
  const [list, setList] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setList((data ?? []) as ProductRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setOpen(true); };
  const openEdit = (p: ProductRow) => {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      category: p.category,
      price: p.price?.toString() ?? "",
      compare_at_price: p.compare_at_price?.toString() ?? "",
      stock: p.stock.toString(),
      model: p.model ?? "",
      featured: p.featured,
      active: p.active,
      image_url: p.image_url ?? "",
    });
    setOpen(true);
  };

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
      toast.success("Image téléchargée");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erreur upload");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description || null,
      category: form.category,
      price: form.price ? Number(form.price) : null,
      compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
      stock: Number(form.stock || 0),
      model: form.model || null,
      featured: form.featured,
      active: form.active,
      image_url: form.image_url || null,
    };
    const res = form.id
      ? await supabase.from("products").update(payload).eq("id", form.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (res.error) return toast.error(res.error.message);
    toast.success(form.id ? "Produit mis à jour" : "Produit créé");
    setOpen(false);
    load();
  };

  const remove = async (p: ProductRow) => {
    if (!confirm(`Supprimer "${p.name}" ?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else { toast.success("Produit supprimé"); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Produits</h1>
        <Button onClick={openNew} className="bg-byti-blue hover:bg-byti-blue-deep">
          <Plus className="h-4 w-4 mr-1" /> Nouveau produit
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : (
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">État</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-4 py-2">
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="h-12 w-12 rounded object-cover" />
                    ) : <div className="h-12 w-12 bg-slate-100 rounded" />}
                  </td>
                  <td className="px-4 py-2 font-medium">{p.name}</td>
                  <td className="px-4 py-2 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-2">{p.price ? `${p.price.toLocaleString()} ${p.currency}` : "—"}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">
                    {p.active ? <span className="text-green-700">actif</span> : <span className="text-muted-foreground">masqué</span>}
                    {p.featured && <span className="ml-2 text-amber-600">★</span>}
                  </td>
                  <td className="px-4 py-2 text-right space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(p)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">Aucun produit</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Modifier le produit" : "Nouveau produit"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label>Nom</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as ProductRow["category"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Modèle</Label>
                <Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
              </div>
              <div>
                <Label>Prix (XAF)</Label>
                <Input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label>Prix barré</Label>
                <Input type="number" min={0} value={form.compare_at_price} onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })} />
              </div>
              <div>
                <Label>Stock</Label>
                <Input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  <span className="text-sm">Mis en avant</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                  <span className="text-sm">Actif</span>
                </label>
              </div>
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label>Image</Label>
                <div className="flex items-center gap-3">
                  {form.image_url && <img src={form.image_url} alt="" className="h-16 w-16 rounded object-cover" />}
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm hover:bg-slate-50">
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    Choisir une image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                    />
                  </label>
                  <Input
                    placeholder="ou URL d'image"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button type="submit" disabled={saving} className="bg-byti-blue hover:bg-byti-blue-deep">
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {form.id ? "Enregistrer" : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
