import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Section3D from "@/components/Section3D";
import ProcessTimeline from "@/components/ProcessTimeline";
import ShieldBackdrop from "@/components/ShieldBackdrop";
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
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="How It Works"
            title="From first call to fully running system"
            description="Four stages, one continuous engagement — not four separate handoffs."
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ProcessTimeline steps={process} />
        </Container>
      </section>

      <Section3D className="pb-24">
        <Container>
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
