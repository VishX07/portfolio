import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Flame, Target, Award } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";
import { AnimatedCounter, ProgressBar } from "../components/Stats";
import { dsaTopics, dsaStats, timeline } from "../data/content";
import Footer from "../sections/Footer";

const colorFor = (i) => ["azure", "cyan", "violet"][i % 3];

export default function DSAPage() {
  return (
    <div className="pt-32 pb-10 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-mist hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <SectionHeading eyebrow="DSA Dashboard" title="Data structures & algorithms" subtitle="Full breakdown of practice across topics, contests, and streaks." />

        <div className="grid sm:grid-cols-4 gap-4 mt-10">
          {[
            { icon: Target, label: "Total Solved", value: dsaStats.totalSolved },
            { icon: Trophy, label: "Contests", value: dsaStats.contests },
            { icon: Flame, label: "Day Streak", value: dsaStats.streak },
            { icon: Award, label: "Ranking", value: null, custom: dsaStats.ranking },
          ].map((c) => (
            <Reveal key={c.label}>
              <GlassCard className="p-5 text-center">
                <c.icon size={20} className="text-cyan mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-white">
                  {c.value !== null ? <AnimatedCounter value={c.value} suffix="+" /> : c.custom}
                </div>
                <p className="text-xs text-mist mt-1">{c.label}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12">
          <GlassCard strong className="p-6">
            <h3 className="font-display font-semibold mb-5">Topic-wise Progress</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {dsaTopics.map((t, i) => (
                <ProgressBar key={t.name} label={t.name} solved={t.solved} total={t.total} color={colorFor(i)} />
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <Reveal>
            <GlassCard className="p-6 h-full">
              <h3 className="font-display font-semibold mb-3">LeetCode Statistics</h3>
              <p className="text-sm text-mist">
                Active across Easy, Medium, and Hard difficulty tiers, with a growing focus on Medium-level graph and dynamic programming problems.
              </p>
              <div className="mt-4 h-28 rounded-xl border border-dashed border-white/15 grid place-items-center text-mist-dim text-xs font-mono">
                stats chart placeholder
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="p-6 h-full">
              <h3 className="font-display font-semibold mb-3">Contest History</h3>
              <p className="text-sm text-mist">
                {dsaStats.contests} contests entered so far, steadily climbing toward consistent top-tier placements.
              </p>
              <div className="mt-4 h-28 rounded-xl border border-dashed border-white/15 grid place-items-center text-mist-dim text-xs font-mono">
                contest history placeholder
              </div>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <GlassCard className="p-6">
            <h3 className="font-display font-semibold mb-3">Coding Heatmap</h3>
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 130 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-sm"
                    style={{
                      background:
                        intensity > 0.7
                          ? "rgba(94,234,212,0.85)"
                          : intensity > 0.45
                          ? "rgba(91,140,255,0.55)"
                          : intensity > 0.2
                          ? "rgba(91,140,255,0.25)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                );
              })}
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <Reveal>
            <GlassCard className="p-6 h-full">
              <h3 className="font-display font-semibold mb-3">Learning Journey</h3>
              <ul className="space-y-2 text-sm text-mist">
                {timeline.slice(-3).map((t) => (
                  <li key={t.title}>· {t.title}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard className="p-6 h-full">
              <h3 className="font-display font-semibold mb-3">Goals</h3>
              <ul className="space-y-2 text-sm text-mist">
                <li>· Cross 300 problems solved</li>
                <li>· Reach top 10% in rated contests</li>
                <li>· Master graph and DP patterns before placements</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
