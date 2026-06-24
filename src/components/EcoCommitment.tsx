import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Leaf, Wind, Recycle, Sun } from "lucide-react";
import ecoLandscape from "@/assets/eco-landscape.jpg";
import ecoLeaves from "@/assets/eco-leaves.jpg";
import ecoHandsPlant from "@/assets/eco-hands-plant.jpg";

const stats = [
  { value: "−2 800 t", key: "co2", icon: Wind },
  { value: "100 %", key: "solar", icon: Sun },
  { value: "+15 000", key: "trees", icon: Leaf },
  { value: "0", key: "emissions", icon: Recycle },
] as const;

const pillars = [
  { key: "ghg", image: ecoLeaves },
  { key: "ecosystem", image: ecoHandsPlant },
] as const;

export function EcoCommitment() {
  const { t } = useTranslation();
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
            {t("eco.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
            {t("eco.title")}
          </h2>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t("eco.subtitle")}
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
            alt={t("eco.captionTitle")}
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-[50vh] md:h-[65vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="text-byti-yellow text-sm font-semibold uppercase tracking-widest mb-3">
              {t("eco.captionKicker")}
            </p>
            <h3 className="text-2xl md:text-4xl font-bold text-white max-w-2xl drop-shadow-lg">
              {t("eco.captionTitle")}
            </h3>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
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
              <div className="mt-2 text-sm text-muted-foreground leading-snug">
                {t(`eco.stats.${stat.key}`)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-byti-blue/50 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pillar.image}
                  alt={t(`eco.pillars.${pillar.key}.title`)}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {t(`eco.pillars.${pillar.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`eco.pillars.${pillar.key}.text`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
