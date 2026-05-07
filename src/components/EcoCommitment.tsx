import { motion } from "framer-motion";
import { Leaf, Wind, Recycle, Sun } from "lucide-react";
import ecoLandscape from "@/assets/eco-landscape.jpg";
import ecoLeaves from "@/assets/eco-leaves.jpg";
import ecoHandsPlant from "@/assets/eco-hands-plant.jpg";

const stats = [
  { value: "−2 800 t", label: "CO₂ évités par an grâce à nos installations solaires", icon: Wind },
  { value: "100 %", label: "Énergie propre produite par nos fermes photovoltaïques", icon: Sun },
  { value: "+15 000", label: "Arbres protégés par la transition énergétique BYTI", icon: Leaf },
  { value: "0", label: "Émissions directes pour nos batteries lithium nouvelle génération", icon: Recycle },
];

const pillars = [
  {
    title: "Réduction des gaz à effet de serre",
    description:
      "Chaque kilowattheure produit par nos installations solaires remplace un kilowattheure issu de générateurs diesel. BYTI s'engage à réduire activement l'empreinte carbone de l'Afrique centrale.",
    image: ecoLeaves,
  },
  {
    title: "Préservation de l'écosystème",
    description:
      "Nos chantiers respectent la biodiversité locale. Nous concevons des infrastructures qui s'intègrent au paysage et protègent la faune, la flore et les ressources en eau.",
    image: ecoHandsPlant,
  },
];

export function EcoCommitment() {
  return (
    <section id="environnement" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Hero banner */}
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-byti-blue/10 text-byti-blue dark:text-byti-blue text-xs font-semibold uppercase tracking-wider mb-6">
            <Leaf className="w-3.5 h-3.5" />
            Engagement environnemental
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            BYTI agit pour la planète
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            Connecter, construire et innover sans compromettre l'avenir. Nos solutions énergétiques
            réduisent activement les émissions de gaz à effet de serre et protègent les écosystèmes africains.
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-16"
        >
          <img
            src={ecoLandscape}
            alt="Installations solaires BYTI intégrées dans un paysage africain préservé"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-[50vh] md:h-[65vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="text-byti-yellow text-sm font-semibold uppercase tracking-widest mb-3">
              Énergie propre · Écosystème préservé
            </p>
            <h3 className="text-2xl md:text-4xl font-bold text-white max-w-2xl drop-shadow-lg">
              Quand la technologie rencontre la nature
            </h3>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-byti-blue/50 transition-colors group"
            >
              <stat.icon className="w-7 h-7 text-byti-blue mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-byti-blue/50 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
