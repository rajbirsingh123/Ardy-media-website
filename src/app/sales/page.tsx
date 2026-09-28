import type { Metadata } from "next";
import PillarLanding from "@/components/PillarLanding";

export const metadata: Metadata = {
  title: { absolute: "Ardy Sales — AI Bots, CRM & Booking Automation" },
  description:
    "AI bots, CRM and booking automation that capture, qualify and book leads while you sleep — routing, chatbots, nurture sequences and pipeline visibility.",
};

export default function SalesPage() {
  return <PillarLanding serviceSlug="growth-automation" />;
}
