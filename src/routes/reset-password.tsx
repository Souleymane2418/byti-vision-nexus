import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import bytiLogo from "@/assets/byti-logo.png";
import { PasswordStrength, getPasswordScore } from "@/components/PasswordStrength";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Réinitialiser le mot de passe | BYTI" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase recovery link déclenche un événement PASSWORD_RECOVERY
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setReady(true);
      }
    });
    // En cas d'arrivée déjà authentifié
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("8 caractères minimum");
    if (password !== confirm) return toast.error("Les mots de passe ne correspondent pas");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Mot de passe mis à jour");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-byti-blue flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <Link to="/" className="flex justify-center mb-6">
          <img src={bytiLogo} alt="BYTI" className="h-14" />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-2">Nouveau mot de passe</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Choisissez un nouveau mot de passe pour votre compte BYTI.
        </p>

        {!ready ? (
          <div className="text-center py-8 text-sm text-muted-foreground">
            <Loader2 className="h-5 w-5 mx-auto mb-3 animate-spin" />
            Vérification du lien…
            <p className="mt-3 text-xs">
              Si rien ne s'affiche, le lien a expiré.{" "}
              <Link to="/login" className="underline hover:text-byti-blue">
                Demander un nouveau lien
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="confirm">Confirmer</Label>
              <Input
                id="confirm"
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-byti-blue hover:bg-byti-blue-deep"
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Mettre à jour le mot de passe
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
