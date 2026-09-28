import type { Metadata } from "next";
import PillarLanding from "@/components/PillarLanding";

export const metadata: Metadata = {
  title: { absolute: "Ardy Media — Paid Social & Performance Marketing" },
  description:
    "Paid social & performance marketing across Meta, Instagram and LinkedIn — campaigns, creative, lead capture and reporting, all built around pipeline, not vanity metrics.",
};

export default function MediaPage() {
  return <PillarLanding serviceSlug="digital-marketing" />;
}
