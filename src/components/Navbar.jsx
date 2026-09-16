import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";

const links = [
  { label: "Home", href: "hero" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Request Flow", href: "request-flow" },
  { label: "DSA", href: "dsa-preview" },
  { label: "Timeline", href: "timeline" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className={`w-full max-w-6xl rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-shadow ${
          scrolled ? "glass-strong shadow-[0_8px_40px_-12px_rgba(91,140,255,0.25)]" : "glass"
        }`}
      >
        <button onClick={() => goTo("hero")} className="flex items-center gap-2 group">
          <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-azure to-violet grid place-items-center font-display font-bold text-sm">
            V
          </span>
          <span className="font-display font-semibold text-sm sm:text-base hidden sm:inline">
            Vishal <span className="text-mist-dim">Portfolio</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => goTo(l.href)}
              className="px-3 py-1.5 rounded-lg text-mist hover:text-white hover:bg-white/5 transition-colors uppercase tracking-wide"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[11px] font-mono text-cyan">
            <Sparkles size={12} /> Available for internship
          </span>
          <span className="hidden md:flex items-center gap-1 text-xs text-mist-dim">
            <MapPin size={13} /> Latur, IN
          </span>
        </div>
      </div>
    </motion.header>
  );
}
