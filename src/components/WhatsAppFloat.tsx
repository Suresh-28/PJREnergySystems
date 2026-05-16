import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const CONTACT_PHONE_INTL = "918688584825";
const MESSAGES = [
  "Need solar for your home?",
  "Want to slash your power bill?",
  "Curious about ₹78,000 subsidy?",
  "Solar for your shop or office?",
  "Talk to us — free site survey.",
];

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("wa_popup_dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => setIdx((v) => (v + 1) % MESSAGES.length), 2500);
    return () => clearInterval(i);
  }, [open]);

  const close = () => {
    setOpen(false);
    setDismissed(true);
    sessionStorage.setItem("wa_popup_dismissed", "1");
  };

  const waUrl = `https://wa.me/${CONTACT_PHONE_INTL}?text=${encodeURIComponent(
    "Hi, I'd like a free solar consultation."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-[260px] rounded-2xl bg-background shadow-elegant border border-border p-4 pr-9"
          >
            <button
              aria-label="Dismiss"
              onClick={close}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-foreground/5 text-muted-foreground"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
              Free consultation
            </div>
            <div className="min-h-[44px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm font-light text-foreground leading-snug"
                >
                  {MESSAGES[idx]}
                </motion.p>
              </AnimatePresence>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-background rounded-full px-3 py-1.5"
              style={{ backgroundColor: "oklch(0.62 0.045 130)" }}
            >
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
              Chat on WhatsApp
            </a>
            <span
              className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-background border-r border-b border-border"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-elegant transition-transform hover:scale-105"
        style={{ backgroundColor: "oklch(0.62 0.045 130)" }}
      >
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: "oklch(0.62 0.045 130)" }}
        />
        <MessageCircle className="relative w-6 h-6 text-background" strokeWidth={1.5} />
      </a>
    </div>
  );
}
