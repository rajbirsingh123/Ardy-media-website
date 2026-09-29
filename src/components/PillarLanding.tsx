import Link from "next/link";
import Container from "./Container";
import Button from "./Button";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Section3D from "./Section3D";
import TiltCard from "./TiltCard";
import FaqAccordion from "./FaqAccordion";
import TrustedBy from "./TrustedBy";
import ShieldBackdrop from "./ShieldBackdrop";
import ConversationDemo from "./ConversationDemo";
import FloatVisual from "./FloatVisual";
import { ArrowRightIcon, CheckIcon, iconMap } from "./Icons";
import {
  pillarBrand,
  pillarFaqs,
  pillarProcess,
  pillarServiceList,
  services,
  type Service,
} from "@/lib/content";
import { techCapabilities } from "@/lib/content";

const otherPillars: { slug: string; label: string; href: string }[] = [
  { slug: "digital-marketing", label: "Media", href: "/media" },
  { slug: "technology-development", label: "Digital", href: "/digital" },
  { slug: "growth-automation", label: "Sales", href: "/sales" },
];

type PillarVisuals = {
  hero?: { src: string; width: number; height: number };
  process?: { src: string; width: number; height: number };
  capabilities?: { src: string; width: number; height: number };
};

export default function PillarLanding({
  serviceSlug,
  visuals,
}: {
  serviceSlug: Service["slug"];
  visuals?: PillarVisuals;
}) {
  const service = services.find((s) => s.slug === serviceSlug)!;
  const brand = pillarBrand[serviceSlug];
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const capabilities = techCapabilities.filter(
    (c) => c.serviceSlug === serviceSlug,
  );
  const serviceList = pillarServiceList[serviceSlug] ?? [];
  const processSteps = pillarProcess[serviceSlug] ?? [];
  const faqItems = pillarFaqs[serviceSlug] ?? [];
  const others = otherPillars.filter((p) => p.slug !== serviceSlug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid py-20 sm:py-28">
        <ShieldBackdrop />
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-500/20 blur-3xl" />
        <Container className="relative">
          {serviceSlug === "growth-automation" || visuals?.hero ? (
            <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <Reveal>
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
                  {brand.name}
                </div>
                <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-lg text-balance text-lg leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/contact">
                    Talk to us about {brand.name}
                    <ArrowRightIcon />
                  </Button>
                  <Button href="/services" variant="outline">
                    See all services
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={150}>
                {serviceSlug === "growth-automation" ? (
                  <ConversationDemo />
                ) : (
                  visuals?.hero && (
                    <FloatVisual
                      src={visuals.hero.src}
                      alt={`${brand.name} — ${service.title}`}
                      width={visuals.hero.width}
                      height={visuals.hero.height}
                      priority
                      className="mx-auto max-w-md lg:max-w-none"
                    />
                  )
                )}
              </Reveal>
            </div>
          ) : (
            <Reveal className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-700">
                {brand.name}
              </div>
              <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-balance text-lg leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact">
                  Talk to us about {brand.name}
                  <ArrowRightIcon />
                </Button>
                <Button href="/services" variant="outline">
                  See all services
                </Button>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Services list */}
      {serviceList.length > 0 && (
        <Section3D className="py-20">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Services" title={`${brand.name} services`} />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {serviceList.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <TiltCard className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                    <span className="font-display text-2xl font-extrabold text-brand-100">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section3D>
      )}

      {/* What's included / deliverables */}
      <Section3D className="py-20">
        <Container>
          <Reveal className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-7 shadow-soft">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                What&apos;s included
              </h2>
              <ul className="mt-5 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-white p-7 shadow-soft">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                You walk away with
              </h2>
              <ul className="mt-5 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section3D>

      {/* Capabilities breakdown */}
      {capabilities.length > 0 && (
        <Section3D className="bg-mist-100 py-20">
          <Container>
            {visuals?.capabilities ? (
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
                <Reveal>
                  <SectionHeading
                    eyebrow="Full Breakdown"
                    title={`Everything under ${brand.name}`}
                    description="The complete picture — every capability this pillar covers, not just the highlights."
                    align="left"
                  />
                </Reveal>
                <Reveal delay={120}>
                  <FloatVisual
                    src={visuals.capabilities.src}
                    alt={`${brand.name} performance analytics`}
                    width={visuals.capabilities.width}
                    height={visuals.capabilities.height}
                    className="mx-auto max-w-xs lg:max-w-sm"
                  />
                </Reveal>
              </div>
            ) : (
              <Reveal>
                <SectionHeading
                  eyebrow="Full Breakdown"
                  title={`Everything under ${brand.name}`}
                  description="The complete picture — every capability this pillar covers, not just the highlights."
                />
              </Reveal>
            )}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((group, i) => (
                <Reveal key={group.title} delay={i * 80}>
                  <TiltCard className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                    <h3 className="font-display text-base font-bold text-navy">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {group.description}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-line pt-4">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-ink/80"
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section3D>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <Section3D className="py-20">
          <Container>
            {visuals?.process ? (
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
                <Reveal>
                  <SectionHeading
                    eyebrow="How It Works"
                    title={`How ${brand.name} works`}
                    align="left"
                  />
                </Reveal>
                <Reveal delay={120}>
                  <FloatVisual
                    src={visuals.process.src}
                    alt={`${brand.name} lead capture funnel`}
                    width={visuals.process.width}
                    height={visuals.process.height}
                    className="mx-auto max-w-xs lg:max-w-sm"
                  />
                </Reveal>
              </div>
            ) : (
              <Reveal>
                <SectionHeading
                  eyebrow="How It Works"
                  title={`How ${brand.name} works`}
                />
              </Reveal>
            )}
            <div className="mt-14 grid gap-6 md:grid-cols-4">
              {processSteps.map((step, i) => (
                <Reveal key={step.step} delay={i * 90}>
                  <TiltCard className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft">
                    <span className="font-display text-4xl font-extrabold text-brand-100">
                      {step.step}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section3D>
      )}

      {/* Trusted by */}
      <section className="bg-navy py-16">
        <Container>
          <Reveal>
            <TrustedBy dark />
          </Reveal>
        </Container>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <Section3D className="py-20">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Questions" title={`${brand.name} FAQs`} />
            </Reveal>
            <div className="mt-12">
              <FaqAccordion items={faqItems} />
            </div>
          </Container>
        </Section3D>
      )}

      {/* Cross-link to other pillars */}
      <section className="pb-20">
        <Container>
          <Reveal className="rounded-2xl border border-line bg-white p-6 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Looking for something else?
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-brand-500 hover:text-brand-700"
                >
                  {p.label}
                  <ArrowRightIcon />
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="pb-24">
        <Container>
          <Reveal className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 px-8 py-14 text-center shadow-lift sm:px-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to talk to {brand.name}?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
              A free strategy call is step one — no obligation, no generic
              questionnaire.
            </p>
            <Button href="/contact" className="mt-7">
              Book a Free Strategy Call <ArrowRightIcon />
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
