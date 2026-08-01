import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Layers,
  Database,
  Workflow,
  ImageIcon,
  AlertTriangle,
  Lightbulb,
  Rocket,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { getProjectBySlug } from "../data/projects";
import Footer from "../sections/Footer";

const ACCENTS = {
  azure: "from-azure/30 to-violet/20",
  cyan: "from-cyan/25 to-azure/20",
  violet: "from-violet/30 to-cyan/20",
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="pt-28 pb-10">
      {/* Hero Banner */}
      <section className={`relative px-6 py-20 bg-gradient-to-br ${ACCENTS[project.accent]}`}>
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-mist hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white"
          >
            {project.title}
          </motion.h1>
          <p className="text-mist mt-3 max-w-xl">{project.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/30 text-mist border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-12">
        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3">Project Overview</h2>
          <p className="text-mist leading-relaxed">{project.overview}</p>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3">Problem Statement</h2>
          <p className="text-mist leading-relaxed">{project.problem}</p>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3">Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <GlassCard key={f} hover={false} className="p-3.5 text-sm text-mist">
                {f}
              </GlassCard>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <Workflow size={18} className="text-cyan" /> System Architecture
          </h2>
          <GlassCard strong className="p-6 text-sm text-mist">
            {project.architecture}
            <div className="mt-4 h-40 rounded-xl border border-dashed border-white/15 grid place-items-center text-mist-dim text-xs font-mono">
              architecture diagram placeholder
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <Database size={18} className="text-cyan" /> Database Design
          </h2>
          <GlassCard className="p-5">
            <ul className="space-y-2">
              {project.database.map((d) => (
                <li key={d} className="text-sm font-mono text-mist">
                  · {d}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <Layers size={18} className="text-cyan" /> API Design
          </h2>
          <GlassCard className="p-5">
            <ul className="space-y-2">
              {project.api.map((d) => (
                <li key={d} className="text-sm font-mono text-mist">
                  {d}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <ImageIcon size={18} className="text-cyan" /> Screenshots
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-32 rounded-xl glass grid place-items-center text-mist-dim text-xs font-mono">
                screenshot {n}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle size={18} className="text-cyan" /> Challenges Faced
          </h2>
          <ul className="space-y-2">
            {project.challenges.map((c) => (
              <li key={c} className="text-sm text-mist leading-relaxed pl-4 border-l border-white/10">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <Lightbulb size={18} className="text-cyan" /> Lessons Learned
          </h2>
          <p className="text-mist leading-relaxed">{project.lessons}</p>
        </Reveal>

        <Reveal>
          <h2 className="font-display text-xl font-semibold mb-3 flex items-center gap-2">
            <Rocket size={18} className="text-cyan" /> Future Improvements
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.future.map((f) => (
              <span key={f} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-mist">
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Code2 size={16} /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-azure to-violet text-sm font-medium hover:shadow-[0_0_30px_-5px_rgba(91,140,255,0.6)] transition-shadow"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
