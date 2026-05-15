import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calculator, MessageCircle, Phone, MapPin } from "lucide-react";

const CONTACT_PHONE = "8688584825";
const CONTACT_PHONE_INTL = "918688584825";
const CONTACT_ADDRESS = "Jangaon, Telangana";

export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="contact" ref={ref} className="relative py-40 md:py-56 px-6 overflow-hidden bg-foreground text-background">
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-60"
      >
        <div className="absolute -top-40 right-[-20%] w-[60vw] h-[60vw] rounded-full"
             style={{ background: "radial-gradient(circle, oklch(0.83 0.04 80 / 0.35), transparent 60%)" }} />
        <div className="absolute -bottom-40 left-[-20%] w-[60vw] h-[60vw] rounded-full"
             style={{ background: "radial-gradient(circle, oklch(0.62 0.045 130 / 0.25), transparent 60%)" }} />
      </motion.div>

      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-background/30"
          style={{ left: `${(i * 71) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] font-light tracking-[-0.04em] text-balance"
        >
          Start saving with <span className="italic font-extralight" style={{ color: "oklch(0.83 0.04 80)" }}>solar</span>.
        </motion.h2>
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="mt-6 max-w-xl mx-auto text-background/70 font-light text-base md:text-lg"
        >
          Get subsidy benefits, EMI support, and decades of electricity savings.
        </motion.p>
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href={`tel:+91${CONTACT_PHONE}`} className="group inline-flex items-center gap-2 bg-background text-foreground rounded-full px-6 py-3 text-sm font-medium hover:opacity-90 transition-all">
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            Call {CONTACT_PHONE}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </a>
          <a href="#calculator" className="inline-flex items-center gap-2 glass-dark rounded-full px-6 py-3 text-sm font-medium text-background hover:bg-background/10 transition-all">
            <Calculator className="w-4 h-4" strokeWidth={1.5} />
            Calculate Savings
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-background/70 font-light"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4" strokeWidth={1.5} />
            {CONTACT_ADDRESS}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            +91 {CONTACT_PHONE}
          </span>
        </motion.div>

        {/* Mini inquiry form */}
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.9 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 max-w-md mx-auto glass-dark rounded-2xl p-2 flex items-center gap-2"
        >
          <input
            type="tel"
            placeholder="Your phone number"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-background placeholder:text-background/50 focus:outline-none"
          />
          <button className="bg-background text-foreground rounded-xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            Call me
          </button>
        </motion.form>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${CONTACT_PHONE_INTL}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-elegant transition-transform hover:scale-105"
        style={{ backgroundColor: "oklch(0.62 0.045 130)" }}
      >
        <MessageCircle className="w-6 h-6 text-background" strokeWidth={1.5} />
      </a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-background py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-light">
        <div>© {new Date().getFullYear()} Solara. Rooftop solar, considered.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
