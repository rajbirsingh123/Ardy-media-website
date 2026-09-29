"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  floor: number;
  sharpness: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
  hue: string;
};

type Burst = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: string;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function SkyField({ className = "" }: { className?: string }) {
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

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let bursts: Burst[] = [];
    let rafId = 0;
    let visible = true;
    let tAccum = 0;
    let nextMeteorAt = rand(1.5, 4);

    function rebuild() {
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.max(90, Math.min(240, Math.floor((w * h) / 8500)));
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.08 ? rand(1.3, 2.1) : rand(0.5, 1.2),
        baseAlpha: rand(0.35, 0.95),
        phase: Math.random() * Math.PI * 2,
        speed: rand(0.3, 1.1),
        floor: rand(0.05, 0.2),
        sharpness: rand(3, 9),
      }));
    }

    function spawnMeteor() {
      const fromLeft = Math.random() < 0.5;
      const startX = fromLeft ? rand(-0.05, 0.4) * w : rand(0.6, 1.05) * w;
      const startY = rand(0, 0.3) * h;
      const angle = fromLeft ? rand(0.35, 0.55) : Math.PI - rand(0.35, 0.55);
      const speed = rand(260, 380);
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: rand(1.1, 1.6),
        len: rand(90, 140),
        hue: Math.random() < 0.6 ? "255,255,255" : "255,224,138",
      });
    }

    function spawnBurst(x: number, y: number, hue: string) {
      const n = 10 + Math.floor(Math.random() * 6);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + rand(-0.25, 0.25);
        const speed = rand(20, 80);
        bursts.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          life: 0,
          maxLife: rand(0.7, 1.1),
          size: rand(1, 2.3),
          hue,
        });
      }
    }

    function draw(dt: number, tGlobal: number) {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const raw = Math.max(0, Math.sin(tGlobal * s.speed + s.phase));
        const blink = Math.pow(raw, s.sharpness);
        const alpha = s.baseAlpha * (s.floor + (1 - s.floor) * blink);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      meteors = meteors.filter((m) => {
        m.life += dt;
        if (m.life >= m.maxLife) {
          spawnBurst(m.x, m.y, m.hue);
          return false;
        }
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        const alpha = 1 - m.life / m.maxLife;
        const dirLen = Math.hypot(m.vx, m.vy) || 1;
        const tx = m.x - (m.vx / dirLen) * m.len;
        const ty = m.y - (m.vy / dirLen) * m.len;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(${m.hue},${alpha})`);
        grad.addColorStop(1, `rgba(${m.hue},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = `rgba(${m.hue},${alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      bursts = bursts.filter((b) => {
        b.life += dt;
        if (b.life >= b.maxLife) return false;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.vx *= 0.94;
        b.vy *= 0.94;
        const t = b.life / b.maxLife;
        const alpha = 1 - t;
        ctx.fillStyle = `rgba(${b.hue},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
    }

    let last = performance.now();
    function tick(now: number) {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (reduced) {
        draw(0, 0);
        return;
      }

      tAccum += dt;
      if (tAccum >= nextMeteorAt) {
        spawnMeteor();
        nextMeteorAt = tAccum + rand(4.5, 9);
      }
      draw(dt, tAccum);
    }

    rebuild();
    draw(0, 0);
    rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(rebuild);
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={`overflow-hidden ${className}`}>
      <div className="sky-aurora sky-aurora-a" />
      <div className="sky-aurora sky-aurora-b" />
      <div className="sky-aurora sky-aurora-c" />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
