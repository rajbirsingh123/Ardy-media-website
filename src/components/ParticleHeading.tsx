"use client";

import { useEffect, useRef } from "react";

type Format = "dot" | "square";

type Particle = {
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  nx: number;
  ny: number;
  format: Format;
  size: number;
  offset: number;
  mask: number;
  sparkleSpeed: number;
  sparklePhase: number;
};

const FORMATS: Format[] = ["dot", "dot", "square"];
const SIZE_SMALL: [number, number] = [1.0, 1.9];
const SIZE_BIG: [number, number] = [2.1, 3.0];
const BIG_CHANCE = 0.06;
const BASE_GAP = 3.6;
const LETTER_SPACING = 0.12;
const SPEED = 1.4;
const SEED = 1337;
const GAMMA = 0.8;
const DUR = 8;
const TAU = Math.PI * 2;
const INTRO_DURATION = 900;
const INTRO_STAGGER = 550;

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

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

// Diamond-catching-light glint: each particle twinkles on its own clock, so
// flashes pop independently across the shape instead of as one traveling wave.
function glint(p: Particle, t: number) {
  const phase = p.sparklePhase + t * p.sparkleSpeed * 0.6;
  const raw = Math.sin(phase) * Math.sin(phase * 1.37 + p.offset * 6.1);
  return Math.pow(Math.max(0, raw), 11);
}

function lcg(seed: number) {
  let e = seed >>> 0;
  return function random() {
    e = (1664525 * e + 0x3c6ef35f) >>> 0;
    return e / 0xffffffff;
  };
}

const MOBILE_BREAKPOINT = 640;

export default function ParticleHeading({
  lines,
  mobileLines,
  className = "",
  heightClassName = "h-44 w-full sm:h-56 lg:h-72",
  as: As = "h1",
}: {
  lines: string[];
  mobileLines?: string[];
  className?: string;
  heightClassName?: string;
  as?: "h1" | "p";
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

    function buildMask(w: number, h: number, sourceLines: string[]) {
      const activeLines = sourceLines.map((line) => line.toUpperCase());
      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const ctx2d = off.getContext("2d");
      if (!ctx2d) return null;
      const g: CanvasRenderingContext2D = ctx2d;
      g.fillStyle = "#fff";
      g.textAlign = "center";
      g.textBaseline = "middle";

      const maxWidth = w * 0.94;
      let fontSize = h * (activeLines.length > 1 ? 0.46 : 0.54);
      g.font = `800 ${fontSize}px Arial, "Helvetica Neue", sans-serif`;

      function measureLine(line: string) {
        const chars = Array.from(line);
        const base = chars.reduce((sum, ch) => sum + g.measureText(ch).width, 0);
        return base + LETTER_SPACING * fontSize * Math.max(0, chars.length - 1);
      }

      const widest = Math.max(...activeLines.map(measureLine), 1);
      if (widest > maxWidth) fontSize *= maxWidth / widest;
      g.font = `800 ${fontSize}px Arial, "Helvetica Neue", sans-serif`;

      function drawSpacedLine(line: string, cy: number) {
        const chars = Array.from(line);
        const spacing = LETTER_SPACING * fontSize;
        const widths = chars.map((ch) => g.measureText(ch).width);
        const total = widths.reduce((a, b) => a + b, 0) + spacing * Math.max(0, chars.length - 1);
        g.textAlign = "left";
        let x = w / 2 - total / 2;
        chars.forEach((ch, i) => {
          g.fillText(ch, x, cy);
          x += widths[i] + spacing;
        });
        g.textAlign = "center";
      }

      const lineGap = fontSize * (activeLines.length > 1 ? 1.25 : 1.15);
      const startY = h / 2 - ((activeLines.length - 1) * lineGap) / 2;
      activeLines.forEach((line, i) => drawSpacedLine(line, startY + i * lineGap));
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

      const sourceLines = mobileLines && w < MOBILE_BREAKPOINT ? mobileLines : lines;
      const sample = buildMask(w, h, sourceLines);
      const rand = lcg(SEED);
      const gap = Math.max(2, Math.min(BASE_GAP, w / 220));
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
          const scatterAngle = rand() * TAU;
          const scatterDist = 90 + rand() * 260;
          next.push({
            cx: px,
            cy: py,
            sx: Math.cos(scatterAngle) * scatterDist,
            sy: Math.sin(scatterAngle) * scatterDist,
            nx: cols > 1 ? x / (cols - 1) : 0.5,
            ny: rows > 1 ? y / (rows - 1) : 0.5,
            format: FORMATS[Math.floor(rand() * FORMATS.length)],
            size: (range[0] + rand() * (range[1] - range[0])) * sizeScale,
            offset: rand(),
            mask: m,
            sparkleSpeed: 0.5 + rand() * 2.4,
            sparklePhase: rand() * TAU,
          });
        }
      }
      particles = next;
    }

    function draw(p: Particle, t: number, introElapsed: number) {
      const introRaw = (introElapsed - p.offset * INTRO_STAGGER) / INTRO_DURATION;
      const intro = easeOutCubic(Math.max(0, Math.min(1, introRaw)));
      if (intro <= 0) return;

      const shimmer = squall(p, t);
      const spark = glint(p, t);
      // Legible floor so the shape always reads; shimmer + glint layer sparkle on top.
      const alpha = p.mask * (0.78 + 0.22 * shimmer) * intro;
      if (alpha <= 0.02) return;
      const r = (p.size / 2) * (0.15 + 0.85 * intro);

      // Particles converge from a scattered start point into their final
      // letterform position as they fade in, instead of just appearing in place.
      const settle = 1 - intro;
      const drawX = p.cx + p.sx * settle;
      const drawY = p.cy + p.sy * settle;

      // Starlight glow: a pre-rendered radial sprite scaled per particle, tinted via alpha.
      // Peaks of `spark` blow the glow out wider and brighter for a diamond-catching-light flash.
      if (gctx) {
        const glowR = r * (4.2 + spark * 2);
        ctx.globalAlpha = Math.min(1, alpha * 0.85 + spark * 0.22);
        ctx.drawImage(glowSprite, drawX - glowR, drawY - glowR, glowR * 2, glowR * 2);
        ctx.globalAlpha = 1;
      }

      // Bright crisp core on top so the letterforms stay sharp, not just glowy;
      // flashes cool toward icy-blue-white, like light glinting off a facet.
      const coreAlpha = Math.min(1, alpha * 1.35 + spark * 0.2);
      const g = Math.round(255 - spark * 5);
      const b = Math.round(255);
      ctx.fillStyle = `rgba(255,${g},${b},${coreAlpha})`;
      const cr = r * (1 + spark * 0.35);
      if (p.format === "square") ctx.fillRect(drawX - cr, drawY - cr, cr * 2, cr * 2);
      else {
        ctx.beginPath();
        ctx.arc(drawX, drawY, cr, 0, TAU);
        ctx.fill();
      }

      // Four-point glint spike on the rare brightest peaks — the classic diamond sparkle.
      if (spark > 0.9) {
        const spikeAlpha = (spark - 0.9) / 0.1;
        const len = r * (2.5 + spark * 2.5);
        ctx.strokeStyle = `rgba(255,255,255,${spikeAlpha * 0.45})`;
        ctx.lineWidth = Math.max(0.5, r * 0.22);
        ctx.beginPath();
        ctx.moveTo(drawX - len, drawY);
        ctx.lineTo(drawX + len, drawY);
        ctx.moveTo(drawX, drawY - len);
        ctx.lineTo(drawX, drawY + len);
        ctx.stroke();
      }
    }

    function render(t: number, introElapsed: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) draw(p, t, introElapsed);
      ctx.globalCompositeOperation = "source-over";
    }

    const introStart = performance.now();
    const introDone = INTRO_DURATION + INTRO_STAGGER;

    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      const introElapsed = reduced ? introDone : now - introStart;
      if (reduced) {
        render(2, introElapsed);
        return;
      }
      tNow = ((now - t0) / 1000) % DUR;
      render(tNow * SPEED, introElapsed);
    }

    rebuild();
    render(reduced ? 2 : 0, reduced ? introDone : 0);
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
  }, [lines, mobileLines]);

  return (
    <div className={className}>
      <As className="sr-only">{lines.join(" ")}</As>
      <div ref={hostRef} aria-hidden="true" className={heightClassName}>
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  );
}
