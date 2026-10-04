"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Logo from "./Logo";
import { getBrandForPath, navLinks, pillarRoutes, services, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const brand = getBrandForPath(pathname);

  return (
    <footer className="relative overflow-hidden border-t border-white/5 text-white/80">
      <video
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        src="/videos/footer-sky.mp4"
        poster="/videos/footer-sky-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 520px at 50% 0%, rgba(10,23,48,0.5) 0%, rgba(3,8,18,0.62) 55%, rgba(0,1,3,0.75) 100%)",
        }}
      />

      <Container className="relative z-10 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo dark size={32} wordmark={brand.name.toUpperCase()} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {brand.tagline}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
            >
              Book a free strategy call →
            </Link>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/35">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={pillarRoutes[s.slug]}
                    className="text-white/70 transition-colors hover:text-gold-300"
                  >
                    {s.pillar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/35">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 transition-colors hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/35">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/70 transition-colors hover:text-gold-300"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Ardy Media. All rights reserved.</span>
          <span>{brand.name} — {brand.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
