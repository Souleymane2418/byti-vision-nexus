import { motion } from "framer-motion";
import { Award, Wrench, Lightbulb, ShieldCheck, Clock, Layers } from "lucide-react";

const reasons = [
  { icon: Award, title: "Qualité garantie", description: "Des produits et services aux standards internationaux les plus élevés." },
  { icon: Wrench, title: "Expertise technique", description: "Une équipe d'ingénieurs et techniciens hautement qualifiés." },
  { icon: Lightbulb, title: "Solutions innovantes", description: "Technologies de pointe adaptées aux besoins modernes." },
  { icon: ShieldCheck, title: "Fiabilité", description: "Des solutions éprouvées et un accompagnement durable." },
  { icon: Clock, title: "Réactivité", description: "Une prise en charge rapide et un service client exemplaire." },
  { icon: Layers, title: "Leadership multi-secteur", description: "Une présence forte dans la technologie, l'énergie et la construction." },
];

export function WhyChooseUs() {
  return (
    <section className="py-32 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Nos atouts
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Pourquoi <span className="gradient-text">nous choisir</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card/50 border border-border/40 rounded-xl p-8 card-hover"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
