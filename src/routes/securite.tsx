import { createFileRoute } from "@tanstack/react-router";
import { Camera, ShieldCheck, Eye, Bell, Smartphone, Lock, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-security.jpg";

const featureIcons: LucideIcon[] = [Camera, Eye, Bell, Lock, ShieldCheck, Smartphone];

function SecuriteRoute() {
  const { t } = useTranslation();
  const features = (t("sectors.securite.features", { returnObjects: true }) as { title: string; text: string }[]).map(
    (f, i) => ({ ...f, icon: featureIcons[i] }),
  );
  const offerings = t("sectors.securite.offerings", { returnObjects: true }) as { title: string; text: string }[];
  return (
    <SectorPage
      heroImage={heroImg}
      Icon={Camera}
      badge={t("sectors.securite.badge")}
      title={t("sectors.securite.title")}
      accent={t("sectors.securite.accent")}
      subtitle={t("sectors.securite.subtitle")}
      features={features}
      offerings={offerings}
    />
  );
}

export const Route = createFileRoute("/securite")({
  component: SecuriteRoute,
  head: () => ({
    meta: [
      { title: "Sécurité & vidéosurveillance — BYTI" },
      { name: "description", content: "Caméras IP, alarmes, contrôle d'accès. Solutions de sécurité connectées pour résidentiel, commerces et sites industriels." },
      { property: "og:title", content: "Sécurité — BYTI" },
      { property: "og:description", content: "Vidéosurveillance et alarmes connectées." },
      { property: "og:url", content: "https://byti-technologie.com/securite" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/securite" }],
  }),
});
