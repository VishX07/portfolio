import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <div className={`flex items-center gap-3 mb-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-azure to-violet" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{eyebrow}</span>
      </div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-mist max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
