import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Tv, Volume2, Cast, Settings, Maximize2 } from "lucide-react";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-tv.jpg";

export const Route = createFileRoute("/televiseurs")({
  component: () => (
    <SectorPage
      heroImage={heroImg}
      Icon={Tv}
      badge="Téléviseurs & affichage"
      title="Une expérience"
      accent="immersive"
      subtitle="Téléviseurs LED, QLED et OLED, écrans professionnels d'affichage dynamique. Du salon au showroom, BYTI équipe vos espaces."
      ctaPrimary={{ label: "Voir la boutique", href: "/boutique" }}
      features={[
        { icon: Maximize2, title: "Toutes tailles", text: "Du 32\" pour la chambre au 85\" pour le salon ou la salle de conférence." },
        { icon: Monitor, title: "4K & QLED", text: "Image ultra-haute définition, contraste profond et couleurs éclatantes." },
        { icon: Volume2, title: "Son immersif", text: "Compatibilité barres de son, Dolby Atmos et systèmes home cinéma." },
        { icon: Cast, title: "Smart TV", text: "Applications de streaming intégrées, miroir d'écran et contrôle vocal." },
        { icon: Settings, title: "Installation pro", text: "Fixation murale, calibrage image et configuration des sources par nos techniciens." },
        { icon: Tv, title: "Affichage dynamique", text: "Solutions digital signage pour commerces, restaurants, halls d'accueil et showrooms." },
      ]}
      offerings={[
        { title: "Téléviseurs grand public", text: "Catalogue LED, QLED et OLED des grandes marques. Garantie constructeur incluse." },
        { title: "Écrans professionnels", text: "Écrans haute luminosité pour vitrines, panneaux d'affichage et salles de réunion." },
        { title: "Installation & accessoires", text: "Supports muraux, barres de son, câblage HDMI et configuration sur site." },
        { title: "Pack home cinéma", text: "TV + son + installation pour transformer votre salon en véritable salle de projection." },
      ]}
    />
  ),
  head: () => ({
    meta: [
      { title: "Téléviseurs & affichage — BYTI" },
      { name: "description", content: "TV LED, QLED, OLED et écrans professionnels. Installation et configuration par nos techniciens." },
      { property: "og:title", content: "Téléviseurs — BYTI" },
      { property: "og:description", content: "Une expérience visuelle immersive." },
    ],
  }),
});
