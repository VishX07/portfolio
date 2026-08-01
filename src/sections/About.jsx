import { GraduationCap, Compass, Hammer, Target, UserCircle2 } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";

const cards = [
  {
    icon: UserCircle2,
    title: "Who I Am",
    text: "A Computer Science student who learns by building — most of what I know about the MERN stack came from shipping real, working features rather than tutorials.",
  },
  {
    icon: Compass,
    title: "Current Learning Journey",
    text: "Splitting focus between Data Structures & Algorithms and the Java/Spring Boot ecosystem, while continuing to refine AlphaCare.",
  },
  {
    icon: Hammer,
    title: "What I Build",
    text: "Full-stack web applications with real auth flows, payment integrations, and role-based dashboards — not just CRUD demos.",
  },
  {
    icon: Target,
    title: "Future Goals",
    text: "Land a software engineering role where I can grow from backend fundamentals into distributed systems and platform engineering.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="About" title="A bit about me" subtitle="The short version of where I am and where I'm headed." />

        <div className="grid md:grid-cols-[320px_1fr] gap-6 mt-12">
          <Reveal>
            <GlassCard strong className="p-6 h-full flex flex-col">
              <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-azure/30 to-violet/30 border border-white/10 grid place-items-center mb-5">
                <UserCircle2 size={56} className="text-mist" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-1">Vishal</h3>
              <p className="text-sm text-mist mb-4">CSE Student · MERN Developer</p>
              <div className="flex items-start gap-2 text-sm text-mist mb-3">
                <GraduationCap size={16} className="text-cyan mt-0.5" />
                <span>B.Tech, Computer Science Engineering</span>
              </div>
              <p className="text-sm text-mist leading-relaxed">
                Building scalable applications and preparing for software engineering opportunities, with a hands-on focus on full-stack development and DSA.
              </p>
            </GlassCard>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <GlassCard className="p-5 h-full">
                  <c.icon size={20} className="text-azure mb-3" />
                  <h4 className="font-display font-semibold mb-2">{c.title}</h4>
                  <p className="text-sm text-mist leading-relaxed">{c.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
