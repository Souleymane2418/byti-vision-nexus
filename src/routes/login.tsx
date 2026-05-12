import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import bytiLogo from "@/assets/byti-logo.png";
import { PasswordStrength, getPasswordScore } from "@/components/PasswordStrength";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Connexion personnel | BYTI" }, { name: "robots", content: "noindex" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Connexion réussie");
        navigate({ to: "/admin" });
      } else if (mode === "signup") {
        if (getPasswordScore(password) < 4) {
          toast.error("Mot de passe trop faible. Respectez les règles affichées.");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Compte créé. Vous pouvez vous connecter.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Email envoyé ! Consultez votre boîte de réception.");
        setMode("login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "login"
      ? "Connectez-vous pour gérer la boutique"
      : mode === "signup"
      ? "Créer le compte administrateur"
      : "Recevez un lien pour réinitialiser votre mot de passe";

  const cta =
    mode === "login" ? "Se connecter" : mode === "signup" ? "Créer le compte" : "Envoyer le lien";

  return (
    <div className="min-h-screen bg-byti-blue flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <Link to="/" className="flex justify-center mb-6">
          <img src={bytiLogo} alt="BYTI" className="h-14" />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-2">Espace personnel</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">{title}</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {mode !== "forgot" && (
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
              {mode === "signup" && <PasswordStrength password={password} />}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full bg-byti-blue hover:bg-byti-blue-deep">
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {cta}
          </Button>
        </form>

        <div className="text-center mt-6 text-sm text-muted-foreground space-y-2">
          {mode === "login" && (
            <>
              <div>
                <button onClick={() => setMode("forgot")} className="hover:text-byti-blue underline">
                  Mot de passe oublié ?
                </button>
              </div>
              <div>
                <button onClick={() => setMode("signup")} className="hover:text-byti-blue underline">
                  Créer le premier compte admin
                </button>
              </div>
            </>
          )}
          {mode !== "login" && (
            <button onClick={() => setMode("login")} className="hover:text-byti-blue underline">
              ← Retour à la connexion
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
