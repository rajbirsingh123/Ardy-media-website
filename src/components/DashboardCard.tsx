import Image from "next/image";
import TiltCard from "./TiltCard";

type Metric = { label: string; value: string; delta?: string };

export default function DashboardCard({
  src,
  alt,
  width,
  height,
  metrics,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  metrics: Metric[];
}) {
  return (
    <div className="relative float-anim">
      <div className="absolute -right-3 -top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0b1220]/95 py-1.5 pl-3 pr-3.5 text-xs font-semibold text-white/80 shadow-lift backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        Tilt me
      </div>

      <TiltCard className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/90 shadow-lift">
        <div className="flex items-center justify-between px-6 pt-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-white/40">
              Campaign Performance
            </div>
            <div className="mt-0.5 font-display text-lg font-bold text-white">Weekly Report</div>
          </div>
          <span className="rounded-full bg-gold-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-300 ring-1 ring-gold-400/30">
            Sample
          </span>
        </div>

        <div className="mt-5 px-6">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full select-none object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10">
          {metrics.map((m) => (
            <div key={m.label} className="px-4 py-4 text-center">
              <div className="font-display text-lg font-extrabold text-white sm:text-xl">
                {m.value}
              </div>
              <div className="mt-1 text-[11px] text-white/50">{m.label}</div>
              {m.delta && (
                <div className="mt-1 text-[11px] font-semibold text-emerald-400">{m.delta}</div>
              )}
            </div>
          ))}
        </div>
        <p className="border-t border-white/10 px-6 py-3 text-center text-[11px] text-white/35">
          Illustrative example — not client-specific results
        </p>
      </TiltCard>
    </div>
  );
}
