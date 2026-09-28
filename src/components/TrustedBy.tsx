import Image from "next/image";
import { trustedCompanies } from "@/lib/content";

export default function TrustedBy({ dark = false }: { dark?: boolean }) {
  return (
    <div>
      <p
        className={`text-center text-xs font-bold uppercase tracking-wider ${
          dark ? "text-white/40" : "text-muted"
        }`}
      >
        Trusted by companies we&apos;ve built for
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {trustedCompanies.map((company) => {
          const content = company.logo ? (
            <Image
              src={company.logo.src}
              alt={company.name}
              width={company.logo.width}
              height={company.logo.height}
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <span
              className={`font-display text-lg font-extrabold tracking-tight transition-colors ${
                dark
                  ? "text-gold-300 hover:text-gold-500"
                  : "text-brand-700 hover:text-brand-800"
              }`}
            >
              {company.name}
            </span>
          );
          return company.url ? (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={company.name}
            >
              {content}
            </a>
          ) : (
            <span key={company.name} aria-label={company.name}>
              {content}
            </span>
          );
        })}
      </div>
    </div>
  );
}
