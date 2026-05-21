import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTASection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Sun, Users, Award, Leaf } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About · PJR Energy Systems" },
      { name: "description", content: "PJR Energy Systems designs and installs premium rooftop solar systems across Telangana — helping homes and businesses achieve zero electricity bills." },
      { property: "og:title", content: "About PJR Energy Systems" },
      { property: "og:description", content: "Premium rooftop solar for modern homes and businesses." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { icon: Sun, title: "Quality First", text: "Tier-1 panels, premium inverters, and certified installation crews on every project." },
  { icon: Users, title: "Customer-Centric", text: "End-to-end handholding — subsidy paperwork, net metering, EMI, and after-sales support." },
  { icon: Award, title: "Trusted Partner", text: "MNRE-registered vendor delivering systems backed by 5-year warranty and 25-year design life." },
  { icon: Leaf, title: "Cleaner Tomorrow", text: "Every rooftop we power cuts thousands of kg of CO₂ over its lifetime." },
];

function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="bg-background">
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 gradient-warm">
          <div className="max-w-6xl mx-auto">
            <Reveal><SectionLabel>About Us</SectionLabel></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light tracking-tight max-w-4xl text-balance">
                Powering Telangana, one rooftop at a time.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-muted-foreground font-light">
                PJR Energy Systems is a Jangaon-based rooftop solar company on a mission to make clean,
                affordable energy the default for every home and business. We design, install, and service
                premium grid-tied solar systems backed by government subsidy support and lifetime savings.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <Reveal>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight">Built on trust, engineered for decades.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                <p>
                  Founded with a simple belief — that solar should be effortless for the end customer — PJR Energy
                  Systems has helped homeowners, farmers, and small businesses across Telangana switch to clean energy.
                </p>
                <p>
                  We combine premium tier-1 components with hands-on local service, so every installation is engineered
                  for performance and built to last. From the first site visit to the last subsidy disbursement, we handle it.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-20 md:py-28 px-6 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <Reveal><SectionLabel>What We Stand For</SectionLabel></Reveal>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div className="glass rounded-3xl p-6 border border-border/60 h-full">
                    <div className="w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center">
                      <v.icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-base font-medium">{v.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground font-light">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
