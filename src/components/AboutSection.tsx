import { motion } from "framer-motion";
import { Globe2, MessageSquare, Smartphone, Network, MapPin } from "lucide-react";

const partnerStats = [
  { icon: Globe2, value: "International", label: "Présence multi-continents" },
  { icon: MessageSquare, value: "Télécoms", label: "Messagerie & communication" },
  { icon: Network, value: "Réseaux", label: "Routes & interconnexions" },
  { icon: Smartphone, value: "Digital", label: "Transformation client" },
];

const synergies = [
  { zone: "Burkina Faso · Cameroun", hubs: "BYTI Technologie SARL — opérations locales" },
  { zone: "Asie · Moyen-Orient", hubs: "Partenaires technologiques de la sphère BYTI" },
  { zone: "Échanges", hubs: "Sourcing, expertise et standards qualité partagés" },
  { zone: "Ambition", hubs: "Faire rayonner la marque BYTI en Afrique" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="pill-badge">★ Une marque qui voyage</span>
          <h2 className="editorial-title mt-6 text-3xl md:text-5xl">
            Dans la sphère{" "}
            <span className="editorial-accent">BYTI</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            <span className="font-semibold text-foreground">BYTI Technologie SARL</span>{" "}
            partage son nom avec d'autres acteurs technologiques internationaux portant
            l'identité <span className="font-semibold text-foreground">BYTI</span>,
            actifs notamment dans les télécommunications, la messagerie d'entreprise et la
            transformation digitale en Asie et au Moyen-Orient.
          </p>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Sans en être une filiale, nous nous inscrivons dans cette dynamique
            internationale en gardant une{" "}
            <span className="font-semibold text-foreground">identité 100% locale</span>{" "}
            et indépendante au Burkina Faso et au Cameroun, au service de la clientèle
            africaine.
          </p>
        </motion.div>

        {/* Brand banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 relative rounded-3xl overflow-hidden border border-border/60 bg-gradient-to-br from-primary/5 via-background to-byti-red/5 p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-byti-red flex items-center justify-center shadow-lg">
                <Globe2 className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  Identité de marque
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-[0.12em] gradient-text">
                  LA SPHÈRE BYTI
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Une marque, plusieurs territoires d'expertise
                </span>
              </div>
            </div>
            <div className="md:ml-auto grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full md:w-auto">
              {partnerStats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <s.icon className="h-5 w-5 text-primary mb-1.5 mx-auto md:mx-0" />
                  <div className="text-sm md:text-base font-bold text-foreground font-display leading-tight">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Synergies */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-byti-red mb-4">
              Notre écosystème
            </h3>
            <p className="editorial-title text-2xl md:text-3xl mb-6">
              Une marque, des{" "}
              <span className="editorial-accent">synergies internationales</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nous déployons localement un portefeuille complémentaire : électronique,
              sécurité, énergie, téléviseurs et matériaux de construction. Notre approche
              s'inspire des standards internationaux portés par la marque BYTI, tout en
              restant ancrée dans les réalités africaines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            {synergies.map((r, i) => (
              <motion.div
                key={r.zone}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-colors"
              >
                <MapPin className="h-5 w-5 text-byti-red shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-foreground">{r.zone}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {r.hubs}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
