export default function ShieldMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M60,90 L60,52 Q60,18 96,18 L158,18 L122,90 Z" />
      <path d="M152,90 L174,18 L232,18 L208,90 Z" />
      <path d="M240,90 L278,18 L302,18 Q340,18 340,52 L340,90 Z" />
      <path
        d="M60,150
           C60,108 94,86 128,86
           L272,86
           C306,86 340,108 340,150
           L340,246
           C340,322 288,378 200,430
           C112,378 60,322 60,246
           Z"
      />
    </svg>
  );
}
