import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";

// Grounded in the AlphaCare architecture notes (src/data/projects.js): a modular
// Express backend (route / auth / controller-service / model layers), MongoDB,
// deployed separately on Render (API) and Vercel (client).
const stages = [
  {
    code: "01",
    label: "Client",
    tag: "React",
    title: "Request leaves the browser",
    text: "A user action in the React front end fires a fetch/axios call to the API.",
  },
  {
    code: "02",
    label: "Route",
    tag: "Express",
    title: "The router matches a handler",
    text: "Express matches the path and HTTP method to a route handler.",
  },
  {
    code: "03",
    label: "Auth",
    tag: "Session",
    title: "Session and role are checked",
    text: "OTP-based sessions and role checks — patient, doctor, admin — run before the handler executes.",
  },
  {
    code: "04",
    label: "Logic",
    tag: "Service layer",
    title: "Business logic runs",
    text: "The controller hands off to a dedicated service layer, kept separate from routing and data access.",
  },
  {
    code: "05",
    label: "Data",
    tag: "MongoDB",
    title: "The database reads or writes",
    text: "Mongoose models persist and query the collections behind the feature.",
  },
  {
    code: "06",
    label: "Response",
    tag: "Render → Vercel",
    title: "The response travels back",
    text: "JSON comes back from the API on Render to the React client on Vercel.",
  },
];

const MOBILE_BREAKPOINT = 760;
// The scroll range is windowed so the packet rests at the first/last node
// rather than starting mid-transition the instant the section pins.
const REST_START = 0.06;
const REST_END = 0.94;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function RequestFlow() {
  const wrapperRef = useRef(null);
  const railRef = useRef(null);
  const dotRefs = useRef([]);
  const reducedMotion = usePrefersReducedMotion();

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );
  const [centers, setCenters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Absolute pixel position of the traveling packet along the rail's main axis.
  const packetPos = useMotionValue(0);
  // Fill bar length, anchored to the first node's center (not the rail edge).
  const fillLength = useTransform(packetPos, (v) => Math.max(0, v - (centers[0] ?? 0)));

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const railBox = rail.getBoundingClientRect();
    const next = dotRefs.current.map((el) => {
      if (!el) return 0;
      const box = el.getBoundingClientRect();
      return isMobile
        ? box.top - railBox.top + box.height / 2
        : box.left - railBox.left + box.width / 2;
    });
    setCenters(next);
  }, [isMobile]);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = stages.length;
    const windowed = Math.min(1, Math.max(0, (v - REST_START) / (REST_END - REST_START)));
    const scaled = windowed * (n - 1);
    const index = Math.min(n - 1, Math.max(0, Math.round(scaled)));

    setActiveIndex((prev) => (prev === index ? prev : index));

    if (!centers.length) return;

    if (reducedMotion) {
      packetPos.set(centers[index] ?? 0);
      return;
    }

    const lo = Math.min(n - 2, Math.max(0, Math.floor(scaled)));
    const hi = Math.min(n - 1, lo + 1);
    const t = Math.min(1, Math.max(0, scaled - lo));
    const eased = t * t * (3 - 2 * t);
    const from = centers[lo] ?? 0;
    const to = centers[hi] ?? from;
    packetPos.set(from + (to - from) * eased);
  });

  return (
    <section
      id="request-flow"
      ref={wrapperRef}
      className="relative"
      style={{ height: isMobile ? "220vh" : "320vh" }}
    >
      <div className="sticky top-24 h-[calc(100vh-96px)] flex flex-col justify-center px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-gradient-to-r from-azure to-violet" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                07 &middot; Request Journey
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              How a request travels
            </h2>
          </Reveal>

          <div className={`mt-14 flex gap-10 ${isMobile ? "flex-row items-stretch" : "flex-col"}`}>
            <div
              ref={railRef}
              className={`relative ${
                isMobile
                  ? "flex flex-col justify-between py-2 w-[100px] shrink-0"
                  : "flex items-center justify-between"
              }`}
              style={isMobile ? { minHeight: 360 } : undefined}
            >
              {/* base track */}
              <span
                className="absolute rounded-full bg-white/10"
                style={
                  isMobile
                    ? {
                        width: 1,
                        left: 4.5,
                        top: centers[0] ?? 0,
                        height: Math.max(0, (centers[centers.length - 1] ?? 0) - (centers[0] ?? 0)),
                      }
                    : {
                        height: 1,
                        top: 4.5,
                        left: centers[0] ?? 0,
                        width: Math.max(0, (centers[centers.length - 1] ?? 0) - (centers[0] ?? 0)),
                      }
                }
              />

              {/* progress fill, same anchor as the base track */}
              <motion.span
                className={`absolute rounded-full bg-gradient-to-r from-azure via-violet to-cyan ${
                  isMobile ? "w-[2px]" : "h-[2px]"
                }`}
                style={
                  isMobile
                    ? { left: 4, top: centers[0] ?? 0, height: fillLength }
                    : { top: 4, left: centers[0] ?? 0, width: fillLength }
                }
              />

              {stages.map((stage, i) => (
                <div
                  key={stage.code}
                  ref={(el) => (dotRefs.current[i] = el)}
                  className={`relative z-10 flex ${
                    isMobile ? "flex-row items-center gap-3" : "flex-col items-center gap-3"
                  }`}
                >
                  <span
                    className={`rounded-full border transition-all duration-300 ${
                      i === activeIndex
                        ? "h-4 w-4 border-azure bg-azure shadow-[0_0_16px_rgba(91,140,255,0.7)] scale-125"
                        : i < activeIndex
                          ? "h-2.5 w-2.5 border-cyan/60 bg-cyan/40"
                          : "h-2.5 w-2.5 border-white/20 bg-void"
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${
                      i === activeIndex ? "text-white" : "text-mist-dim"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              ))}

              {/* traveling request packet */}
              <motion.span
                className="absolute h-2 w-2 rotate-45 bg-cyan shadow-[0_0_18px_rgba(94,234,212,0.85)]"
                style={
                  isMobile
                    ? { left: -1, top: packetPos, marginTop: -4 }
                    : { top: -1, left: packetPos, marginLeft: -4 }
                }
              />
            </div>

            <div className={isMobile ? "flex-1 flex items-center" : "mt-4"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-xl"
                >
                  <div className="flex items-center gap-3 mb-2 font-mono text-xs text-mist-dim">
                    <span className="text-cyan">{stages[activeIndex].code}</span>
                    <span>{stages[activeIndex].tag}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-2">
                    {stages[activeIndex].title}
                  </h3>
                  <p className="text-sm sm:text-base text-mist leading-relaxed">
                    {stages[activeIndex].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
