"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";
import { ArrowRightIcon, iconMap } from "./Icons";
import { team } from "@/lib/content";

const COUNT = team.length;

function wrappedDelta(index: number, phase: number) {
  let delta = index - phase;
  while (delta > COUNT / 2) delta -= COUNT;
  while (delta < -COUNT / 2) delta += COUNT;
  return delta;
}

export default function TeamFilmstrip() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;
    const stage: HTMLDivElement = stageEl;
    const cards = cardRefs.current.filter((c): c is HTMLButtonElement => c !== null);
    if (!cards.length) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      phase: 0,
      target: 0,
      base: 0,
      pointerX: 0,
      pointerY: 0,
      lastInput: performance.now(),
    };

    function nearestIndex() {
      return ((Math.round(state.phase) % COUNT) + COUNT) % COUNT;
    }

    function moveTo(index: number) {
      const current = nearestIndex();
      let delta = index - current;
      if (delta > COUNT / 2) delta -= COUNT;
      if (delta < -COUNT / 2) delta += COUNT;
      state.base += delta;
      state.target = state.base;
      state.lastInput = performance.now();
    }

    cards.forEach((card, index) => {
      card.addEventListener("click", () => moveTo(index));
      card.addEventListener("focus", () => moveTo(index));
    });

    let dragging = false;
    let dragStartX = 0;
    let dragBaseAtStart = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = stage.getBoundingClientRect();
      state.pointerX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      state.pointerY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      if (dragging) {
        const spacing = Math.min(168, Math.max(112, stage.clientWidth * 0.14));
        state.base = dragBaseAtStart - (e.clientX - dragStartX) / spacing;
        state.target = state.base;
      }
      state.lastInput = performance.now();
    }
    function onPointerDown(e: PointerEvent) {
      dragging = true;
      dragStartX = e.clientX;
      dragBaseAtStart = state.base;
      stage.setPointerCapture(e.pointerId);
    }
    function endDrag(e: PointerEvent) {
      dragging = false;
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    function onPointerLeave() {
      state.pointerX = 0;
      state.pointerY = 0;
    }
    function onKeyDown(e: KeyboardEvent) {
      const forward = e.key === "ArrowRight" || e.key === "ArrowDown";
      const backward = e.key === "ArrowLeft" || e.key === "ArrowUp";
      if (!forward && !backward) return;
      if (!stage.contains(document.activeElement)) return;
      e.preventDefault();
      state.base += forward ? 1 : -1;
      state.target = state.base;
      state.lastInput = performance.now();
    }

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("keydown", onKeyDown);

    let previousTime = performance.now();
    let rafId = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(stage);

    function render(time: number) {
      rafId = requestAnimationFrame(render);
      if (!visible) return;
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;
      const ease = reduced ? 1 : 1 - Math.pow(0.001, deltaTime / 1000);

      if (!dragging && !reduced) {
        const idle = time - state.lastInput - 3600;
        if (idle > 0) {
          state.target = state.base + Math.sin(idle * 0.00042) * 1.1;
        }
      }

      state.phase += (state.target - state.phase) * ease;
      const compact = stage.clientWidth < 560;
      const activeIndex = nearestIndex();
      const horizontalSpacing = Math.min(168, Math.max(112, stage.clientWidth * 0.16));

      cards.forEach((card, index) => {
        const delta = wrappedDelta(index, state.phase);
        const distance = Math.abs(delta);
        const focus = Math.exp(-distance * distance * 1.28);
        const side = Math.max(0, 1 - distance / 4);
        const direction = Math.sign(delta);

        const x = compact ? delta * 26 + Math.sin(delta * 0.9) * 22 : delta * horizontalSpacing;
        const y = compact ? distance * 40 : distance * 8 + state.pointerY * focus * 10;
        const z = focus * 130 - distance * 120;
        const scale = 0.6 + side * 0.14 + focus * 0.4;
        const rotateX = compact ? 0 : -state.pointerY * focus * 3.5;
        const rotateY = compact
          ? 0
          : -direction * (distance > 0.2 ? 12 + Math.min(distance, 3) * 4 : 0) + state.pointerX * focus * 3;

        card.style.setProperty("--focus", focus.toFixed(4));
        card.style.zIndex = String(Math.round(1000 - distance * 100));
        card.style.opacity = String(Math.max(0.16, side * 0.7 + focus * 0.3));
        card.style.filter = `blur(${Math.max(0, distance - 1.4) * 0.5}px)`;
        card.style.transform = [
          "translate(-50%, -50%)",
          `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px)`,
          `rotateX(${rotateX.toFixed(2)}deg)`,
          `rotateY(${rotateY.toFixed(2)}deg)`,
          `scale(${scale.toFixed(4)})`,
        ].join(" ");
        card.setAttribute("aria-current", index === activeIndex ? "true" : "false");
      });
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointerup", endDrag);
      stage.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-300 ring-1 ring-white/10">
            Who Keeps It Running
          </div>
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            One team, four disciplines
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-white/70 sm:text-lg">
            Drag, or use the arrow keys, to see who&apos;s behind the work.
          </p>
        </div>
      </Container>

      <div
        ref={stageRef}
        className="relative z-10 mt-14 h-[380px] cursor-grab touch-none select-none active:cursor-grabbing sm:h-[420px]"
        style={{ perspective: "1450px" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {team.map((member, i) => {
            const Icon = iconMap[member.icon as keyof typeof iconMap];
            return (
              <button
                key={member.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                aria-label={`Focus ${member.focus}`}
                className="absolute left-1/2 top-1/2 flex w-[190px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900 to-navy shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:w-[210px]"
                style={{ aspectRatio: "0.74", willChange: "transform, opacity, filter" }}
              >
                <span className="flex flex-1 items-center justify-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-gold-500/10 text-gold-300 ring-1 ring-gold-400/30 sm:h-20 sm:w-20">
                    <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
                  </span>
                </span>
                <span className="grid grid-cols-[auto_1fr] items-center gap-2.5 bg-[#0b1220] p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-gold-500/60 font-mono text-[11px] font-semibold text-gold-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-bold text-white">{member.focus}</span>
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-gold-300/80">
                      {member.role}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Container className="relative z-10">
        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-gold-200"
          >
            Meet the full team <ArrowRightIcon />
          </Link>
        </div>
      </Container>
    </section>
  );
}
