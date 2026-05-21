import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service · PJR Energy Systems" },
      { name: "description", content: "Terms and conditions governing the use of PJR Energy Systems' website and services." },
      { property: "og:title", content: "Terms of Service — PJR Energy Systems" },
      { property: "og:description", content: "The rules that govern our services and your use of this site." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <LegalPage label="Legal" title="Terms of Service" updated="May 2026">
      <p>
        These Terms of Service ("Terms") govern your access to and use of the PJR Energy Systems website
        and our rooftop solar products and services. By using our website or engaging our services, you
        agree to these Terms.
      </p>

      <h2>Services</h2>
      <p>
        PJR Energy Systems provides design, supply, installation, and maintenance of grid-tied rooftop
        solar systems, along with assistance for PM Surya Ghar subsidy and net metering applications.
        Final scope, specifications, pricing, and timelines for each project will be set out in a signed
        quotation or work order.
      </p>

      <h2>Quotations &amp; Pricing</h2>
      <ul>
        <li>Quotations are valid for 15 days unless stated otherwise.</li>
        <li>Prices indicated on this website are indicative and may change without notice.</li>
        <li>Subsidy amounts are subject to government policy and DISCOM approval.</li>
      </ul>

      <h2>Payments</h2>
      <p>
        Payment milestones — typically advance, on-delivery, and on-commissioning — will be detailed in
        your project order. EMI options are facilitated through partner financial institutions and are
        subject to their approval.
      </p>

      <h2>Installation &amp; Site Conditions</h2>
      <p>
        The customer is responsible for providing safe site access, structural suitability of the roof,
        and required clearances. Additional civil or structural work, if needed, may be quoted separately.
      </p>

      <h2>Warranty</h2>
      <ul>
        <li>Solar panels: 5-year product warranty with 25-year design life (subject to manufacturer terms).</li>
        <li>Inverter and balance-of-system: per OEM warranty.</li>
        <li>Installation workmanship: as specified in your order.</li>
      </ul>
      <p>Warranty excludes damage from misuse, tampering, force majeure, or non-authorised servicing.</p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — text, graphics, logos, images — is owned by PJR Energy Systems and
        may not be reproduced without written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, PJR Energy Systems shall not be liable for indirect,
        incidental, or consequential damages. Our total liability for any claim will not exceed the amount
        paid by the customer for the specific project giving rise to the claim.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Disputes shall be subject to the exclusive
        jurisdiction of the courts at Jangaon, Telangana.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these Terms, contact <a href="mailto:pjrenergysystems@gmail.com">pjrenergysystems@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
