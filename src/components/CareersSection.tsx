import { Reveal, SectionLabel } from "./Reveal";
import {
  Users,
  CalendarDays,
  Sun,
  Clock,
  Zap,
  ShieldCheck,
  Wallet,
  Laptop,
  GraduationCap,
  UserCheck,
  Mail,
  MessageCircle,
} from "lucide-react";

const perks = [
  { icon: Users, title: "Open for All", desc: "Male & Female candidates" },
  { icon: CalendarDays, title: "5-Day Working Week", desc: "Monday to Friday" },
  { icon: Sun, title: "Saturday & Sunday Off", desc: "Full weekends to recharge" },
  { icon: Clock, title: "Day Shift", desc: "Comfortable working hours" },
  { icon: Zap, title: "Immediate Joining", desc: "Start as soon as you're hired" },
  { icon: ShieldCheck, title: "No PF Deduction", desc: "Full in-hand take home" },
];

const requirements = [
  {
    icon: Wallet,
    title: "Salary",
    value: "₹10,000 – ₹12,000",
    desc: "In-hand. Variable based on weekly work credited.",
  },
  {
    icon: Laptop,
    title: "Mandatory",
    value: "Own Laptop / PC",
    desc: "A stable internet connection is required.",
  },
  {
    icon: GraduationCap,
    title: "Qualification",
    value: "Any can Apply",
    desc: "No strict criteria — freshers welcome.",
  },
  {
    icon: UserCheck,
    title: "Age Limit",
    value: "No Upper Limit",
    desc: "Open to candidates of every age group.",
  },
];

export function CareersSection() {
  return (
    <section id="careers" className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <SectionLabel>Work From Home Opportunity</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Freelance · YouTube Data Validation Process
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 text-base md:text-lg text-muted-foreground font-light max-w-2xl">
            Part-time & full-time roles available. A simple, flexible way to earn from home.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {/* Job details & perks */}
          <Reveal delay={0.2}>
            <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Job Details & Perks
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-light tracking-tight">
                What you get
              </h3>
              <ul className="mt-8 space-y-5">
                {perks.map((p) => (
                  <li key={p.title} className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-foreground/[0.04] grid place-items-center">
                      <p.icon className="w-4.5 h-4.5 text-olive" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-[15px] font-medium tracking-tight">{p.title}</div>
                      <div className="text-sm text-muted-foreground font-light">{p.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Requirements & salary */}
          <Reveal delay={0.25}>
            <div className="h-full rounded-3xl border border-border bg-card p-8 md:p-10 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Requirements & Salary
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-light tracking-tight">
                What you need
              </h3>
              <ul className="mt-8 space-y-6">
                {requirements.map((r) => (
                  <li key={r.title} className="flex items-start gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-foreground/[0.04] grid place-items-center">
                      <r.icon className="w-4.5 h-4.5 text-olive" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {r.title}
                      </div>
                      <div className="text-[15px] font-medium tracking-tight mt-0.5">
                        {r.value}
                      </div>
                      <div className="text-sm text-muted-foreground font-light mt-1">
                        {r.desc}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* How to apply */}
        <Reveal delay={0.3}>
          <div className="mt-10 rounded-3xl bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] opacity-60">
                How to Apply
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-light tracking-tight">
                Send your CV today
              </h3>
              <p className="mt-2 text-sm md:text-base opacity-70 font-light max-w-md">
                Share your resume on email or WhatsApp. We'll get back within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:careers@pjrenergysystems.com"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-background text-foreground px-5 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <Mail className="w-4 h-4" strokeWidth={1.6} />
                Email CV
              </a>
              <a
                href="https://wa.me/918688584825?text=Hi%2C%20I%27d%20like%20to%20apply%20for%20the%20YouTube%20Data%20Validation%20role."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-background/10 text-background border border-background/20 px-5 py-3 rounded-full hover:bg-background/15 transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.6} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
