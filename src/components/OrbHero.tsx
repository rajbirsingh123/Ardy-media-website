"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Container from "./Container";
import NeuralButton from "./NeuralButton";
import ParticleHeading from "./ParticleHeading";
import Reveal from "./Reveal";
import { ArrowRightIcon } from "./Icons";
import { stats } from "@/lib/content";

/* ---------------------------------------------------------------------
 * Seeded PRNG — deterministic card layout, so the sphere reads the same
 * on every load instead of reshuffling per visit.
 * ------------------------------------------------------------------- */
function mulberry32(seed: number) {
  let a = seed | 0;
  return function random() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(r: () => number, arr: T[]): T {
  return arr[Math.floor(r() * arr.length)];
}
function rr(r: () => number, min: number, max: number) {
  return min + r() * (max - min);
}

/* ---------------------------------------------------------------------
 * Brand tile atlas — procedurally drawn "interface" plates using Ardy
 * Media's real palette and real content (services, stats, process steps)
 * instead of generic stock UI mockups.
 * ------------------------------------------------------------------- */
const NAVY = "#0b1d3a";
const BRAND_900 = "#10306b";
const BRAND_800 = "#154e9c";
const GOLD = "#f0b429";
const GOLD_SOFT = "#ffe08a";
const MIST = "#eef4ff";

type TileSpec =
  | { kind: "mark" }
  | { kind: "stat"; value: string; label: string }
  | { kind: "label"; text: string; sub: string }
  | { kind: "bars"; label: string }
  | { kind: "step"; step: string; title: string };

function tileSpecs(): TileSpec[] {
  return [
    { kind: "mark" },
    ...stats.map((s) => ({ kind: "stat" as const, value: s.value, label: s.label })),
    { kind: "label", text: "Paid Social", sub: "Meta · Instagram · LinkedIn" },
    { kind: "label", text: "Websites", sub: "Built to convert" },
    { kind: "label", text: "CRM Systems", sub: "Built around your team" },
    { kind: "label", text: "AI Chatbots", sub: "First response in seconds" },
    { kind: "label", text: "Flutter Apps", sub: "iOS + Android" },
    { kind: "label", text: "Native iOS", sub: "Swift" },
    { kind: "label", text: "Native Android", sub: "Kotlin" },
    { kind: "label", text: "SEO", sub: "Built into the site" },
    { kind: "bars", label: "Cost per lead" },
    { kind: "bars", label: "Weekly reporting" },
    { kind: "step", step: "01", title: "Discover" },
    { kind: "step", step: "02", title: "Build" },
    { kind: "step", step: "03", title: "Automate" },
    { kind: "step", step: "04", title: "Scale" },
    { kind: "label", text: "Booking Flows", sub: "No back-and-forth" },
    { kind: "label", text: "Lead Routing", sub: "Seconds, not hours" },
  ];
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (let n = 0; n < words.length; n++) {
    const test = line + words[n] + " ";
    if (ctx.measureText(test).width > maxWidth && n > 0) {
      ctx.fillText(line, x, yy);
      line = words[n] + " ";
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, yy);
}

function drawTile(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  spec: TileSpec,
  rand: () => number,
  logoImg: HTMLImageElement | null,
) {
  const pad = 14;
  roundRectPath(ctx, pad, pad, w - pad * 2, h - pad * 2, 22);
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, pick(rand, [NAVY, BRAND_900]));
  bg.addColorStop(1, pick(rand, [BRAND_900, BRAND_800]));
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.stroke();

  ctx.save();
  roundRectPath(ctx, pad, pad, w - pad * 2, h - pad * 2, 22);
  ctx.clip();

  const cx = pad + 24;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  switch (spec.kind) {
    case "mark": {
      ctx.textAlign = "center";
      if (logoImg && logoImg.naturalWidth) {
        const ratio = logoImg.naturalWidth / logoImg.naturalHeight;
        const maxH = h - pad * 2 - 66;
        const maxW = w - pad * 2 - 80;
        let dh = maxH;
        let dw = dh * ratio;
        if (dw > maxW) {
          dw = maxW;
          dh = dw / ratio;
        }
        ctx.drawImage(logoImg, w / 2 - dw / 2, h / 2 - dh / 2 - 16, dw, dh);
      } else {
        ctx.fillStyle = GOLD;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 - 8, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = NAVY;
        ctx.font = "800 32px system-ui, sans-serif";
        ctx.fillText("A", w / 2, h / 2 + 2);
      }
      ctx.fillStyle = MIST;
      ctx.font = "600 22px system-ui, sans-serif";
      ctx.fillText("Ardy Media", w / 2, h - pad - 22);
      ctx.textAlign = "left";
      break;
    }
    case "stat": {
      ctx.fillStyle = GOLD_SOFT;
      ctx.font = "800 64px system-ui, sans-serif";
      ctx.fillText(spec.value, cx, h / 2 + 8);
      ctx.fillStyle = "rgba(238,244,255,0.75)";
      ctx.font = "500 19px system-ui, sans-serif";
      wrapText(ctx, spec.label, cx, h / 2 + 40, w - pad * 2 - 44, 23);
      break;
    }
    case "label": {
      ctx.strokeStyle = "rgba(240,180,41,0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, h / 2 - 26);
      ctx.lineTo(cx, h / 2 + 38);
      ctx.stroke();
      ctx.fillStyle = MIST;
      ctx.font = "700 29px system-ui, sans-serif";
      ctx.fillText(spec.text, cx + 16, h / 2 - 2);
      ctx.fillStyle = "rgba(255,224,138,0.85)";
      ctx.font = "500 18px system-ui, sans-serif";
      ctx.fillText(spec.sub, cx + 16, h / 2 + 30);
      break;
    }
    case "bars": {
      ctx.fillStyle = MIST;
      ctx.font = "600 21px system-ui, sans-serif";
      ctx.fillText(spec.label, cx, pad + 42);
      const baseY = h - pad - 26;
      const barW = 22;
      const heights = [0.5, 0.72, 0.95, 0.62, 0.85];
      heights.forEach((f, i) => {
        const bh = f * (h - pad * 2 - 86);
        ctx.fillStyle = i === heights.length - 1 ? GOLD : "rgba(79,143,240,0.65)";
        roundRectPath(ctx, cx + i * (barW + 11), baseY - bh, barW, bh, 6);
        ctx.fill();
      });
      break;
    }
    case "step": {
      ctx.fillStyle = "rgba(255,224,138,0.35)";
      ctx.font = "800 56px system-ui, sans-serif";
      ctx.fillText(spec.step, cx, h / 2 + 8);
      ctx.fillStyle = MIST;
      ctx.font = "700 25px system-ui, sans-serif";
      ctx.fillText(spec.title, cx, h / 2 + 48);
      break;
    }
  }
  ctx.restore();
}

function buildAtlas(rand: () => number, logoImg: HTMLImageElement | null) {
  const TW = 384;
  const TH = 256;
  const COLS = 5;
  const specs = tileSpecs();
  const ROWS = Math.ceil(specs.length / COLS);
  const canvas = document.createElement("canvas");
  canvas.width = TW * COLS;
  canvas.height = TH * ROWS;
  const ctx = canvas.getContext("2d")!;
  specs.forEach((spec, i) => {
    const cx = (i % COLS) * TW;
    const cy = Math.floor(i / COLS) * TH;
    ctx.save();
    ctx.translate(cx, cy);
    drawTile(ctx, TW, TH, spec, rand, logoImg);
    ctx.restore();
  });
  return { canvas, cols: COLS, rows: ROWS, count: specs.length };
}

/* ---------------------------------------------------------------------
 * Globe core — a solid lat/long sphere so the orb reads as an actual
 * globe, with the brand cards floating just above its surface.
 * ------------------------------------------------------------------- */
function buildGlobeTexture() {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ocean base
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#1d3d72");
  grad.addColorStop(0.45, "#123061");
  grad.addColorStop(1, "#050d1c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // limb darkening left/right — reads as curvature when wrapped on the sphere
  const limb = ctx.createLinearGradient(0, 0, W, 0);
  limb.addColorStop(0, "rgba(0,0,0,0.4)");
  limb.addColorStop(0.14, "rgba(0,0,0,0)");
  limb.addColorStop(0.86, "rgba(0,0,0,0)");
  limb.addColorStop(1, "rgba(0,0,0,0.4)");
  ctx.fillStyle = limb;
  ctx.fillRect(0, 0, W, H);

  // stylized abstract landmasses, deterministic
  const landRand = mulberry32(90210);
  ctx.fillStyle = "rgba(255,224,138,0.13)";
  for (let i = 0; i < 22; i++) {
    const bx = landRand() * W;
    const by = H * 0.14 + landRand() * H * 0.72;
    const blobR = 24 + landRand() * 58;
    const points = 9;
    ctx.beginPath();
    for (let p = 0; p <= points; p++) {
      const a = (p / points) * Math.PI * 2;
      const rr2 = blobR * (0.65 + landRand() * 0.5);
      const px = bx + Math.cos(a) * rr2;
      const py = by + Math.sin(a) * rr2 * 0.6;
      if (p === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  // faint lat/long grid
  ctx.strokeStyle = "rgba(238,244,255,0.08)";
  ctx.lineWidth = 1;
  for (let lon = 0; lon <= 360; lon += 20) {
    const x = (lon / 360) * W;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * H;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // equator accent
  ctx.strokeStyle = "rgba(240,180,41,0.28)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();

  // glossy light sheen, simulating a light source upper-left
  const sheen = ctx.createRadialGradient(W * 0.32, H * 0.22, 10, W * 0.32, H * 0.22, W * 0.5);
  sheen.addColorStop(0, "rgba(255,255,255,0.22)");
  sheen.addColorStop(0.35, "rgba(255,255,255,0.05)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, W, H);

  return canvas;
}

/* ---------------------------------------------------------------------
 * Sphere of cards — lattice placement, tangent-basis orientation,
 * rounded-rect fan geometry, drag-to-spin with inertia, hover pop.
 * ------------------------------------------------------------------- */
const ASPECTS = [1.62, 1.56, 1.5, 1.5, 1.5, 1.44, 1.38, 1.32];
const SPHERE = { R: 1, count: 72, latLimitDeg: 82, gap: 0.16 };
const SEG = 4;
const PER = 4 * (SEG + 1); // outline points per card
const VERTS_PER_CARD = PER + 1; // + fan center
const HOVER_POP = 1.12;

type Card = {
  lat: number;
  lon: number;
  roll: number;
  hw: number;
  hh: number;
  tile: number;
};

function buildCards(rand: () => number, tileCount: number): Card[] {
  const cards: Card[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const latLimitRad = (SPHERE.latLimitDeg * Math.PI) / 180;
  const spacing = Math.sqrt((4 * Math.PI) / SPHERE.count);
  for (let i = 0; i < SPHERE.count; i++) {
    const y = 1 - (i / (SPHERE.count - 1)) * 2;
    const lat = Math.asin(Math.max(-1, Math.min(1, y)));
    if (Math.abs(lat) > latLimitRad) continue;
    const lon = golden * i + rr(rand, -0.04, 0.04);
    const roll = rr(rand, -0.16, 0.16);
    const aspect = pick(rand, ASPECTS);
    const base = spacing * (0.5 - SPHERE.gap * 0.5);
    cards.push({
      lat,
      lon,
      roll,
      hw: base * Math.sqrt(aspect),
      hh: base / Math.sqrt(aspect),
      tile: Math.floor(rand() * tileCount),
    });
  }
  return cards;
}

function cardBasis(lat: number, lon: number, roll: number) {
  const normal = new THREE.Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    Math.cos(lat) * Math.sin(lon),
  );
  const worldUp = Math.abs(normal.y) > 0.995 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
  let right = new THREE.Vector3().crossVectors(worldUp, normal).normalize();
  let up = new THREE.Vector3().crossVectors(normal, right).normalize();
  if (roll) {
    const cr = Math.cos(roll);
    const sr = Math.sin(roll);
    const newRight = right.clone().multiplyScalar(cr).addScaledVector(up, sr);
    const newUp = up.clone().multiplyScalar(cr).addScaledVector(right, -sr);
    right = newRight;
    up = newUp;
  }
  return { normal, right, up };
}

function cardOutline(hw: number, hh: number, radius: number): [number, number][] {
  const r = Math.min(radius, hw, hh);
  const pts: [number, number][] = [];
  const corners: [number, number, number][] = [
    [hw - r, hh - r, 0],
    [-hw + r, hh - r, Math.PI / 2],
    [-hw + r, -hh + r, Math.PI],
    [hw - r, -hh + r, Math.PI * 1.5],
  ];
  for (const [ccx, ccy, startAngle] of corners) {
    for (let i = 0; i <= SEG; i++) {
      const a = startAngle + (i / SEG) * (Math.PI / 2);
      pts.push([ccx + Math.cos(a) * r, ccy + Math.sin(a) * r]);
    }
  }
  return pts;
}

function writeCard(
  positions: Float32Array,
  cardIndex: number,
  basis: { normal: THREE.Vector3; right: THREE.Vector3; up: THREE.Vector3 },
  outline: [number, number][],
  R: number,
  scale: number,
) {
  const radMul = 1 + (scale - 1) * 0.35;
  const base = cardIndex * VERTS_PER_CARD * 3;
  const center = basis.normal.clone().multiplyScalar(R * radMul);
  positions[base] = center.x;
  positions[base + 1] = center.y;
  positions[base + 2] = center.z;
  for (let i = 0; i < outline.length; i++) {
    const [lx, ly] = outline[i];
    const p = center.clone().addScaledVector(basis.right, lx * scale).addScaledVector(basis.up, ly * scale);
    const off = base + (i + 1) * 3;
    positions[off] = p.x;
    positions[off + 1] = p.y;
    positions[off + 2] = p.z;
  }
}

export default function OrbHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!container || !canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;

    const logoImg = new Image();
    logoImg.src = "/logo-mark.png";

    const rand = mulberry32(424242);
    const atlas = buildAtlas(rand, null);
    const cards = buildCards(rand, atlas.count);
    const outlines = cards.map((c) => cardOutline(c.hw, c.hh, Math.min(c.hw, c.hh) * 0.4));

    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20);
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    const texture = new THREE.CanvasTexture(atlas.canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const vertCount = cards.length * VERTS_PER_CARD;
    const positions = new Float32Array(vertCount * 3);
    const uvs = new Float32Array(vertCount * 2);
    const colors = new Float32Array(vertCount * 3).fill(1);
    const indices: number[] = [];

    cards.forEach((card, ci) => {
      const basis = cardBasis(card.lat, card.lon, card.roll);
      writeCard(positions, ci, basis, outlines[ci], SPHERE.R, 1);

      const col = card.tile % atlas.cols;
      const row = Math.floor(card.tile / atlas.cols);
      const inset = 0.05;
      const u0 = col / atlas.cols;
      const v0 = 1 - (row + 1) / atlas.rows;
      const uSpan = 1 / atlas.cols;
      const vSpan = 1 / atlas.rows;
      const base = ci * VERTS_PER_CARD * 2;
      uvs[base] = u0 + 0.5 * uSpan;
      uvs[base + 1] = v0 + 0.5 * vSpan;
      outlines[ci].forEach(([lx, ly], i) => {
        const nu = lx / card.hw / 2 + 0.5;
        const nv = ly / card.hh / 2 + 0.5;
        const off = base + (i + 1) * 2;
        uvs[off] = u0 + (inset + nu * (1 - 2 * inset)) * uSpan;
        uvs[off + 1] = v0 + (inset + nv * (1 - 2 * inset)) * vSpan;
      });

      const vBase = ci * VERTS_PER_CARD;
      for (let i = 0; i < PER; i++) {
        const a = vBase + 1 + i;
        const b = vBase + 1 + ((i + 1) % PER);
        indices.push(vBase, a, b);
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      vertexColors: true,
      side: THREE.FrontSide,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);

    const globeTexture = new THREE.CanvasTexture(buildGlobeTexture());
    globeTexture.colorSpace = THREE.SRGBColorSpace;
    const globeGeometry = new THREE.SphereGeometry(SPHERE.R * 0.93, 64, 48);
    const globeMaterial = new THREE.MeshBasicMaterial({ map: globeTexture });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);

    const glowGeometry = new THREE.SphereGeometry(SPHERE.R * 1.015, 48, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(GOLD),
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);

    orbGroup.add(globeMesh, mesh, glowMesh);
    orbGroup.rotation.x = 0.18;

    function repaintMarkTile() {
      const ctx = atlas.canvas.getContext("2d");
      if (!ctx) return;
      const TW = atlas.canvas.width / atlas.cols;
      const TH = atlas.canvas.height / atlas.rows;
      ctx.save();
      ctx.clearRect(0, 0, TW, TH);
      drawTile(ctx, TW, TH, { kind: "mark" }, rand, logoImg);
      ctx.restore();
      texture.needsUpdate = true;
    }
    if (logoImg.complete && logoImg.naturalWidth > 0) {
      repaintMarkTile();
    } else {
      logoImg.addEventListener("load", repaintMarkTile, { once: true });
    }

    // ---- responsive fit ----
    function fit() {
      if (!container) return;
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const narrow = w < 900;
      camera.fov = narrow ? 46 : 32;
      camera.position.set(0, 0, narrow ? 3.2 : 3.6);
      orbGroup.position.set(0, 0, 0);
      camera.updateProjectionMatrix();
    }
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);

    // ---- pointer drag + hover ----
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2(10, 10);
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let velYaw = 0;
    let velPitch = 0;
    let yaw = 0;
    let pitch = 0;

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velYaw = dx * 0.004;
      velPitch = dy * 0.004;
      yaw += velYaw;
      pitch = Math.max(-1, Math.min(1, pitch + velPitch));
    }
    function endDrag(e: PointerEvent) {
      dragging = false;
      pointerNDC.set(10, 10);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
    function onPointerLeave() {
      pointerNDC.set(10, 10);
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const hoverT = new Float32Array(cards.length);
    const hoverTarget = new Float32Array(cards.length);
    const live = new Set<number>();
    let hoveredIdx = -1;
    let dimT = 0;
    let slowT = 0;

    function setCardColor(ci: number, warm: number) {
      const vBase = ci * VERTS_PER_CARD * 3;
      for (let v = 0; v < VERTS_PER_CARD; v++) {
        const off = vBase + v * 3;
        colors[off] = 1;
        colors[off + 1] = 1 - warm * 0.06;
        colors[off + 2] = 1 - warm * 0.22;
      }
    }

    const AUTO = (Math.PI * 2) / 26;
    const clock = new THREE.Clock();
    let rafId = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, clock.getDelta());

      if (!reduced) {
        if (!dragging) {
          velYaw *= 0.94;
          velPitch *= 0.94;
          yaw += velYaw + AUTO * dt * (1 - slowT * 0.45);
          pitch += velPitch;
        }
        pitch *= 0.98;
      }
      orbGroup.rotation.y = yaw;
      orbGroup.rotation.x = 0.18 + pitch * 0.5;

      // hover raycast (desktop only)
      if (canHover && !dragging) {
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObject(mesh, false);
        const hit = hits.length ? hits[0] : null;
        const newHover = hit && hit.faceIndex != null ? Math.floor(hit.faceIndex / PER) : -1;
        if (newHover !== hoveredIdx) {
          if (hoveredIdx >= 0) {
            hoverTarget[hoveredIdx] = 0;
            live.add(hoveredIdx);
          }
          if (newHover >= 0) {
            hoverTarget[newHover] = 1;
            live.add(newHover);
          }
          hoveredIdx = newHover;
        }
      }

      const targetDim = hoveredIdx >= 0 ? 1 : 0;
      dimT += (targetDim - dimT) * Math.min(1, dt * 5);
      slowT += (targetDim - slowT) * Math.min(1, dt * 4);
      material.color.setScalar(1 - dimT * 0.35);

      if (live.size) {
        for (const ci of Array.from(live)) {
          const target = hoverTarget[ci];
          hoverT[ci] += (target - hoverT[ci]) * Math.min(1, dt * 9);
          if (Math.abs(target - hoverT[ci]) < 0.003) {
            hoverT[ci] = target;
            live.delete(ci);
          }
          const scale = 1 + hoverT[ci] * (HOVER_POP - 1);
          const basis = cardBasis(cards[ci].lat, cards[ci].lon, cards[ci].roll);
          writeCard(positions, ci, basis, outlines[ci], SPHERE.R, scale);
          setCardColor(ci, hoverT[ci]);
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      logoImg.removeEventListener("load", repaintMarkTile);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      globeTexture.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div ref={containerRef} className="relative" style={{ height: "clamp(640px, 94vh, 940px)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 50% 46%, rgba(10,23,48,0.55) 0%, rgba(3,8,18,0.25) 55%, transparent 100%)",
          }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full touch-none" aria-hidden="true" />

        {/* vignette so the centered copy stays legible over the sphere */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 48% at 50% 50%, rgba(0,1,3,0.97) 0%, rgba(0,1,3,0.8) 55%, transparent 85%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000103] via-transparent to-[#000103]/25" />
        <div
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(0,1,3,0.55) 14%, rgba(0,1,3,0.6) 85%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 z-[2] flex items-center">
          <Container>
            <div
              className="text-center"
              style={{ textShadow: "0 2px 28px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,0.9)" }}
            >
              <Reveal>
                <ParticleHeading
                  lines={["You do the real work.", "We run your marketing & tech."]}
                  mobileLines={["You do the", "real work.", "We run your", "marketing & tech."]}
                  heightClassName="h-64 w-full sm:h-56 lg:h-72"
                  className="mx-auto max-w-5xl"
                />
              </Reveal>
              <Reveal delay={200} className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4">
                <NeuralButton href="/contact" accent="gold">
                  Book a Free Strategy Call <ArrowRightIcon />
                </NeuralButton>
                <NeuralButton href="/services" accent="ice">
                  See What We Do
                </NeuralButton>
              </Reveal>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
