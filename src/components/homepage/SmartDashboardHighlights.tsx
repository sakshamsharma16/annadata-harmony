
import React from "react";
import { m } from "framer-motion";
import { BarChart3, AlertTriangle, WandSparkles } from "lucide-react";

const dashboardFeatures = [
  {
    icon: <WandSparkles className="h-7 w-7 text-[#138808]" />,
    title: "Personalized Crop Recommendations",
    description: "Smart suggestions based on soil, season, and local demand. Maximize productivity, minimize guesswork.",
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-blue-600" />,
    title: "Crop Health Index",
    description: "Clear health scores and graphs for every field. Track trends, catch problems fast.",
  },
  {
    icon: <AlertTriangle className="h-7 w-7 text-red-600" />,
    title: "Instant Disease & Pest Alerts",
    description: "Get real-time warnings and recommended actions—stop threats before they spread.",
  },
];

const parentFade = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.19,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: "easeOut" as const }},
};

export default function SmartDashboardHighlights() {
  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Smart Farmer Dashboard</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All your essential farm insights & actions in one easy, visual dashboard powered by Annadata and Krishi Mitra
          </p>
        </div>
        <m.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          variants={parentFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {dashboardFeatures.map((feature, idx) => (
            <m.div
              key={idx}
              className="flex-1 max-w-md bg-gradient-to-b from-[#F7FFF2] to-white border rounded-xl px-6 py-8 mx-auto shadow hover:shadow-lg text-center flex flex-col items-center"
              variants={fadeUp}
            >
              <div className="mb-4 p-3 rounded-full bg-white shadow-sm">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
