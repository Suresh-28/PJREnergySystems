import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionLabel } from "./Reveal";
import { loadProjects, PROJECTS_STORAGE_KEY, type StoredProject } from "@/lib/projects-store";

function StackItem({ img, title, meta, index }: { img: string; title: string; meta: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return (
    <div ref={ref} className="sticky top-24 md:top-32 mb-6 md:mb-12">
      <motion.article
        style={{ scale }}
        className="relative h-[68vh] md:h-[78vh] rounded-[2rem] overflow-hidden shadow-elegant group"
      >
        <motion.img
          style={{ y }}
          src={img}
          alt={title}
          width={1200}
          height={1500}
          loading="lazy"
          className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 flex items-end justify-between text-background">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] opacity-70">Project {String(index + 1).padStart(2, "0")}</div>
            <h3 className="mt-2 text-2xl md:text-4xl font-light tracking-tight">{title}</h3>
          </div>
          <div className="text-xs md:text-sm opacity-80 hidden sm:block">{meta}</div>
        </div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  const [items, setItems] = useState<StoredProject[]>(() => loadProjects());

  useEffect(() => {
    const refresh = () => setItems(loadProjects());
    window.addEventListener("storage", (e) => {
      if (e.key === PROJECTS_STORAGE_KEY) refresh();
    });
    window.addEventListener("projects:updated", refresh);
    return () => {
      window.removeEventListener("projects:updated", refresh);
    };
  }, []);

  return (
    <section id="projects" className="relative py-32 md:py-44 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <Reveal><SectionLabel>Selected Projects</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1] font-light tracking-tight max-w-3xl text-balance">
            Quietly powering modern homes across India.
          </h2>
        </Reveal>

        <div className="mt-20 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <StackItem key={it.id} img={it.image} title={it.title} meta={it.meta} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
