import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import poster3 from "@/assets/hero-btp.jpg";
import poster4 from "@/assets/hero-security.jpg";
import poster5 from "@/assets/hero-electronics-wide.jpg";

import vid4 from "@/assets/hero-security-loop.mp4.asset.json";
import vid5 from "@/assets/hero-electronics.mp4.asset.json";
import bytiPowerwallImg from "@/assets/byti-powerwall.png";
import bytiLogo from "@/assets/byti-logo.png";

interface Slide {
  video?: string;
  image?: string;
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
    image: bytiPowerwallImg,
    poster: bytiPowerwallImg,
    badge: "Stockage Lithium",
    title: "Zéro coupure",
    subtitle: "Batteries 3000 kWh, 6000 cycles garantis",
    cta1: { label: "En savoir plus", href: "/batteries" },
    cta2: { label: "Demander un devis", href: "#contact" },
    objectPosition: "center center",
  },
  {
    image: poster3,
    poster: poster3,
    badge: "BTP & Matériaux",
    title: "Bâtir solide",
    subtitle: "Briques, pavés, béton de qualité",
    cta1: { label: "Nos réalisations", href: "/btp" },
    cta2: { label: "Nous contacter", href: "/#contact" },
  },
  {
    video: vid4.url,
    poster: poster4,
    badge: "Sécurité",
    title: "Protéger l'essentiel",
    subtitle: "Vidéosurveillance intelligente & connectée",
    cta1: { label: "Nos solutions", href: "/securite" },
    cta2: { label: "Nous contacter", href: "/#contact" },
  },
  {
    video: vid5.url,
    poster: poster5,
    badge: "Électronique",
    title: "Toujours connecté",
    subtitle: "Smartphones, TV & équipements modernes",
    cta1: { label: "Voir la boutique", href: "/boutique" },
    cta2: { label: "En savoir plus", href: "/electronique" },
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[index];

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !slide.video) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [index, slide.video]);

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
          {slide.video ? (
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
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full ${slide.title === "Zéro coupure" ? "object-contain bg-white" : "object-cover"}`}
              style={{ objectPosition: slide.objectPosition ?? "center" }}
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* Logo BYTI - mis en avant dès l'ouverture */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0, 1] }}
        className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="relative">
          <div className="absolute inset-0 -m-3 rounded-3xl bg-white/20 blur-2xl" />
          <div className="relative bg-white rounded-2xl px-5 py-3 md:px-7 md:py-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/60">
            <img
              src={bytiLogo}
              alt="BYTI Technologie SARL — Connecter · Construire · Innover"
              className="h-16 md:h-24 lg:h-28 w-auto"
            />
          </div>
        </div>
      </motion.div>

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
