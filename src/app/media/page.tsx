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
        capabilities: {
          src: "/media-visuals/analytics-dashboard.png",
          width: 714,
          height: 541,
        },
      }}
      trustBadges={[
        "Every campaign tied to a booking event",
        "Budget shifted to what converts",
        "Reports you actually understand",
      ]}
      heroMetrics={[
        { label: "Cost per lead", value: "$24", delta: "-18%" },
        { label: "Leads / month", value: "147", delta: "+32%" },
        { label: "Return on spend", value: "4.2x", delta: "+0.8" },
      ]}
      processStory
      processVideo="/videos/ardy-crm-flow.webm"
      showRoiCalculator
    />
  );
}
