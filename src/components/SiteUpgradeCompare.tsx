"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CloseIcon } from "./Icons";
import { siteUpgradeCompare } from "@/lib/content";

function LoadTime({ seconds }: { seconds: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0.0s");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(`${seconds.toFixed(1)}s`);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1000;
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${(seconds * eased).toFixed(1)}s`);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seconds]);

  return <span ref={ref}>{display}</span>;
}

function BrowserCard({
  variant,
  label,
  loadTime,
  points,
}: {
  variant: "before" | "after";
  label: string;
  loadTime: number;
  points: string[];
}) {
  const isAfter = variant === "after";
  return (
    <div
      className={`overflow-hidden rounded-2xl ring-1 transition-colors duration-500 ${
        isAfter ? "bg-white/[0.06] ring-gold-300/30" : "bg-white/[0.02] ring-white/10"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
          yourbusiness.ca
        </span>
      </div>
      <div className="p-6">
        <div
          className={`text-xs font-bold uppercase tracking-wider ${
            isAfter ? "text-gold-300" : "text-white/40"
          }`}
        >
          {label}
        </div>
        <div
          className={`mt-2 font-display text-4xl font-extrabold ${
            isAfter ? "text-white" : "text-white/50"
          }`}
        >
          <LoadTime seconds={loadTime} />
          <span className="ml-1.5 text-sm font-semibold text-white/35">to load</span>
        </div>
        <ul className="mt-5 space-y-2.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-white/70">
              {isAfter ? (
                <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" />
              ) : (
                <CloseIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
              )}
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SiteUpgradeCompare() {
  const { before, after, stats } = siteUpgradeCompare;

  return (
    <div>
      <div className="relative grid gap-6 sm:grid-cols-2">
        <BrowserCard variant="before" {...before} />
        <BrowserCard variant="after" {...after} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#050b18] font-display text-xs font-bold text-gold-300 ring-1 ring-white/15 sm:grid">
          VS
        </div>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#050b18] px-6 py-7 text-center">
            <div className="font-display text-3xl font-extrabold text-gold-300 sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{stat.label}</div>
            <div className="mt-1 text-xs leading-relaxed text-white/50">{stat.sublabel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
