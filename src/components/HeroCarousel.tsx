import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import poster1 from "@/assets/hero-energy.jpg";
import poster2 from "@/assets/hero-energy.jpg";
import poster3 from "@/assets/hero-btp.jpg";
import poster4 from "@/assets/hero-security.jpg";
import poster5 from "@/assets/hero-solar-farm.jpg";

import vid1 from "@/assets/hero-energy-loop.mp4.asset.json";
import vid2 from "@/assets/hero-energy-battery.mp4.asset.json";
import vid3 from "@/assets/hero-btp-loop.mp4.asset.json";
import vid4 from "@/assets/hero-security-loop.mp4.asset.json";
import vid5 from "@/assets/hero-solar-farm.mp4.asset.json";

interface Slide {
  video: string;
  poster: string;
  badge: string;
  title: string;
  subtitle: string;
  cta1: { label: string; href: string };
  cta2: { label: string; href: string };
  objectPosition?: string;
}

const slides: Slide[] = [
  {
    video: vid1.url,
    poster: poster1,
    badge: "Énergie Solaire",
    title: "L'énergie du soleil",
    subtitle: "Panneaux & batteries lithium LiFePO₄",
    cta1: { label: "Voir nos solutions", href: "#services" },
    cta2: { label: "Nous contacter", href: "#contact" },
  },
  {
    video: vid2.url,
    poster: poster2,
    badge: "Stockage Lithium",
    title: "Zéro coupure",
    subtitle: "Batteries 30 kWh, 6000 cycles garantis",
    cta1: { label: "Voir nos produits", href: "/boutique" },
    cta2: { label: "Demander un devis", href: "#contact" },
    objectPosition: "center 25%",
  },
  {
    video: vid3.url,
    poster: poster3,
    badge: "BTP & Matériaux",
    title: "Bâtir solide",
    subtitle: "Briques, pavés, béton de qualité",
    cta1: { label: "Nos réalisations", href: "#projects" },
    cta2: { label: "Nous contacter", href: "#contact" },
  },
  {
    video: vid4.url,
    poster: poster4,
    badge: "Sécurité",
    title: "Protéger l'essentiel",
    subtitle: "Vidéosurveillance intelligente & connectée",
    cta1: { label: "Nos solutions", href: "#services" },
    cta2: { label: "Nous contacter", href: "#contact" },
  },
  {
    video: vid5.url,
    poster: poster5,
    badge: "Électronique",
    title: "Toujours connecté",
    subtitle: "Smartphones, TV & équipements modernes",
    cta1: { label: "Voir la boutique", href: "/boutique" },
    cta2: { label: "En savoir plus", href: "#services" },
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [index]);

  const slide = slides[index];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            src={slide.video}
            poster={slide.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: slide.objectPosition ?? "center" }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* Content - bottom left */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full pl-[60px] pr-6 pb-20 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-sm text-white uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm border border-white/15" style={{ fontSize: "11px" }}>
                ★ {slide.badge}
              </span>
              <h1 className="mt-5 text-white font-extrabold leading-tight text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                {slide.title}
              </h1>
              <p className="mt-3 text-white/75 text-lg max-w-xl">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={slide.cta1.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wide text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#D42B2B" }}
                >
                  {slide.cta1.label}
                </a>
                <a
                  href={slide.cta2.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wide text-white border-[1.5px] border-white/60 hover:bg-white/10 transition-all"
                >
                  {slide.cta2.label}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-0.5 transition-all duration-300 ${
                i === index ? "w-8 bg-white" : "w-4 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <span className="text-white/50 text-xs font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent z-[1]" />
    </section>
  );
}
