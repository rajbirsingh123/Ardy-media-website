import Image from "next/image";
import Link from "next/link";

export default function Logo({
  size = 38,
  showWordmark = true,
  dark = false,
  wordmark = "ARDY MEDIA",
}: {
  size?: number;
  showWordmark?: boolean;
  dark?: boolean;
  wordmark?: string;
}) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <Image
        src="/logo-mark.png"
        alt={`${wordmark} logo`}
        width={size}
        height={Math.round(size * 1.17)}
        priority
        className="transition-transform duration-300 group-hover:scale-105"
      />
      {showWordmark && (
        <span
          className={`font-display text-lg font-extrabold tracking-tight ${
            dark ? "text-white" : "text-navy"
          }`}
        >
          {wordmark}
        </span>
      )}
    </Link>
  );
}
