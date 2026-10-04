import type { Metadata } from "next";
import Container from "@/components/Container";
import NeuralButton from "@/components/NeuralButton";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import TiltCard from "@/components/TiltCard";
import SkyField from "@/components/SkyField";
import { ArrowRightIcon } from "@/components/Icons";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ardy Media is a single team running marketing, media and technology for growing businesses — so founders can stop juggling agencies and freelancers.",
};

const values = [
  {
    title: "One system, not five vendors",
    description:
      "Marketing and technology are treated as one connected system — the same team designs the campaign, the page it lands on, and the automation that follows up.",
  },
  {
    title: "Ownership, always",
    description:
      "You own the code, the accounts, and the data. Nothing is built on a proprietary platform designed to keep you dependent on us.",
  },
  {
    title: "Plain reporting",
    description:
      "No jargon-heavy dashboards nobody reads. Reporting is built around the numbers that actually tell you whether the business is growing.",
  },
  {
    title: "Built to last past launch",
    description:
      "A campaign that stops the day it launches or a site that's never touched again isn't finished work — everything is built with the next six months in mind.",
  },
];

export default function AboutPage() {
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

      <section className="relative overflow-hidden py-24 sm:py-32">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/about-hero.mp4"
          poster="/videos/about-hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 560px at 50% 42%, rgba(3,8,18,0.5) 0%, rgba(1,4,10,0.72) 60%, rgba(0,1,3,0.9) 100%)",
          }}
        />
        <Container className="relative z-10">
          <SectionHeading
            dark
            eyebrow="About Ardy Media"
            title="Marketing and technology, run by one accountable team"
            description="We started Ardy Media because growing businesses kept ending up in the same spot: an ad agency that doesn't talk to their web developer, a web developer who's never heard of their CRM, and nobody accountable for whether it all adds up to real growth."
          />
        </Container>
      </section>

      <Section3D className="relative py-24">
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Our approach
              </h2>
              <p className="mt-4 leading-relaxed text-white/65">
                Instead of specializing in one channel and subcontracting the rest, we
                run digital marketing, technology & development, and growth automation
                as one practice. That means the person planning your ad campaign
                understands what your CRM can and can&apos;t do, and the person
                building your website already knows what the ads are going to promise.
              </p>
              <p className="mt-4 leading-relaxed text-white/65">
                In practice, that shows up as fewer handoffs, faster iteration, and a
                single point of accountability when something needs to change — rather
                than a group chat between three vendors trying to figure out whose
                fault a broken funnel is.
              </p>
              <NeuralButton href="/process" accent="ice" className="mt-7">
                See how we run engagements <ArrowRightIcon />
              </NeuralButton>
            </Reveal>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 80}
                  className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10"
                >
                  <div className="font-display text-3xl font-extrabold text-gold-300">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-white/60">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section3D>

      <Section3D className="relative py-24">
        <Container className="relative z-10">
          <Reveal>
            <SectionHeading dark eyebrow="What we believe" title="How we work, in practice" />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <TiltCard className="h-full rounded-2xl bg-white/5 p-7 ring-1 ring-white/10 transition-colors duration-300 hover:ring-white/20">
                  <h3 className="font-display text-lg font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {value.description}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="relative py-24">
        <Container className="relative z-10">
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] px-8 py-14 text-center shadow-lift backdrop-blur-xl sm:px-16">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 35%, transparent 60%)",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="relative">
              <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Want to see if we&apos;re the right fit?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
                A free strategy call is the fastest way to find out — no pressure, no
                obligation.
              </p>
              <NeuralButton href="/contact" accent="gold" className="mt-7">
                Book a Free Strategy Call <ArrowRightIcon />
              </NeuralButton>
            </div>
          </Reveal>
        </Container>
      </Section3D>
    </>
  );
}
