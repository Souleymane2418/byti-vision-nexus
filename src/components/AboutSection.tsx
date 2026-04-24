import { motion } from "framer-motion";
import { Globe, Users, Zap, Building2 } from "lucide-react";

const stats = [
  { icon: Globe, value: "5+", label: "Secteurs d'activité" },
  { icon: Users, value: "500+", label: "Clients satisfaits" },
  { icon: Zap, value: "1000+", label: "Projets réalisés" },
  { icon: Building2, value: "10+", label: "Années d'expérience" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="pill-badge">★ À propos</span>
            <h2 className="editorial-title mt-6 text-3xl md:text-5xl">
              Filiale du groupe{" "}
              <span className="editorial-accent">BYTI Worldwide</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              <span className="font-semibold text-foreground">BYTI Technologie SARL</span> est la filiale locale de
              <span className="font-semibold text-foreground"> BYTI</span>, multinationale de référence
              dans la technologie, l'énergie et les infrastructures.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Nous portons localement l'excellence d'un groupe international, en proposant des
              solutions modernes, fiables et adaptées aux exigences du marché.
            </p>

            {/* Group brand bar */}
            <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-byti-red/5 border border-border/60">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">Powered by</span>
                <span className="text-xl font-bold tracking-[0.15em] gradient-text">BYTI WORLDWIDE</span>
              </div>
              <div className="ml-auto h-10 w-px bg-border" />
              <p className="text-xs text-muted-foreground max-w-[180px] leading-snug">
                Présence internationale · Standards globaux · Innovation continue
              </p>
            </div>

            <div className="mt-8 section-divider w-24" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-6 text-center card-hover"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
