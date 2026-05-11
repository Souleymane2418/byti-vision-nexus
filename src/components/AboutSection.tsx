import { motion } from "framer-motion";
import { Globe2, Building2, Users, Award, MapPin } from "lucide-react";

const visionStats = [
  { icon: Globe2, value: "Afrique", label: "Notre terrain d'action" },
  { icon: Building2, value: "Multi-pôles", label: "Tech · Énergie · BTP" },
  { icon: Users, value: "Équipes", label: "Engagées & qualifiées" },
  { icon: Award, value: "Qualité", label: "Standards internationaux" },
];

const ambitions = [
  { zone: "Aujourd'hui", hubs: "Burkina Faso · Cameroun — opérations actives" },
  { zone: "Court terme", hubs: "Renforcer notre présence en Afrique de l'Ouest" },
  { zone: "Vision", hubs: "Devenir une référence panafricaine de la tech & de l'énergie" },
  { zone: "Partenariats", hubs: "Fournisseurs internationaux sélectionnés (Asie · Europe)" },
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
          <span className="pill-badge">★ Notre Vision</span>
          <h2 className="editorial-title mt-6 text-3xl md:text-5xl">
            Une ambition{" "}
            <span className="editorial-accent">panafricaine</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            <span className="font-semibold text-foreground">BYTI Technologie SARL</span> est
            une entreprise engagée dans la transformation technologique, énergétique et
            structurelle de l'Afrique. Nous opérons à travers plusieurs pôles
            complémentaires : électronique grand public, sécurité & vidéosurveillance,
            énergie solaire & batteries lithium, téléviseurs et matériaux de construction
            (BTP).
          </p>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Notre ambition : apporter à nos clients africains les{" "}
            <span className="font-semibold text-foreground">meilleures technologies mondiales</span>{" "}
            au juste prix, tout en construisant progressivement un acteur de référence sur
            le continent.
          </p>
        </motion.div>

        {/* Vision banner */}
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
                  BYTI Technologie SARL
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-[0.12em] gradient-text">
                  CONNECTER · CONSTRUIRE · INNOVER
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Notre signature au service de l'Afrique
                </span>
              </div>
            </div>
            <div className="md:ml-auto grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full md:w-auto">
              {visionStats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <s.icon className="h-5 w-5 text-primary mb-1.5 mx-auto md:mx-0" />
                  <div className="text-base md:text-lg font-bold text-foreground font-display">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ambitions */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-byti-red mb-4">
              Notre trajectoire
            </h3>
            <p className="editorial-title text-2xl md:text-3xl mb-6">
              Construire pas à pas un{" "}
              <span className="editorial-accent">acteur de référence</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nous croyons que l'Afrique mérite des solutions technologiques fiables,
              durables et accessibles. Notre approche : sélectionner les meilleurs
              partenaires internationaux, adapter les produits aux réalités locales et
              accompagner nos clients sur le long terme.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            {ambitions.map((r, i) => (
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
