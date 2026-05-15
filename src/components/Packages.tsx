import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { Check } from "lucide-react";

const packs = [
  { kw: "3KW", home: "2–3 BHK", gen: "405 units/mo", subsidy: "₹78,000", emi: "From ₹2,400", warranty: "25 yrs" },
  { kw: "5KW", home: "3–4 BHK", gen: "675 units/mo", subsidy: "₹78,000", emi: "From ₹3,800", warranty: "25 yrs", featured: true },
  { kw: "8KW", home: "4 BHK / Villa", gen: "1080 units/mo", subsidy: "₹78,000", emi: "From ₹6,200", warranty: "25 yrs" },
  { kw: "10KW", home: "Large Villa", gen: "1350 units/mo", subsidy: "₹78,000", emi: "From ₹7,800", warranty: "25 yrs" },
];

export function Packages() {
  return (
    <section id="packages" className="relative py-32 md:py-44 px-6 bg-soft">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Compare Packages</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Sized for your home. Priced with subsidy.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packs.map((p, i) => (
            <Reveal key={p.kw} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className={`relative h-full rounded-3xl p-7 border transition-shadow ${
                  p.featured
                    ? "bg-foreground text-background border-foreground shadow-elegant"
                    : "glass border-border/60 shadow-soft hover:shadow-float"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 text-[10px] uppercase tracking-[0.22em] bg-beige text-foreground rounded-full px-3 py-1">
                    Most Popular
                  </span>
                )}
                <div className="text-[11px] uppercase tracking-[0.22em] opacity-70">{p.home}</div>
                <div className="mt-3 text-5xl font-extralight tracking-tight">{p.kw}</div>
                <div className="mt-1 text-sm opacity-70 font-light">Rooftop System</div>

                <ul className="mt-8 space-y-3 text-sm">
                  {[
                    ["Generation", p.gen],
                    ["Subsidy", p.subsidy],
                    ["EMI", p.emi],
                    ["Warranty", p.warranty],
                  ].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between gap-4">
                      <span className="opacity-60 font-light flex items-center gap-2">
                        <Check className="w-3.5 h-3.5" strokeWidth={2} /> {k}
                      </span>
                      <span className="font-medium tracking-tight">{v}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-opacity ${
                    p.featured ? "bg-background text-foreground hover:opacity-90" : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  Get a Quote
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
