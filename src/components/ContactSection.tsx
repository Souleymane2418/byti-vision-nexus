import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SocialLinks } from "@/components/SocialLinks";
import bytiMap1 from "@/assets/byti-map-1.png.asset.json";
import bytiMap2 from "@/assets/byti-map-2.png.asset.json";

export function ContactSection() {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {t("contactSection.kicker")}
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("contactSection.titleStart")}{" "}
            <span className="gradient-text">{t("contactSection.titleAccent")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t("contactSection.phone")}</h4>
                <a href="tel:+22676767663" className="block text-muted-foreground text-sm mt-1 hover:text-primary transition-colors">
                  +226 76 76 76 63
                </a>
                <a href="tel:+22670681212" className="block text-muted-foreground text-sm hover:text-primary transition-colors">
                  +226 70 68 12 12
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t("contactSection.whatsapp")}</h4>
                <a
                  href="https://wa.me/22676767663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm mt-1 hover:underline"
                >
                  {t("contactSection.sendMsg")}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t("contactSection.social")}</h4>
                <div className="mt-2">
                  <SocialLinks className="!gap-2" iconClassName="!px-2 !py-1.5 !bg-muted hover:!bg-primary hover:!text-white !text-foreground" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t("contactSection.email")}</h4>
                <p className="text-muted-foreground text-sm mt-1">contact@bytitechnologie.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{t("contactSection.address")}</h4>
                <p className="text-muted-foreground text-sm mt-1">
                  {t("contactSection.addressValue")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 bg-card border border-border/50 rounded-xl p-8 space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t("contactSection.form.name")}</label>
                <input
                  type="text"
                  placeholder={t("contactSection.form.namePh")}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t("contactSection.form.email")}</label>
                <input
                  type="email"
                  placeholder={t("contactSection.form.emailPh")}
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("contactSection.form.subject")}</label>
              <input
                type="text"
                placeholder={t("contactSection.form.subjectPh")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("contactSection.form.message")}</label>
              <textarea
                rows={5}
                placeholder={t("contactSection.form.messagePh")}
                className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="btn-primary-glow w-full px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
            >
              {t("contactSection.form.send")}
            </button>
          </motion.form>
        </div>

        {/* Plan d'emplacement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              {t("contactSection.mapKicker")}
            </span>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              {t("contactSection.mapTitleStart")} <span className="gradient-text">{t("contactSection.mapTitleAccent")}</span>
            </h3>
            <p className="mt-3 text-muted-foreground text-sm max-w-2xl mx-auto">
              {t("contactSection.mapDesc")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden border border-border/60 bg-card">
              <img src={bytiMap1.url} alt="Plan d'emplacement BYTI Technologie — vue d'ensemble depuis le Rond-point des Nations Unies" className="w-full h-auto" loading="lazy" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60 bg-card">
              <img src={bytiMap2.url} alt="Plan d'emplacement BYTI Technologie — accès détaillé via Avenue Kwame Nkrumah" className="w-full h-auto" loading="lazy" />
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-border/60 bg-card">
            <iframe
              title="Carte BYTI Technologie — Ouagadougou"
              src="https://maps.google.com/maps?q=loc:12.36739236517424,-1.519113363344027&hl=fr&z=18&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">12.367392, -1.519113</span>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=12.36739236517424,-1.519113363344027"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {t("contactSection.directions")}
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
