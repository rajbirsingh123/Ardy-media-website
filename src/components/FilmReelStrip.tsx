import Image from "next/image";

const REEL_LABELS = [
  "Websites",
  "SEO",
  "Paid Social",
  "Social Media",
  "Branding",
  "Mobile Apps",
  "CRM Systems",
  "AI Automation",
  "Lead Generation",
  "Cloud & DevOps",
];
const REPEAT = 4;

function ReelGroup() {
  return (
    <>
      {Array.from({ length: REPEAT }).map((_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-2.5 pr-2.5 sm:gap-3 sm:pr-3">
          <Image
            src="/logo-mark.png"
            alt=""
            width={10}
            height={12}
            aria-hidden="true"
            className="opacity-85"
          />
          <span className="font-display text-[8px] font-bold uppercase tracking-[0.22em] text-gold-300 sm:text-[9px]">
            Ardy Media
          </span>
          <span className="text-[6px] text-gold-500/40" aria-hidden="true">
            ●
          </span>
          {REEL_LABELS.map((label) => (
            <span key={label} className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/70 sm:text-[9px]">
                {label}
              </span>
              <span className="text-[6px] text-gold-500/40" aria-hidden="true">
                ●
              </span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

export default function FilmReelStrip() {
  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      <div className="film-sprockets" />
      <div className="glass-strip">
        <div className="track-fade overflow-hidden py-[3px] sm:py-1">
          <div className="reel-track flex w-max items-center">
            <ReelGroup />
            <ReelGroup />
          </div>
        </div>
      </div>
      <div className="film-sprockets" />
    </div>
  );
}
