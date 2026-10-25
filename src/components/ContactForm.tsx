"use client";

import { useState, type FormEvent } from "react";
import { services, site } from "@/lib/content";
import { CheckIcon } from "./Icons";

const whatsappDigits = site.phone.replace(/\D/g, "");

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const service = data.get("service") as string;
    const message = data.get("message") as string;

    const lines = [
      "New inquiry from the Ardy Media website:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Interested in: ${service}`,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/1${whatsappDigits}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/5 p-10 text-center ring-1 ring-white/10">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white/5 text-gold-300 ring-1 ring-white/10">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl font-bold text-white">Thanks — got it.</h3>
        <p className="max-w-sm text-sm leading-relaxed text-white/65">
          We&apos;ve opened WhatsApp with your details ready to send — just hit send over
          there and we&apos;ll get back to you directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="cursor-pointer text-sm font-semibold text-gold-300 hover:text-gold-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone number" name="phone" type="tel" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white" htmlFor="service">
            Interested in
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-colors focus:bg-white/10 focus:ring-gold-300/50 [&>option]:bg-[#060b18]"
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.pillar}>
                {s.pillar}
              </option>
            ))}
            <option value="Everything">Everything — full package</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-white" htmlFor="message">
          Tell us about your business and goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="resize-none rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-colors placeholder:text-white/35 focus:bg-white/10 focus:ring-gold-300/50"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-white" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-xl bg-white/5 px-4 py-3 text-sm text-white outline-none ring-1 ring-white/10 transition-colors placeholder:text-white/35 focus:bg-white/10 focus:ring-gold-300/50"
      />
    </div>
  );
}
