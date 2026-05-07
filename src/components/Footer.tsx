import { Smartphone, Camera, Battery, Monitor, HardHat } from "lucide-react";
import bytiLogo from "@/assets/byti-logo.png";

const activities = [
  { icon: Smartphone, label: "Électronique" },
  { icon: Camera, label: "Sécurité" },
  { icon: Battery, label: "Énergie" },
  { icon: Monitor, label: "Téléviseurs" },
  { icon: HardHat, label: "BTP" },
];

const quickLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "Activités", href: "#services" },
  { label: "À propos", href: "#about" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

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
                Membre du Groupe BYTI
              </span>
            </div>
            <p className="text-sm text-white/85 leading-relaxed">
              Filiale africaine de <span className="font-semibold text-white">BYTI Worldwide</span>, multinationale spécialisée en technologie, énergie et infrastructure.
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
                  <a href={link.href} className="text-sm text-white/65 hover:text-byti-yellow transition-colors">
                    {link.label}
                  </a>
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
                <li key={a.label} className="flex items-center gap-2">
                  <a.icon className="w-4 h-4 text-byti-yellow" />
                  <span className="text-sm text-white/85">{a.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-byti-yellow tracking-wide uppercase mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li>contact@bytitechnologie.com</li>
              <li>
                <a href="tel:+22676767663" className="text-white/65 hover:text-byti-yellow transition-colors">+226 76 76 76 63</a>
              </li>
              <li>
                <a href="tel:+22670681212" className="text-white/65 hover:text-byti-yellow transition-colors">+226 70 68 12 12</a>
              </li>
              <li>
                <a
                  href="https://web.facebook.com/people/BYTI-Technologie-Internationale/61577925500422/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/65 hover:text-byti-yellow transition-colors"
                >
                  Facebook : BYTI Technologie Internationale
                </a>
              </li>
            </ul>
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
