"use client";

import { useEffect, useRef } from "react";
import TiltCard from "./TiltCard";

export default function FloatVideo({
  src,
  className = "",
  stage,
  dark = false,
  speed = 0.6,
}: {
  src: string;
  className?: string;
  stage?: { index: string; label: string };
  dark?: boolean;
  speed?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.playbackRate = speed;
  }, [speed]);

  return (
    <div className={`relative float-anim ${className}`}>
      {stage && (
        <div
          className={`absolute -left-2 -top-2 z-10 flex items-center gap-2 rounded-full py-1.5 pl-2 pr-4 shadow-soft backdrop-blur ${
            dark
              ? "border border-white/10 bg-[#0b1220]/95 text-white"
              : "border border-line bg-white/95"
          }`}
        >
          <span className="font-display text-sm font-extrabold text-gold-500">
            {stage.index}
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              dark ? "text-white" : "text-navy"
            }`}
          >
            {stage.label}
          </span>
        </div>
      )}
      <TiltCard className="overflow-hidden rounded-2xl drop-shadow-2xl">
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="h-auto w-full select-none"
        />
      </TiltCard>
    </div>
  );
}
