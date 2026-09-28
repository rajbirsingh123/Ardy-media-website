"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";
import { CheckIcon } from "./Icons";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-white p-10 text-center shadow-soft">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-700">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h3 className="font-display text-xl font-bold text-navy">Thanks — got it.</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Your message has been noted. This is a demo form with no backend connected —
          hook it up to your CRM or an email service to start receiving real submissions.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="cursor-pointer text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email address" name="email" type="email" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone number" name="phone" type="tel" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-navy" htmlFor="service">
            Interested in
          </label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="rounded-xl border border-line bg-mist-50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
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
        <label className="text-sm font-semibold text-navy" htmlFor="message">
          Tell us about your business and goals
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="resize-none rounded-xl border border-line bg-mist-50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5"
      >
        Send Message
      </button>
      <p className="text-center text-xs text-muted">
        This is a demo form (no backend connected yet) — hook it up to your CRM or an
        email service when you&apos;re ready to go live.
      </p>
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
      <label className="text-sm font-semibold text-navy" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-line bg-mist-50 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-500 focus:bg-white"
      />
    </div>
  );
}
