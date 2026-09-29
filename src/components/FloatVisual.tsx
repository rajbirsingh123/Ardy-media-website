import Image from "next/image";
import TiltCard from "./TiltCard";

export default function FloatVisual({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  stage,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  stage?: { index: string; label: string };
}) {
  return (
    <div className={`relative float-anim ${className}`}>
      {stage && (
        <div className="absolute -left-2 -top-2 z-10 flex items-center gap-2 rounded-full border border-line bg-white/95 py-1.5 pl-2 pr-4 shadow-soft backdrop-blur">
          <span className="font-display text-sm font-extrabold text-gold-600">
            {stage.index}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-navy">
            {stage.label}
          </span>
        </div>
      )}
      <TiltCard className="drop-shadow-2xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full select-none"
        />
      </TiltCard>
    </div>
  );
}
