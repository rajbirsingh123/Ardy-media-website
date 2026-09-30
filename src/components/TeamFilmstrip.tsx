"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { LinkedInIcon } from "./Icons";
import type { TeamMember } from "@/lib/content";

const AUTO_ROTATE_MS = 3200;
const RESUME_AFTER_INPUT_MS = 1400;

function wrappedDelta(index: number, phase: number, count: number) {
  let delta = index - phase;
  while (delta > count / 2) delta -= count;
  while (delta < -count / 2) delta += count;
  return delta;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamFilmstrip({ members }: { members: TeamMember[] }) {
  const count = members.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bioNameRef = useRef<HTMLHeadingElement>(null);
  const bioRoleRef = useRef<HTMLSpanElement>(null);
  const bioTextRef = useRef<HTMLParagraphElement>(null);
  const bioLinkRef = useRef<HTMLAnchorElement>(null);

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
      autoAccum: 0,
      shownIndex: -1,
    };

    function nearestIndex() {
      return ((Math.round(state.phase) % count) + count) % count;
    }

    function updateBio(index: number) {
      if (index === state.shownIndex) return;
      state.shownIndex = index;
      const member = members[index];
      if (bioNameRef.current) bioNameRef.current.textContent = member.name;
      if (bioRoleRef.current) bioRoleRef.current.textContent = member.role;
      if (bioTextRef.current) bioTextRef.current.textContent = member.bio;
      if (bioLinkRef.current) {
        if (member.linkedin) {
          bioLinkRef.current.href = member.linkedin;
          bioLinkRef.current.style.display = "";
        } else {
          bioLinkRef.current.removeAttribute("href");
          bioLinkRef.current.style.display = "none";
        }
      }
    }

    function moveTo(index: number) {
      const current = nearestIndex();
      let delta = index - current;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      state.base += delta;
      state.target = state.base;
      state.lastInput = performance.now();
      state.autoAccum = 0;
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
        state.autoAccum = 0;
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
      state.lastInput = performance.now();
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
      state.autoAccum = 0;
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

    updateBio(0);

    function render(time: number) {
      rafId = requestAnimationFrame(render);
      if (!visible) return;
      const deltaTime = Math.min(32, time - previousTime);
      previousTime = time;
      const ease = reduced ? 1 : 1 - Math.pow(0.001, deltaTime / 1000);

      if (!dragging && !reduced && count > 1) {
        const idleSinceInput = time - state.lastInput;
        if (idleSinceInput > RESUME_AFTER_INPUT_MS) {
          state.autoAccum += deltaTime;
          if (state.autoAccum >= AUTO_ROTATE_MS) {
            state.autoAccum = 0;
            state.base += 1;
            state.target = state.base;
          }
        } else {
          state.autoAccum = 0;
        }
      }

      state.phase += (state.target - state.phase) * ease;
      const compact = stage.clientWidth < 560;
      const activeIndex = nearestIndex();
      updateBio(activeIndex);
      const horizontalSpacing = Math.min(168, Math.max(112, stage.clientWidth * 0.16));

      cards.forEach((card, index) => {
        const delta = wrappedDelta(index, state.phase, count);
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
  }, [count, members]);

  const first = members[0];

  return (
    <div>
      <div
        ref={stageRef}
        className="relative z-10 h-[380px] cursor-grab touch-none select-none active:cursor-grabbing sm:h-[420px]"
        style={{ perspective: "1450px" }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {members.map((member, i) => (
            <button
              key={member.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              aria-label={`Focus ${member.name}`}
              className="absolute left-1/2 top-1/2 flex w-[190px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900 to-navy shadow-lift outline-none focus-visible:ring-2 focus-visible:ring-gold-400 sm:w-[210px]"
              style={{ aspectRatio: "0.74", willChange: "transform, opacity, filter" }}
            >
              <span className="relative block flex-1 overflow-hidden">
                {member.photo ? (
                  <Image
                    src={member.photo.src}
                    alt={member.name}
                    fill
                    sizes="210px"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    <span className="font-display text-2xl font-extrabold text-white/90">
                      {initials(member.name)}
                    </span>
                  </span>
                )}
              </span>
              <span className="grid grid-cols-[auto_1fr] items-center gap-2.5 bg-[#0b1220] p-3">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-gold-500/60 font-mono text-[11px] font-semibold text-gold-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-left">
                  <span className="block truncate text-sm font-bold text-white">{member.name}</span>
                  <span className="mt-0.5 block truncate text-[11px] font-medium text-gold-300/80">
                    {member.role}
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-xl rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 sm:p-7">
        <h3 ref={bioNameRef} className="font-display text-lg font-bold text-white">
          {first.name}
        </h3>
        <span ref={bioRoleRef} className="mt-0.5 block text-sm font-medium text-gold-300">
          {first.role}
        </span>
        <p
          ref={bioTextRef}
          className="mx-auto mt-3 min-h-[72px] max-w-md text-sm leading-relaxed text-white/70"
        >
          {first.bio}
        </p>
        <a
          ref={bioLinkRef}
          href={first.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: first.linkedin ? undefined : "none" }}
          aria-label={`${first.name} on LinkedIn`}
          className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors duration-200 hover:bg-gold-500 hover:text-navy"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
