import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import GlassCard from "../components/GlassCard";

const roles = ["CSE Student", "MERN Developer", "Java Learner", "DSA Enthusiast"];
const focus = ["DSA", "Java", "Spring Boot", "Placement Prep"];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 grain-bg overflow-hidden">
      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-[8%] h-24 w-24 rounded-3xl glass hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 22, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 right-[10%] h-32 w-32 rounded-full glass hidden md:block"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-sm text-cyan tracking-widest uppercase mb-4"
      >
        Hello, I'm
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-6xl sm:text-8xl font-bold text-gradient text-center"
      >
        Vishal
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-6 font-mono text-sm text-mist"
      >
        {roles.map((r, i) => (
          <span key={r} className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">{r}</span>
            {i < roles.length - 1 && <span className="text-mist-dim">·</span>}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-xl text-center text-mist mt-6 text-base sm:text-lg"
      >
        Building scalable applications and preparing for software engineering opportunities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-9"
      >
        <button
          onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-azure to-violet font-medium text-sm hover:shadow-[0_0_30px_-5px_rgba(91,140,255,0.6)] transition-shadow"
        >
          View Projects <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
        <a
          href="/resume.pdf"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong font-medium text-sm hover:bg-white/10 transition-colors"
        >
          <Download size={16} /> Download Resume
        </a>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 font-medium text-sm hover:bg-white/5 transition-colors"
        >
          <Mail size={16} /> Contact Me
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-14 w-full max-w-md"
      >
        <GlassCard className="p-5" hover={false}>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan mb-3">Current Focus</p>
          <div className="flex flex-wrap gap-2">
            {focus.map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-mist">
                {f}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
