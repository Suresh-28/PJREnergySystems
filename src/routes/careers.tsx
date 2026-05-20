import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTASection";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Briefcase, MapPin, Clock, TrendingUp, Send } from "lucide-react";

const WHATSAPP_NUMBER = "918688584825";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers · PJR Energy Systems — Join the Solar Revolution" },
      { name: "description", content: "Open roles at PJR Energy Systems. Apply for Digital Marketing positions and help us power Telangana with rooftop solar." },
      { property: "og:title", content: "Careers at PJR Energy Systems" },
      { property: "og:description", content: "Open roles in Digital Marketing and more." },
    ],
  }),
});

const role = {
  title: "Digital Marketing Executive",
  type: "Full-time",
  location: "Remote",
  experience: "0 – 1 year",
  summary:
    "Drive client acquisition and business growth for PJR Energy Systems through field marketing, digital outreach, and relationship building.",
  responsibilities: [
    "Generate new clients through field marketing, online promotions, cold calling, and referral networks",
    "Connect with residential and commercial customers to explain services and convert leads into clients",
    "Handle client communication through calls, WhatsApp, social media, and direct meetings",
    "Build partnerships with local businesses, contractors, and property owners for business growth",
    "Follow up with interested customers and maintain strong client relationships for repeat business and referrals",
  ],
};

function CareersPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    experience: "",
    portfolio: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `*New Career Application*%0A%0A` +
      `*Role:* ${role.title}%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Email:* ${form.email}%0A` +
      `*Experience:* ${form.experience}%0A` +
      `*Portfolio / LinkedIn:* ${form.portfolio || "—"}%0A` +
      `*Message:* ${form.message || "—"}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="bg-background">
        {/* Hero */}
        <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 px-6 gradient-warm">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <SectionLabel>Careers</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 text-[clamp(2.5rem,6vw,5rem)] leading-[1] font-light tracking-tight max-w-4xl text-balance">
                Build the rooftop solar revolution with us.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-muted-foreground font-light">
                We're hiring across marketing, sales, and operations. Currently open: Digital Marketing.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Role card + form */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Role details */}
            <Reveal className="lg:col-span-3">
              <div className="glass rounded-3xl p-8 md:p-10 border border-border/60 shadow-soft">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-olive">Now Hiring</div>
                    <h2 className="mt-3 text-3xl md:text-4xl font-light tracking-tight">{role.title}</h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center">
                    <Briefcase className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                    <MapPin className="w-3.5 h-3.5" /> {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                    <Clock className="w-3.5 h-3.5" /> {role.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border">
                    <TrendingUp className="w-3.5 h-3.5" /> {role.experience}
                  </span>
                </div>

                <p className="mt-8 text-muted-foreground font-light leading-relaxed">{role.summary}</p>

                <div className="mt-8">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    What you'll do
                  </div>
                  <ul className="mt-4 space-y-3">
                    {role.responsibilities.map((r) => (
                      <li key={r} className="flex gap-3 text-sm font-light">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Apply form */}
            <Reveal delay={0.1} className="lg:col-span-2">
              <motion.form
                onSubmit={onSubmit}
                className="glass rounded-3xl p-8 border border-border/60 shadow-soft sticky top-28"
              >
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Apply Now</div>
                <h3 className="mt-3 text-2xl font-light tracking-tight">Send your application</h3>
                <p className="mt-2 text-xs text-muted-foreground font-light">
                  Submitting opens WhatsApp with your details pre-filled to our hiring team.
                </p>

                <div className="mt-6 space-y-4">
                  <Field label="Full name" required value={form.name} onChange={update("name")} />
                  <Field label="Phone" required type="tel" value={form.phone} onChange={update("phone")} />
                  <Field label="Email" required type="email" value={form.email} onChange={update("email")} />
                  <Field label="Years of experience" required value={form.experience} onChange={update("experience")} placeholder="e.g. 2 years" />
                  <Field label="Portfolio / LinkedIn" value={form.portfolio} onChange={update("portfolio")} placeholder="https://" />
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                      Why you?
                    </label>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      rows={3}
                      className="mt-2 w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm font-light resize-none"
                      placeholder="A short intro"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  Apply via WhatsApp
                </button>
                {sent && (
                  <p className="mt-4 text-xs text-olive text-center font-light">
                    WhatsApp opened — tap send to submit your application.
                  </p>
                )}
              </motion.form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function Field({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label} {required && <span className="text-olive">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-foreground outline-none py-2 text-sm font-light"
      />
    </div>
  );
}
