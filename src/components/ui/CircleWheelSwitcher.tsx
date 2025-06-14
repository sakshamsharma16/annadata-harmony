
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CircleWheelSwitcherProps {
  items: { label: string; content: React.ReactNode }[];
  active: number;
  setActive: (idx: number) => void;
  className?: string;
}

const colors = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-[#F7C873]",
  "bg-[#2BAE66]",
  "bg-[#283747]",
];

export const CircleWheelSwitcher: React.FC<CircleWheelSwitcherProps> = ({
  items,
  active,
  setActive,
  className = "",
}) => {
  const n = items.length;
  const radius = 54;

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Wheel Circles */}
      <div className="relative w-40 h-40 mb-2">
        {/* Center Active Indicator */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="rounded-full w-16 h-16 flex items-center justify-center text-white text-xl shadow-lg bg-gradient-to-br from-green-500 to-green-700"
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 110 }}
            key={items[active].label}
          >
            {items[active].label}
          </motion.div>
        </div>
        {/* Wheel Item Circles */}
        {items.map((item, idx) => {
          if (idx === active) return null;
          const angle = ((2 * Math.PI) / n) * idx - Math.PI / 2;
          const x = Math.cos(angle) * radius + 80;
          const y = Math.sin(angle) * radius + 80;

          return (
            <motion.button
              type="button"
              key={item.label}
              className={`absolute z-10 rounded-full w-10 h-10 text-white font-bold ring-2 ring-white shadow-md flex items-center justify-center transition border ${colors[idx % colors.length]} hover:scale-110`}
              style={{
                left: x,
                top: y,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(idx)}
              aria-label={item.label}
            >
              {item.label[0]}
            </motion.button>
          );
        })}
      </div>
      {/* Animated Content */}
      <div className="mt-1 min-h-[80px] w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, type: "spring" }}
            className="w-full"
          >
            {items[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
