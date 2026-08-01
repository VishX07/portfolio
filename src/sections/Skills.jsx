import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";
import { skillGroups } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Skills" title="Technology I work with" subtitle="Tools and languages I reach for when building." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08}>
              <GlassCard className="p-5 h-full">
                <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-4">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-mist hover:text-white hover:border-azure/40 hover:shadow-[0_0_18px_-4px_rgba(91,140,255,0.5)] transition-all cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
