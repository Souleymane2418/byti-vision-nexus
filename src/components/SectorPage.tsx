import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export interface SectorPageProps {
  badge: string;
  title: string;
  accent: string;
  subtitle: string;
  heroImage: string;
  Icon: LucideIcon;
  features: { icon: LucideIcon; title: string; text: string }[];
  offerings: { title: string; text: string }[];
  ctaPrimary?: { label: string; href: string };
}

export function SectorPage({
  badge,
  title,
  accent,
  subtitle,
  heroImage,
  Icon,
  features,
  offerings,
  ctaPrimary,
}: SectorPageProps) {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
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
              <Icon className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">{badge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              {title} <br />
              <span style={{ color: "var(--byti-red)" }}>{accent}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={ctaPrimary?.href ?? "/#contact"}
                className="btn-byti-red inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide"
              >
                {ctaPrimary?.label ?? "Demander un devis"} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#offre"
                className="inline-flex items-center px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wide text-white border-[1.5px] border-white/60 hover:bg-white/10 transition-all"
              >
                Découvrir
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="offre" className="py-20 md:py-28 px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="pill-badge">★ Pourquoi BYTI</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mt-4">
              Une expertise <span className="gradient-text">complète</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:-translate-y-1 transition-all"
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ background: "var(--gradient-byti-soft)" }}
                >
                  <f.icon className="h-6 w-6" style={{ color: "var(--byti-red)" }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 md:py-28 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Notre <span className="gradient-text">offre</span>
          </h2>
        </div>
        <div className="space-y-4">
          {offerings.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50"
            >
              <CheckCircle2
                className="h-6 w-6 mt-0.5 flex-shrink-0"
                style={{ color: "var(--byti-red)" }}
              />
              <div>
                <h3 className="font-display font-bold text-lg mb-1">{o.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{o.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={{ background: "var(--byti-red)" }}
        >
          <Icon className="absolute top-6 right-6 h-32 w-32 opacity-10" />
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Parlons de votre projet
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-white/90">
            Nos experts BYTI vous accompagnent dans le choix de la solution la plus adaptée à
            vos besoins et votre budget.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide bg-white text-[color:var(--byti-red)] hover:scale-105 transition-transform"
          >
            Nous contacter <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
