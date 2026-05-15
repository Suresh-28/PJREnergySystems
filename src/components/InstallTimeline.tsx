import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionLabel } from "./Reveal";

const steps = [
  { t: "Consultation", d: "Free remote assessment of your bill & roof." },
  { t: "Site Survey", d: "On-site shading & structural analysis." },
  { t: "Installation", d: "1–3 day clean install by certified crew." },
  { t: "Net Metering", d: "Bi-directional meter setup with DISCOM." },
  { t: "Testing", d: "Performance verification & monitoring setup." },
  { t: "Subsidy Support", d: "Direct credit to your bank in 30 days." },
];

export function InstallTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-soft" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6">
        <div className="max-w-7xl mx-auto w-full">
          <Reveal><SectionLabel>Installation Process</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
              A quiet, considered install — start to finish.
            </h2>
          </Reveal>

          <div className="mt-12 relative h-1 w-full max-w-md bg-border rounded-full overflow-hidden">
            <motion.div style={{ width: progress }} className="absolute inset-y-0 left-0 bg-foreground" />
          </div>
        </div>

        <div className="mt-16 w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-[10vw]">
            {steps.map((s, i) => (
              <div
                key={s.t}
                className="w-[78vw] sm:w-[50vw] md:w-[34vw] lg:w-[26vw] flex-shrink-0 glass rounded-3xl p-8 shadow-soft border border-border/60"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-2xl font-light tracking-tight">{s.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground font-light">{s.d}</p>
                <div className="mt-10 h-px bg-border" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
