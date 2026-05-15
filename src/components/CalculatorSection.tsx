import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";

const banks = ["SBI", "Canara", "Indian Bank", "Bank of India", "Union Bank"];

export function CalculatorSection() {
  const [bill, setBill] = useState(3500);
  const [roof, setRoof] = useState(400);
  const [type, setType] = useState("2 BHK");

  const calc = useMemo(() => {
    const capacity = Math.max(1, Math.min(10, Math.round(bill / 1100)));
    const cost = capacity * 65000;
    const subsidy = Math.min(78000, capacity * 30000);
    const net = cost - subsidy;
    const emi = Math.round((net * 0.012));
    const monthly = capacity * 1080;
    const roi = Math.max(3, Math.round(net / (monthly * 12)));
    return { capacity, cost, subsidy, net, emi, monthly, roi };
  }, [bill]);

  return (
    <section id="calculator" className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Finance & EMI</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Fast approvals. Low down payment. Clear numbers.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-2 glass rounded-3xl p-8 shadow-soft border border-border/60">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Your home</div>

            <div className="mt-8 space-y-8">
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-light">Monthly bill</label>
                  <span className="text-sm tracking-tight">₹{bill.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range" min={1000} max={12000} step={100} value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="mt-3 w-full accent-foreground"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-light">Roof size</label>
                  <span className="text-sm tracking-tight">{roof} sq ft</span>
                </div>
                <input
                  type="range" min={150} max={1500} step={10} value={roof}
                  onChange={(e) => setRoof(Number(e.target.value))}
                  className="mt-3 w-full accent-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-light">House type</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        type === t ? "bg-foreground text-background border-foreground" : "border-border hover:bg-foreground/[0.04]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4 md:gap-6">
            {[
              { k: "Solar capacity", v: `${calc.capacity} KW` },
              { k: "Subsidy", v: `₹${calc.subsidy.toLocaleString("en-IN")}` },
              { k: "Estimated EMI", v: `₹${calc.emi.toLocaleString("en-IN")}/mo` },
              { k: "Monthly savings", v: `₹${(calc.monthly).toLocaleString("en-IN")}` },
              { k: "Net investment", v: `₹${calc.net.toLocaleString("en-IN")}` },
              { k: "ROI timeline", v: `${calc.roi} yrs` },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-3xl p-6 md:p-8 shadow-soft border border-border/60"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{s.k}</div>
                <div className="mt-3 text-2xl md:text-3xl font-light tracking-tight">{s.v}</div>
              </motion.div>
            ))}
            <div className="col-span-2 flex flex-wrap items-center gap-x-8 gap-y-2 px-2 text-xs text-muted-foreground">
              <span>Loan partners:</span>
              {banks.map((b) => (
                <span key={b} className="tracking-tight">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
