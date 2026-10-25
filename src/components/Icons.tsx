import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties };

const base = "w-6 h-6";

export function MegaphoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 11v2a2 2 0 0 0 2 2h1l1.2 5.2a1 1 0 0 0 1 .8H10a1 1 0 0 0 1-1.2L9.9 15H11l8 4V5l-8 4H5a2 2 0 0 0-2 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M19 9.5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CodeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 8 4.5 12 9 16M15 8l4.5 4-4.5 4M13.5 5 10.5 19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BotIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="8" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8V4m0 0h2m-2 0H10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="14" r="1.4" fill="currentColor" />
      <circle cx="15" cy="14" r="1.4" fill="currentColor" />
      <path d="M9 17.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2 13h2m18 0h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CompassIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m14.5 9.5-2 5-3-2 2-5 3 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MenuIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function LinkedInIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.75h3.48V21H3.4V8.75Zm6.06 0h3.34v1.68h.05c.47-.87 1.6-1.79 3.3-1.79 3.53 0 4.18 2.28 4.18 5.24V21h-3.48v-5.5c0-1.31-.02-3-1.85-3-1.85 0-2.14 1.42-2.14 2.9V21H9.46V8.75Z" />
    </svg>
  );
}

export function InstagramIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.02 2C6.5 2 2.04 6.46 2.04 11.98c0 1.99.53 3.86 1.54 5.5L2 22l4.67-1.53a9.96 9.96 0 0 0 5.35 1.54h.01c5.52 0 9.98-4.46 9.98-9.98C21.99 6.46 17.53 2 12.02 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-2.78.91.93-2.7-.2-.28a8.17 8.17 0 0 1-1.26-4.37c0-4.53 3.68-8.21 8.21-8.21 4.52 0 8.2 3.68 8.2 8.21 0 4.53-3.68 8.2-8.2 8.2Zm4.52-6.15c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.17.24-.63.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export function CloseIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export const iconMap = {
  megaphone: MegaphoneIcon,
  code: CodeIcon,
  bot: BotIcon,
  compass: CompassIcon,
};
