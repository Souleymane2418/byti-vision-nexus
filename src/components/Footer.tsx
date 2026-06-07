import { Smartphone, Camera, Battery, Monitor, HardHat, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import bytiLogo from "@/assets/byti-logo.png";
import { SocialLinksCompact } from "@/components/SocialLinks";

const activities = [
  { icon: Smartphone, label: "Électronique", to: "/electronique" },
  { icon: Camera, label: "Sécurité", to: "/securite" },
  { icon: Battery, label: "Énergie", to: "/batteries" },
  { icon: Monitor, label: "Téléviseurs", to: "/televiseurs" },
  { icon: HardHat, label: "BTP", to: "/btp" },
] as const;

const quickLinks = [
  { label: "Accueil", to: "/", hash: "" },
  { label: "Activités", to: "/activites", hash: "" },
  { label: "À propos", to: "/a-propos", hash: "" },
  { label: "Projets", to: "/projets", hash: "" },
  { label: "Contact", to: "/contact", hash: "" },
  { label: "Boutique", to: "/boutique", hash: "" },
] as const;

export function Footer() {
  return (
    <footer className="border-t-2 border-byti-blue bg-byti-blue-deep text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 inline-block relative">
              <span className="absolute inset-0 -m-2 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,oklch(0.5_0.13_240/0.35),transparent_60%),radial-gradient(circle_at_70%_70%,oklch(0.56_0.21_28/0.3),transparent_60%)] blur-xl" />
              <div className="relative bg-white rounded-2xl px-4 py-3 shadow-[0_12px_40px_-12px_oklch(0.5_0.13_240/0.35)] ring-1 ring-byti-blue/10">
                <img src={bytiLogo} alt="BYTI Technologie SARL" className="h-16 w-auto" />
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-byti-yellow mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-byti-red" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-byti-blue-deep">
                ​ BYTI
              </span>
            </div>
            <p className="text-sm text-white/85 leading-relaxed">
              Filiale africaine de <span className="font-semibold text-white">BYTI </span>, multinationale spécialisée en technologie, énergie et infrastructure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    hash={link.hash || undefined}
                    className="text-sm text-white/65 hover:text-byti-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-4">
              Activités
            </h4>
            <ul className="space-y-2">
              {activities.map((a) => (
                <li key={a.label}>
                  <Link
                    to={a.to}
                    className="flex items-center gap-2 text-sm text-white/85 hover:text-byti-yellow transition-colors"
                  >
                    <a.icon className="w-4 h-4 text-byti-yellow" />
                    <span>{a.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/85 mb-6">
              <li>
                <a href="mailto:contact@bytitechnologie.com" className="text-white/65 hover:text-byti-yellow transition-colors">
                  contact@bytitechnologie.com
                </a>
              </li>
              <li>
                <a href="tel:+22676767663" className="text-white/65 hover:text-byti-yellow transition-colors">+226 76 76 76 63</a>
              </li>
              <li>
                <a href="tel:+22670681212" className="text-white/65 hover:text-byti-yellow transition-colors">+226 70 68 12 12</a>
              </li>
            </ul>
            <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-3">
              Réseaux sociaux
            </h4>
            <SocialLinksCompact />
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2 rounded-2xl border border-white/15 bg-white/5 p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-byti-yellow shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-3">
                  Plan d'emplacement
                </h4>
                <p className="text-sm text-white/75 leading-relaxed">
                  BYTI Technologie International — Av. Kwame Nkrumah, Ouagadougou.
                </p>
                <p className="mt-3 text-xs text-white/55">12.367392, -1.519113</p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=12.36739236517424,-1.519113363344027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-byti-yellow hover:text-white transition-colors"
                >
                  Obtenir l'itinéraire →
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-white/15 bg-white/5 min-h-[280px]">
            <iframe
              title="Carte BYTI Technologie — Ouagadougou"
              src="https://maps.google.com/maps?q=loc:12.36739236517424,-1.519113363344027&hl=fr&z=18&output=embed"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block w-full h-full min-h-[280px]"
            />
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white/50">&copy; {new Date().getFullYear()} BYTI Technologie SARL. Tous droits réservés.</p>
          <p className="text-byti-yellow font-bold tracking-wide">Connecter · Construire · Innover</p>
        </div>
      </div>
    </footer>
  );
}
