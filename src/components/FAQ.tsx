import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal, SectionLabel } from "./Reveal";

const faqs = [
  { q: "How much subsidy can I get?", a: "Under PM Surya Ghar Yojana, eligible homeowners can receive up to ₹78,000 credited directly to their bank account based on system capacity." },
  { q: "What is net metering?", a: "Net metering allows excess solar energy to be exported to the grid. You receive credits that offset your future electricity bills." },
  { q: "How much can I save?", a: "Most 3KW systems generate around 405 units/month, saving roughly ₹3,240. Larger systems scale linearly with reliable, decades-long output." },
  { q: "Is EMI available?", a: "Yes — financing covers up to 90% of system cost via partnered banks. EMIs typically start from ₹2,400/month for a 3KW package." },
  { q: "How long does installation take?", a: "On-site installation takes 1 to 3 days. Net metering and subsidy approvals add roughly 2–4 weeks total." },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <Reveal><SectionLabel>FAQ</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight text-balance">
            Quietly answered.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <Accordion type="single" collapsible className="mt-16">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`i-${i}`} className="border-b border-border/70">
                <AccordionTrigger className="text-left text-lg md:text-xl font-light tracking-tight py-6 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light text-base pb-8 max-w-2xl">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
