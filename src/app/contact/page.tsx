import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import ShieldBackdrop from "@/components/ShieldBackdrop";
import Section3D from "@/components/Section3D";
import { faqs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Ardy Media about your business and goals — we'll come back with a plan, no obligation.",
};

const contactDetails = [
  { icon: "✉", label: site.email, href: `mailto:${site.email}` },
  site.phone
    ? { icon: "📞", label: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}` }
    : null,
  site.location ? { icon: "📍", label: site.location } : null,
].filter((detail): detail is { icon: string; label: string; href?: string } => detail !== null);

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="Get Started"
            title="Let's build your growth engine"
            description="Tell us about your business and we'll come back with a plan — no obligation."
          />
        </Container>
      </section>

      <Section3D className="pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h3 className="font-display text-xl font-bold text-navy">Talk to us</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Fill out the form or reach out directly. We usually reply within one
                business day.
              </p>
              <ul className="mt-6 space-y-4">
                {contactDetails.map((detail) => (
                  <li key={detail.label} className="flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-base text-brand-700">
                      {detail.icon}
                    </span>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="font-medium text-navy transition-colors hover:text-brand-700"
                      >
                        {detail.label}
                      </a>
                    ) : (
                      <span className="font-medium text-navy">{detail.label}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-soft">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                  What happens next
                </h4>
                <ol className="mt-4 space-y-3 text-sm text-ink/80">
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-brand-700">1.</span>
                    We review your message and reply within one business day.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-brand-700">2.</span>
                    We book a free strategy call to understand your goals.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-brand-700">3.</span>
                    You get a scoped plan — no obligation to proceed.
                  </li>
                </ol>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </Section3D>

      <Section3D className="bg-mist-100 py-24">
        <Container>
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section3D>
    </>
  );
}
