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
    <header className="sticky top-0 z-50 border-b border-line/70 bg-mist-50/85 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between py-3.5">
          <Logo wordmark={brand.name.toUpperCase()} />

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-brand-700"
                    : "text-muted hover:text-brand-700"
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
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-white text-navy md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-semibold ${
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-navy hover:bg-mist-100"
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
