import { Link } from "react-router-dom";
import { ArrowUpRight, Trophy, Flame, Target } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";
import { AnimatedCounter } from "../components/Stats";
import { dsaStats } from "../data/content";

const cards = [
  { icon: Target, label: "Problems Solved", value: dsaStats.totalSolved },
  { icon: Trophy, label: "Contests", value: dsaStats.contests },
  { icon: Flame, label: "Day Streak", value: dsaStats.streak },
];

export default function DSAPreview() {
  return (
    <section id="dsa-preview" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="DSA Progress" title="Data structures & algorithms" subtitle="A snapshot of where my problem-solving practice stands today." />

        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <GlassCard className="p-6 text-center">
                <c.icon size={22} className="text-cyan mx-auto mb-3" />
                <div className="font-display text-3xl font-bold text-white">
                  <AnimatedCounter value={c.value} suffix="+" />
                </div>
                <p className="text-sm text-mist mt-1">{c.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link
            to="/dsa"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong font-medium text-sm hover:bg-white/10 transition-colors"
          >
            View Full DSA Dashboard
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
