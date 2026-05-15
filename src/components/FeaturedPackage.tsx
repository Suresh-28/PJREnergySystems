import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, duration = 1.6, prefix = "", suffix = "" }: { to: number; duration?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

export function FeaturedPackage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const yStat1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yStat2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="relative py-32 md:py-44 px-6 bg-soft overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          style={{ scale }}
          className="relative glass rounded-[2.5rem] p-8 md:p-16 shadow-elegant border border-border/60"
        >
          <div className="absolute -inset-4 -z-10 rounded-[3rem] blur-3xl opacity-50"
               style={{ background: "radial-gradient(circle at 30% 30%, oklch(0.83 0.04 80 / 0.4), transparent 60%)" }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Featured Package</span>
              <h3 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] font-light tracking-tight">
                3KW Government<br />Subsidy Package
              </h3>
              <p className="mt-5 text-muted-foreground font-light text-base max-w-md">
                Suitable for 2–3 BHK homes. Engineered for reliable generation and effortless approvals.
              </p>

              <ul className="mt-10 space-y-3 text-sm">
                {[
                  ["System Capacity", "3 KW"],
                  ["Monthly Generation", "405 Units"],
                  ["Monthly Savings", "₹3,240"],
                  ["Subsidy", "₹78,000"],
                  ["EMI Support", "Yes"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between border-b border-border/60 pb-3">
                    <span className="text-muted-foreground font-light">{k}</span>
                    <span className="font-medium tracking-tight">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating stats + line graph */}
            <div className="relative h-[380px] md:h-[460px]">
              <motion.div style={{ y: yStat1 }} className="absolute top-0 right-0 glass rounded-2xl p-5 shadow-float w-44">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Monthly</div>
                <div className="mt-1 text-2xl font-light tracking-tight">
                  <Counter to={405} suffix=" kWh" />
                </div>
              </motion.div>
              <motion.div style={{ y: yStat2 }} className="absolute bottom-8 left-0 glass rounded-2xl p-5 shadow-float w-48">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Savings / mo</div>
                <div className="mt-1 text-2xl font-light tracking-tight">
                  <Counter to={3240} prefix="₹" />
                </div>
              </motion.div>

              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
                <svg viewBox="0 0 400 160" className="w-full">
                  <defs>
                    <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.045 130)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="oklch(0.62 0.045 130)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    d="M0,120 C60,90 90,110 140,80 C190,50 230,70 280,40 C330,15 370,25 400,10"
                    fill="none"
                    stroke="oklch(0.62 0.045 130)"
                    strokeWidth="1.5"
                  />
                  <motion.path
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1, duration: 1 }}
                    d="M0,120 C60,90 90,110 140,80 C190,50 230,70 280,40 C330,15 370,25 400,10 L400,160 L0,160 Z"
                    fill="url(#lg)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
