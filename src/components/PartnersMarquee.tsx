type Partner = {
  name: string;
  // simpleicons.org slug (laissez vide si la marque n'y est pas — on affichera le wordmark)
  icon?: string;
};

const phoneBrands: Partner[] = [
  { name: "Samsung", icon: "samsung" },
  { name: "Apple", icon: "apple" },
  { name: "Xiaomi", icon: "xiaomi" },
  { name: "Huawei", icon: "huawei" },
  { name: "Oppo", icon: "oppo" },
  { name: "Tecno" },
  { name: "Infinix" },
  { name: "itel" },
  { name: "Nokia", icon: "nokia" },
  { name: "Realme" },
];

const cameraBrands: Partner[] = [
  { name: "Hikvision" },
  { name: "Dahua" },
  { name: "Bosch", icon: "bosch" },
  { name: "Axis" },
  { name: "Hanwha" },
  { name: "Uniview" },
  { name: "CP PLUS" },
  { name: "Ezviz" },
];

function PartnerCard({ p }: { p: Partner }) {
  return (
    <div className="mx-4 flex h-20 w-44 shrink-0 items-center justify-center rounded-xl border border-byti-blue/15 bg-white px-4 shadow-[0_4px_20px_-8px_oklch(0.5_0.13_240/0.2)]">
      {p.icon ? (
        <img
          src={`https://cdn.simpleicons.org/${p.icon}`}
          alt={`${p.name} logo`}
          loading="lazy"
          className="max-h-10 max-w-[120px] object-contain"
        />
      ) : (
        <span className="text-base font-extrabold tracking-tight text-byti-blue-deep">
          {p.name}
        </span>
      )}
    </div>
  );
}

function Row({
  items,
  reverse = false,
  duration = 50,
}: {
  items: Partner[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="relative group overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marquee-rev" : "marquee"} ${duration}s linear infinite`,
        }}
      >
        {loop.map((p, i) => (
          <PartnerCard key={`${p.name}-${i}`} p={p} />
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee() {
  return (
    <section
      aria-label="Nos partenaires"
      className="border-y border-byti-blue/10 bg-gradient-to-r from-white via-byti-blue/5 to-white py-12"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-byti-blue/10">
          <span className="w-1.5 h-1.5 rounded-full bg-byti-red" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-byti-blue-deep">
            Nos partenaires
          </span>
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-bold text-byti-blue-deep">
          Les grandes marques que nous distribuons
        </h3>
        <p className="mt-2 text-sm text-byti-blue-deep/60">
          Smartphones &amp; téléphones · Caméras de surveillance
        </p>
      </div>

      <div className="space-y-4">
        <Row items={phoneBrands} duration={55} />
        <Row items={cameraBrands} duration={65} reverse />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
