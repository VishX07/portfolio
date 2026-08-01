import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", strong = false, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, transition: { duration: 0.25 } } : undefined}
      className={`${strong ? "glass-strong" : "glass"} rounded-3xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
