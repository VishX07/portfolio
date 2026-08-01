import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";
import { projects } from "../data/projects";

const ACCENTS = {
  azure: "from-azure/30 to-violet/20",
  cyan: "from-cyan/25 to-azure/20",
  violet: "from-violet/30 to-cyan/20",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Featured Projects" title="Things I've built" subtitle="A mix of full-stack apps and smaller learning projects." />

        <div className="grid sm:grid-cols-2 gap-6 mt-12">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <GlassCard className="overflow-hidden h-full flex flex-col">
                <div className={`h-40 bg-gradient-to-br ${ACCENTS[p.accent]} flex items-end p-4`}>
                  <span className="font-mono text-[11px] text-mist-dim uppercase">{p.image}.preview</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-mist mt-2 flex-1">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 text-mist-dim border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-1 rounded-md bg-cyan/10 text-cyan border border-cyan/20">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/projects/${p.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white group"
                  >
                    View Details
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
