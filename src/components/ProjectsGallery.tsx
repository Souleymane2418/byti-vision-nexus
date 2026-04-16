import { motion } from "framer-motion";

import heroSecurity from "@/assets/hero-security.jpg";
import heroEnergy from "@/assets/hero-energy.jpg";
import heroBtp from "@/assets/hero-btp.jpg";
import heroElectronics from "@/assets/hero-electronics.jpg";

const projects = [
  { title: "Installation vidéosurveillance", category: "Sécurité", image: heroSecurity },
  { title: "Déploiement énergie solaire", category: "Énergie", image: heroEnergy },
  { title: "Infrastructure moderne", category: "BTP", image: heroBtp },
  { title: "Équipement technologique", category: "Électronique", image: heroElectronics },
];

export function ProjectsGallery() {
  return (
    <section id="projects" className="py-32 px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Réalisations
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Nos <span className="gradient-text">projets</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative h-72 md:h-96 overflow-hidden rounded-xl border border-border/30 card-hover"
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs text-primary font-semibold tracking-widest uppercase">
                  {project.category}
                </span>
                <h3 className="mt-2 text-xl font-bold text-foreground">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
