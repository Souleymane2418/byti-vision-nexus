import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Cpu, Wifi, ShieldCheck, Zap, Headphones, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectorPage } from "@/components/SectorPage";
import { ElectronicsShowcase } from "@/components/ElectronicsShowcase";
import heroImg from "@/assets/hero-electronics-wide.jpg";

const featureIcons: LucideIcon[] = [Cpu, Wifi, ShieldCheck, Zap, Headphones, Smartphone];

function ElectroniqueRoute() {
  const { t } = useTranslation();
  const features = (t("sectors.electronique.features", { returnObjects: true }) as { title: string; text: string }[]).map(
    (f, i) => ({ ...f, icon: featureIcons[i] }),
  );
  const offerings = t("sectors.electronique.offerings", { returnObjects: true }) as { title: string; text: string }[];
  return (
    <SectorPage
      heroImage={heroImg}
      Icon={Smartphone}
      badge={t("sectors.electronique.badge")}
      title={t("sectors.electronique.title")}
      accent={t("sectors.electronique.accent")}
      subtitle={t("sectors.electronique.subtitle")}
      ctaPrimary={{ label: t("sectors.electronique.ctaLabel"), href: "/boutique" }}
      features={features}
      offerings={offerings}
      showcase={<ElectronicsShowcase />}
    />
  );
}

export const Route = createFileRoute("/electronique")({
  component: ElectroniqueRoute,
  head: () => ({
    meta: [
      { title: "Électronique & équipements connectés — BYTI" },
      { name: "description", content: "Smartphones, audio, informatique et objets connectés. Distributeur agréé avec garantie et SAV local." },
      { property: "og:title", content: "Électronique — BYTI" },
      { property: "og:description", content: "Sélection d'équipements électroniques et objets connectés." },
      { property: "og:url", content: "https://byti-technologie.com/electronique" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/electronique" }],
  }),
});
