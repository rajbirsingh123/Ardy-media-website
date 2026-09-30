import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Section3D from "@/components/Section3D";
import TeamMemberCard from "@/components/TeamMemberCard";
import TeamFilmstrip from "@/components/TeamFilmstrip";
import Parallax from "@/components/Parallax";
import SkyField from "@/components/SkyField";
import { ArrowRightIcon } from "@/components/Icons";
import { teamMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the leadership and team behind Ardy Media — the people running strategy, technology, sales and operations for every client engagement.",
};

export default function TeamPage() {
  const leadership = teamMembers.filter((m) => m.tier === "leadership");
  const departmentTeam = teamMembers.filter((m) => m.tier === "management" || m.tier === "team");

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
            eyebrow="The Team"
            title="The people behind Ardy Media"
            description="The team behind the real products, campaigns and systems that help our clients grow their business"
            italicDescription
          />
        </Container>
      </Section3D>

      <Section3D className="relative pb-20">
        <Container className="relative z-10">
          <Reveal>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">
              Leadership
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {leadership.map((member, i) => (
              <Reveal
                key={member.slug}
                delay={i * 80}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <TeamMemberCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section3D>

      <Section3D className="relative pb-20">
        <Container className="relative z-10">
          <Reveal>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">
              Department Heads
            </h2>
          </Reveal>
          <div className="mt-6">
            <TeamFilmstrip members={departmentTeam} />
          </div>
        </Container>
      </Section3D>

      <Section3D className="relative py-24">
        <Parallax
          speed={-0.2}
          className="pointer-events-none absolute -bottom-24 left-[-6%] h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
        />
        <Container className="relative z-10">
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
