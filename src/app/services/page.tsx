import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ShieldBackdrop from "@/components/ShieldBackdrop";
import { ArrowRightIcon, CheckIcon, iconMap } from "@/components/Icons";
import { caseStudies, pillarRoutes, services, techCapabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, technology & development, and growth automation — everything Ardy Media builds and runs for you, under one roof.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grid py-20 sm:py-24">
        <ShieldBackdrop />
        <Container className="relative">
          <SectionHeading
            eyebrow="Services"
            title="Three pillars. One accountable team."
            description="Every service below is built to connect to the others — your ads feed your CRM, your CRM feeds your automation, your site converts all three."
          />
        </Container>
      </section>

      {services.map((service, i) => {
        const Icon = iconMap[service.icon as keyof typeof iconMap];
        const reversed = i % 2 === 1;
        return (
          <section
            id={service.slug}
            key={service.slug}
            className={`scroll-mt-24 py-20 ${i % 2 === 0 ? "" : "bg-mist-100"}`}
          >
            <Container>
              <Reveal
                className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon />
                  </div>
                  <div className="mt-5 text-xs font-bold uppercase tracking-wider text-brand-700">
                    {service.pillar}
                  </div>
                  <h2 className="mt-2 text-balance font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-balance leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Button href="/contact">
                      Talk to us about {service.pillar}
                      <ArrowRightIcon />
                    </Button>
                    <Link
                      href={pillarRoutes[service.slug]}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                    >
                      Read the full {service.pillar} page
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                      What&apos;s included
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
                      You walk away with
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-ink/80">
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-600" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {techCapabilities.some((c) => c.serviceSlug === service.slug) && (
                <div className="mt-16">
                  <Reveal className="mx-auto max-w-2xl text-center">
                    <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                      Software engineering, full spectrum
                    </h3>
                    <p className="mt-3 text-balance leading-relaxed text-muted">
                      Not just websites — a team that can carry a project across the
                      whole stack, from the interface down to the infrastructure it
                      runs on.
                    </p>
                  </Reveal>
                  <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {techCapabilities
                      .filter((c) => c.serviceSlug === service.slug)
                      .map((group, gi) => (
                        <Reveal key={group.title} delay={gi * 80}>
                          <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                            <h4 className="font-display text-base font-bold text-navy">
                              {group.title}
                            </h4>
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
                          </div>
                        </Reveal>
                      ))}
                  </div>
                </div>
              )}

              {caseStudies
                .filter((cs) => cs.serviceSlug === service.slug)
                .map((cs) => (
                  <Reveal
                    key={cs.name}
                    className="mt-12 rounded-2xl border border-line bg-white p-8 shadow-soft sm:p-10"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-gold-600">
                        Featured work
                      </div>
                      <a
                        href={cs.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Visit site <ArrowRightIcon />
                      </a>
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                      {cs.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">
                      {cs.tagline}
                    </p>
                    <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                      {cs.summary}
                    </p>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {cs.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-sm text-ink/80"
                        >
                          <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-navy">
                          Services offered
                        </h5>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {cs.servicesOffered.map((s) => (
                            <li
                              key={s}
                              className="rounded-full bg-mist-100 px-2.5 py-1 text-xs font-medium text-ink/70"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-navy">
                          Industries served
                        </h5>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {cs.industries.map((s) => (
                            <li
                              key={s}
                              className="rounded-full bg-mist-100 px-2.5 py-1 text-xs font-medium text-ink/70"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-navy">
                          Tech stack
                        </h5>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {cs.techStack.map((s) => (
                            <li
                              key={s}
                              className="rounded-full bg-mist-100 px-2.5 py-1 text-xs font-medium text-ink/70"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-6 border-t border-line pt-6 text-sm text-muted">
                      {cs.founders}
                    </p>
                  </Reveal>
                ))}
            </Container>
          </section>
        );
      })}

      <section className="pb-24">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 px-8 py-14 text-center shadow-lift sm:px-16">
            <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Not sure which service fits?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-balance text-white/70">
              Book a free strategy call and we&apos;ll help you figure out where to
              start.
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
