import type { Metadata } from "next";
import PillarLanding from "@/components/PillarLanding";

export const metadata: Metadata = {
  title: { absolute: "Ardy Digital — Full-Spectrum Software Engineering" },
  description:
    "Full-spectrum software engineering — web, mobile, backend, cloud and data. Websites, CRM systems, custom software, built on infrastructure that holds up under real usage.",
};

export default function DigitalPage() {
  return (
    <PillarLanding
      serviceSlug="technology-development"
      heroVideo="/videos/digital-hero.mp4"
      heroVideoPoster="/videos/digital-hero-poster.jpg"
    />
  );
}
