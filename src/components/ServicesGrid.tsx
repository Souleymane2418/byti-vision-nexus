import { motion } from "framer-motion";
import { Smartphone, Camera, Battery, Monitor, HardHat, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import heroElectronics from "@/assets/hero-electronics.jpg";
import heroSecurity from "@/assets/hero-security.jpg";
import heroEnergy from "@/assets/byti-powerwall.png";
import heroTv from "@/assets/hero-tv.jpg";
import heroBtp from "@/assets/hero-btp.jpg";

const serviceKeys = ["electronics", "security", "energy", "tv", "btp"] as const;
const serviceIcons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  electronics: Smartphone,
  security: Camera,
  energy: Battery,
  tv: Monitor,
  btp: HardHat,
};
const serviceImages: Record<(typeof serviceKeys)[number], string> = {
  electronics: heroElectronics,
  security: heroSecurity,
  energy: heroEnergy,
  tv: heroTv,
  btp: heroBtp,
};

export function ServicesGrid() {
  const { t } = useTranslation();
  const services = serviceKeys.map((k) => ({
    key: k,
    icon: serviceIcons[k],
    image: serviceImages[k],
    title: t(`services.items.${k}.title`),
    description: t(`services.items.${k}.description`),
  }));

  return (
    <section id="services" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="pill-badge">{t("services.kicker")}</span>
          <h2 className="editorial-title mt-6 text-3xl md:text-5xl">
            {t("services.titleStart")}{" "}
            <span className="editorial-accent">{t("services.titleAccent")}</span>
          </h2>
          <div className="dot-divider mt-6">
            <span className="dot-divider-dot" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-xl border border-border/40 card-hover ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative ${i === 0 ? "h-80 lg:h-full" : "h-64"}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
