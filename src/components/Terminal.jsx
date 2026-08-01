import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Minus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RESPONSES = {
  help: "Commands: about, skills, projects, dsa, resume, contact, whoami, clear",
  whoami: "vishal — CSE student, MERN developer, DSA enthusiast, building AlphaCare.",
  about:
    "CSE student building scalable applications and preparing for software engineering roles. Currently deep in DSA, Java, and Spring Boot.",
  skills: "React, Node.js, Express, MongoDB, MySQL, Java, JavaScript, Git, Postman.",
  projects: "AlphaCare (hospital booking), Grocery App, Java Todo App, Chat Application. Type 'open projects' to view.",
  dsa: "120+ problems across arrays, strings, trees, graphs and more. Type 'open dsa' for the full dashboard.",
  resume: "Downloading resume...",
  contact: "Reach me at vishal@example.com or via the contact form below.",
};

export default function Terminal() {
  const [open, setOpen] = useState(true);
  const [minimized, setMinimized] = useState(true);
  const [lines, setLines] = useState([
    { type: "out", text: "Welcome. Type 'help' to see available commands." },
  ]);
  const [value, setValue] = useState("");
  const constraintsRef = useRef(null);
  const navigate = useNavigate();

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let out;
    if (trimmed === "clear") {
      setLines([]);
      return;
    } else if (trimmed === "open projects") {
      out = "Scrolling to projects...";
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (trimmed === "open dsa") {
      out = "Opening DSA dashboard...";
      navigate("/dsa");
    } else if (RESPONSES[trimmed]) {
      out = RESPONSES[trimmed];
    } else if (trimmed === "") {
      return;
    } else {
      out = `command not found: ${trimmed} — type 'help'`;
    }
    setLines((l) => [...l, { type: "cmd", text: cmd }, { type: "out", text: out }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  if (!open) return null;

  return (
    <div ref={constraintsRef} className="fixed inset-0 z-40 pointer-events-none">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        initial={{ x: 24, y: window.innerHeight - 380, opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute pointer-events-auto w-[320px] sm:w-[380px] rounded-xl glass-strong overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        style={{ left: 24, bottom: 24 }}
      >
        <div className="flex items-center justify-between px-3 py-2 bg-white/5 cursor-move border-b border-white/10">
          <div className="flex items-center gap-2">
            <TerminalSquare size={14} className="text-cyan" />
            <span className="font-mono text-[11px] text-mist">vishal@portfolio:~</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMinimized((m) => !m)} className="text-mist-dim hover:text-white">
              <Minus size={13} />
            </button>
            <button onClick={() => setOpen(false)} className="text-mist-dim hover:text-white">
              <X size={13} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="h-52 overflow-y-auto px-3 py-2 font-mono text-[12px] space-y-1">
                {lines.map((l, i) => (
                  <div key={i} className={l.type === "cmd" ? "text-cyan" : "text-mist"}>
                    {l.type === "cmd" ? `❯ ${l.text}` : l.text}
                  </div>
                ))}
              </div>
              <form onSubmit={onSubmit} className="flex items-center gap-2 px-3 py-2 border-t border-white/10">
                <span className="text-cyan font-mono text-[12px]">❯</span>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-mono text-[12px] text-white placeholder:text-mist-dim"
                  placeholder="type a command..."
                  autoComplete="off"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
