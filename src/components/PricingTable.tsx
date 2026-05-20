import { motion } from "framer-motion";
import { Reveal, SectionLabel } from "./Reveal";
import { Sun, Landmark, Briefcase } from "lucide-react";

const rows = [
  { kw: "3 KW", units: "360 – 380", cost: "₹2,10,000", subsidy: "₹78,000", net: "₹1,32,000" },
  { kw: "4 KW", units: "480 – 550", cost: "₹2,80,000", subsidy: "₹78,000", net: "₹2,02,000" },
  { kw: "5 KW", units: "600 – 700", cost: "₹3,50,000", subsidy: "₹78,000", net: "₹2,72,000" },
];

const highlights = [
  { icon: Sun, title: "₹78,000 Subsidy", desc: "Central government PM Surya Ghar subsidy credited to your bank." },
  { icon: Landmark, title: "Bank Loan Facility", desc: "Easy bank loan partnerships — up to 90% finance available." },
  { icon: Briefcase, title: "Government Employees", desc: "Additional subsidy applicable for government employees." },
];

export function PricingTable() {
  return (
    <section id="pricing" className="relative py-32 md:py-44 px-6 bg-soft">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>No. 1 Rooftop Solar Company in Telangana</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Pay an EMI instead of your electricity bill.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-muted-foreground max-w-xl font-light">
            Transparent pricing after the ₹78,000 government subsidy. EMI starts from ₹1,355/month*.
          </p>
        </Reveal>

        {/* Pricing table */}
        <Reveal delay={0.2}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-border/60 glass shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-foreground text-background">
                  <tr className="text-[11px] uppercase tracking-[0.22em]">
                    <th className="px-6 py-5 font-medium">Solar Capacity</th>
                    <th className="px-6 py-5 font-medium">Monthly Units</th>
                    <th className="px-6 py-5 font-medium">Total Cost</th>
                    <th className="px-6 py-5 font-medium">Govt. Subsidy</th>
                    <th className="px-6 py-5 font-medium">Your Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={r.kw}
                      className={`border-t border-border/60 transition-colors hover:bg-foreground/[0.03] ${
                        i % 2 ? "bg-background/40" : ""
                      }`}
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-foreground text-background flex items-center justify-center">
                            <Sun className="w-4 h-4" strokeWidth={1.5} />
                          </div>
                          <span className="text-lg font-light tracking-tight">{r.kw}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-sm font-light text-muted-foreground">{r.units}</td>
                      <td className="px-6 py-6 text-sm font-light line-through opacity-60">{r.cost}</td>
                      <td className="px-6 py-6 text-sm font-medium text-olive">− {r.subsidy}</td>
                      <td className="px-6 py-6 text-xl font-light tracking-tight">{r.net}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-beige/40 text-center text-sm font-light">
              Government subsidy of <span className="font-medium">₹78,000</span> applies for systems from{" "}
              <span className="font-medium">3 KW to 10 KW</span>.
            </div>
          </div>
        </Reveal>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="h-full glass rounded-3xl p-7 border border-border/60 shadow-soft"
              >
                <div className="w-11 h-11 rounded-2xl bg-foreground text-background flex items-center justify-center">
                  <h.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight">{h.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">{h.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA strip */}
        <Reveal delay={0.2}>
          <div className="mt-12 rounded-3xl bg-foreground text-background p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] opacity-70">Up to 30 Years Warranty</div>
              <p className="mt-3 text-2xl md:text-3xl font-light tracking-tight max-w-xl">
                Is your monthly electricity bill too high? Talk to us today.
              </p>
              <p className="mt-2 text-sm opacity-70 font-light">
                EMI starts with ₹1,355/-* · *T&C Apply · For 5 KW System
              </p>
            </div>
            <a
              href="https://wa.me/918688584825?text=Hi%2C%20I%27d%20like%20a%20free%20quote%20for%20rooftop%20solar."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Free Quote on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
