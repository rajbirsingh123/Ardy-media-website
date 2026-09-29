"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./Icons";

export default function FaqAccordion({
  items,
  dark = false,
}: {
  items: { question: string; answer: string }[];
  dark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className={`mx-auto max-w-3xl rounded-2xl ${
        dark
          ? "divide-y divide-white/10 bg-white/5 ring-1 ring-white/10"
          : "divide-y divide-line border border-line bg-white shadow-soft"
      }`}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className={`font-semibold ${dark ? "text-white" : "text-navy"}`}>
                {item.question}
              </span>
              <ChevronDownIcon
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                  dark ? "text-gold-300" : "text-brand-600"
                } ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 pb-5 text-sm leading-relaxed ${
                    dark ? "text-white/70" : "text-muted"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
