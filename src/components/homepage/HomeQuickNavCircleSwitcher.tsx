
import React from "react";
import { Cpu, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const options = [
  {
    label: "AI & Tech",
    icon: <Cpu className="w-7 h-7 text-green-700" />,
    to: "/aiandtech",
    bg: "from-[#c2ffd2] to-[#e6ffe6]",
    ring: "ring-green-700/20",
    shadow: "shadow-green-200 hover:shadow-green-300",
  },
  {
    label: "Partnerships",
    icon: <Sparkles className="w-7 h-7 text-orange-500" />,
    to: "/partnerships",
    bg: "from-[#ffe8c4] to-[#fff6e6]",
    ring: "ring-orange-500/20",
    shadow: "shadow-orange-200 hover:shadow-orange-300",
  },
  {
    label: "Testimonials",
    icon: <Star className="w-7 h-7 text-yellow-500" />,
    to: "/testimonials",
    bg: "from-[#fff8c2] to-[#fffae6]",
    ring: "ring-yellow-500/20",
    shadow: "shadow-yellow-200 hover:shadow-yellow-300",
  }
];

const spring = {
  type: "spring",
  stiffness: 600,
  damping: 30,
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 }
  }
};

const HomeQuickNavCircleSwitcher: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full flex justify-center mb-12">
      <motion.div
        className="flex items-center gap-7"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {options.map((opt, i) => (
          <motion.button
            type="button"
            key={opt.label}
            variants={{
              hidden: { opacity: 0, scale: 0.7, y: 36 },
              visible: { opacity: 1, scale: 1, y: 0, transition: spring },
            }}
            className={`group relative ring-2 ${opt.ring} ${opt.shadow} bg-gradient-to-br ${opt.bg} rounded-full w-24 h-24 flex flex-col items-center justify-center transition-all duration-200 focus-visible:ring-4 hover:scale-110 active:scale-100 focus:outline-none border-2 border-white/70`}
            onClick={() => navigate(opt.to)}
            aria-label={opt.label}
            tabIndex={0}
          >
            <span className="mb-2">{opt.icon}</span>
            <span className="font-bold text-green-900 text-sm opacity-90">{opt.label}</span>
            <motion.span
              className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-br from-white/50 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.07 }}
              transition={{ duration: 0.28 }}
            />
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeQuickNavCircleSwitcher;
