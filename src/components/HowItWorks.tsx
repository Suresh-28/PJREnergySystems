import { Sun, Square, Zap, Home, Network } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";
import { motion } from "framer-motion";

const flow = [
  { icon: Sun, label: "Sun" },
  { icon: Square, label: "Panel" },
  { icon: Zap, label: "Inverter" },
  { icon: Home, label: "Home" },
  { icon: Network, label: "Grid" },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 md:py-44 px-6 bg-soft">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>How it works</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            From sunlight to savings, in five quiet steps.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 relative">
            <div className="grid grid-cols-5 gap-3 md:gap-8 items-center">
              {flow.map((f, i) => (
                <div key={f.label} className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full glass shadow-soft flex items-center justify-center"
                  >
                    <f.icon className="w-5 h-5 md:w-7 md:h-7 text-foreground" strokeWidth={1.25} />
                  </motion.div>
                  <span className="mt-3 text-xs md:text-sm font-light tracking-tight">{f.label}</span>
                  {i < flow.length - 1 && (
                    <div className="hidden md:block absolute top-10 h-px bg-border" style={{
                      left: `calc(${(i + 1) * 20 - 10}% + 2.5rem)`,
                      width: `calc(20% - 5rem)`,
                    }} />
                  )}
                </div>
              ))}
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 100 20" preserveAspectRatio="none">
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                d="M5,10 Q25,4 45,10 T95,10"
                fill="none"
                stroke="oklch(0.62 0.045 130)"
                strokeWidth="0.15"
                strokeDasharray="0.5 0.6"
              />
            </svg>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            ["Excess Power Export", "Send unused solar units to the grid in real time."],
            ["Grid Credits", "Each exported unit becomes a credit on your bill."],
            ["Lower Bills", "Net consumption settled monthly — often near zero."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="glass rounded-3xl p-7 shadow-soft border border-border/60 h-full">
                <h4 className="text-lg font-light tracking-tight">{t}</h4>
                <p className="mt-2 text-sm text-muted-foreground font-light">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
