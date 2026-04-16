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
    <section id={id} className="relative h-screen w-full overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95]">
              {title}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-primary font-medium tracking-wide"
          >
            {subtitle}
          </motion.p>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
