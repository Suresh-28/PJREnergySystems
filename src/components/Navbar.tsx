import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Packages", href: "/#packages" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
      >
        <motion.nav
          animate={{
            marginTop: scrolled ? 16 : 24,
            paddingLeft: scrolled ? 14 : 22,
            paddingRight: scrolled ? 14 : 22,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-full shadow-soft flex items-center gap-1 py-2 max-w-[min(960px,calc(100vw-2rem))]"
        >
          <a href="#home" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
            <Sun className="w-4 h-4 text-olive" strokeWidth={1.5} />
            <span className="text-sm font-medium tracking-tight">PJR Energy Systems</span>
          </a>
          <div className="hidden md:flex items-center gap-0.5 ml-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-foreground/[0.04]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex ml-2 text-[13px] font-medium bg-foreground text-background px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Free Quote
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden ml-auto p-2 rounded-full hover:bg-foreground/5"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] md:hidden glass-dark"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="text-background text-sm font-medium">PJR Energy Systems</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-background">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center h-full -mt-12 gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-background/90 text-3xl font-light tracking-tight py-2"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
