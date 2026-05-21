import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OffersSection } from "@/components/OffersSection";
import { FeaturedPackage } from "@/components/FeaturedPackage";
import { SubsidySection } from "@/components/SubsidySection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { PricingTable } from "@/components/PricingTable";
import { HowItWorks } from "@/components/HowItWorks";
import { Projects } from "@/components/Projects";
import { Packages } from "@/components/Packages";
import { TrustSection } from "@/components/TrustSection";
import { InstallTimeline } from "@/components/InstallTimeline";
import { FAQ } from "@/components/FAQ";
import { CTASection, Footer } from "@/components/CTASection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PJR Energy Systems — Karo Bill Zero · Premium Rooftop Solar" },
      { name: "description", content: "Premium rooftop solar systems for modern homes. ₹78,000 PM Surya Ghar subsidy, EMI support, net metering, 5-year warranty and 25-year panel life." },
      { property: "og:title", content: "PJR Energy Systems — Karo Bill Zero" },
      { property: "og:description", content: "Smart rooftop solar systems designed for modern homes." },
    ],
  }),
});

function Index() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="home">
        <Hero />
        <OffersSection />
        <FeaturedPackage />
        <SubsidySection />
        <PricingTable />
        <CalculatorSection />
        <HowItWorks />
        <Projects />
        <Packages />
        <TrustSection />
        <InstallTimeline />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  );
}
