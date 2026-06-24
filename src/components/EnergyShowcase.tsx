import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Battery, Zap, Sun, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import bytiPowerwallImg from "@/assets/byti-powerwall.png";

type EnergyProduct = {
  id: string;
  name: string;
  model: string | null;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  specs: Record<string, string> | null;
};

export function EnergyShowcase() {
  const { t } = useTranslation();
  const stats = [
    { icon: Sun, value: "100%", label: t("energyShowcase.stats.solar") },
    { icon: Battery, value: "6000+", label: t("energyShowcase.stats.cycles") },
    { icon: Zap, value: "3000 kWh", label: t("energyShowcase.stats.capacity") },
  ];
  const [products, setProducts] = useState<EnergyProduct[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, model, description, image_url, featured, specs")
        .eq("category", "energy")
        .eq("active", true)
        .order("featured", { ascending: false });
      setProducts((data ?? []) as EnergyProduct[]);
    })();
  }, []);

  return (
    <section
      id="energy-showcase"
      className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
    >
      {/* Decorative floating shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 float-slow"
        style={{ background: "var(--gradient-byti)" }} />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-15 float-slow"
        style={{ background: "var(--byti-red)", animationDelay: "2s" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "var(--gradient-byti-soft)",
              border: "1px solid color-mix(in oklch, var(--byti-blue) 25%, transparent)"
            }}>
            <Sun className="h-4 w-4" style={{ color: "var(--byti-red)" }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--byti-blue-deep)" }}>
              {t("energyShowcase.badge")}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-5">
            <span className="gradient-text">{t("energyShowcase.titleAccent")}</span>
            <br />
            <span className="text-foreground">{t("energyShowcase.titleRest")}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            {t("energyShowcase.desc")}
          </p>
        </motion.div>

        {/* Cinematic banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden mb-16 border border-border/50"
          style={{ boxShadow: "var(--shadow-byti)" }}
        >
          <div className="relative aspect-[21/9] md:aspect-[21/8]">
            <img
              src={bytiPowerwallImg}
              alt="Batteries lithium BYTI Powerwall"
              className="absolute inset-0 w-full h-full object-contain bg-white"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
              <div className="max-w-xl text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 backdrop-blur-md"
                  style={{ background: "color-mix(in oklch, var(--byti-red) 80%, transparent)" }}>
                  <Zap className="h-3.5 w-3.5" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{t("energyShowcase.bannerBadge")}</span>
                </div>
                <h3
                  className="text-2xl md:text-4xl lg:text-5xl font-display font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                  dangerouslySetInnerHTML={{ __html: t("energyShowcase.bannerTitle") }}
                />
                <p className="mt-3 text-sm md:text-base text-white/90 max-w-md drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                  {t("energyShowcase.bannerDesc")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-16 max-w-3xl mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="text-center p-4 rounded-2xl bg-card/60 backdrop-blur border border-border/50"
            >
              <s.icon className="w-6 h-6 md:w-7 md:h-7 mx-auto mb-2" style={{ color: "var(--byti-red)" }} />
              <div className="text-2xl md:text-3xl font-display font-bold gradient-text-blue">{s.value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured product (large) + grid */}
        {products.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-10">
            {/* Hero product */}
            <FeaturedCard product={products[0]} />

            {/* Side products */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.slice(1, 5).map((p, i) => (
                <SmallCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Remaining row */}
        {products.length > 5 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {products.slice(5).map((p, i) => (
              <SmallCard key={p.id} product={p} index={i} large />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/boutique"
            className="btn-byti-red inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase"
          >
            {t("energyShowcase.cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ product }: { product: EnergyProduct }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="lg:col-span-7 relative group rounded-3xl overflow-hidden border border-border/50 bg-card"
      style={{ boxShadow: "var(--shadow-byti)" }}
    >
      <Link to="/produit/$id" params={{ id: product.id }} className="block h-full">
        <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px] overflow-hidden bg-gradient-to-br from-secondary to-muted">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          {/* Overlay gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Badge */}
          <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "var(--byti-red)", color: "white" }}>
            <Zap className="h-3.5 w-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-widest">{t("energyShowcase.bestseller")}</span>
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-white">
            {product.model && (
              <div className="text-xs font-mono opacity-70 mb-2">{product.model}</div>
            )}
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-3 leading-tight">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-sm md:text-base text-white/80 line-clamp-2 mb-5 max-w-xl">
                {product.description}
              </p>
            )}
            <div className="inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
              {t("energyShowcase.discover")} <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function SmallCard({ product, index, large }: { product: EnergyProduct; index: number; large?: boolean }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden border border-border/60 bg-card hover:border-[color-mix(in_oklch,var(--byti-red)_40%,transparent)] transition-all hover:-translate-y-1"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
    >
      <Link to="/produit/$id" params={{ id: product.id }} className="block">
        <div className={`relative ${large ? "aspect-[4/3]" : "aspect-square"} overflow-hidden bg-gradient-to-br from-secondary to-muted`}>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          )}
          {product.featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "var(--byti-blue)", color: "white" }}>
              {t("energyShowcase.top")}
            </div>
          )}
        </div>
        <div className="p-4 md:p-5">
          {product.model && (
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
              {product.model}
            </div>
          )}
          <h4 className="font-display font-semibold text-sm md:text-base text-foreground line-clamp-2 leading-snug group-hover:text-[color:var(--byti-blue)] transition-colors">
            {product.name}
          </h4>
          <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-[color:var(--byti-red)] group-hover:gap-2 transition-all">
            {t("energyShowcase.quote")} <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
