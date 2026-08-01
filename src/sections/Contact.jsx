import { useState } from "react";
import { Mail, Code2, Link2, MapPin, Download, Send, CheckCircle2 } from "lucide-react";
import GlassCard from "../components/GlassCard";
import { Reveal, SectionHeading } from "../components/Reveal";

const links = [
  { icon: Mail, label: "Email", value: "vishal@example.com", href: "mailto:vishal@example.com" },
  { icon: Code2, label: "GitHub", value: "github.com/vishal", href: "https://github.com/vishal" },
  { icon: Link2, label: "LinkedIn", value: "linkedin.com/in/vishal", href: "https://linkedin.com/in/vishal" },
  { icon: MapPin, label: "Location", value: "Latur, Maharashtra, IN", href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Contact" title="Let's talk" subtitle="Open to internship opportunities and collaborations." />

        <div className="grid md:grid-cols-[280px_1fr] gap-6 mt-12">
          <Reveal>
            <div className="space-y-3">
              {links.map((l) => (
                <GlassCard key={l.label} hover={false} className="p-4 flex items-center gap-3">
                  <l.icon size={18} className="text-azure" />
                  <div className="text-sm">
                    <p className="text-mist-dim text-xs">{l.label}</p>
                    {l.href ? (
                      <a href={l.href} className="text-white hover:text-cyan transition-colors break-all">
                        {l.value}
                      </a>
                    ) : (
                      <p className="text-white">{l.value}</p>
                    )}
                  </div>
                </GlassCard>
              ))}
              <a
                href="/resume.pdf"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-azure to-violet font-medium text-sm hover:shadow-[0_0_30px_-5px_rgba(91,140,255,0.6)] transition-shadow"
              >
                <Download size={16} /> Download Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard strong className="p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <CheckCircle2 size={36} className="text-cyan mb-3" />
                  <p className="font-display font-semibold text-lg">Message sent</p>
                  <p className="text-sm text-mist mt-1">Thanks for reaching out — I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="text-xs font-mono uppercase text-mist-dim">Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-azure/50 transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-mist-dim">Email</label>
                    <input
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-azure/50 transition-colors"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-mist-dim">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="mt-1.5 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-azure/50 transition-colors resize-none"
                      placeholder="What would you like to discuss?"
                    />
                    {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-azure to-violet font-medium text-sm hover:shadow-[0_0_30px_-5px_rgba(91,140,255,0.6)] transition-shadow"
                  >
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
