"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

type Accent = "gold" | "ice";

const ACCENTS: Record<Accent, { halo: string; arc: string; flare: string; flash: string }> = {
  gold: {
    halo: "0.32, 0.21, 0.06",
    arc: "0.96, 0.64, 0.14",
    flare: "1.0, 0.9, 0.62",
    flash: "1.0, 0.95, 0.8",
  },
  ice: {
    halo: "0.08, 0.16, 0.3",
    arc: "0.35, 0.55, 0.88",
    flare: "0.78, 0.9, 1.0",
    flash: "0.87, 0.94, 1.0",
  },
};

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("NeuralButton shader compile failed:", gl.getShaderInfoLog(s));
  }
  return s;
}

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, vsSrc));
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, fsSrc));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("NeuralButton program link failed:", gl.getProgramInfoLog(prog));
  }
  return prog;
}

const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

function buildFragmentShader(accent: Accent) {
  const { halo, arc, flare, flash } = ACCENTS[accent];
  return `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_arcs;
uniform float u_flash;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),
             mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0; float a=0.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.05+vec2(9.7,3.1); a*=0.5; }
  return v;
}
float sdRBox(vec2 p, vec2 b, float r){
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  float ar = u_res.x / u_res.y;
  vec2 hs = vec2(ar * 0.5 - 0.12, 0.5 - 0.12);
  float r = min(hs.x, hs.y);
  float d = sdRBox(p, hs, r);
  float t = u_time;
  float hover = clamp(u_arcs / 6.0, 0.0, 1.0);
  vec3 col = vec3(0.02, 0.024, 0.032);
  float plate = 1.0 - smoothstep(-0.004, 0.004, d);
  vec3 plateCol = vec3(0.035, 0.04, 0.05);
  plateCol += vec3(${halo}) * 0.06 * fbm(p * 9.0);
  plateCol += vec3(${halo}) * exp(d * 9.0) * (0.25 + hover * 0.55);
  col = mix(col, plateCol, plate);
  col *= 1.0 + 0.5 * exp(-max(d, 0.0) * 16.0) * (1.0 - plate);
  float a = atan(p.y, p.x);
  vec3 arcCol = vec3(0.0);
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float w = clamp(u_arcs - fi, 0.0, 1.0);
    float n1 = fbm(vec2(a * 2.4 + fi * 11.3, t * (1.6 + fi * 0.27) + fi * 53.1));
    float off = (n1 - 0.5) * (0.11 + u_flash * 0.1);
    float seg = smoothstep(0.35, 0.75, noise(vec2(a * 1.8 + fi * 7.7, t * (0.9 + fi * 0.13) + fi * 19.0)));
    seg = 0.3 + 0.7 * seg;
    float g = 0.0042 / (abs(d + off) + 0.006);
    arcCol += (vec3(${arc}) * g + vec3(${flare}) * g * g * 0.55) * w * seg;
  }
  float outerMask = 1.0 - smoothstep(0.04, 0.15, d);
  col += arcCol * (0.6 + 0.4 * hover) * outerMask;
  float ring = 0.006 / (abs(d) + 0.006);
  col += vec3(${flash}) * ring * u_flash * 1.5 * outerMask;
  col += vec3(${flash}) * u_flash * 0.16 * outerMask;
  gl_FragColor = vec4(col, 1.0);
}
`;
}

export default function NeuralButton({
  href,
  children,
  accent = "gold",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  accent?: Accent;
  className?: string;
  onClick?: () => void;
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const canvasEl = canvasRef.current;
    if (!link || !canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { alpha: false, antialias: true }) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) {
      link.style.background = "#0b1d3a";
      link.style.boxShadow = "0 0 0 1px rgba(240,180,41,0.5), 0 0 24px rgba(240,180,41,0.35)";
      return;
    }

    const prog = createProgram(gl, VS, buildFragmentShader(accent));
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const locP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(locP);
    gl.vertexAttribPointer(locP, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uArcs = gl.getUniformLocation(prog, "u_arcs");
    const uFlash = gl.getUniformLocation(prog, "u_flash");

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let arcs = 2.2;
    let arcsTarget = 2.2;
    let flash = 0;
    let crawl = 0;
    let last = performance.now();
    let rafId = 0;
    let visible = true;

    function onEnter() {
      arcsTarget = 5.8;
    }
    function onLeave() {
      arcsTarget = 2.2;
    }
    function onClickBurst() {
      flash = 1;
    }

    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", onLeave);
    link.addEventListener("focus", onEnter);
    link.addEventListener("blur", onLeave);
    link.addEventListener("click", onClickBurst);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    io.observe(canvas);

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced) {
        arcs += (arcsTarget - arcs) * Math.min(1, dt * 5);
        flash *= Math.exp(-3.6 * dt);
        crawl += dt * (0.6 + (arcs / 6) * 1.1 + flash * 2.0);
      }
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.uniform1f(uTime, reduced ? 3 : crawl);
      gl!.uniform1f(uArcs, reduced ? 3 : arcs);
      gl!.uniform1f(uFlash, reduced ? 0 : flash);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("mouseleave", onLeave);
      link.removeEventListener("focus", onEnter);
      link.removeEventListener("blur", onLeave);
      link.removeEventListener("click", onClickBurst);
    };
  }, [accent]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onClick={onClick}
      className={`group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full px-9 text-sm font-semibold tracking-wide text-[#eaf6ff] transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:translate-y-px ${className}`}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full rounded-full" />
      <span
        className="relative z-10 inline-flex items-center gap-2"
        style={{ textShadow: "0 0 10px rgba(255,255,255,0.25), 0 1px 3px rgba(0,0,0,0.8)" }}
      >
        {children}
      </span>
    </Link>
  );
}
