import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Tv, Volume2, Cast, Settings, Maximize2, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-tv.jpg";

const featureIcons: LucideIcon[] = [Maximize2, Monitor, Volume2, Cast, Settings, Tv];

function TeleviseursRoute() {
  const { t } = useTranslation();
  const features = (t("sectors.televiseurs.features", { returnObjects: true }) as { title: string; text: string }[]).map(
    (f, i) => ({ ...f, icon: featureIcons[i] }),
  );
  const offerings = t("sectors.televiseurs.offerings", { returnObjects: true }) as { title: string; text: string }[];
  return (
    <SectorPage
      heroImage={heroImg}
      Icon={Tv}
      badge={t("sectors.televiseurs.badge")}
      title={t("sectors.televiseurs.title")}
      accent={t("sectors.televiseurs.accent")}
      subtitle={t("sectors.televiseurs.subtitle")}
      ctaPrimary={{ label: t("sectors.televiseurs.ctaLabel"), href: "/boutique" }}
      features={features}
      offerings={offerings}
    />
  );
}

export const Route = createFileRoute("/televiseurs")({
  component: TeleviseursRoute,
  head: () => ({
    meta: [
      { title: "Téléviseurs & affichage — BYTI" },
      { name: "description", content: "TV LED, QLED, OLED et écrans professionnels. Installation et configuration par nos techniciens." },
      { property: "og:title", content: "Téléviseurs — BYTI" },
      { property: "og:description", content: "Une expérience visuelle immersive." },
      { property: "og:url", content: "https://byti-technologie.com/televiseurs" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/televiseurs" }],
  }),
});
