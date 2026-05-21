import { motion } from "framer-motion";
import { Coins, Banknote, CalendarClock, ShieldCheck, Gauge, Wrench, ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./Reveal";

const offers = [
  {
    icon: Coins,
    stat: "₹78,000",
    statLabel: "Direct Subsidy",
    title: "PM Surya Ghar Yojana",
    desc: "Government subsidy credited straight to your bank account after installation — no middlemen, no waiting games.",
    highlight: "Credit in 30 days",
  },
  {
    icon: Banknote,
    stat: "90%",
    statLabel: "Loan Coverage",
    title: "Finance Made Simple",
    desc: "Pay just 10% upfront. We arrange the rest through partner banks at the lowest interest rates available.",
    highlight: "From 7% interest",
  },
  {
    icon: CalendarClock,
    stat: "₹2,400",
    statLabel: "Per Month EMI",
    title: "Lower Than Your Bill",
    desc: "Monthly EMI is often less than your current electricity bill. Pay for solar, not for power you don't own.",
    highlight: "Zero down payment",
  },
  {
    icon: ShieldCheck,
    stat: "5 Yrs",
    statLabel: "Performance Warranty",
    title: "Built to Outlast",
    desc: "Tier-1 panels guaranteed to deliver 85% output even after 25 years of Indian sun, rain, and storms.",
    highlight: "Replacement covered",
  },
  {
    icon: Gauge,
    stat: "1:1",
    statLabel: "Net Metering",
    title: "Sell Back to the Grid",
    desc: "Excess units flow back to the grid and your meter runs in reverse. The grid becomes your free battery.",
    highlight: "Credit on every unit",
  },
  {
    icon: Wrench,
    stat: "End-to-End",
    statLabel: "Done For You",
    title: "Zero Paperwork Hassle",
    desc: "Site survey, DISCOM approvals, subsidy filing, installation, commissioning — we handle every single step.",
    highlight: "7 day installation",
  },
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
            Government-supported rooftop solar with subsidy, EMI, and decades of savings — engineered around how Indian homes actually live.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {offers.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full glass rounded-3xl p-7 md:p-8 shadow-soft hover:shadow-elegant transition-all border border-border/60 overflow-hidden"
              >
                <div
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "radial-gradient(circle, oklch(0.83 0.04 80 / 0.35), transparent 70%)" }}
                />
                <div className="relative flex items-start justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-foreground text-background flex items-center justify-center">
                    <o.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.5} />
                </div>

                <div className="relative mt-8">
                  <div className="text-[clamp(2.25rem,4vw,3rem)] leading-none font-extralight tracking-tight">
                    {o.stat}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {o.statLabel}
                  </div>
                </div>

                <div className="relative mt-6 h-px bg-border/70" />

                <h3 className="relative mt-6 text-lg font-medium tracking-tight">{o.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground font-light leading-relaxed">{o.desc}</p>

                <div className="relative mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-olive">
                  <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  {o.highlight}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
