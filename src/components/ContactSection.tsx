import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import bytiMap1 from "@/assets/byti-map-1.png.asset.json";
import bytiMap2 from "@/assets/byti-map-2.png.asset.json";

export function ContactSection() {
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
            Contact
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Parlons de votre{" "}
            <span className="gradient-text">projet</span>
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
                <h4 className="font-semibold text-foreground">Téléphone</h4>
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
                <h4 className="font-semibold text-foreground">WhatsApp</h4>
                <a
                  href="https://wa.me/22676767663"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm mt-1 hover:underline"
                >
                  Envoyer un message
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Réseaux sociaux</h4>
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
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-muted-foreground text-sm mt-1">contact@bytitechnologie.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Adresse</h4>
                <p className="text-muted-foreground text-sm mt-1">
                  Av. Kwame Nkrumah, Ouagadougou, Burkina Faso
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
                <label className="text-sm font-medium text-foreground mb-2 block">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Sujet</label>
              <input
                type="text"
                placeholder="Sujet de votre message"
                className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
              <textarea
                rows={5}
                placeholder="Votre message..."
                className="w-full px-4 py-3 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="btn-primary-glow w-full px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
            >
              Envoyer le message
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
              Plan d'emplacement
            </span>
            <h3 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-foreground">
              Comment nous <span className="gradient-text">trouver</span>
            </h3>
            <p className="mt-3 text-muted-foreground text-sm max-w-2xl mx-auto">
              BYTI Technologie International — Av. Kwame Nkrumah, Ouagadougou. Suivez l'itinéraire depuis le Rond-point des Nations Unies.
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
        </motion.div>
      </div>
    </section>
  );
}
