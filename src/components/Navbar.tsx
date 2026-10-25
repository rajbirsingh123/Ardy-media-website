"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";
import Button from "./Button";
import Container from "./Container";
import { getBrandForPath, navLinks } from "@/lib/content";
import { MenuIcon, CloseIcon } from "./Icons";

const pillarHrefs = ["/media", "/digital", "/sales"];
const restLinks = navLinks.filter((link) => !pillarHrefs.includes(link.href));

const pillarShapes: {
  href: string;
  label: string;
  src: string;
  width: number;
  height: number;
  marginClass: string;
}[] = [
  { href: "/media", label: "Media", src: "/pillar-media.png", width: 706, height: 372, marginClass: "" },
  { href: "/digital", label: "Digital", src: "/pillar-digital.png", width: 819, height: 371, marginClass: "-ml-1.5" },
  { href: "/sales", label: "Sales", src: "/pillar-sales.png", width: 843, height: 371, marginClass: "-ml-1.5" },
];

function PillarNavImage({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % pillarShapes.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  const focused = hovered ?? active;

  return (
    <div className={`flex items-end ${className}`}>
      {pillarShapes.map((shape, i) => (
        <Link
          key={shape.href}
          href={shape.href}
          aria-label={shape.label}
          className={`relative block h-full ${shape.marginClass}`}
          style={{ zIndex: hovered === i ? 10 : 1 }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
        >
          <Image
            src={shape.src}
            alt={shape.label}
            width={shape.width}
            height={shape.height}
            priority
            draggable={false}
            className="h-full w-auto select-none transition-all duration-300 ease-out"
            style={{
              transform:
                hovered === i
                  ? "translateY(-3px) scale(1.06)"
                  : "translateY(0) scale(1)",
              filter:
                focused === i
                  ? "drop-shadow(0 8px 16px rgba(16,48,107,0.5)) brightness(1.08)"
                  : "drop-shadow(0 4px 10px rgba(16,48,107,0.3))",
            }}
          />
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const brand = getBrandForPath(pathname);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px]"
        style={{
          background: "rgba(255,255,255,0.03)",
          boxShadow:
            "0 1px 1px rgba(255,255,255,0.35) inset, 0 -1px 1px rgba(16,48,107,0.04) inset, 0 12px 30px -12px rgba(16,48,107,0.25)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/8 via-white/2 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15" />
        <div
          className="pointer-events-none absolute -top-10 left-6 h-16 w-2/3 rounded-full opacity-70 blur-xl"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="flex items-center justify-between py-3">
            <Logo wordmark={brand.name.toUpperCase()} dark />

            <nav className="hidden items-center gap-6 md:flex">
              <PillarNavImage className="h-10" />

              <div className="flex items-center gap-6">
                {restLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-bold transition-colors ${
                      pathname === link.href
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                    }`}
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Button
                href="/contact"
                className="!bg-[linear-gradient(180deg,_#1180f2_0%,_#0066d6_45%,_#0152bf_100%)] !px-5 !py-2.5"
              >
                Get a Quote
              </Button>
            </nav>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/60 bg-white/50 text-navy md:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {open && (
        <div
          className="relative mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-[28px] md:hidden"
          style={{
            background: "rgba(255,255,255,0.55)",
            boxShadow:
              "0 1px 1px rgba(255,255,255,0.7) inset, 0 12px 30px -12px rgba(16,48,107,0.35)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60" />
          <Container className="relative flex flex-col gap-1 py-4">
            <div className="flex justify-center py-3" onClick={() => setOpen(false)}>
              <PillarNavImage className="h-16" />
            </div>
            <div className="my-1 border-t border-line/70" />
            {restLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-base font-semibold ${
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink hover:bg-white/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              className="!bg-[linear-gradient(180deg,_#1180f2_0%,_#0066d6_45%,_#0152bf_100%)] mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
