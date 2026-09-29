"use client";

import { useEffect, useState } from "react";
import { MegaphoneIcon } from "./Icons";

function FunnelIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 4h18l-6.5 8v6l-5 2v-8L3 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const STAGES = [
  {
    title: "We launch your ads",
    description:
      "Meta, Instagram & LinkedIn campaigns go live, targeted at the audiences most likely to convert.",
    Icon: MegaphoneIcon,
  },
  {
    title: "We build your pipeline",
    description:
      "Every click flows into a tracked pipeline — from first view to qualified, ready-to-book lead.",
    Icon: FunnelIcon,
  },
  {
    title: "You get notified",
    description:
      "The moment a lead comes in, Ardy's system alerts you — nothing sits around and goes cold.",
    Icon: BellIcon,
  },
];

export default function StoryFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 sm:p-8">
      {STAGES.map((stage, i) => {
        const isActive = i === active;
        const isDone = i < active;
        const isLast = i === STAGES.length - 1;
        const Icon = stage.Icon;
        return (
          <div key={stage.title} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span className="absolute left-[27px] top-14 h-[calc(100%-2.25rem)] w-px bg-white/10">
                <span
                  className="absolute inset-x-0 top-0 w-px bg-gold-400 transition-all duration-700 ease-out"
                  style={{ height: isDone ? "100%" : "0%" }}
                />
              </span>
            )}
            <div
              className={`relative z-10 grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl ring-1 transition-all duration-500 ${
                isActive
                  ? "bg-gold-500/10 ring-gold-400/40 shadow-[0_0_24px_rgba(240,180,41,0.25)]"
                  : "bg-white/5 ring-white/10"
              }`}
            >
              <Icon className={`h-6 w-6 transition-colors duration-500 ${isActive ? "text-gold-300" : "text-white/40"}`} />
            </div>
            <div className="pt-2.5">
              <div
                className={`text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                  isActive ? "text-gold-300" : "text-white/30"
                }`}
              >
                Step {i + 1}
              </div>
              <h4 className="mt-1 font-display text-base font-bold text-white">{stage.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{stage.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
