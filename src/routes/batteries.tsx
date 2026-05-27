import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Battery,
  Zap,
  Sun,
  ShieldCheck,
  Thermometer,
  Recycle,
  Clock,
  Gauge,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EnergyShowcase } from "@/components/EnergyShowcase";
import heroEnergyWide from "@/assets/byti-powerwall.png";

export const Route = createFileRoute("/batteries")({
  component: BatteriesPage,
  head: () => ({
    meta: [
      { title: "Batteries Lithium LiFePO₄ — BYTI Énergie" },
      {
        name: "description",
        content:
          "Découvrez les batteries lithium LiFePO₄ BYTI : 6000+ cycles, jusqu'à 3000 kWh, sécurité maximale et stockage solaire. Solutions complètes pour résidentiel, commercial et industriel.",
      },
      { property: "og:title", content: "Batteries Lithium LiFePO₄ — BYTI" },
      {
        property: "og:description",
        content:
          "Stockage d'énergie nouvelle génération : LiFePO₄, durables, sûres, compatibles solaire. Zéro coupure garantie.",
      },
      { property: "og:image", content: heroEnergyWide },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://byti-technologie.com/batteries" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/batteries" }],
  }),
});

const advantages = [
  {
    icon: Clock,
    title: "Durée de vie exceptionnelle",
    text: "6000+ cycles de charge garantis, soit 3 à 5 fois plus que les batteries plomb traditionnelles.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité LiFePO₄",
    text: "Chimie lithium fer phosphate stable, sans risque d'emballement thermique. BMS intégré protégeant contre surcharge, court-circuit et surchauffe.",
  },
  {
    icon: Thermometer,
    title: "Performance en climat tropical",
    text: "Fonctionnement optimal de -20°C à +60°C. Conçues pour résister aux conditions les plus exigeantes du climat ouest-africain.",
  },
  {
    icon: Gauge,
    title: "Décharge profonde",
    text: "Jusqu'à 95 % de profondeur de décharge utile, contre 50 % pour les batteries plomb. Vous exploitez chaque kWh stocké.",
  },
  {
    icon: Sun,
    title: "100 % solaire-compatible",
    text: "Couplage natif avec onduleurs hybrides et panneaux photovoltaïques. Stockez le jour, consommez la nuit.",
  },
  {
    icon: Recycle,
    title: "Éco-responsables",
    text: "Sans plomb ni cobalt, recyclables, faible empreinte carbone. Un choix durable pour vos installations.",
  },
];

const useCases = [
  {
    badge: "Résidentiel",
    title: "Maisons & villas",
    capacity: "5 — 15 kWh",
    text: "Autonomie totale en cas de coupure. Stockez votre production solaire et alimentez l'ensemble de votre foyer 24/7.",
  },
  {
    badge: "Commercial",
    title: "Bureaux & commerces",
    capacity: "15 — 3000 kWh",
    text: "Continuité d'activité garantie. Réduisez votre facture énergétique tout en sécurisant vos équipements sensibles.",
  },
  {
    badge: "Industriel",
    title: "Sites & ateliers",
    capacity: "3000 kWh+",
    text: "Solutions modulaires extensibles pour usines, ateliers et sites isolés. Stockage haute capacité avec gestion intelligente.",
  },
];

const specs = [
  { label: "Tension nominale", value: "12V / 24V / 48V" },
  { label: "Capacités", value: "100 Ah — 600 Ah" },
  { label: "Cycles (DoD 80%)", value: "6 000+" },
  { label: "Rendement", value: "≥ 95 %" },
  { label: "BMS intégré", value: "Oui" },
  { label: "Garantie", value: "5 — 10 ans" },
];

const faqs = [
  {
    q: "Quelle différence entre LiFePO₄ et lithium-ion classique ?",
    a: "Le LiFePO₄ (lithium fer phosphate) est plus stable thermiquement, plus durable (6000 vs 1000 cycles) et sans cobalt. C'est le standard pour le stockage stationnaire d'énergie.",
  },
  {
    q: "Combien de temps dure l'installation ?",
    a: "Une installation résidentielle standard se réalise en 1 à 2 jours par nos équipes certifiées : étude technique préalable, pose, raccordement, mise en service et formation utilisateur.",
  },
  {
    q: "Les batteries sont-elles compatibles avec mon installation solaire existante ?",
    a: "Dans la majorité des cas oui. Nous réalisons un audit technique gratuit pour vérifier la compatibilité avec vos panneaux et onduleur, et proposer la solution la plus adaptée.",
  },
  {
    q: "Quel est le retour sur investissement ?",
    a: "Selon votre consommation, le ROI moyen se situe entre 4 et 7 ans. Avec une durée de vie de 10+ ans, l'économie nette dépasse souvent le coût initial du système.",
  },
];

function BatteriesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-white">
        <img
          src={heroEnergyWide}
          alt="Installation de batteries lithium BYTI"
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 h-full flex items-center px-6 lg:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md border border-white/20"
              style={{ background: "color-mix(in oklch, var(--byti-red) 70%, transparent)" }}
            >
              <Battery className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Stockage d'énergie nouvelle génération
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              Batteries lithium <br />
              <span style={{ color: "var(--byti-red)" }}>LiFePO₄</span> qui durent
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
              6000+ cycles garantis, jusqu'à 3000 kWh de stockage, sécurité absolue.
              Adoptez le standard mondial du stockage solaire avec BYTI.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/#contact"
                className="btn-byti-red inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#avantages"
                className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide text-white border-[1.5px] border-white/60 hover:bg-white/10 transition-all"
              >
                Découvrir la techno
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-16 px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "6000+", l: "Cycles garantis" },
            { v: "3000 kWh", l: "Capacité max" },
            { v: "95 %", l: "Rendement" },
            { v: "10 ans", l: "Garantie max" },
          ].map((s) => (
            <div
              key={s.l}
              className="text-center p-6 rounded-2xl bg-card border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-blue">
                {s.v}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section
        id="avantages"
        className="py-20 md:py-28 px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "var(--gradient-byti-soft)",
                color: "var(--byti-blue-deep)",
              }}
            >
              Pourquoi LiFePO₄
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Une technologie <span className="gradient-text">supérieure</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Le lithium fer phosphate est aujourd'hui le meilleur compromis entre performance,
              sécurité et durabilité pour le stockage stationnaire d'énergie.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-[color-mix(in_oklch,var(--byti-red)_40%,transparent)] hover:-translate-y-1 transition-all"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ background: "var(--gradient-byti-soft)" }}
                >
                  <a.icon className="h-6 w-6" style={{ color: "var(--byti-red)" }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 md:py-28 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Une solution pour <span className="gradient-text">chaque besoin</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Du foyer à l'industrie, BYTI dimensionne votre solution de stockage sur mesure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((u, i) => (
            <motion.div
              key={u.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-8 rounded-3xl border border-border/50 bg-card overflow-hidden group hover:-translate-y-1 transition-all"
              style={{ boxShadow: "var(--shadow-byti)" }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ background: "var(--byti-red)" }}
              />
              <span
                className="relative inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 text-white"
                style={{ background: "var(--byti-blue)" }}
              >
                {u.badge}
              </span>
              <h3 className="relative text-2xl font-display font-bold mb-2">{u.title}</h3>
              <div
                className="relative text-sm font-mono mb-4"
                style={{ color: "var(--byti-red)" }}
              >
                {u.capacity}
              </div>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{u.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specs */}
      <section
        className="py-20 md:py-28 px-6 lg:px-8"
        style={{ background: "var(--byti-red)" }}
      >
        <div className="max-w-5xl mx-auto text-white">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 bg-white/15 backdrop-blur">
              Spécifications techniques
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Conçues pour la performance
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/20 rounded-2xl overflow-hidden">
            {specs.map((s) => (
              <div key={s.label} className="bg-[color:var(--byti-red)] p-6 text-center">
                <div className="text-xs uppercase tracking-widest opacity-80 mb-2">
                  {s.label}
                </div>
                <div className="text-xl md:text-2xl font-display font-bold">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide bg-white text-[color:var(--byti-red)] hover:scale-105 transition-transform"
            >
              Voir nos modèles <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/#contact"
              className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide text-white border-[1.5px] border-white/60 hover:bg-white/10 transition-all"
            >
              Parler à un expert
            </a>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            De l'étude à la <span className="gradient-text">mise en service</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n: "01", t: "Étude technique", d: "Audit gratuit de vos besoins et de votre site." },
            { n: "02", t: "Dimensionnement", d: "Solution sur mesure adaptée à votre profil de consommation." },
            { n: "03", t: "Installation", d: "Pose par nos équipes certifiées en 1 à 3 jours." },
            { n: "04", t: "Suivi & SAV", d: "Maintenance, monitoring et garantie jusqu'à 10 ans." },
          ].map((step) => (
            <div key={step.n} className="relative p-6 rounded-2xl border border-border/50 bg-card">
              <div
                className="text-4xl font-display font-bold mb-3"
                style={{ color: "var(--byti-red)" }}
              >
                {step.n}
              </div>
              <h3 className="font-display font-bold mb-2">{step.t}</h3>
              <p className="text-sm text-muted-foreground">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products from showcase (reuses energy products) */}
      <EnergyShowcase />

      {/* FAQ */}
      <section className="py-20 md:py-28 px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-[color-mix(in_oklch,var(--byti-blue)_40%,transparent)] transition-colors"
            >
              <summary className="font-display font-semibold cursor-pointer flex items-start gap-3 list-none">
                <CheckCircle2
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                  style={{ color: "var(--byti-red)" }}
                />
                <span className="flex-1">{f.q}</span>
              </summary>
              <p className="mt-4 ml-8 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "var(--byti-red)" }}
        >
          <Zap className="absolute top-6 right-6 h-32 w-32 opacity-10" />
          <Battery className="absolute bottom-6 left-6 h-24 w-24 opacity-10" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Prêt à passer au lithium ?
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-white/90">
            Obtenez un devis gratuit personnalisé sous 24h. Nos experts BYTI vous accompagnent
            de l'étude jusqu'à la mise en service.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide bg-white text-[color:var(--byti-red)] hover:scale-105 transition-transform"
          >
            Demander un devis gratuit <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
