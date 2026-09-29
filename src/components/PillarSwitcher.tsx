"use client";

import { useState } from "react";
import Container from "./Container";
import ShieldMark from "./ShieldMark";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import SkyField from "./SkyField";
import NeuralButton from "./NeuralButton";
import { pillarRoutes, services } from "@/lib/content";
import { ArrowRightIcon, CheckIcon, iconMap } from "./Icons";

export default function PillarSwitcher() {
  const [active, setActive] = useState(0);
  const service = services[active];
  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <section id="pillars" className="relative scroll-mt-20 overflow-hidden bg-[#01030a] py-24">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(1100px 520px at 50% 0%, #0a1730 0%, #030812 55%, #000103 100%)",
        }}
      />
      <SkyField className="absolute inset-0" />
      <Parallax
        speed={0.18}
        className="pointer-events-none absolute -right-24 top-1/2 h-[140%] w-auto -translate-y-1/2 sm:-right-10"
      >
        <ShieldMark className="h-full w-auto text-white/[0.05]" />
      </Parallax>

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 ring-1 ring-white/10">
            What We Do
          </div>
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            One partner. Every channel.
          </h2>
          <p className="mt-4 text-balance leading-relaxed text-white/65">
            Ardy Media is three focused divisions working as one system —
            <span className="text-gold-300"> Ardy Media</span> brings customers in,
            <span className="text-gold-300"> Ardy Digital</span> builds what they land
            on, and <span className="text-gold-300"> Ardy Sales</span> makes sure
            nobody falls through the cracks.
          </p>
        </Reveal>

        <Reveal
          delay={150}
          className="mx-auto mt-10 flex max-w-md justify-center gap-2 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10"
        >
          <div role="tablist" aria-label="Ardy Media pillars" className="flex w-full gap-2">
            {services.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`flex-1 cursor-pointer rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors duration-200 ${
                  active === i
                    ? "bg-gold-500 text-navy shadow-soft"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {s.pillar}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={service.slug}
          className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center"
        >
          <div className="animate-fade-up">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-navy">
              <Icon />
            </div>
            <div className="mt-5 text-xs font-bold uppercase tracking-wider text-gold-300">
              {service.pillar}
            </div>
            <h3 className="mt-2 text-balance font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {service.title}
            </h3>
            <p className="mt-4 text-balance leading-relaxed text-white/70">
              {service.description}
            </p>
            <NeuralButton href={pillarRoutes[service.slug]} accent="gold" className="mt-7">
              Explore {service.pillar}
              <ArrowRightIcon />
            </NeuralButton>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/80 ring-1 ring-white/10"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
