import type { Metadata } from "next";
import PillarLanding from "@/components/PillarLanding";

export const metadata: Metadata = {
  title: { absolute: "Ardy Media — Paid Social & Performance Marketing" },
  description:
    "Paid social & performance marketing across Meta, Instagram and LinkedIn — campaigns, creative, lead capture and reporting, all built around pipeline, not vanity metrics.",
};

export default function MediaPage() {
  return (
    <PillarLanding
      serviceSlug="digital-marketing"
      visuals={{
        hero: { src: "/media-visuals/social-hero.png", width: 732, height: 453 },
        process: { src: "/media-visuals/lead-funnel.png", width: 590, height: 554 },
        capabilities: {
          src: "/media-visuals/analytics-dashboard.png",
          width: 714,
          height: 541,
        },
      }}
    />
  );
}
