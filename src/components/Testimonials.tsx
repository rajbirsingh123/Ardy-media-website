import TiltCard from "./TiltCard";

type Outcome = { quote: string; attribution: string };

export default function Testimonials({ items }: { items: Outcome[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <TiltCard
          key={item.attribution}
          className="flex h-full flex-col rounded-2xl bg-white/5 p-7 ring-1 ring-white/10"
        >
          <span className="font-display text-3xl font-extrabold text-gold-300">&ldquo;</span>
          <p className="flex-1 text-balance leading-relaxed text-white/85">{item.quote}</p>
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-white/40">
            {item.attribution}
          </p>
        </TiltCard>
      ))}
    </div>
  );
}
