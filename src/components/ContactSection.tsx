import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

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
                <p className="text-muted-foreground text-sm mt-1">+XXX XXX XXX XXX</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">WhatsApp</h4>
                <a
                  href="https://wa.me/XXXXXXXXXXX"
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
                <p className="text-muted-foreground text-sm mt-1">Votre adresse ici</p>
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
      </div>
    </section>
  );
}
