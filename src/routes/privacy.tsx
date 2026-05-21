import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy · PJR Energy Systems" },
      { name: "description", content: "How PJR Energy Systems collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — PJR Energy Systems" },
      { property: "og:description", content: "Our commitment to protecting your personal data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage label="Legal" title="Privacy Policy" updated="May 2026">
      <p>
        PJR Energy Systems ("we", "us", "our") respects your privacy. This Privacy Policy explains how we
        collect, use, and safeguard the personal information you share with us when you interact with our
        website, request a quote, or use our services.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Contact details</strong> — name, phone number, email, and address you provide via forms, WhatsApp, or calls.</li>
        <li><strong>Property details</strong> — site information needed to design a rooftop solar system (roof area, electricity bill, sanctioned load).</li>
        <li><strong>Application details</strong> — for career applications: experience, portfolio links, and any message you submit.</li>
        <li><strong>Technical data</strong> — basic analytics such as device type, browser, and pages visited.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to enquiries, generate quotes, and schedule site visits.</li>
        <li>To process PM Surya Ghar subsidy applications and net metering paperwork on your behalf.</li>
        <li>To provide after-sales service, warranty support, and project updates.</li>
        <li>To evaluate job applications submitted through our Careers page.</li>
        <li>To improve our website and service offerings.</li>
      </ul>

      <h2>Sharing of Information</h2>
      <p>
        We do not sell your data. We share information only with: government portals required for subsidy
        and net metering, authorised installation partners assigned to your project, and service providers
        (e.g. payment, communication tools) bound by confidentiality.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain customer information for as long as required to deliver our services and meet legal,
        warranty, and tax obligations. You may request deletion of your data at any time.
      </p>

      <h2>Your Rights</h2>
      <p>
        You can request access, correction, or deletion of your personal data, and opt out of marketing
        communications, by writing to <a href="mailto:pjrenergysystems@gmail.com">pjrenergysystems@gmail.com</a>.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your data. No method of online
        transmission is 100% secure, but we work to maintain industry-standard safeguards.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy-related questions, contact us at <a href="mailto:pjrenergysystems@gmail.com">pjrenergysystems@gmail.com</a> or call +91 8688584825.
      </p>
    </LegalPage>
  );
}
