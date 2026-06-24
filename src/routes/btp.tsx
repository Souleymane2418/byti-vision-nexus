import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Layers, Hammer, Truck, Factory, Building2, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-btp.jpg";

const featureIcons: LucideIcon[] = [Layers, Hammer, Factory, Truck, Building2, HardHat];

function BtpRoute() {
  const { t } = useTranslation();
  const features = (t("sectors.btp.features", { returnObjects: true }) as { title: string; text: string }[]).map(
    (f, i) => ({ ...f, icon: featureIcons[i] }),
  );
  const offerings = t("sectors.btp.offerings", { returnObjects: true }) as { title: string; text: string }[];
  return (
    <SectorPage
      heroImage={heroImg}
      Icon={HardHat}
      badge={t("sectors.btp.badge")}
      title={t("sectors.btp.title")}
      accent={t("sectors.btp.accent")}
      subtitle={t("sectors.btp.subtitle")}
      features={features}
      offerings={offerings}
    />
  );
}

export const Route = createFileRoute("/btp")({
  component: BtpRoute,
  head: () => ({
    meta: [
      { title: "BTP — Briques, pavés & béton — BYTI" },
      { name: "description", content: "Fabrication de briques, pavés autobloquants, parpaings et béton prêt à l'emploi pour tous chantiers." },
      { property: "og:title", content: "BTP — BYTI" },
      { property: "og:description", content: "Briques, pavés, parpaings et béton de qualité." },
      { property: "og:url", content: "https://byti-technologie.com/btp" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/btp" }],
  }),
});
