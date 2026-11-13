import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/content";

/* Centroid of each of the 3 logo panels, as a % of the trio image box —
   measured from the source artwork so labels sit dead-center on the shape
   they belong to, including the two quarter-circle panels. */
const PANEL_LABEL_POS = [
  { x: 16.0, y: 60.7 },
  { x: 48.5, y: 50.9 },
  { x: 82.7, y: 53.2 },
];

const SERVICE_LABELS = [
  "SEO",
  "Website",
  "App",
  "CRM",
  "Flutter",
  "React Native",
  "AI Bots",
  "Automation",
  "DevOps",
];

type TickerItem = { label: string; href?: string };

const TICKER_ITEMS: TickerItem[] = [
  ...navLinks.filter((link) => link.label !== "Team"),
  ...SERVICE_LABELS.map((label) => ({ label })),
];

const TRIO_ASPECT_RATIO = 1280 / 237;
const GROUPS = Math.ceil(TICKER_ITEMS.length / 3);

/* The two quarter-circle panels (positions 0 and 2) narrow the usable
   width away from center; these measured scales keep the longer labels
   clear of the curve instead of bleeding into the gap beside it. */
const LABEL_SCALE: Record<string, number> = {
  Process: 0.88,
  "React Native": 0.72,
  Automation: 0.86,
};

function TrioGroup({ items }: { items: TickerItem[] }) {
  return (
    <div
      className="ticker-group relative h-full shrink-0"
      style={{ aspectRatio: TRIO_ASPECT_RATIO }}
    >
      <Image
        src="/panel-trio.webp"
        alt=""
        fill
        loading="eager"
        sizes="(max-width: 640px) 90px, (max-width: 1024px) 120px, 140px"
        className="object-contain"
      />
      {items.map((item, i) => {
        const scale = LABEL_SCALE[item.label] ?? 1;
        const style = {
          left: `${PANEL_LABEL_POS[i].x}%`,
          top: `${PANEL_LABEL_POS[i].y}%`,
          transform: `translate(-50%, -50%) scale(${scale})`,
        };
        const className =
          "ticker-label absolute whitespace-nowrap text-center font-display font-extrabold uppercase text-white";
        return item.href ? (
          <Link key={item.label} href={item.href} className={className} style={style}>
            {item.label}
          </Link>
        ) : (
          <span key={item.label} className={className} style={style}>
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

function TrioSequence() {
  return (
    <>
      {Array.from({ length: GROUPS }).map((_, i) => (
        <TrioGroup key={i} items={TICKER_ITEMS.slice(i * 3, i * 3 + 3)} />
      ))}
    </>
  );
}

export default function NavTickerStrip() {
  return (
    <div className="ticker-stage h-8 sm:h-9 md:h-10 lg:h-11">
      <div className="ticker-fade h-full overflow-hidden">
        <div className="ticker-track flex h-full w-max items-center gap-2 sm:gap-2.5 md:gap-3">
          <TrioSequence />
          <TrioSequence />
        </div>
      </div>
    </div>
  );
}
