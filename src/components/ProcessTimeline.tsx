"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

type Step = { step: string; title: string; short: string; detail: string };

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const triggers = steps.map((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, [steps]);

  const activeStep = steps[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-gradient-to-br from-navy via-brand-900 to-brand-800 p-8 text-white shadow-lift sm:p-10">
          <div className="font-display text-6xl font-extrabold text-gold-300">
            {activeStep.step}
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold">{activeStep.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {activeStep.short}
          </p>
          <div className="mt-8 flex gap-2">
            {steps.map((s, i) => (
              <span
                key={s.step}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  i === active ? "bg-gold-400" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {steps.map((step, i) => (
          <div
            key={step.step}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={`rounded-2xl border p-6 shadow-soft transition-colors duration-500 sm:p-8 ${
              i === active ? "border-brand-300 bg-white" : "border-line bg-white/70"
            }`}
          >
            <span className="font-display text-3xl font-extrabold text-brand-100">
              {step.step}
            </span>
            <h3 className="mt-2 font-display text-xl font-bold text-navy">
              {step.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-brand-700">{step.short}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
