"use client";

import { useMemo, useState } from "react";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-white/70">{label}</span>
        <span className="font-display font-bold text-gold-300">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-gold-500"
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [budget, setBudget] = useState(5000);
  const [cpl, setCpl] = useState(25);
  const [closeRate, setCloseRate] = useState(15);
  const [dealSize, setDealSize] = useState(2500);

  const { leads, customers, revenue, roas, profit } = useMemo(() => {
    const leads = budget / cpl;
    const customers = leads * (closeRate / 100);
    const revenue = customers * dealSize;
    const roas = budget > 0 ? revenue / budget : 0;
    const profit = revenue - budget;
    return { leads, customers, revenue, roas, profit };
  }, [budget, cpl, closeRate, dealSize]);

  return (
    <div className="grid gap-8 rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 lg:grid-cols-2 lg:p-10">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Your inputs</h3>
        <div className="mt-6 space-y-7">
          <Slider
            label="Monthly ad budget"
            value={budget}
            min={1000}
            max={20000}
            step={500}
            format={(n) => formatCurrency(n)}
            onChange={setBudget}
          />
          <Slider
            label="Cost per lead"
            value={cpl}
            min={5}
            max={100}
            step={1}
            format={(n) => formatCurrency(n)}
            onChange={setCpl}
          />
          <Slider
            label="Lead-to-customer rate"
            value={closeRate}
            min={2}
            max={40}
            step={1}
            format={(n) => `${n}%`}
            onChange={setCloseRate}
          />
          <Slider
            label="Average deal size"
            value={dealSize}
            min={200}
            max={10000}
            step={100}
            format={(n) => formatCurrency(n)}
            onChange={setDealSize}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[#050b18] p-7">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">
            Estimated return on ad spend
          </h3>
          <div className="mt-2 font-display text-4xl font-extrabold text-gold-300 sm:text-5xl">
            {roas.toFixed(1)}x
          </div>
          <p className="mt-1 text-sm text-white/50">
            {formatCurrency(Math.round(revenue))} projected revenue
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
          <div>
            <div className="font-display text-xl font-bold text-white">
              {Math.round(leads)}
            </div>
            <div className="mt-1 text-xs text-white/50">Leads / month</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-white">
              {Math.round(customers)}
            </div>
            <div className="mt-1 text-xs text-white/50">New customers</div>
          </div>
          <div>
            <div className="font-display text-xl font-bold text-white">
              {formatCurrency(Math.round(profit))}
            </div>
            <div className="mt-1 text-xs text-white/50">Est. profit</div>
          </div>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-white/40 lg:col-span-2">
        Estimates for illustration only — actual results depend on your market, offer and
        creative. Book a call for a tailored projection.
      </p>
    </div>
  );
}
