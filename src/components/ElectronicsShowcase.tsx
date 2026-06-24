import { motion } from "framer-motion";
import { Smartphone, Cpu, Sparkles, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import shot1 from "@/assets/factory-electronics-1.jpg";
import shot2 from "@/assets/factory-electronics-2.jpg";
import shot3 from "@/assets/factory-electronics-3.jpg";

const images = [shot1, shot2, shot3];
const icons: LucideIcon[] = [Smartphone, Cpu, Sparkles];

export function ElectronicsShowcase() {
  const { t } = useTranslation();
  const tItems = t("electronicsShowcase.items", { returnObjects: true }) as { badge: string; title: string; text: string }[];
  const items = tItems.map((it, i) => ({ ...it, img: images[i], icon: icons[i] }));

  return (
    <section className="py-20 md:py-28 px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "var(--gradient-byti-soft)",
              color: "var(--byti-blue-deep)",
            }}
          >
            {t("electronicsShowcase.kicker")}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            {t("electronicsShowcase.titleStart")} <span className="gradient-text">{t("electronicsShowcase.titleAccent")}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            {t("electronicsShowcase.desc")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden mb-8 group"
          style={{ boxShadow: "var(--shadow-byti)" }}
        >
          <img
            src={items[0].img}
            alt={items[0].title}
            loading="lazy"
            width={1536}
            height={1024}
            className="w-full h-[300px] md:h-[520px] object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <span
              className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "var(--byti-red)" }}
            >
              {items[0].badge}
            </span>
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-2 drop-shadow-lg">
              {items[0].title}
            </h3>
            <p className="text-sm md:text-base max-w-2xl text-white/90 drop-shadow">
              {items[0].text}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.slice(1).map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative rounded-3xl overflow-hidden group border border-border/40"
            >
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                width={1536}
                height={1024}
                className="w-full h-[260px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg backdrop-blur"
                    style={{ background: "color-mix(in oklch, var(--byti-red) 80%, transparent)" }}
                  >
                    <it.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                    {it.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-2 drop-shadow-lg">
                  {it.title}
                </h3>
                <p className="text-sm text-white/85 drop-shadow">{it.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
