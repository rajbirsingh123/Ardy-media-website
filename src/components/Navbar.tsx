"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import Container from "./Container";
import { getBrandForPath, navLinks } from "@/lib/content";
import { MenuIcon, CloseIcon } from "./Icons";

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
        className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] backdrop-blur-2xl backdrop-saturate-150"
        style={{
          background: "rgba(255,255,255,0.45)",
          boxShadow:
            "0 1px 1px rgba(255,255,255,0.7) inset, 0 -1px 1px rgba(16,48,107,0.08) inset, 0 12px 30px -12px rgba(16,48,107,0.35)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/65 via-white/15 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60" />
        <div
          className="pointer-events-none absolute -top-10 left-6 h-16 w-2/3 rounded-full opacity-70 blur-xl"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.8), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="flex items-center justify-between py-3">
            <Logo wordmark={brand.name.toUpperCase()} />

            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-brand-700"
                      : "text-ink hover:text-brand-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" className="!px-5 !py-2.5">
                Get a Quote
              </Button>
            </nav>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/60 bg-white/50 text-navy backdrop-blur-md md:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {open && (
        <div
          className="relative mx-auto mt-2 w-full max-w-6xl overflow-hidden rounded-[28px] backdrop-blur-2xl backdrop-saturate-150 md:hidden"
          style={{
            background: "rgba(255,255,255,0.55)",
            boxShadow:
              "0 1px 1px rgba(255,255,255,0.7) inset, 0 12px 30px -12px rgba(16,48,107,0.35)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/60" />
          <Container className="relative flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
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
            <Button href="/contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
