import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import ProcessTimeline from "@/components/ProcessTimeline";
import Parallax from "@/components/Parallax";
import SkyField from "@/components/SkyField";
import { ArrowRightIcon } from "@/components/Icons";
import { process } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Ardy Media takes a business from first strategy call to a fully running marketing, website, CRM and automation system.",
};

export default function ProcessPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#01030a]">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(1200px 700px at 50% 0%, #0a1730 0%, #030812 55%, #000103 100%)",
          }}
        />
        <SkyField className="absolute inset-0" />
      </div>

      <Section3D className="relative py-20 sm:py-24">
        <Container className="relative z-10">
          <SectionHeading
            dark
            eyebrow="How It Works"
            title="From first call to fully running system"
            description="Four stages, one continuous engagement — not four separate handoffs."
          />
        </Container>
      </Section3D>

      <Section3D className="relative pb-24">
        <Container className="relative z-10">
          <Reveal>
            <ProcessTimeline steps={process} />
          </Reveal>
        </Container>
      </Section3D>

      <Section3D className="relative py-24">
        <Parallax
          speed={-0.2}
          className="pointer-events-none absolute -bottom-24 left-[-6%] h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
        />
        <Container className="relative z-10">
          <div className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 px-8 py-14 text-center shadow-lift sm:px-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to start with Discover?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
              The free strategy call is step one — no obligation, no generic
              questionnaire.
            </p>
            <Button href="/contact" className="mt-7">
              Book a Free Strategy Call <ArrowRightIcon />
            </Button>
          </div>
        </Container>
      </Section3D>
    </>
  );
}
