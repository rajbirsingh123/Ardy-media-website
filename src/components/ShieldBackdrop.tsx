import ShieldMark from "./ShieldMark";

export default function ShieldBackdrop() {
  return (
    <ShieldMark className="pointer-events-none absolute -right-24 top-1/2 h-[130%] w-auto -translate-y-1/2 text-brand-900/[0.035] sm:-right-10" />
  );
}
