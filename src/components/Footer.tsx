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
    <footer className="mt-24 border-t border-line bg-navy text-white/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo dark size={40} wordmark={brand.name.toUpperCase()} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {brand.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={pillarRoutes[s.slug]}
                    className="transition-colors hover:text-gold-300"
                  >
                    {s.pillar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-300">
                  {site.email}
                </a>
              </li>
              <li className="text-white/60">{site.phone}</li>
              <li className="text-white/60">{site.location}</li>
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
