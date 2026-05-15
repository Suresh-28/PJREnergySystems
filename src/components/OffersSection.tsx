import { motion } from "framer-motion";
import { Coins, Banknote, CalendarClock, ShieldCheck, Gauge, Wrench } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const offers = [
  { icon: Coins, title: "₹78,000 Subsidy", desc: "PM Surya Ghar credit direct to your bank." },
  { icon: Banknote, title: "90% Loan Coverage", desc: "Finance up to 90% of total system cost." },
  { icon: CalendarClock, title: "EMI Available", desc: "Flexible monthly plans, low entry." },
  { icon: ShieldCheck, title: "25 Year Warranty", desc: "Industry-leading panel performance." },
  { icon: Gauge, title: "Net Metering", desc: "Sell excess power back to the grid." },
  { icon: Wrench, title: "Installation Support", desc: "End-to-end approvals & paperwork." },
];

export function OffersSection() {
  return (
    <section id="benefits" className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal className="max-w-3xl">
          <SectionLabel>Designed for Decades</SectionLabel>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight text-balance">
            Designed to reduce electricity bills for decades.
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl font-light">
            Government-supported rooftop solar systems with subsidy, EMI support, and long-term savings — built around how you actually live.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full glass rounded-3xl p-7 md:p-8 shadow-soft hover:shadow-elegant transition-shadow border border-border/60"
              >
                <div className="w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center">
                  <o.icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-light tracking-tight">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">{o.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
