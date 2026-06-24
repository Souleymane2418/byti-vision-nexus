import { createFileRoute } from "@tanstack/react-router";
import { Smartphone, Cpu, Wifi, ShieldCheck, Zap, Headphones } from "lucide-react";
import { SectorPage } from "@/components/SectorPage";
import { ElectronicsShowcase } from "@/components/ElectronicsShowcase";
import heroImg from "@/assets/hero-electronics-wide.jpg";

export const Route = createFileRoute("/electronique")({
  component: () => (
    <SectorPage
      heroImage={heroImg}
      Icon={Smartphone}
      badge="Électronique & objets connectés"
      title="Électronique"
      accent="intelligente"
      subtitle="Smartphones, accessoires et équipements connectés pour particuliers et professionnels. Sélection rigoureuse, garantie constructeur, SAV local."
      ctaPrimary={{ label: "Voir la boutique", href: "/boutique" }}
      features={[
        { icon: Cpu, title: "Marques de référence", text: "Distributeur agréé des grandes marques internationales avec produits authentiques garantis." },
        { icon: Wifi, title: "Objets connectés", text: "Maison intelligente, audio, accessoires nomades et solutions IoT pour particuliers et entreprises." },
        { icon: ShieldCheck, title: "Garantie & SAV", text: "Service après-vente local, réparation et assistance technique assurés par nos équipes certifiées." },
        { icon: Zap, title: "Livraison rapide", text: "Stock disponible et livraison express dans toutes les grandes villes." },
        { icon: Headphones, title: "Conseil personnalisé", text: "Nos experts vous orientent vers le matériel adapté à votre usage et budget." },
        { icon: Smartphone, title: "Équipement pro", text: "Flottes mobiles, parcs informatiques, contrats sur mesure pour entreprises." },
      ]}
      offerings={[
        { title: "Smartphones & tablettes", text: "Catalogue large : entrée de gamme, milieu de gamme et premium des plus grandes marques." },
        { title: "Audio & accessoires", text: "Casques, écouteurs sans fil, chargeurs, coques, supports et tous accessoires utiles." },
        { title: "Informatique & bureautique", text: "Ordinateurs portables, imprimantes, périphériques et consommables professionnels." },
        { title: "Smart home", text: "Ampoules connectées, prises intelligentes, hubs domotiques et systèmes audio multi-pièces." },
      ]}
      showcase={<ElectronicsShowcase />}
    />
  ),
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
