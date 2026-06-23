const partners = [
  "Partenaire 1",
  "Partenaire 2",
  "Partenaire 3",
  "Partenaire 4",
  "Partenaire 5",
  "Partenaire 6",
  "Partenaire 7",
  "Partenaire 8",
];

export function PartnersMarquee() {
  // Duplicate for seamless loop
  const loop = [...partners, ...partners];

  return (
    <section
      aria-label="Nos partenaires"
      className="border-y border-byti-blue/10 bg-gradient-to-r from-white via-byti-blue/5 to-white py-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-byti-blue/10">
          <span className="w-1.5 h-1.5 rounded-full bg-byti-red" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-byti-blue-deep">
            Nos partenaires
          </span>
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold text-byti-blue-deep">
          Ils nous font confiance
        </h3>
      </div>

      <div className="relative group">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="mx-6 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-byti-blue/15 bg-white shadow-[0_4px_20px_-8px_oklch(0.5_0.13_240/0.25)]"
            >
              <span className="text-sm font-semibold text-byti-blue-deep/70 tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
