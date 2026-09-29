"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export default function HorizontalScrollGallery({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(min-width: 768px)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`overflow-x-auto overflow-y-hidden md:overflow-hidden ${className}`}
    >
      <div ref={trackRef} className="flex w-max gap-6 will-change-transform md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        {children}
      </div>
    </div>
  );
}
