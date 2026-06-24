import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroSection } from "@/components/HeroSection";
import { EnergyShowcase } from "@/components/EnergyShowcase";
import { EcoCommitment } from "@/components/EcoCommitment";
import { AboutTeaser } from "@/components/AboutTeaser";

import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { Footer } from "@/components/Footer";

import heroElectronicsImg from "@/assets/hero-electronics-wide.jpg";
import heroSecurityImg from "@/assets/hero-security.jpg";
import heroEnergyImg from "@/assets/byti-powerwall.png";
import heroTvImg from "@/assets/hero-tv.jpg";
import heroBtpImg from "@/assets/hero-btp.jpg";
import heroSmartphonesImg from "@/assets/hero-smartphones.jpg";

import heroSecurityVid from "@/assets/hero-security-loop.mp4.asset.json";
import heroTvVid from "@/assets/hero-tv-loop.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "BYTI Technologie SARL | Connecter · Construire · Innover" },
      {
        name: "description",
        content:
          "Solutions technologiques, énergétiques et matériaux de construction pour un monde moderne. Électronique, sécurité, énergie, briques, pavés et béton.",
      },
      { property: "og:title", content: "BYTI Technologie SARL" },
      {
        property: "og:description",
        content: "Connecter · Construire · Innover — Solutions technologiques pour un monde moderne",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://byti-technologie.com/" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "BYTI Technologie SARL",
              url: "https://byti-technologie.com",
              logo: "https://byti-technologie.com/favicon.ico",
              telephone: "+226 76 76 76 63",
              sameAs: [],
              parentOrganization: { "@type": "Organization", name: "BYTI " },
            },
            {
              "@type": "WebSite",
              url: "https://byti-technologie.com",
              name: "BYTI Technologie SARL",
            },
          ],
        }),
      },
    ],
  }),
});

const heroSections = [
  {
    id: "electronics",
    image: heroElectronicsImg,
    poster: heroElectronicsImg,
    title: "Électronique & équipements intelligents",
    subtitle: "Des technologies modernes pour un quotidien connecté",
    buttonText: "Découvrir",
    buttonHref: "/electronique",
  },
  {
    id: "security",
    video: heroSecurityVid.url,
    poster: heroSecurityImg,
    title: "Sécurité & vidéosurveillance",
    subtitle: "Protégez vos biens avec des solutions intelligentes et performantes",
    buttonText: "Nos solutions",
    buttonHref: "/securite",
  },
  {
    id: "energy",
    image: heroEnergyImg,
    poster: heroEnergyImg,
    title: "Énergie & batteries lithium",
    subtitle: "Des solutions énergétiques fiables, durables et innovantes",
    buttonText: "En savoir plus",
    buttonHref: "/batteries",
  },
  {
    id: "smartphones",
    image: heroSmartphonesImg,
    poster: heroSmartphonesImg,
    title: "Smartphones & téléphones",
    subtitle: "Large gamme de smartphones dernière génération à des prix imbattables",
    buttonText: "Voir la boutique",
    buttonHref: "/boutique",
  },
  {
    id: "tv",
    video: heroTvVid.url,
    poster: heroTvImg,
    title: "Téléviseurs & solutions d'affichage",
    subtitle: "Une expérience visuelle immersive et de haute qualité",
    buttonText: "Voir produits",
    buttonHref: "/televiseurs",
  },
  {
    id: "btp",
    image: heroBtpImg,
    poster: heroBtpImg,
    title: "BTP — Briques, Pavés & Béton",
    subtitle: "Notre pôle BTP conçoit et fabrique briques, pavés autobloquants, parpaings et béton prêt à l'emploi pour vos chantiers résidentiels et industriels.",
    buttonText: "Nos réalisations",
    buttonHref: "/btp",
  },
];

function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroCarousel />
      {heroSections.map((hero) => (
        <HeroSection key={hero.id} {...hero} />
      ))}
      <EnergyShowcase />
      <EcoCommitment />
      <AboutTeaser />
      <WhyChooseUs />
      <PartnersMarquee />
      <Footer />
    </div>
  );
}
