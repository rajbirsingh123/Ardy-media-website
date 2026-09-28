import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-gradient-to-r from-brand-600 to-brand-800 text-white shadow-soft hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-line bg-white/70 text-navy hover:border-brand-500 hover:text-brand-700 hover:-translate-y-0.5",
  ghost: "text-brand-700 hover:text-brand-800",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
