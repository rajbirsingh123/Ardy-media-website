"use client";

import { useEffect, useRef } from "react";

type RGB = [number, number, number];
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

const PALETTE: RGB[] = [
  [255, 255, 255],
  [255, 255, 255],
  [255, 255, 255],
];
const FORMATS: Format[] = ["dot", "dot", "square"];
const SIZE_SMALL: [number, number] = [1.2, 2.3];
const SIZE_BIG: [number, number] = [2.6, 3.7];
const BIG_CHANCE = 0.07;
const GAP = 4;
const SPEED = 2;
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
  return { a: 0.04 + 0.95 * band * Math.pow(flake, 1.8), p: 0.7 * p.offset };
}

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function mixPalette(p: number): RGB {
  const e = Math.max(0, Math.min(1, p)) * (PALETTE.length - 1);
  const r = Math.floor(e);
  const s = e - r;
  return lerpRGB(PALETTE[r], PALETTE[Math.min(PALETTE.length - 1, r + 1)], s);
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
      const gap = Math.max(2.1, Math.min(GAP, w / 150));
      const sizeScale = gap / GAP;
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
          if (m < 0.06) continue;
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
      const field = squall(p, t);
      let alpha = Math.max(0, Math.min(1, field.a));
      alpha = p.mask * (0.3 + 0.7 * alpha);
      if (alpha <= 0.01) return;
      const rgb = mixPalette(field.p);
      ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      const r = p.size / 2;
      if (p.format === "square") ctx.fillRect(p.cx - r, p.cy - r, p.size, p.size);
      else {
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, r, 0, TAU);
        ctx.fill();
      }
    }

    function render(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) draw(p, t);
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
      <div ref={hostRef} aria-hidden="true" className="mx-auto h-40 w-full max-w-2xl sm:h-48 lg:h-60">
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}
