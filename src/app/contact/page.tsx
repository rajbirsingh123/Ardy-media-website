import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import SkyField from "@/components/SkyField";
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
  site.location
    ? {
        icon: "📍",
        label: site.location,
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.location)}`,
      }
    : null,
].filter((detail): detail is { icon: string; label: string; href: string } => detail !== null);

export default function ContactPage() {
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
            eyebrow="Get Started"
            title="Let's build your growth engine"
            description="Tell us about your business and we'll come back with a plan — no obligation."
          />
        </Container>
      </Section3D>

      <Section3D className="relative pb-24">
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <h3 className="font-display text-xl font-bold text-white">Talk to us</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Fill out the form or reach out directly. We usually reply within one
                business day.
              </p>
              <ul className="mt-6 space-y-4">
                {contactDetails.map((detail) => (
                  <li key={detail.label} className="flex items-center gap-3 text-sm">
                    <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-white/5 text-base text-gold-300 ring-1 ring-white/10">
                      {detail.icon}
                    </span>
                    <a
                      href={detail.href}
                      target={detail.href.startsWith("http") ? "_blank" : undefined}
                      rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-medium text-white transition-colors hover:text-gold-300"
                    >
                      {detail.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  What happens next
                </h4>
                <ol className="mt-4 space-y-3 text-sm text-white/70">
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold-300">1.</span>
                    We review your message and reply within one business day.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold-300">2.</span>
                    We book a free strategy call to understand your goals.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-display font-bold text-gold-300">3.</span>
                    You get a scoped plan — no obligation to proceed.
                  </li>
                </ol>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>

          {site.location && (
            <Reveal delay={160} className="mt-10">
              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <iframe
                  title="Ardy Media office location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(site.location)}&output=embed`}
                  width="100%"
                  height="360"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0"
                />
              </div>
            </Reveal>
          )}
        </Container>
      </Section3D>

      <Section3D className="relative py-24">
        <Container className="relative z-10">
          <Reveal>
            <SectionHeading dark eyebrow="Questions" title="Frequently asked questions" />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <FaqAccordion dark items={faqs} />
          </Reveal>
        </Container>
      </Section3D>
    </>
  );
}
