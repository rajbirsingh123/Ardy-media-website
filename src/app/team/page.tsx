import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import TiltCard from "@/components/TiltCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import ShieldBackdrop from "@/components/ShieldBackdrop";
import { ArrowRightIcon } from "@/components/Icons";
import { teamMembers, teamPrinciples } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the leadership and team behind Ardy Media — the people running strategy, technology, sales and operations for every client engagement.",
};

export default function TeamPage() {
  const leadership = teamMembers.filter((m) => m.tier === "leadership");
  const management = teamMembers.filter((m) => m.tier === "management");
  const supportTeam = teamMembers.filter((m) => m.tier === "team");

  return (
    <>
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Team"
            title="The people behind Ardy Media"
            description="A small, senior team running strategy, technology, sales and operations for every client — not a rotating cast of subcontractors."
          />
        </Container>
      </section>

      <Section3D className="pb-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
              Leadership
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member, i) => (
              <Reveal key={member.slug} delay={i * 80}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="pb-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
              Department Heads
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {management.map((member, i) => (
              <Reveal key={member.slug} delay={i * 80}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="pb-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-brand-700">
              Operations & Finance
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:max-w-2xl">
            {supportTeam.map((member, i) => (
              <Reveal key={member.slug} delay={i * 80}>
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="bg-mist-100 py-24">
        <Container>
          <SectionHeading eyebrow="How we staff" title="Why we keep the team small" />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {teamPrinciples.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <TiltCard className="rounded-2xl border border-line bg-white p-7 shadow-soft">
                  <span className="font-display text-2xl font-extrabold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-3 font-display font-bold text-navy">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="py-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 px-8 py-14 text-center shadow-lift sm:px-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Want to meet the team on a call?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
              A free strategy call is a direct conversation with the people
              who&apos;d actually be doing the work — not a salesperson.
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
