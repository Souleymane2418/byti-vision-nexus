import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/activites")({
  component: ActivitesPage,
  head: () => ({
    meta: [
      { title: "Activités — BYTI Technologie SARL" },
      { name: "description", content: "Découvrez les activités de BYTI Technologie : électronique, sécurité, énergie, téléviseurs et BTP." },
      { property: "og:title", content: "Activités — BYTI Technologie SARL" },
      { property: "og:description", content: "Nos pôles d'activités au service de l'Afrique Centrale." },
    ],
  }),
});

function ActivitesPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24">
        <ServicesGrid />
      </div>
      <Footer />
    </div>
  );
}
