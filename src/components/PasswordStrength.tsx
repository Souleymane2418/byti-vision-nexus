import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PasswordRule = {
  label: string;
  test: (pwd: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  { label: "Au moins 8 caractères", test: (p) => p.length >= 8 },
  { label: "Une lettre majuscule", test: (p) => /[A-Z]/.test(p) },
  { label: "Une lettre minuscule", test: (p) => /[a-z]/.test(p) },
  { label: "Un chiffre", test: (p) => /\d/.test(p) },
  { label: "Un caractère spécial (!@#$…)", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export function getPasswordScore(pwd: string): number {
  return passwordRules.reduce((acc, r) => acc + (r.test(pwd) ? 1 : 0), 0);
}

const levels = [
  { label: "Très faible", color: "bg-red-500", text: "text-red-600" },
  { label: "Faible", color: "bg-red-500", text: "text-red-600" },
  { label: "Moyen", color: "bg-orange-500", text: "text-orange-600" },
  { label: "Bon", color: "bg-yellow-500", text: "text-yellow-600" },
  { label: "Fort", color: "bg-lime-500", text: "text-lime-600" },
  { label: "Excellent", color: "bg-green-600", text: "text-green-700" },
];

export function PasswordStrength({ password }: { password: string }) {
  const score = getPasswordScore(password);
  const level = levels[score];
  const pct = (score / passwordRules.length) * 100;

  return (
    <div className="mt-2 space-y-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={cn("h-full transition-all duration-300", level.color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {password && (
        <div className={cn("text-xs font-medium", level.text)}>
          Robustesse : {level.label}
        </div>
      )}
      <ul className="space-y-1">
        {passwordRules.map((r) => {
          const ok = r.test(password);
          return (
            <li
              key={r.label}
              className={cn(
                "flex items-center gap-2 text-xs",
                ok ? "text-green-700" : "text-muted-foreground",
              )}
            >
              {ok ? (
                <Check className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              )}
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
