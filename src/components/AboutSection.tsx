import { motion } from "framer-motion";
import { Globe2, Building2, Users, Award, MapPin } from "lucide-react";

const groupStats = [
  { icon: Globe2, value: "25+", label: "Pays d'implantation" },
  { icon: Building2, value: "40+", label: "Filiales & bureaux" },
  { icon: Users, value: "8 000+", label: "Collaborateurs" },
  { icon: Award, value: "1998", label: "Année de fondation" },
];

const regions = [
  { zone: "Afrique", hubs: "Yaoundé · Douala · Lagos · Abidjan · Nairobi" },
  { zone: "Europe", hubs: "Paris · Madrid · Istanbul" },
  { zone: "Moyen-Orient", hubs: "Dubaï · Riyad" },
  { zone: "Asie", hubs: "Shenzhen · Singapour · Mumbai" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="pill-badge">★ Groupe International</span>
          <h2 className="editorial-title mt-6 text-3xl md:text-5xl">
            Filiale du groupe{" "}
            <span className="editorial-accent">BYTI Worldwide</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Fondé en <span className="font-semibold text-foreground">1998</span>,
            <span className="font-semibold text-foreground"> BYTI Worldwide</span> est un
            groupe international actif dans la technologie, l'énergie, les
            infrastructures et la distribution électronique. Présent sur{" "}
            <span className="font-semibold text-foreground">4 continents</span> à travers
            plus de <span className="font-semibold text-foreground">25 pays</span>, le
            groupe accompagne gouvernements, opérateurs et entreprises dans leur
            transformation numérique et énergétique.
          </p>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            <span className="font-semibold text-foreground">BYTI Technologie SARL</span>{" "}
            est la filiale officielle du groupe pour l'Afrique Centrale, basée au
            Cameroun. Nous portons localement l'excellence, les standards qualité et
            l'innovation continue d'un acteur global.
          </p>
        </motion.div>

        {/* Group brand banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 relative rounded-3xl overflow-hidden border border-border/60 bg-gradient-to-br from-primary/5 via-background to-byti-red/5 p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-byti-red flex items-center justify-center shadow-lg">
                <Globe2 className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  BYTI Group
                </span>
                <span className="text-2xl md:text-3xl font-bold tracking-[0.12em] gradient-text">
                  BYTI WORLDWIDE
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Headquarters · Dubaï (UAE) — Founded 1998
                </span>
              </div>
            </div>
            <div className="md:ml-auto grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full md:w-auto">
              {groupStats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <s.icon className="h-5 w-5 text-primary mb-1.5 mx-auto md:mx-0" />
                  <div className="text-xl md:text-2xl font-bold text-foreground font-display">
                    {s.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regional presence */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-byti-red mb-4">
              Présence Mondiale
            </h3>
            <p className="editorial-title text-2xl md:text-3xl mb-6">
              Une empreinte sur <span className="editorial-accent">4 continents</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              De Dubaï à Yaoundé, de Paris à Singapour, BYTI déploie ses activités
              à travers un réseau de filiales et de partenaires stratégiques. Cette
              présence globale nous permet d'apporter à nos clients africains les
              meilleures technologies mondiales aux meilleurs prix.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            {regions.map((r, i) => (
              <motion.div
                key={r.zone}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-colors"
              >
                <MapPin className="h-5 w-5 text-byti-red shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-foreground">{r.zone}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 truncate">
                    {r.hubs}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
