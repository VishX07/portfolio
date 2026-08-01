import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const GRADIENTS = {
  azure: "bg-gradient-to-r from-azure to-violet",
  cyan: "bg-gradient-to-r from-cyan to-azure",
  violet: "bg-gradient-to-r from-violet to-cyan",
};

export function ProgressBar({ label, solved, total, color = "azure" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const pct = Math.round((solved / total) * 100);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1.5 text-xs font-mono">
        <span className="text-mist">{label}</span>
        <span className="text-mist-dim">
          {solved}/{total}
        </span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${GRADIENTS[color] || GRADIENTS.azure}`}
        />
      </div>
    </div>
  );
}
