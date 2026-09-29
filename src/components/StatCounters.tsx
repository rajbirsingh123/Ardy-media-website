"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { value: string; label: string; sublabel?: string };

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    return match ? `0${match[2]}` : value;
  });

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;
    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const duration = 1100;
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatCounters({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#050b18] px-5 py-7 text-center sm:px-6">
          <div className="font-display text-3xl font-extrabold text-gold-300 sm:text-4xl">
            <CountUp value={stat.value} />
          </div>
          <div className="mt-2 text-sm font-semibold text-white">{stat.label}</div>
          {stat.sublabel && (
            <div className="mt-1 text-xs text-white/50">{stat.sublabel}</div>
          )}
        </div>
      ))}
    </div>
  );
}
