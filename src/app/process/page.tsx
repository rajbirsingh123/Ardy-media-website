import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
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
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-line sm:block" />
            <div className="space-y-10">
              {process.map((step, i) => (
                <Reveal
                  key={step.step}
                  delay={i * 100}
                  className="relative flex flex-col gap-5 sm:flex-row"
                >
                  <div className="relative z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 font-display text-lg font-extrabold text-white shadow-soft">
                    {step.step}
                  </div>
                  <div className="flex-1 rounded-2xl border border-line bg-white p-6 shadow-soft">
                    <h3 className="font-display text-xl font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">
                      {step.short}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
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
      </section>
    </>
  );
}
