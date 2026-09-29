"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export default function Section3D({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { rotateX: 8, y: 60, opacity: 0.25, transformOrigin: "50% 100%" },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 88%",
            end: "top 42%",
            scrub: 0.6,
          },
        },
      );
      gsap.to(inner, {
        rotateX: -6,
        y: -20,
        opacity: 0.35,
        ease: "none",
        transformOrigin: "50% 0%",
        scrollTrigger: {
          trigger: wrap,
          start: "bottom 55%",
          end: "bottom 5%",
          scrub: 0.6,
        },
      });
    }, wrap);

    // Trigger positions are computed from layout at creation time, which can
    // be stale before images/fonts finish and settle final section heights.
    const refresh = () => ScrollTrigger.refresh();
    const raf1 = requestAnimationFrame(() =>
      requestAnimationFrame(refresh),
    );
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ perspective: "1500px", overflow: "hidden" }}>
      <section
        id={id}
        ref={innerRef as never}
        className={className}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </section>
    </div>
  );
}
