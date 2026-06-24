import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

import poster3 from "@/assets/hero-btp.jpg";
import poster4 from "@/assets/hero-security.jpg";
import poster5 from "@/assets/hero-electronics-wide.jpg";

import vid4 from "@/assets/hero-security-loop.mp4.asset.json";
import vid5 from "@/assets/hero-electronics.mp4.asset.json";
import bytiPowerwallImg from "@/assets/byti-powerwall.png";

interface Slide {
  key: "slide1" | "slide2" | "slide3" | "slide4";
  video?: string;
  image?: string;
  poster: string;
  cta1: { labelKey: string; href: string };
  cta2: { labelKey: string; href: string };
  contain?: boolean;
}

const slides: Slide[] = [
  {
    key: "slide1",
    image: bytiPowerwallImg,
    poster: bytiPowerwallImg,
    cta1: { labelKey: "cta.learnMore", href: "/batteries" },
    cta2: { labelKey: "cta.quote", href: "#contact" },
    contain: true,
  },
  {
    key: "slide2",
    image: poster3,
    poster: poster3,
    cta1: { labelKey: "cta.ourWork", href: "/btp" },
    cta2: { labelKey: "cta.contact", href: "/#contact" },
  },
  {
    key: "slide3",
    video: vid4.url,
    poster: poster4,
    cta1: { labelKey: "cta.ourSolutions", href: "/securite" },
    cta2: { labelKey: "cta.contact", href: "/#contact" },
  },
  {
    key: "slide4",
    video: vid5.url,
    poster: poster5,
    cta1: { labelKey: "cta.shop", href: "/boutique" },
    cta2: { labelKey: "cta.learnMore", href: "/electronique" },
  },
];

export function HeroCarousel() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const tm = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(tm);
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
            />
          ) : (
            <img
              src={slide.image}
              alt={t(`carousel.${slide.key}.title`)}
              className={`absolute inset-0 w-full h-full ${slide.contain ? "object-contain bg-white" : "object-cover"}`}
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      </AnimatePresence>

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
                ★ {t(`carousel.${slide.key}.badge`)}
              </span>
              <p className="mt-4 text-white/85 text-sm md:text-base font-medium tracking-wide max-w-xl drop-shadow">
                <span className="font-bold text-white">BYTI</span> — Leader international, présent en Chine, Dubaï, Côte d'Ivoire, Cameroun et Burkina Faso.
              </p>
              <h1 className="mt-3 text-white font-extrabold leading-tight text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
                {t(`carousel.${slide.key}.title`)}
              </h1>

              <p className="mt-3 text-white/75 text-lg max-w-xl">
                {t(`carousel.${slide.key}.subtitle`)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={slide.cta1.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wide text-white transition-all hover:brightness-110"
                  style={{ backgroundColor: "#D42B2B" }}
                >
                  {t(slide.cta1.labelKey)}
                </a>
                <a
                  href={slide.cta2.href}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wide text-white border-[1.5px] border-white/60 hover:bg-white/10 transition-all"
                >
                  {t(slide.cta2.labelKey)}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent z-[1]" />
    </section>
  );
}
