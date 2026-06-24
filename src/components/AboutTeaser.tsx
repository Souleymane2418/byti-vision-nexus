import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { ArrowRight, Globe2 } from "lucide-react";

export function AboutTeaser() {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-primary/5 via-background to-byti-red/5 p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-byti-red flex items-center justify-center shadow-lg">
              <Globe2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              {t("aboutTeaser.kicker")}
            </span>
          </div>

          <h2 className="editorial-title text-3xl md:text-4xl mb-5">
            <Trans
              i18nKey="aboutTeaser.title"
              components={{ accent: <span className="editorial-accent" /> }}
            />
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
            <Trans
              i18nKey="aboutTeaser.body"
              components={{ b: <span className="font-semibold text-foreground" /> }}
            />
          </p>

          <div className="mt-8">
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {t("cta.readMore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
