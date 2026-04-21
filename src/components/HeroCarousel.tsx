import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import slide1 from "@/assets/hero-carousel-1.jpg";
import slide2 from "@/assets/hero-carousel-2.jpg";
import slide3 from "@/assets/hero-carousel-3.jpg";
import slide4 from "@/assets/hero-carousel-4.jpg";
import slide5 from "@/assets/hero-carousel-5.jpg";

interface Slide {
  image: string;
  title: string;
  caption: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: slide1,
    title: "Énergie solaire pour l'Afrique",
    caption: "Des kilowatts propres pour préserver notre savane",
    description: "Réduire les gaz à effet de serre, un panneau à la fois.",
  },
  {
    image: slide2,
    title: "Stockage lithium intelligent",
    caption: "Une énergie fiable, durable et décarbonée",
    description: "Nos solutions de batteries pour un futur sans coupure.",
  },
  {
    image: slide3,
    title: "BTP éco-responsable",
    caption: "Construire en harmonie avec la nature",
    description: "Bâtiments modernes, matériaux durables, espaces végétalisés.",
  },
  {
    image: slide4,
    title: "Sécurité connectée",
    caption: "Protéger vos biens, préserver votre tranquillité",
    description: "Vidéosurveillance intelligente et basse consommation.",
  },
  {
    image: slide5,
    title: "BYTI s'engage pour la planète",
    caption: "Technologie et écosystème, une seule mission",
    description: "Chaque projet contribue à un environnement plus sain.",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
            className="max-w-5xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.95] drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)]">
              {slide.title}
            </h1>
            <p className="mt-5 text-lg md:text-2xl text-white font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {slide.caption}
            </p>
            <p className="mt-3 text-base md:text-lg text-white/85 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              {slide.description}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#services"
                className="btn-primary-glow px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
              >
                Découvrir nos activités
              </a>
              <a
                href="#contact"
                className="btn-outline-glow px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
              >
                Nous contacter
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        aria-label="Précédent"
        onClick={() => go(-1)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white grid place-items-center transition"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        aria-label="Suivant"
        onClick={() => go(1)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 size-11 md:size-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white grid place-items-center transition"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à la diapositive ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent z-[1]" />
    </section>
  );
}
