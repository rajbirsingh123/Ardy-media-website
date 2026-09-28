import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ShieldBackdrop from "@/components/ShieldBackdrop";
import { ArrowRightIcon, CheckIcon, iconMap } from "@/components/Icons";
import { team, teamPrinciples } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The small, senior team behind Ardy Media — strategy, paid media, product & engineering, and automation, working as one unit.",
};

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="The Team"
            title="A small, senior team — not a rotating cast of subcontractors"
            description="Every engagement is staffed by the same four functions, working together instead of handing off. Here's what each one owns."
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {team.map((group, i) => {
              const Icon = iconMap[group.icon as keyof typeof iconMap];
              return (
                <Reveal
                  key={group.slug}
                  delay={i * 80}
                  className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy">
                        {group.focus}
                      </h3>
                      <p className="text-sm font-medium text-brand-700">{group.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {group.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-4">
                    {group.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink/80"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-mist-100 py-24">
        <Container>
          <SectionHeading eyebrow="How we staff" title="Why we keep the team small" />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {teamPrinciples.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 80}
                className="rounded-2xl border border-line bg-white p-7 shadow-soft"
              >
                <span className="font-display text-2xl font-extrabold text-gold-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-3 font-display font-bold text-navy">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
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
      </section>
    </>
  );
}
