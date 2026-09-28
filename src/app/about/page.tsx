import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ShieldBackdrop from "@/components/ShieldBackdrop";
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
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="About Ardy Media"
            title="Marketing and technology, run by one accountable team"
            description="We started Ardy Media because growing businesses kept ending up in the same spot: an ad agency that doesn't talk to their web developer, a web developer who's never heard of their CRM, and nobody accountable for whether it all adds up to real growth."
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                Our approach
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Instead of specializing in one channel and subcontracting the rest, we
                run digital marketing, technology & development, and growth automation
                as one practice. That means the person planning your ad campaign
                understands what your CRM can and can&apos;t do, and the person
                building your website already knows what the ads are going to promise.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                In practice, that shows up as fewer handoffs, faster iteration, and a
                single point of accountability when something needs to change — rather
                than a group chat between three vendors trying to figure out whose
                fault a broken funnel is.
              </p>
              <Button href="/process" variant="outline" className="mt-7">
                See how we run engagements <ArrowRightIcon />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <Reveal
                  key={stat.label}
                  delay={i * 80}
                  className="rounded-2xl border border-line bg-white p-6 text-center shadow-soft"
                >
                  <div className="font-display text-3xl font-extrabold text-navy">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist-100 py-24">
        <Container>
          <SectionHeading eyebrow="What we believe" title="How we work, in practice" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal
                key={value.title}
                delay={i * 80}
                className="rounded-2xl border border-line bg-white p-7 shadow-soft"
              >
                <h3 className="font-display text-lg font-bold text-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 px-8 py-14 text-center shadow-lift sm:px-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Want to see if we&apos;re the right fit?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
              A free strategy call is the fastest way to find out — no pressure, no
              obligation.
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
