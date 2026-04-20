import { motion } from "framer-motion";

interface HeroSectionProps {
  video: string;
  poster?: string;
  title: string;
  subtitle: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  secondaryButton?: { text: string; href: string };
  id?: string;
  priority?: boolean;
}

export function HeroSection({
  video,
  poster,
  title,
  subtitle,
  description,
  buttonText,
  buttonHref = "#services",
  secondaryButton,
  id,
  priority = false,
}: HeroSectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${priority ? "h-screen" : "min-h-[85vh] md:min-h-[90vh] py-20"}`}
    >
      <video
        src={video}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload={priority ? "auto" : "metadata"}
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />
      {/* Top fade for smoother transitions between heroes */}
      {!priority && (
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background/90 via-background/30 to-transparent z-[1]" />
      )}

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="max-w-5xl text-center">
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

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
