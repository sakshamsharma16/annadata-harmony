
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Interactive, animated demo map with tooltips on click
const DemoMap = () => {
  const [activePoint, setActivePoint] = useState<null | string>(null);

  const highlights = {
    start: activePoint === "start",
    a: activePoint === "cartA",
    market: activePoint === "market",
  };

  // Point highlight color
  const highlightColor = "#39d353";

  // Label for tooltips
  const tooltips: Record<string, string> = {
    start: "Journey starts here!",
    cartA: "Vendor Cart A: collecting produce.",
    market: "Market: Final destination for delivery.",
  };

  // Info for each point
  const points = [
    {
      id: "start",
      cx: 40, cy: 130, r: 12, fill: highlights.start ? highlightColor : "#FF9933", label: "Start", labelPos: { x: 10, y: 148 }
    },
    {
      id: "cartA",
      cx: 150, cy: 60, r: 12, fill: highlights.a ? highlightColor : "#138808", label: "Cart A", labelPos: { x: 125, y: 50 }
    },
    {
      id: "market",
      cx: 190, cy: 90, r: 10, fill: highlights.market ? highlightColor : "#007DC5", label: "Market", labelPos: { x: 170, y: 103 }
    }
  ];

  return (
    <div className="w-full h-56 rounded-lg border border-green-100 bg-gradient-to-br from-green-100 to-gray-50 flex flex-col items-center justify-center overflow-visible">
      <div className="relative w-60 h-44 mt-2">
        <svg width="100%" height="100%" viewBox="0 0 220 160" className="absolute left-0 top-0 pointer-events-none">
          {/* Path line */}
          <motion.polyline
            points="40,130 70,100 110,120 150,60 190,90"
            fill="none"
            stroke="#06C167"
            strokeWidth="5"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
          {/* Dots on path */}
          <motion.circle
            cx={70} cy={100} r={6} fill="#E8E8E8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          />
          <motion.circle
            cx={110} cy={120} r={6} fill="#E8E8E8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.34 }}
          />
          {/* Interactive route points */}
          {points.map(p =>
            <motion.circle
              key={p.id}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.fill}
              style={{ cursor: "pointer" }}
              stroke={activePoint === p.id ? "#094" : "#fff"}
              strokeWidth={activePoint === p.id ? 4 : 2}
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.93 }}
              animate={activePoint === p.id ? { filter: "drop-shadow(0px 0px 12px #91ffa3)" } : { filter: "none" }}
              onClick={() => setActivePoint(p.id)}
              tabIndex={0}
            />
          )}
        </svg>
        {/* Labels for each point */}
        {points.map(p => (
          <div
            key={p.id}
            className={`absolute pointer-events-none text-xs font-semibold select-none
              ${
                p.id === "start" ? "left-[6px] top-[125px]" :
                p.id === "cartA" ? "left-[118px] top-[39px]" :
                "left-[160px] top-[96px]"
              }
            `}
          >
            <motion.span
              animate={activePoint === p.id ? { color: "#1d6605" } : { color: "#333" }}
              className="rounded px-1 bg-white/70"
            >
              {p.label}
            </motion.span>
          </div>
        ))}
        {/* Tooltips */}
        <AnimatePresence>
          {activePoint && (
            <motion.div
              className="absolute left-[10px] right-[10px] top-[8px] px-3 py-2 bg-green-900/90 text-white rounded-lg text-xs z-20 shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                top: points.find(p => p.id === activePoint)?.cy! - 36,
                left: points.find(p => p.id === activePoint)?.cx! - 1,
                transform: "translate(-50%,-70%)",
                minWidth: 86,
                maxWidth: 142,
              }}
            >
              {tooltips[activePoint]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-3 text-gray-500 text-xs">Tap route points for info</div>
    </div>
  );
};

const CartRouteVisualizerModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg mt-4" size="lg">
          <Map className="w-5 h-5" />
          Cart Route Visualizer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full bg-white rounded-xl shadow-xl animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            🗺️ Cart Route Visualizer
          </DialogTitle>
          <DialogDescription>
            See & interact with a demo vendor cart route.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <DemoMap />
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartRouteVisualizerModal;
