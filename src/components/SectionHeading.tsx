export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mx-auto max-w-2xl ${
        align === "center" ? "text-center" : "max-w-none text-left"
      }`}
    >
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
