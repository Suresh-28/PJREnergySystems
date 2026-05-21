import { ReactNode } from "react";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTASection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal, SectionLabel } from "@/components/Reveal";

export function LegalPage({ label, title, updated, children }: { label: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="bg-background">
        <section className="relative pt-40 pb-12 md:pt-48 md:pb-16 px-6 gradient-warm">
          <div className="max-w-4xl mx-auto">
            <Reveal><SectionLabel>{label}</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] leading-[1.05] font-light tracking-tight text-balance">{title}</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground">Last updated · {updated}</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6">
          <div className="max-w-3xl mx-auto legal-content font-light text-muted-foreground leading-relaxed space-y-4">
            {children}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
