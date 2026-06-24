import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Globe2 } from "lucide-react";


interface HeroSectionProps {
  video?: string;
  image?: string;
  poster?: string;
  title: string;
  subtitle: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  secondaryButton?: { text: string; href: string };
  id?: string;
  priority?: boolean;
  containImage?: boolean;
}

const containByImageSrcKeyword = "powerwall";


export function HeroSection({
  video,
  image,
  poster,
  title,
  subtitle,
  description,
  buttonText,
  buttonHref = "#services",
  secondaryButton,
  id,
  priority = false,
  containImage,
}: HeroSectionProps) {
  const { t: tHero } = useTranslation();
  const useContain = containImage ?? (typeof image === "string" && image.toLowerCase().includes(containByImageSrcKeyword));

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${priority ? "h-screen" : "min-h-[85vh] md:min-h-[90vh] py-20"}`}
    >
      {video ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? "auto" : "metadata"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-center ${useContain ? "object-contain bg-white" : "object-cover"}`}
        />
      )}
      {/* Lighter overlay so the video stays clearly visible while text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      {/* Top fade — subtle dark overlay so navbar stays visible without washing out the video */}
      {!priority && (
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-[1]" />
      )}

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] drop-shadow">
              <Globe2 className="h-3.5 w-3.5" />
              BYTI — Leader international multi-secteur
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
              {title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 mx-auto max-w-3xl text-base md:text-lg text-white/95 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
          >
            Présent en <span className="font-semibold">Chine, à Dubaï, en Côte d'Ivoire, au Cameroun et au Burkina Faso</span>, le groupe <span className="font-semibold">BYTI</span> s'impose comme un acteur de référence mondial. De l'énergie à l'électronique, de la sécurité au BTP, nous conjuguons puissance industrielle internationale et expertise locale pour livrer des solutions à la hauteur des plus grands standards.
          </motion.p>



          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-white font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          >
            {subtitle}
          </motion.p>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-4 text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={buttonHref}
              className="btn-primary-glow px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
            >
              {buttonText}
            </a>
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="btn-outline-glow px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide uppercase"
              >
                {secondaryButton.text}
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade with BYTI brand tint (blue → red) for cohesive transitions */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent z-[1]" />
    </section>
  );
}
