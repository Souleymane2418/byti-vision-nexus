import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/a-propos")({
  component: AProposPage,
  head: () => ({
    meta: [
      { title: "À propos — BYTI Technologie SARL" },
      {
        name: "description",
        content:
          "BYTI Technologie SARL, filiale du groupe BYTI Worldwide. Présence sur 4 continents, 25+ pays, 8 000+ collaborateurs depuis 1998.",
      },
      { property: "og:title", content: "À propos — BYTI Technologie SARL" },
      {
        property: "og:description",
        content:
          "Filiale officielle du groupe BYTI Worldwide pour l'Afrique Centrale.",
      },
      { property: "og:url", content: "https://byti-technologie.com/a-propos" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/a-propos" }],
  }),
});

function AProposPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
