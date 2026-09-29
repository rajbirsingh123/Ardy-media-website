"use client";

import { useEffect, useRef } from "react";

type Format = "dot" | "square";

type Particle = {
  cx: number;
  cy: number;
  nx: number;
  ny: number;
  format: Format;
  size: number;
  offset: number;
  mask: number;
};

const FORMATS: Format[] = ["dot", "dot", "square"];
const SIZE_SMALL: [number, number] = [1.0, 1.9];
const SIZE_BIG: [number, number] = [2.1, 3.0];
const BIG_CHANCE = 0.06;
const BASE_GAP = 2.6;
const SPEED = 1.4;
const SEED = 1337;
const GAMMA = 0.8;
const DUR = 8;
const TAU = Math.PI * 2;

function noise(x: number, y: number, t: number) {
  const a = x + 0.7 * Math.sin(1.2 * y + t);
  const r = y + 0.7 * Math.cos(1.1 * x - t);
  return (
    (Math.sin(1.3 * a + 0.6 * t) + Math.cos(1.5 * r - 0.5 * t) + Math.sin((a + r) * 0.9 + 0.3 * t)) / 3
  );
}

function snowfall(p: Particle, t: number) {
  const fall = 0.26;
  const freq = 5;
  const trail = 0.4;
  const sway = 0.14 * Math.sin(0.8 * t + p.offset * TAU + 4 * p.ny) + 0.0 * noise(3 * p.nx, 3 * p.ny, 0.5 * t);
  const o = p.ny * freq - t * fall + p.offset * freq + sway + 0.8 * p.nx;
  const s = o - Math.floor(o);
  return s < trail ? 1 - s / trail : 0;
}

function squall(p: Particle, t: number) {
  const band = 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(3 * p.nx - 0.5 * t), 2);
  const flake = snowfall(p, t);
  return Math.max(0, Math.min(1, 0.04 + 0.95 * band * Math.pow(flake, 1.8)));
}

function lcg(seed: number) {
  let e = seed >>> 0;
  return function random() {
    e = (1664525 * e + 0x3c6ef35f) >>> 0;
    return e / 0xffffffff;
  };
}

export default function ParticleHeading({
  lines,
  className = "",
}: {
  lines: [string, string];
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hostEl = hostRef.current;
    const canvasEl = canvasRef.current;
    if (!hostEl || !canvasEl) return;
    const host: HTMLDivElement = hostEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let t0 = performance.now();
    let tNow = 0;
    let rafId = 0;
    let visible = true;

    // Pre-rendered radial glow, tinted per-draw via globalAlpha — far cheaper
    // than building a gradient for every star on every frame.
    const glowSprite = document.createElement("canvas");
    glowSprite.width = 64;
    glowSprite.height = 64;
    const gctx = glowSprite.getContext("2d");
    if (gctx) {
      const grad = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.35, "rgba(255,255,255,0.4)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 64, 64);
    }

    function buildMask(w: number, h: number) {
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const g = off.getContext("2d");
      if (!g) return null;
      g.fillStyle = "#fff";
      g.textAlign = "center";
      g.textBaseline = "middle";

      const maxWidth = w * 0.98;
      let fontSize = h * 0.46;
      g.font = `800 ${fontSize}px Arial, "Helvetica Neue", sans-serif`;
      const widest = Math.max(g.measureText(lines[0]).width, g.measureText(lines[1]).width, 1);
      if (widest > maxWidth) fontSize *= maxWidth / widest;
      g.font = `800 ${fontSize}px Arial, "Helvetica Neue", sans-serif`;

      const lineGap = fontSize * 1.15;
      g.fillText(lines[0], w / 2, h / 2 - lineGap / 2);
      g.fillText(lines[1], w / 2, h / 2 + lineGap / 2);
      let data: ImageData;
      try {
        data = g.getImageData(0, 0, w, h);
      } catch {
        return null;
      }
      const pixels = data.data;
      return (x: number, y: number) => {
        const ix = Math.min(w - 1, Math.max(0, Math.round(x)));
        const iy = Math.min(h - 1, Math.max(0, Math.round(y)));
        const alpha = pixels[(iy * w + ix) * 4 + 3] / 255;
        return Math.pow(alpha, GAMMA);
      };
    }

    function rebuild() {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sample = buildMask(w, h);
      const rand = lcg(SEED);
      const gap = Math.max(1.5, Math.min(BASE_GAP, w / 260));
      const sizeScale = gap / BASE_GAP;
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      const next: Particle[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = ox + x * gap;
          const py = oy + y * gap;
          const m = sample ? sample(px, py) : 0;
          if (m < 0.16) continue;
          const range = rand() < BIG_CHANCE ? SIZE_BIG : SIZE_SMALL;
          next.push({
            cx: px,
            cy: py,
            nx: cols > 1 ? x / (cols - 1) : 0.5,
            ny: rows > 1 ? y / (rows - 1) : 0.5,
            format: FORMATS[Math.floor(rand() * FORMATS.length)],
            size: (range[0] + rand() * (range[1] - range[0])) * sizeScale,
            offset: rand(),
            mask: m,
          });
        }
      }
      particles = next;
    }

    function draw(p: Particle, t: number) {
      const shimmer = squall(p, t);
      // Legible floor so the shape always reads; shimmer only adds sparkle on top.
      const alpha = p.mask * (0.78 + 0.22 * shimmer);
      if (alpha <= 0.02) return;
      const r = p.size / 2;

      // Starlight glow: a pre-rendered radial sprite scaled per particle, tinted via alpha.
      if (gctx) {
        const glowR = r * 4.2;
        ctx.globalAlpha = Math.min(1, alpha * 0.85);
        ctx.drawImage(glowSprite, p.cx - glowR, p.cy - glowR, glowR * 2, glowR * 2);
        ctx.globalAlpha = 1;
      }

      // Bright crisp core on top so the letterforms stay sharp, not just glowy.
      const coreAlpha = Math.min(1, alpha * 1.35);
      ctx.fillStyle = `rgba(255,255,255,${coreAlpha})`;
      if (p.format === "square") ctx.fillRect(p.cx - r, p.cy - r, p.size, p.size);
      else {
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, r, 0, TAU);
        ctx.fill();
      }
    }

    function render(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) draw(p, t);
      ctx.globalCompositeOperation = "source-over";
    }

    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      if (reduced) {
        render(2);
        return;
      }
      tNow = ((now - t0) / 1000) % DUR;
      render(tNow * SPEED);
    }

    rebuild();
    render(reduced ? 2 : 0);
    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      rebuild();
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) t0 = performance.now() - tNow * 1000;
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, [lines]);

  return (
    <div className={className}>
      <h1 className="sr-only">
        {lines[0]} {lines[1]}
      </h1>
      <div ref={hostRef} aria-hidden="true" className="h-44 w-full sm:h-56 lg:h-72">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}
