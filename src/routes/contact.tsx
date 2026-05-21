import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTASection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const PHONE = "8688584825";
const WHATSAPP = "918688584825";
const EMAIL = "pjrenergysystems@gmail.com";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · PJR Energy Systems" },
      { name: "description", content: "Get in touch with PJR Energy Systems for rooftop solar quotes, site visits, and subsidy support across Telangana." },
      { property: "og:title", content: "Contact PJR Energy Systems" },
      { property: "og:description", content: "Call, WhatsApp, or email us for a free rooftop solar quote." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const items = [
    { icon: Phone, label: "Call us", value: `+91 ${PHONE}`, href: `tel:+91${PHONE}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${WHATSAPP}` },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: "Office", value: "Jangaon, Telangana, India" },
    { icon: Clock, label: "Hours", value: "Mon – Sat · 9:00 AM – 7:00 PM" },
  ];

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="bg-background">
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 gradient-warm">
          <div className="max-w-6xl mx-auto">
            <Reveal><SectionLabel>Contact</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light tracking-tight max-w-4xl text-balance">
                Let's talk solar.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-muted-foreground font-light">
                Free site survey, transparent pricing, and full subsidy assistance. Reach out and a real human will respond.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
            {items.map((it, i) => {
              const Inner = (
                <div className="glass rounded-3xl p-6 border border-border/60 h-full hover:border-foreground/40 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                    <it.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="mt-4 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{it.label}</div>
                  <div className="mt-2 text-base font-light">{it.value}</div>
                </div>
              );
              return (
                <Reveal key={it.label} delay={i * 0.05}>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{Inner}</a>
                  ) : Inner}
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
