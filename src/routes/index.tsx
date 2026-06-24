import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
import heroInternationalImg from "@/assets/hero-byti-international.jpg";

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

const heroConfig = [
  { id: "byti-international", tKey: "international", image: heroInternationalImg, poster: heroInternationalImg, buttonKey: "cta.discoverGroup", buttonHref: "/a-propos", withDescription: true },
  { id: "electronics", tKey: "electronics", image: heroElectronicsImg, poster: heroElectronicsImg, buttonKey: "cta.discover", buttonHref: "/electronique" },
  { id: "security", tKey: "security", video: heroSecurityVid.url, poster: heroSecurityImg, buttonKey: "cta.ourSolutions", buttonHref: "/securite" },
  { id: "energy", tKey: "energy", image: heroEnergyImg, poster: heroEnergyImg, buttonKey: "cta.learnMore", buttonHref: "/batteries" },
  { id: "smartphones", tKey: "smartphones", image: heroSmartphonesImg, poster: heroSmartphonesImg, buttonKey: "cta.shop", buttonHref: "/boutique" },
  { id: "tv", tKey: "tv", video: heroTvVid.url, poster: heroTvImg, buttonKey: "cta.viewProducts", buttonHref: "/televiseurs" },
  { id: "btp", tKey: "btp", image: heroBtpImg, poster: heroBtpImg, buttonKey: "cta.ourWork", buttonHref: "/btp" },
] as const;

function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroCarousel />
      {heroConfig.map((hero) => (
        <HeroSection
          key={hero.id}
          id={hero.id}
          video={"video" in hero ? hero.video : undefined}
          image={"image" in hero ? hero.image : undefined}
          poster={hero.poster}
          title={t(`hero.${hero.tKey}.title`)}
          subtitle={t(`hero.${hero.tKey}.subtitle`)}
          description={"withDescription" in hero && hero.withDescription ? t(`hero.${hero.tKey}.description`) : undefined}
          buttonText={t(hero.buttonKey)}
          buttonHref={hero.buttonHref}
        />
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

