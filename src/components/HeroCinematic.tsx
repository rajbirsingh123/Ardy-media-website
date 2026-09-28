"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";
import Button from "./Button";
import Container from "./Container";
import { ArrowRightIcon } from "./Icons";

export default function HeroCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl2") ||
        canvas.getContext("webgl")) as WebGLRenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: gl,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1d3a, 0.028);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    const world = new THREE.Group();
    scene.add(world);

    scene.add(new THREE.AmbientLight(0x22346f, 0.65));
    const key = new THREE.DirectionalLight(0xffe3ae, 2.2);
    key.position.set(-6, 8, 10);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4f8ff0, 1.6);
    rim.position.set(8, -4, -8);
    scene.add(rim);
    const core = new THREE.PointLight(0xffd88f, 0, 18, 2);
    scene.add(core);

    const N = window.innerWidth < 700 ? 900 : 1500;
    const R = 4;
    const rnd = (i: number, k: number) => {
      const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const F: THREE.Vector3[][] = [[], [], [], []];
    const seeds: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const d = new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r);
      F[0].push(d.clone().multiplyScalar(R));
      const spread = R * 1.35 + Math.pow(rnd(i, 1), 1.6) * 9;
      F[1].push(
        d
          .clone()
          .multiplyScalar(spread)
          .add(
            new THREE.Vector3(
              (rnd(i, 2) - 0.5) * 1.5,
              (rnd(i, 3) - 0.5) * 1.5,
              (rnd(i, 4) - 0.5) * 1.5,
            ),
          ),
      );
      const ring = i % 3;
      const ang = (i / N) * Math.PI * 2 * 7 + ring;
      const rr = 3.2 + ring * 1.9 + (rnd(i, 5) - 0.5) * 0.5;
      const v = new THREE.Vector3(
        Math.cos(ang) * rr,
        (rnd(i, 6) - 0.5) * 0.35,
        Math.sin(ang) * rr,
      );
      v.applyEuler(
        new THREE.Euler([0.35, -0.5, 0.9][ring], 0, [0.15, 0.6, -0.3][ring]),
      );
      F[2].push(v);
      F[3].push(d.clone().multiplyScalar(0.7 + rnd(i, 7) * 0.9));
      seeds.push(rnd(i, 8) * 10);
    }

    const tileGeo = new THREE.BoxGeometry(0.2, 0.2, 0.045);
    const tileMat = new THREE.MeshStandardMaterial({
      metalness: 0.55,
      roughness: 0.35,
    });
    const tiles = new THREE.InstancedMesh(tileGeo, tileMat, N);
    tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const col = new THREE.Color();
    const palette = [0x10306b, 0x154e9c, 0x1c56ae, 0x0b1d3a];
    for (let i = 0; i < N; i++) {
      const r = rnd(i, 9);
      col.setHex(r < 0.14 ? 0xf0b429 : r < 0.3 ? 0xdce8fb : palette[i % 4]);
      tiles.setColorAt(i, col);
    }
    world.add(tiles);

    const M = window.innerWidth < 700 ? 90 : 150;
    const nodeIdx: number[] = [];
    for (let j = 0; j < M; j++) nodeIdx.push(Math.floor(rnd(j, 12) * N));
    const pairs: [number, number][] = [];
    nodeIdx.forEach((a, ai) => {
      const pa = F[0][a];
      const near = nodeIdx
        .map((b, bi): [number, number] => [bi, pa.distanceToSquared(F[0][b])])
        .filter((x) => x[0] !== ai)
        .sort((x, y) => x[1] - y[1])
        .slice(0, 2);
      near.forEach(([bi]) => {
        if (ai < bi) pairs.push([a, nodeIdx[bi]]);
      });
    });
    const linePos = new Float32Array(pairs.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xf0b429,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    world.add(lines);

    const glowTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,241,198,1)");
      g.addColorStop(0.3, "rgba(240,180,41,.6)");
      g.addColorStop(1, "rgba(240,180,41,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();

    const nodePos = new Float32Array(M * 3);
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodes = new THREE.Points(
      nodeGeo,
      new THREE.PointsMaterial({
        size: 0.55,
        map: glowTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    world.add(nodes);

    const P_N = Math.min(90, pairs.length);
    const pulsePos = new Float32Array(P_N * 3);
    const pulseT: number[] = [];
    const pulseSeg: number[] = [];
    for (let p = 0; p < P_N; p++) {
      pulseT.push(rnd(p, 20));
      pulseSeg.push(Math.floor(rnd(p, 21) * pairs.length));
    }
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulses = new THREE.Points(
      pulseGeo,
      new THREE.PointsMaterial({
        size: 0.28,
        map: glowTex,
        color: 0xfff3d6,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    world.add(pulses);

    const S = 900;
    const star = new Float32Array(S * 3);
    for (let i = 0; i < S; i++) {
      const d = 25 + rnd(i, 30) * 40;
      const a = rnd(i, 31) * Math.PI * 2;
      const b = Math.acos(2 * rnd(i, 32) - 1);
      star[i * 3] = d * Math.sin(b) * Math.cos(a);
      star[i * 3 + 1] = d * Math.cos(b);
      star[i * 3 + 2] = d * Math.sin(b) * Math.sin(a);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(star, 3));
    const starField = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({
        color: 0x8fa6e8,
        size: 0.08,
        transparent: true,
        opacity: 0.6,
      }),
    );
    scene.add(starField);

    const P = { form: 0, camZ: 15, camY: 0, spin: 0, lines: 0.5, glow: 0, offsetX: 4.4 };
    const HOLD = 3.6;
    const MOVE = 2.4;
    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "power2.inOut" },
      paused: calm,
    });
    tl.addLabel("s0", 0)
      .to(P, { form: 1, camZ: 21, spin: 1.2, lines: 0.8, duration: MOVE }, HOLD)
      .addLabel("s1")
      .to(
        P,
        { form: 2, camZ: 17, camY: 4, spin: 2.4, lines: 0.15, duration: MOVE },
        "+=" + HOLD,
      )
      .addLabel("s2")
      .to(
        P,
        {
          form: 3,
          camZ: 11,
          camY: 0.5,
          spin: 3.6,
          lines: 0,
          glow: 1,
          offsetX: 3.8,
          duration: MOVE,
        },
        "+=" + HOLD,
      )
      .addLabel("s3")
      .to(
        P,
        {
          form: 0,
          camZ: 15,
          camY: 0,
          spin: 6.28,
          lines: 0.5,
          glow: 0,
          offsetX: 4.4,
          duration: MOVE + 0.6,
          ease: "power3.inOut",
        },
        "+=" + HOLD,
      );
    tl.eventCallback("onRepeat", () => {
      P.spin = 0;
    });

    let narrow = false;
    function resize() {
      if (!canvas) return;
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      narrow = camera.aspect < 0.9;
      camera.fov = narrow ? 58 : 42;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", resize);
    resize();

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / innerWidth - 0.5;
      mouse.ty = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove);

    const dummy = new THREE.Object3D();
    const tmp = new THREE.Vector3();
    const cur: THREE.Vector3[] = new Array(N);
    for (let i = 0; i < N; i++) cur[i] = new THREE.Vector3();
    const smooth = (x: number) => x * x * (3 - 2 * x);
    const clock = new THREE.Clock();
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(section);

    let rafId = 0;
    function loop() {
      rafId = requestAnimationFrame(loop);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const f = Math.min(P.form, 2.999);
      const k = Math.floor(f);
      const w = smooth(f - k);
      for (let i = 0; i < N; i++) {
        const lag = Math.min(1, Math.max(0, w * 1.25 - (seeds[i] / 10) * 0.25));
        cur[i].copy(F[k][i]).lerp(F[k + 1][i], lag);
        const breathe = calm ? 0 : Math.sin(t * 1.2 + seeds[i]) * 0.06;
        tmp.copy(cur[i]).normalize();
        cur[i].addScaledVector(tmp, breathe);
        if (!calm && k >= 1 && k < 3) {
          const a = t * 0.05 * (1 + (i % 3) * 0.4) * (P.form > 1.5 ? 1 : 0);
          const cx = cur[i].x;
          const cz = cur[i].z;
          cur[i].x = cx * Math.cos(a) - cz * Math.sin(a);
          cur[i].z = cx * Math.sin(a) + cz * Math.cos(a);
        }
        dummy.position.copy(cur[i]);
        dummy.lookAt(tmp.copy(cur[i]).multiplyScalar(2));
        dummy.rotation.z += seeds[i] + (calm ? 0 : t * 0.15);
        const sc = 1 + P.glow * 0.25 + (calm ? 0 : Math.sin(t * 2 + seeds[i]) * 0.05);
        dummy.scale.setScalar(sc);
        dummy.updateMatrix();
        tiles.setMatrixAt(i, dummy.matrix);
      }
      tiles.instanceMatrix.needsUpdate = true;

      for (let j = 0; j < M; j++) {
        const v = cur[nodeIdx[j]];
        nodePos[j * 3] = v.x;
        nodePos[j * 3 + 1] = v.y;
        nodePos[j * 3 + 2] = v.z;
      }
      nodeGeo.attributes.position.needsUpdate = true;
      pairs.forEach(([a, b], j) => {
        const A = cur[a];
        const B = cur[b];
        linePos.set([A.x, A.y, A.z, B.x, B.y, B.z], j * 6);
      });
      lineGeo.attributes.position.needsUpdate = true;
      lineMat.opacity = P.lines * (calm ? 0.85 : 0.75 + Math.sin(t * 1.5) * 0.25);
      for (let p = 0; p < P_N; p++) {
        if (!calm) {
          pulseT[p] += 0.006 + (p % 5) * 0.0015;
          if (pulseT[p] > 1) {
            pulseT[p] = 0;
            pulseSeg[p] = Math.floor(Math.random() * pairs.length);
          }
        }
        const [a, b] = pairs[pulseSeg[p]];
        tmp.copy(cur[a]).lerp(cur[b], pulseT[p]);
        pulsePos[p * 3] = tmp.x;
        pulsePos[p * 3 + 1] = tmp.y;
        pulsePos[p * 3 + 2] = tmp.z;
      }
      pulseGeo.attributes.position.needsUpdate = true;
      pulses.material.opacity = Math.min(1, P.lines * 1.6);
      nodes.material.opacity = 0.4 + P.lines * 0.6;

      core.intensity = P.glow * 6;
      if (!calm) {
        mouse.x += (mouse.tx - mouse.x) * 0.05;
        mouse.y += (mouse.ty - mouse.y) * 0.05;
      }
      world.rotation.y = (calm ? 0 : t * 0.06) + P.spin + mouse.x * 0.4;
      world.rotation.x = 0.25 + mouse.y * 0.25;
      world.position.x = narrow ? 0 : P.offsetX;
      world.position.y = narrow ? 3.2 : 0;
      camera.position.set(mouse.x * 1.2, P.camY - mouse.y * 0.8, P.camZ);
      camera.lookAt(world.position.x * 0.12, world.position.y * 0.5, 0);

      renderer.render(scene, camera);
    }
    loop();
    setLive(true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      io.disconnect();
      tl.kill();
      gsap.killTweensOf(tl);
      tileGeo.dispose();
      tileMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      nodeGeo.dispose();
      pulseGeo.dispose();
      starGeo.dispose();
      glowTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-navy">
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(620px, 92vh, 900px)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 70% 45%, #154e9c 0%, #0b1d3a 70%)",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full transition-opacity duration-[1200ms] ease-out"
          style={{ opacity: live ? 1 : 0 }}
          aria-hidden="true"
        />
        <Image
          src="/hero-visual.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover transition-opacity duration-1000"
          style={{ opacity: live ? 0 : 0.5 }}
        />

        <div className="absolute inset-0 flex items-center">
          <Container className="relative z-[2]">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.6rem]">
                You do the real work.
                <br />
                We run your{" "}
                <span className="text-gold-300">marketing &amp; tech.</span>
              </h1>

              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Button href="/contact">
                  Book a Free Strategy Call
                  <ArrowRightIcon />
                </Button>
                <Button
                  href="/services"
                  variant="outline"
                  className="!border-white/30 !bg-white/5 !text-white hover:!border-gold-300 hover:!text-gold-300"
                >
                  See What We Do
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <a
          href="#pillars"
          aria-label="Scroll to what we do"
          className="absolute inset-x-0 bottom-6 z-[2] mx-auto flex h-9 w-9 animate-bounce items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-gold-300 hover:text-gold-300 motion-reduce:animate-none"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
