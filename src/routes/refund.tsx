import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy · PJR Energy Systems" },
      { name: "description", content: "Refund and cancellation policy for PJR Energy Systems rooftop solar orders and advance payments." },
      { property: "og:title", content: "Refund & Cancellation Policy — PJR Energy Systems" },
      { property: "og:description", content: "How cancellations and refunds work for solar projects." },
      { property: "og:url", content: "/refund" },
    ],
    links: [{ rel: "canonical", href: "/refund" }],
  }),
});

function RefundPage() {
  return (
    <LegalPage label="Legal" title="Refund & Cancellation Policy" updated="May 2026">
      <p>
        We want every customer to be confident in their decision to switch to solar. This policy explains
        how cancellations and refunds work for orders placed with PJR Energy Systems.
      </p>

      <h2>Cancellation Window</h2>
      <ul>
        <li><strong>Within 48 hours of advance payment</strong> — full refund of the advance, no questions asked, provided procurement has not begun.</li>
        <li><strong>After procurement begins</strong> — refund will be issued after deducting actual costs incurred for materials ordered, site visits, design, and subsidy paperwork.</li>
        <li><strong>After delivery of materials to site</strong> — order is non-cancellable; only the unused/undelivered scope may be refundable on a case-by-case basis.</li>
      </ul>

      <h2>Refund Processing</h2>
      <ul>
        <li>Approved refunds are processed within <strong>7–14 business days</strong> to the original payment source.</li>
        <li>Any third-party charges (payment gateway, bank transfer fees) are non-refundable.</li>
      </ul>

      <h2>Subsidy Amounts</h2>
      <p>
        PM Surya Ghar subsidy is disbursed by the Government of India directly to the customer's bank account
        after commissioning and DISCOM inspection. PJR Energy Systems does not hold or process subsidy funds
        and cannot refund subsidy amounts.
      </p>

      <h2>Service Issues</h2>
      <p>
        If your installation does not meet the agreed specifications, please notify us within 7 days of
        commissioning. We will rectify the issue at no additional cost under our workmanship warranty.
      </p>

      <h2>How to Request a Cancellation or Refund</h2>
      <p>
        Email <a href="mailto:pjrenergysystems@gmail.com">pjrenergysystems@gmail.com</a> or call
        +91 8688584825 with your order reference and reason. Our team will respond within 2 business days.
      </p>
    </LegalPage>
  );
}
