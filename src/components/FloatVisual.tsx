import Image from "next/image";
import TiltCard from "./TiltCard";

export default function FloatVisual({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`float-anim ${className}`}>
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
