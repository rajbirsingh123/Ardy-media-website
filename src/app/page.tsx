import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import OrbHero from "@/components/OrbHero";
import PillarSwitcher from "@/components/PillarSwitcher";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import TiltCard from "@/components/TiltCard";
import Parallax from "@/components/Parallax";
import FaqAccordion from "@/components/FaqAccordion";
import { ArrowRightIcon } from "@/components/Icons";
import { faqs, industries, outcomes, whyUs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <OrbHero />

      <PillarSwitcher />

      {/* Why Ardy Media */}
      <Section3D className="relative py-24">
        <Parallax
          speed={0.25}
          className="pointer-events-none absolute -top-16 right-[-8%] h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
        />
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Ardy Media"
              title="Why founders choose Ardy Media"
              description="Most businesses juggle an ad agency, a web developer, a CRM vendor, and an app team — none of whom talk to each other. Ardy Media replaces that chaos with one accountable partner."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <span className="font-display text-2xl font-extrabold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={320} className="mt-10 text-center">
            <Button href="/about" variant="outline">
              More about how we work <ArrowRightIcon />
            </Button>
          </Reveal>
        </Container>
      </Section3D>

      {/* Industries we serve */}
      <Section3D id="industries" className="bg-mist-100 py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who We Serve"
              title="Built for the businesses that make a city"
              description="Different industries, same problem — marketing and technology that don't talk to each other. We fix that."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal key={industry.name} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <h3 className="font-display text-lg font-bold text-navy">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {industry.description}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      {/* Outcomes */}
      <Section3D className="relative bg-navy py-24">
        <Parallax
          speed={-0.2}
          className="pointer-events-none absolute -bottom-24 left-[-6%] h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
        />
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 ring-1 ring-white/10">
                What Working With Us Looks Like
              </div>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                What changes once it&apos;s all running together
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {outcomes.map((item, i) => (
              <Reveal key={item.attribution} delay={i * 100}>
                <TiltCard className="flex h-full flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
                  <span className="font-display text-3xl font-extrabold text-gold-300">
                    &ldquo;
                  </span>
                  <p className="flex-1 text-balance leading-relaxed text-white/85">
                    {item.quote}
                  </p>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-white/40">
                    {item.attribution}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      {/* FAQ */}
      <Section3D className="py-24">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <FaqAccordion items={faqs.slice(0, 5)} />
          </Reveal>
          <Reveal delay={150} className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Have a different question? Ask us <ArrowRightIcon />
            </Link>
          </Reveal>
        </Container>
      </Section3D>
    </>
  );
}
