import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-rooftop.jpg";

const badges = [
  { label: "₹78,000 Subsidy", x: "-32%", y: "-30%", delay: 0.2 },
  { label: "EMI Available", x: "30%", y: "-38%", delay: 0.35 },
  { label: "25 Year Warranty", x: "34%", y: "20%", delay: 0.5 },
  { label: "Net Metering Enabled", x: "-36%", y: "12%", delay: 0.65 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-[110vh] overflow-hidden gradient-sky">
      {/* Background sky + sun glow */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full"
             style={{ background: "radial-gradient(circle, oklch(0.94 0.06 75 / 0.6) 0%, transparent 60%)" }} />
        <div className="absolute top-[20%] left-[-15%] w-[50vw] h-[50vw] rounded-full"
             style={{ background: "radial-gradient(circle, oklch(0.97 0.02 240 / 0.5) 0%, transparent 70%)" }} />
        {/* floating particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-foreground/20"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Mid layer: rooftop image */}
      <motion.div
        style={{ y: yMid, scale }}
        className="absolute inset-x-0 bottom-0 h-[70%] z-10"
      >
        <div className="relative w-full h-full">
          <img
            src={heroImg}
            alt="Modern home with rooftop solar panels"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      </motion.div>

      {/* Foreground: copy */}
      <motion.div
        style={{ y: yFg, opacity }}
        className="relative z-20 max-w-6xl mx-auto px-6 pt-40 md:pt-48 text-center"
      >
        <motion.span
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-[11px] uppercase tracking-[0.22em] text-muted-foreground border border-border rounded-full px-4 py-1.5 glass"
        >
          PM Surya Ghar Yojana · Subsidy Approved
        </motion.span>
        <motion.h1
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] font-light tracking-[-0.04em] text-balance"
        >
          Karo Bill <span className="italic font-extralight text-olive">Zero</span>
        </motion.h1>
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.9 }}
          className="mt-6 max-w-xl mx-auto text-base md:text-lg text-muted-foreground font-light"
        >
          Smart rooftop solar systems designed for modern homes.
        </motion.p>
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href="#contact" className="group inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
            Get Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </a>
          <a href="#calculator" className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 text-sm font-medium hover:bg-white/80 transition-all">
            <Calculator className="w-4 h-4" strokeWidth={1.5} />
            Calculate Savings
          </a>
        </motion.div>
      </motion.div>

      {/* Floating offer badges */}
      <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: b.delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2"
              style={{ transform: `translate(calc(-50% + ${b.x}), calc(-50% + ${b.y}))` }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="glass shadow-float rounded-full px-4 py-2 text-xs font-medium tracking-tight"
              >
                {b.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
