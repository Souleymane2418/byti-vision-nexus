import { createFileRoute } from "@tanstack/react-router";
import { Camera, ShieldCheck, Eye, Bell, Smartphone, Lock } from "lucide-react";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-security.jpg";

export const Route = createFileRoute("/securite")({
  component: () => (
    <SectorPage
      heroImage={heroImg}
      Icon={Camera}
      badge="Sécurité & vidéosurveillance"
      title="Protéger"
      accent="l'essentiel"
      subtitle="Vidéosurveillance intelligente, contrôle d'accès et alarmes connectées. Solutions adaptées aux résidences, commerces et sites industriels."
      features={[
        { icon: Camera, title: "Caméras HD & IP", text: "Caméras intérieures, extérieures, dôme PTZ, vision nocturne et détection intelligente." },
        { icon: Eye, title: "Surveillance à distance", text: "Accès temps réel via smartphone, alertes instantanées et enregistrement cloud sécurisé." },
        { icon: Bell, title: "Alarmes connectées", text: "Détecteurs d'intrusion, capteurs d'ouverture, sirènes et notifications immédiates." },
        { icon: Lock, title: "Contrôle d'accès", text: "Serrures connectées, badges, biométrie et gestion centralisée des autorisations." },
        { icon: ShieldCheck, title: "Installation certifiée", text: "Pose, paramétrage et formation par nos techniciens certifiés." },
        { icon: Smartphone, title: "Application mobile", text: "Pilotez l'ensemble de votre installation depuis une seule application intuitive." },
      ]}
      offerings={[
        { title: "Résidentiel", text: "Pack maison/villa : 2 à 8 caméras, alarme, application mobile et installation clé en main." },
        { title: "Commerces & bureaux", text: "Surveillance multi-zones, contrôle d'accès employés et reporting sécurité hebdomadaire." },
        { title: "Sites industriels", text: "Vidéosurveillance haute capacité, intégration alarme/incendie et supervision 24/7." },
        { title: "Maintenance & monitoring", text: "Contrats de maintenance, mises à jour firmware et intervention rapide en cas d'incident." },
      ]}
    />
  ),
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
