import NextImage from "next/image";
import Button from "./Button";
import NavTickerStrip from "./NavTickerStrip";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 overflow-hidden">
      <div className="relative px-3 pt-3 sm:px-4">
        <NavTickerStrip />
      </div>
      <div className="relative flex flex-col items-start gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-4 lg:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <NextImage
            src="/am-shield-mark.webp"
            alt="Ardy Media"
            width={480}
            height={435}
            className="h-20 w-auto shrink-0 sm:h-36 md:h-40 lg:h-44"
          />
          <span
            className="font-display text-base font-extrabold uppercase tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Ardy Media
          </span>
        </div>
        <Button
          href="/contact"
          className="shrink-0 !bg-[linear-gradient(180deg,_#1180f2_0%,_#0066d6_45%,_#0152bf_100%)] !px-5 !py-2.5"
        >
          Get a Quote
        </Button>
      </div>
    </header>
  );
}
