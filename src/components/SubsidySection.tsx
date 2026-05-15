import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel } from "./Reveal";

const steps = [
  { n: "01", t: "Site Survey", d: "Roof inspection & shading analysis." },
  { n: "02", t: "Installation", d: "Premium panels & inverter setup." },
  { n: "03", t: "Net Metering", d: "Bi-directional meter installation." },
  { n: "04", t: "Inspection", d: "DISCOM site verification." },
  { n: "05", t: "Subsidy Credited", d: "Direct bank transfer in 30 days." },
];

export function SubsidySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBlur1 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const yBlur2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 px-6 overflow-hidden gradient-warm">
      <motion.div
        style={{ y: yBlur1, background: "radial-gradient(circle, oklch(0.83 0.04 80 / 0.5), transparent 60%)" }}
        className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-50"
      />
      <motion.div
        style={{ y: yBlur2, background: "radial-gradient(circle, oklch(0.62 0.045 130 / 0.3), transparent 60%)" }}
        className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-40"
      />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <SectionLabel>Government Subsidy</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            PM Surya Ghar Yojana, simplified.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-muted-foreground max-w-xl font-light">
            Subsidy credited directly to your bank account. Registration & paperwork support included from day one.
          </p>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2" />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className={i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Step {s.n}</div>
                    <h3 className="mt-2 text-2xl font-light tracking-tight">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light">{s.d}</p>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-6 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground ring-4 ring-background" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
