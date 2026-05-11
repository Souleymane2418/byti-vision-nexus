import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroSection } from "@/components/HeroSection";
import { EnergyShowcase } from "@/components/EnergyShowcase";
import { EcoCommitment } from "@/components/EcoCommitment";

import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import heroMainImg from "@/assets/hero-main.jpg";
import heroSolarFarmImg from "@/assets/hero-solar-farm.jpg";
import heroElectronicsImg from "@/assets/hero-electronics-wide.jpg";
import heroSecurityImg from "@/assets/hero-security.jpg";
import heroEnergyImg from "@/assets/hero-energy-wide.jpg";
import heroTvImg from "@/assets/hero-tv.jpg";
import heroBtpImg from "@/assets/hero-btp.jpg";

import heroMainVid from "@/assets/hero-main.mp4.asset.json";
import heroSolarFarmVid from "@/assets/hero-solar-farm.mp4.asset.json";
import heroElectronicsVid from "@/assets/hero-electronics.mp4.asset.json";
import heroSecurityVid from "@/assets/hero-security-loop.mp4.asset.json";
import heroEnergyVid from "@/assets/hero-energy-loop.mp4.asset.json";
import heroTvVid from "@/assets/hero-tv-loop.mp4.asset.json";
import heroBtpVid from "@/assets/hero-btp-loop.mp4.asset.json";

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
    video: heroBtpVid.url,
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
      
      <WhyChooseUs />
      <ServicesGrid />
      <ProjectsGallery />
      <ContactSection />
      <Footer />
    </div>
  );
}
