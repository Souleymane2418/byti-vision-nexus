import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/projets")({
  component: ProjetsPage,
  head: () => ({
    meta: [
      { title: "Projets — BYTI Technologie SARL" },
      { name: "description", content: "Galerie des projets et réalisations de BYTI Technologie SARL." },
      { property: "og:title", content: "Projets — BYTI Technologie SARL" },
      { property: "og:description", content: "Nos réalisations à travers l'Afrique Centrale." },
      { property: "og:url", content: "https://byti-technologie.com/projets" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/projets" }],
  }),
});

function ProjetsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24">
        <ProjectsGallery />
      </div>
      <Footer />
    </div>
  );
}
