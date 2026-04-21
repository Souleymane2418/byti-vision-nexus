import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { HeroSection } from "@/components/HeroSection";
import { EnergyShowcase } from "@/components/EnergyShowcase";
import { EcoCommitment } from "@/components/EcoCommitment";
import { AboutSection } from "@/components/AboutSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import heroMainImg from "@/assets/hero-main.jpg";
import heroSolarFarmImg from "@/assets/hero-solar-farm.jpg";
import heroElectronicsImg from "@/assets/hero-electronics.jpg";
import heroSecurityImg from "@/assets/hero-security.jpg";
import heroEnergyImg from "@/assets/hero-energy.jpg";
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
          "Solutions technologiques, énergétiques et infrastructurelles pour un monde moderne. Électronique, sécurité, énergie, BTP.",
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
    video: heroElectronicsVid.url,
    poster: heroElectronicsImg,
    title: "Électronique & équipements intelligents",
    subtitle: "Des technologies modernes pour un quotidien connecté",
    buttonText: "Découvrir",
    buttonHref: "#services",
  },
  {
    id: "security",
    video: heroSecurityVid.url,
    poster: heroSecurityImg,
    title: "Sécurité & vidéosurveillance",
    subtitle: "Protégez vos biens avec des solutions intelligentes et performantes",
    buttonText: "Nos solutions",
    buttonHref: "#services",
  },
  {
    id: "energy",
    video: heroEnergyVid.url,
    poster: heroEnergyImg,
    title: "Énergie & batteries lithium",
    subtitle: "Des solutions énergétiques fiables, durables et innovantes",
    buttonText: "En savoir plus",
    buttonHref: "#services",
  },
  {
    id: "tv",
    video: heroTvVid.url,
    poster: heroTvImg,
    title: "Téléviseurs & solutions d'affichage",
    subtitle: "Une expérience visuelle immersive et de haute qualité",
    buttonText: "Voir produits",
    buttonHref: "#services",
  },
  {
    id: "btp",
    video: heroBtpVid.url,
    poster: heroBtpImg,
    title: "BTP & construction",
    subtitle: "Construire avec expertise, précision et innovation",
    buttonText: "Nos réalisations",
    buttonHref: "#projects",
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
      <AboutSection />
      <WhyChooseUs />
      <ServicesGrid />
      <ProjectsGallery />
      <ContactSection />
      <Footer />
    </div>
  );
}
