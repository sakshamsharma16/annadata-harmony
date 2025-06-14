
import React from "react";
import { Cpu, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Enhanced visual options with corrected links ---
const options = [
  {
    label: "AI & Tech",
    icon: <Cpu className="w-8 h-8 text-green-700 drop-shadow-glow" />,
    to: "/ai-and-tech", // CORRECTED PATH
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
    glow: "shadow-[0_0_24px_2px_rgba(251,191,36,0.15)]",
  }
];

const spring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 22,
  mass: 1.15,
};

// Enhanced variants for better entrance and interaction
const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 44, rotate: -12 },
  visible: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: spring },
};

const HomeQuickNavCircleSwitcher: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full flex justify-center mb-14 mt-4 animate-fade-in">
      <motion.div
        className="flex items-center gap-9"
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
              transition-[box-shadow,transform] duration-200
              hover:scale-110 active:scale-98
              focus-visible:ring-4 focus-visible:ring-offset-2
              border-2 border-white/80
              outline-none
              shadow-lg
            `}
            variants={itemVariants}
            whileHover={{
              scale: 1.16,
              rotate: 2,
              boxShadow: "0 0 36px 8px #ecfccb,0 8px 32px rgba(76,175,80,.12)"
            }}
            whileTap={{
              scale: 0.94,
              rotate: -3,
              boxShadow: "0 0 18px 5px #bbf7d0,0 6px 20px rgba(76,175,80,.09)"
            }}
            onClick={() => navigate(opt.to)}
            aria-label={opt.label}
            tabIndex={0}
            title={opt.label}
            initial="hidden"
            animate="visible"
            transition={spring}
          >
            {/* Decorative rotating animated ring */}
            <motion.span
              className="absolute z-0 inset-0 rounded-full"
              style={{
                background: "radial-gradient(ellipse at 55% 18%,rgba(255,255,255,0.38) 0%,rgba(255,255,255,0.13) 50%,rgba(0,0,0,0.02) 100%)"
              }}
              animate={{
                rotate: [0, 16, 0]
              }}
              transition={{
                duration: 4.5 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="mb-2 z-10 animate-fade-in pointer-events-none">{opt.icon}</span>
            <span className="font-bold text-green-900 text-base md:text-lg opacity-90 select-none pointer-events-none z-10 tracking-tight drop-shadow">
              {opt.label}
            </span>
            {/* Subtle pulsing border ring and glow effect */}
            <AnimatePresence>
              <motion.span
                layoutId={`circle-pulse-${opt.label}`}
                className="absolute inset-0 rounded-full border-2 border-white/60 z-10 pointer-events-none group-hover:animate-pulse"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1.13 }}
                exit={{ opacity: 0, scale: 1.22 }}
                transition={{ duration: 0.44, delay: 0.04 * i }}
              />
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeQuickNavCircleSwitcher;
