"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "./Icons";

type Message = {
  from: "lead" | "bot";
  text: string;
};

const messages: Message[] = [
  { from: "lead", text: "Hi, I saw your ad — do you handle CRM automation for real estate teams?" },
  { from: "bot", text: "I can help with that. What's your name and the business you're calling about?" },
  { from: "lead", text: "Priya Shah, Shah Realty Group." },
  { from: "bot", text: "Got it, Priya. What's the biggest bottleneck right now — response time, follow-up, or booking?" },
  { from: "lead", text: "Follow-up mostly. Leads go cold fast." },
  { from: "bot", text: "Understood. I can get you on a strategy call — does Thursday at 2:00 PM work?" },
  { from: "lead", text: "Yes, that works." },
  { from: "bot", text: "Booked. Confirmation sent by email and text." },
];

export default function ConversationDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    if (calm) {
      timers.push(
        setTimeout(() => {
          setVisibleCount(messages.length);
          setShowCard(true);
        }, 0),
      );
      return () => timers.forEach(clearTimeout);
    }

    function runSequence() {
      let delay = 300;
      messages.forEach((_, i) => {
        timers.push(setTimeout(() => setShowTyping(true), delay - 250));
        timers.push(
          setTimeout(() => {
            setShowTyping(false);
            setVisibleCount(i + 1);
          }, delay),
        );
        delay += 1000;
      });
      timers.push(setTimeout(() => setShowCard(true), delay + 300));
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          runSequence();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-sm rounded-3xl border border-line bg-white p-4 shadow-lift"
    >
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="font-display text-sm font-bold text-navy">
          Ardy Sales — Live
        </span>
      </div>

      <div className="mt-3 flex min-h-[280px] flex-col gap-2.5 py-2">
        {messages.slice(0, visibleCount).map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
              m.from === "lead"
                ? "self-start rounded-bl-sm bg-mist-100 text-ink"
                : "self-end rounded-br-sm bg-gradient-to-br from-brand-600 to-brand-800 text-white"
            }`}
          >
            {m.text}
          </div>
        ))}
        {showTyping && (
          <div className="flex w-fit items-center gap-1 self-end rounded-2xl rounded-br-sm bg-brand-100 px-3.5 py-2.5">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700 [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700 [animation-delay:-0.1s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700" />
          </div>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          showCard ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-gold-500/30 bg-gold-300/10 p-3.5">
          <div className="flex items-center gap-2 text-sm font-bold text-navy">
            <CheckIcon className="h-4 w-4 text-gold-600" />
            Strategy call booked
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Priya Shah · Shah Realty Group · Thu 2:00 PM
          </p>
        </div>
      </div>
    </div>
  );
}
