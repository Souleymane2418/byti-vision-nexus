import { createFileRoute } from "@tanstack/react-router";
import { HardHat, Layers, Hammer, Truck, Factory, Building2 } from "lucide-react";
import { SectorPage } from "@/components/SectorPage";
import heroImg from "@/assets/hero-btp.jpg";

export const Route = createFileRoute("/btp")({
  component: () => (
    <SectorPage
      heroImage={heroImg}
      Icon={HardHat}
      badge="BTP — Briques, pavés & béton"
      title="Bâtir"
      accent="solide"
      subtitle="Notre pôle BTP fabrique briques, pavés autobloquants, parpaings et béton prêt à l'emploi pour vos chantiers résidentiels, commerciaux et industriels."
      features={[
        { icon: Layers, title: "Briques & parpaings", text: "Fabrication aux normes en vigueur, formats standards et sur mesure selon vos plans." },
        { icon: Hammer, title: "Pavés autobloquants", text: "Pavés décoratifs et techniques pour allées, parkings, places et espaces publics." },
        { icon: Factory, title: "Béton prêt à l'emploi", text: "Production sur site, livraison toupie et formulations adaptées à chaque ouvrage." },
        { icon: Truck, title: "Livraison chantier", text: "Logistique propre et planning calé sur vos délais de chantier." },
        { icon: Building2, title: "Volumes industriels", text: "Capacité de production pour grands projets : lotissements, écoles, infrastructures publiques." },
        { icon: HardHat, title: "Conseil technique", text: "Nos ingénieurs accompagnent vos équipes pour le dimensionnement et la mise en œuvre." },
      ]}
      offerings={[
        { title: "Particuliers & autoconstructeurs", text: "Briques, parpaings et pavés pour maisons individuelles, clôtures et aménagements extérieurs." },
        { title: "Entrepreneurs BTP", text: "Approvisionnement régulier, tarifs préférentiels et stockage sur chantier possible." },
        { title: "Grands projets", text: "Lotissements, infrastructures, bâtiments publics : capacité de production et logistique adaptées." },
        { title: "Béton sur mesure", text: "Formulations selon résistance recherchée, livraison en toupie et pompage si nécessaire." },
      ]}
    />
  ),
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
