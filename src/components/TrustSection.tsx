import { Reveal, SectionLabel } from "./Reveal";
import { ShieldCheck, BadgeCheck, Award, Building2, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const trust = [
  { icon: ShieldCheck, title: "25 Year Panel Warranty" },
  { icon: ShieldCheck, title: "7 Year Inverter Warranty" },
  { icon: BadgeCheck, title: "Govt Approved Vendor" },
  { icon: Award, title: "ISO 9001 Certified" },
  { icon: Building2, title: "MNRE Empanelled" },
  { icon: Leaf, title: "Tier-1 Panels Only" },
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
        </Reveal>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {trust.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-3xl p-6 md:p-8 shadow-soft border border-border/60 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-foreground/[0.04] flex items-center justify-center flex-shrink-0">
                  <t.icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="text-sm md:text-base font-light tracking-tight">{t.title}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
