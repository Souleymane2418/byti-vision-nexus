import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — BYTI Technologie SARL" },
      { name: "description", content: "Contactez BYTI Technologie SARL au +226 76 76 76 63." },
      { property: "og:title", content: "Contact — BYTI Technologie SARL" },
      { property: "og:description", content: "Prenez contact avec nos équipes." },
      { property: "og:url", content: "https://byti-technologie.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://byti-technologie.com/contact" }],
  }),
});

function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-24">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
