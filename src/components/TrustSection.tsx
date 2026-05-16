import { Reveal, SectionLabel } from "./Reveal";
import { ShieldCheck, BadgeCheck, Award, Building2, Leaf, Zap } from "lucide-react";
import { motion } from "framer-motion";

const trust = [
  {
    icon: ShieldCheck,
    stat: "25",
    unit: "Years",
    title: "Panel Performance Warranty",
    desc: "Tier-1 mono-PERC panels guaranteed to deliver 85%+ output through 2050.",
  },
  {
    icon: Zap,
    stat: "7",
    unit: "Years",
    title: "Inverter Replacement Cover",
    desc: "String & micro-inverters with on-site replacement — no shipping, no waiting.",
  },
  {
    icon: BadgeCheck,
    stat: "100%",
    unit: "Approved",
    title: "Govt. Empanelled Vendor",
    desc: "Registered installer for PM Surya Ghar — your subsidy is guaranteed eligible.",
  },
  {
    icon: Award,
    stat: "ISO",
    unit: "9001:2015",
    title: "Certified Installation Quality",
    desc: "Every install audited against international quality and safety standards.",
  },
  {
    icon: Building2,
    stat: "MNRE",
    unit: "Listed",
    title: "Ministry of New & Renewable Energy",
    desc: "Listed on the national rooftop solar portal — verified, traceable, accountable.",
  },
  {
    icon: Leaf,
    stat: "Tier-1",
    unit: "Only",
    title: "Premium Panels, No Compromise",
    desc: "Bloomberg Tier-1 manufacturers only — the same panels used in utility-scale plants.",
  },
];

export function TrustSection() {
  return (
    <section className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Trust & Warranty</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Premium hardware. Backed for decades.
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl font-light">
            Every component is certified, warrantied, and chosen to outlast the loan that paid for it.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full glass rounded-3xl p-7 md:p-8 shadow-soft hover:shadow-elegant transition-all border border-border/60 overflow-hidden"
              >
                <div
                  className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle, oklch(0.62 0.045 130 / 0.25), transparent 70%)" }}
                />

                <div className="relative flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[clamp(2.5rem,4.5vw,3.5rem)] leading-none font-extralight tracking-tight">
                      {t.stat}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      {t.unit}
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-foreground/[0.04] border border-border flex items-center justify-center flex-shrink-0">
                    <t.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="relative mt-6 h-px bg-border/70" />

                <h3 className="relative mt-6 text-base md:text-lg font-medium tracking-tight">{t.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground font-light leading-relaxed">{t.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
