
import React, { useState } from "react";
import { Cpu, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Fixed links & subtle, elegant animations ---
const options = [
  {
    label: "AI & Tech",
    icon: <Cpu className="w-8 h-8 text-green-700 drop-shadow-glow" />,
    to: "/ai-and-tech",
    bg: "from-[#c2ffd2] to-[#e6ffe6]",
    ring: "ring-green-700/25",
    shadow: "shadow-green-300 hover:shadow-green-500",
    glow: "shadow-[0_0_24px_2px_rgba(34,197,94,0.11)]",
  },
  {
    label: "Partnerships",
    icon: <Sparkles className="w-8 h-8 text-orange-500 drop-shadow-glow" />,
    to: "/partnerships",
    bg: "from-[#ffe8c4] to-[#fff6e6]",
    ring: "ring-orange-500/25",
    shadow: "shadow-orange-200 hover:shadow-orange-300",
    glow: "shadow-[0_0_24px_2px_rgba(251,146,60,0.13)]",
  },
  {
    label: "Testimonials",
    icon: <Star className="w-8 h-8 text-yellow-500 drop-shadow-glow" />,
    to: "/testimonials",
    bg: "from-[#fff8c2] to-[#fffae6]",
    ring: "ring-yellow-500/25",
    shadow: "shadow-yellow-300 hover:shadow-yellow-400",
    glow: "shadow-[0_0_24px_2px_rgba(251,191,36,0.14)]",
  }
];

const spring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 26,
  mass: 1.18,
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.17 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 55, rotate: -15 },
  visible: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: spring },
};

const HomeQuickNavCircleSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="w-full flex justify-center mb-14 mt-4 animate-fade-in">
      <motion.div
        className="flex items-center gap-10"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {options.map((opt, i) => (
          <motion.button
            key={opt.label}
            type="button"
            className={`
              group relative focus:outline-none
              ring-2 ${opt.ring} ${opt.shadow} ${opt.glow}
              bg-gradient-to-br ${opt.bg}
              rounded-full w-28 h-28 md:w-32 md:h-32
              flex flex-col items-center justify-center
              transition-all duration-200
              hover:scale-110 hover:z-[2] active:scale-[0.97]
              focus-visible:ring-4 focus-visible:ring-offset-2
              border-2 border-white/80
              outline-none
              shadow-xl
              ${hoveredIdx === i ? "scale-110 shadow-2xl" : ""}
            `}
            variants={itemVariants}
            whileHover={{
              scale: 1.13,
              rotate: 2,
              boxShadow: "0 0 36px 12px #baffc3,0 14px 44px rgba(76,175,80,.10)",
            }}
            whileTap={{
              scale: 0.93,
              rotate: -2,
              boxShadow: "0 0 18px 5px #bbf7d0,0 6px 20px rgba(76,175,80,.13)",
            }}
            onClick={() => navigate(opt.to)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            aria-label={opt.label}
            tabIndex={0}
            title={opt.label}
            initial="hidden"
            animate="visible"
            transition={spring}
          >
            {/* Rotating gradient ring for subtle shine */}
            <motion.span
              className="absolute z-0 inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 55% 18%,rgba(255,255,255,0.36) 0%,rgba(255,255,255,0.14) 50%,rgba(0,0,0,0.02) 100%)"
              }}
              animate={{
                rotate: hoveredIdx === i ? [0, 25, 0] : [0, 12, 0]
              }}
              transition={{
                duration: hoveredIdx === i ? 2.7 : 4.5 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Slight pop of icon on hover */}
            <motion.span
              className="mb-2 z-10 animate-fade-in pointer-events-none"
              animate={hoveredIdx === i ? { scale: 1.11 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 440, damping: 20 }}
            >
              {opt.icon}
            </motion.span>
            <span className="font-bold text-green-900 text-base md:text-lg opacity-90 select-none pointer-events-none z-10 tracking-tight drop-shadow animate-fade-in">
              {opt.label}
            </span>
            {/* Glow pulse border on hover */}
            <AnimatePresence>
              <motion.span
                layoutId={`circle-pulse-${opt.label}`}
                className={`absolute inset-0 rounded-full border-2 z-10 pointer-events-none ${hoveredIdx === i ? "border-white/90" : "border-white/60"} group-hover:animate-pulse`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  scale: hoveredIdx === i ? 1.19 : 1.08,
                  boxShadow: hoveredIdx === i ? "0 0 0 7px #fff9" : undefined,
                }}
                exit={{ opacity: 0, scale: 1.22 }}
                transition={{ duration: 0.46, delay: 0.05 * i }}
              />
            </AnimatePresence>
            {/* Mini floating label on hover */}
            {hoveredIdx === i && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 9 }}
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 bg-white px-3 py-1 rounded-full text-xs text-green-700 shadow animate-fade-in border border-green-100"
              >
                View {opt.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeQuickNavCircleSwitcher;
