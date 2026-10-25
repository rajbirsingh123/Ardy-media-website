"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { WhatsAppIcon, CloseIcon } from "./Icons";

const whatsappDigits = site.phone.replace(/\D/g, "");
const whatsappHref = `https://wa.me/1${whatsappDigits}?text=${encodeURIComponent(
  "Hi Ardy Media! I'd like to talk about growing my business."
)}`;

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-line bg-white shadow-lift animate-fade-up sm:w-80">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3.5">
            <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-white/20">
              <WhatsAppIcon className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">Ardy Media</p>
              <p className="text-xs text-white/80">Typically replies within minutes</p>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="ml-auto cursor-pointer rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-mist-50 px-4 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm leading-relaxed text-ink shadow-soft">
              👋 Hi there! Ask us anything about paid social, websites, CRM or automation &mdash; a real person from Ardy Media is on the other end.
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      )}

      <button
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        onClick={() => setOpen((v) => !v)}
        className="group relative grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-200 hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60" />
        )}
        <span className="relative">
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <WhatsAppIcon className="h-7 w-7" />
          )}
        </span>
      </button>
    </div>
  );
}
