import Link from "next/link";
import Container from "./Container";
import NeuralButton from "./NeuralButton";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Section3D from "./Section3D";
import TiltCard from "./TiltCard";
import FaqAccordion from "./FaqAccordion";
import TrustedBy from "./TrustedBy";
import SkyField from "./SkyField";
import ConversationDemo from "./ConversationDemo";
import FloatVisual from "./FloatVisual";
import DashboardCard from "./DashboardCard";
import StatCounters from "./StatCounters";
import RoiCalculator from "./RoiCalculator";
import StoryFlow from "./StoryFlow";
import FloatVideo from "./FloatVideo";
import ProcessFilmstrip from "./ProcessFilmstrip";
import SectionConnector from "./SectionConnector";
import { ArrowRightIcon, CheckIcon, iconMap } from "./Icons";
import {
  pillarBrand,
  pillarFaqs,
  pillarHighlights,
  pillarPlatforms,
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

type HeroMetric = { label: string; value: string; delta?: string };

export default function PillarLanding({
  serviceSlug,
  visuals,
  trustBadges,
  heroMetrics,
  showRoiCalculator = false,
  processStory = false,
  processVideo,
}: {
  serviceSlug: Service["slug"];
  visuals?: PillarVisuals;
  trustBadges?: string[];
  heroMetrics?: HeroMetric[];
  showRoiCalculator?: boolean;
  processVideo?: string;
  processStory?: boolean;
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
  const platforms = pillarPlatforms[serviceSlug] ?? [];
  const highlights = pillarHighlights[serviceSlug] ?? [];
  const others = otherPillars.filter((p) => p.slug !== serviceSlug);

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

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-500/10 blur-3xl" />
        <Container className="relative z-10">
          {serviceSlug === "growth-automation" || visuals?.hero ? (
            <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <Reveal>
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-gold-300 ring-1 ring-white/10">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  {brand.name}
                </div>
                <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-lg text-balance text-lg leading-relaxed text-white/65">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <NeuralButton href="/contact" accent="gold">
                    Talk to us about {brand.name}
                    <ArrowRightIcon />
                  </NeuralButton>
                  <NeuralButton href="/services" accent="ice">
                    See all services
                  </NeuralButton>
                </div>
                {trustBadges && trustBadges.length > 0 && (
                  <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                    {trustBadges.map((badge) => (
                      <div key={badge} className="flex items-center gap-2 text-sm text-white/60">
                        <CheckIcon className="h-4 w-4 flex-shrink-0 text-gold-300" />
                        {badge}
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
              <Reveal delay={150}>
                {serviceSlug === "growth-automation" ? (
                  <ConversationDemo />
                ) : (
                  visuals?.hero &&
                  (heroMetrics && heroMetrics.length > 0 ? (
                    <DashboardCard
                      src={visuals.hero.src}
                      alt={`${brand.name} — ${service.title}`}
                      width={visuals.hero.width}
                      height={visuals.hero.height}
                      metrics={heroMetrics}
                    />
                  ) : (
                    <FloatVisual
                      src={visuals.hero.src}
                      alt={`${brand.name} — ${service.title}`}
                      width={visuals.hero.width}
                      height={visuals.hero.height}
                      priority
                      dark
                      stage={{ index: "01", label: "Reach" }}
                      className="mx-auto max-w-md lg:max-w-none"
                    />
                  ))
                )}
              </Reveal>
            </div>
          ) : (
            <Reveal className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-gold-300 ring-1 ring-white/10">
                <Icon className="h-7 w-7" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-gold-300">
                {brand.name}
              </div>
              <h1 className="mt-3 text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-5 text-balance text-lg leading-relaxed text-white/65">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <NeuralButton href="/contact" accent="gold">
                  Talk to us about {brand.name}
                  <ArrowRightIcon />
                </NeuralButton>
                <NeuralButton href="/services" accent="ice">
                  See all services
                </NeuralButton>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Process */}
      {processSteps.length > 0 && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            {processStory ? (
              <div
                className={`grid items-center gap-10 ${
                  processVideo ? "lg:grid-cols-[0.8fr_1.2fr]" : "lg:grid-cols-[1fr_0.9fr]"
                }`}
              >
                <Reveal>
                  <SectionHeading
                    dark
                    eyebrow="How It Works"
                    title={`How ${brand.name} helps to grow your business?`}
                    align="left"
                  />
                </Reveal>
                <Reveal delay={120}>
                  {processVideo ? (
                    <FloatVideo
                      src={processVideo}
                      dark
                      className="mx-auto max-w-2xl lg:max-w-none"
                    />
                  ) : (
                    <StoryFlow />
                  )}
                </Reveal>
              </div>
            ) : visuals?.process ? (
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
                <Reveal>
                  <SectionHeading
                    dark
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
                    dark
                    stage={{ index: "02", label: "Convert" }}
                    className="mx-auto max-w-xs lg:max-w-sm"
                  />
                </Reveal>
              </div>
            ) : (
              <Reveal>
                <SectionHeading
                  dark
                  eyebrow="How It Works"
                  title={`How ${brand.name} works`}
                />
              </Reveal>
            )}
            <div className="mt-14">
              <ProcessFilmstrip steps={processSteps} />
            </div>
          </Container>
        </Section3D>
      )}

      {/* Stat highlights */}
      {highlights.length > 0 && (
        <Section3D className="pb-8">
          <Container className="relative z-10">
            <Reveal>
              <StatCounters stats={highlights} />
            </Reveal>
          </Container>
        </Section3D>
      )}

      {visuals?.hero && <SectionConnector />}

      {/* Services list */}
      {serviceList.length > 0 && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            <Reveal>
              <SectionHeading dark eyebrow="Services" title={`${brand.name} services`} />
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {serviceList.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <TiltCard className="h-full rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-colors duration-300 hover:ring-white/20">
                    <span className="font-display text-2xl font-extrabold text-white/15">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
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
        <Container className="relative z-10">
          <Reveal className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                What&apos;s included
              </h2>
              <ul className="mt-5 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                You walk away with
              </h2>
              <ul className="mt-5 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-white/75">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section3D>

      {/* Platforms */}
      {platforms.length > 0 && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            <Reveal>
              <SectionHeading
                dark
                eyebrow="Platforms"
                title="Where we run your campaigns"
                description="We focus on the platforms your customers actually use — not spreading budget across everything and hoping something sticks."
              />
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {platforms.map((platform, i) => (
                <Reveal key={platform.name} delay={i * 90}>
                  <TiltCard className="h-full rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-colors duration-300 hover:ring-white/20">
                    <h3 className="font-display text-lg font-bold text-white">
                      {platform.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {platform.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {platform.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-gold-300 ring-1 ring-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section3D>
      )}

      {(processStory || visuals?.process) && visuals?.capabilities && <SectionConnector />}

      {/* Capabilities breakdown */}
      {capabilities.length > 0 && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            {visuals?.capabilities ? (
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
                <Reveal>
                  <SectionHeading
                    dark
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
                    dark
                    stage={{ index: "03", label: "Grow" }}
                    className="mx-auto max-w-xs lg:max-w-sm"
                  />
                </Reveal>
              </div>
            ) : (
              <Reveal>
                <SectionHeading
                  dark
                  eyebrow="Full Breakdown"
                  title={`Everything under ${brand.name}`}
                  description="The complete picture — every capability this pillar covers, not just the highlights."
                />
              </Reveal>
            )}
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((group, i) => (
                <Reveal key={group.title} delay={i * 80}>
                  <TiltCard className="h-full rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition-colors duration-300 hover:ring-white/20">
                    <h3 className="font-display text-base font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {group.description}
                    </p>
                    <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-white/70"
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
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

      {/* ROI calculator */}
      {showRoiCalculator && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            <Reveal>
              <SectionHeading
                dark
                eyebrow="Estimate Your ROI"
                title="What could your campaigns return?"
                description="Drag the sliders to see what your campaigns could look like."
              />
            </Reveal>
            <div className="mt-14">
              <Reveal>
                <RoiCalculator />
              </Reveal>
            </div>
          </Container>
        </Section3D>
      )}

      {/* Trusted by */}
      <Section3D className="py-16">
        <Container className="relative z-10">
          <Reveal>
            <TrustedBy dark />
          </Reveal>
        </Container>
      </Section3D>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <Section3D className="py-20">
          <Container className="relative z-10">
            <Reveal>
              <SectionHeading dark eyebrow="Questions" title={`${brand.name} FAQs`} />
            </Reveal>
            <div className="mt-12">
              <FaqAccordion dark items={faqItems} />
            </div>
          </Container>
        </Section3D>
      )}

      {/* Cross-link to other pillars */}
      <section className="relative pb-20">
        <Container className="relative z-10">
          <Reveal className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Looking for something else?
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/10 transition-colors hover:text-gold-300 hover:ring-gold-400/30"
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
      <section className="relative pb-24">
        <Container className="relative z-10">
          <Reveal className="rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10 sm:p-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Ready to talk to {brand.name}?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/60">
              A free strategy call is step one — no obligation, no generic
              questionnaire.
            </p>
            <NeuralButton href="/contact" accent="gold" className="mt-7">
              Book a Free Strategy Call <ArrowRightIcon />
            </NeuralButton>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
