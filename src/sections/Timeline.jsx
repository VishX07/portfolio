import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "../components/Reveal";
import { timeline } from "../data/content";

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Journey" title="Learning timeline" subtitle="The path so far, one stage at a time." align="center" />

        <div className="relative mt-14 ml-3">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-azure via-violet to-cyan" />
          <div className="space-y-9">
            {timeline.map((stage, i) => (
              <Reveal key={stage.title} delay={i * 0.05} y={16}>
                <div className="relative pl-9">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-0 top-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-azure to-violet shadow-[0_0_12px_rgba(91,140,255,0.7)]"
                  />
                  <h4 className="font-display font-semibold text-white">{stage.title}</h4>
                  <p className="text-sm text-mist mt-1">{stage.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
