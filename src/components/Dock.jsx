import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, FolderGit2, BrainCircuit, Code2, Link2, FileDown, Mail } from "lucide-react";

const items = [
  { id: "hero", icon: Home, label: "Home", type: "scroll" },
  { id: "about", icon: User, label: "About", type: "scroll" },
  { id: "projects", icon: FolderGit2, label: "Projects", type: "scroll" },
  { id: "skills", icon: Code2, label: "Skills", type: "scroll" },
  { id: "dsa-preview", icon: BrainCircuit, label: "DSA", type: "scroll" },
  { id: "github", icon: Link2, label: "GitHub", type: "link", href: "https://github.com/vishal" },
  { id: "resume", icon: FileDown, label: "Resume", type: "link", href: "/resume.pdf" },
  { id: "contact", icon: Mail, label: "Contact", type: "scroll" },
];

function DockIcon({ item, mouseX, onClick }) {
  const ref = { current: null };
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });
  const widthSync = useTransform(distance, [-120, 0, 120], [40, 62, 40]);
  const width = useSpring(widthSync, { mass: 0.2, stiffness: 220, damping: 16 });
  const Icon = item.icon;

  return (
    <motion.button
      ref={(el) => (ref.current = el)}
      style={{ width }}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      className="relative aspect-square rounded-2xl glass-strong grid place-items-center text-white group"
      aria-label={item.label}
    >
      <Icon size={18} className="text-mist group-hover:text-white transition-colors" />
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-panel border border-white/10 px-2 py-1 text-[10px] font-mono text-mist opacity-0 group-hover:opacity-100 transition-opacity">
        {item.label}
      </span>
    </motion.button>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    if (item.type === "link") {
      window.open(item.href, "_blank");
      return;
    }
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: item.id } });
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 inset-x-0 z-50 hidden sm:flex justify-center px-4"
    >
      <div className="flex items-end gap-2 px-3 py-2 rounded-2xl glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]">
        {items.map((item) => (
          <DockIcon key={item.id} item={item} mouseX={mouseX} onClick={() => handleClick(item)} />
        ))}
      </div>
    </motion.div>
  );
}
