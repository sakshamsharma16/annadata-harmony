
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, LineChart, Truck, Database, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const techStackDetails = [
  { icon: <Cpu className="text-[#138808] w-7 h-7" />, title: "Teensy 4.1", desc: "Ultra-fast microcontroller powering Krishi Mitra’s hardware features." },
  { icon: <LineChart className="text-[#FF9933] w-7 h-7" />, title: "NPK Sensors", desc: "Analyze soil nutrients instantly for best crop recommendations." },
  { icon: <Cloud className="text-blue-600 w-7 h-7" />, title: "Cloud Integration", desc: "Seamless data transfer between device, mobile app, and dashboard." },
  { icon: <Database className="text-purple-600 w-7 h-7" />, title: "AI/ML Models", desc: "Dynamic engines for real-time crop health, recommendation, price prediction, and vendor route optimization." },
  { icon: <Truck className="text-emerald-600 w-7 h-7" />, title: "Route Optimization", desc: "AI-powered delivery planning for faster, fairer, and greener supply chains." }
];

const aiFeatures = [
  {
    title: "Crop Health Monitoring",
    desc: "Computer vision and smart sensors track plant health, detect diseases/pests, and deliver instant action tips.",
  },
  {
    title: "Recommendation Systems",
    desc: "Personalized crop, fertilizer, and irrigation advice based on real soil data, season, and market demand.",
  },
  {
    title: "Route Optimization",
    desc: "AI plans vendor delivery routes, reducing waste and ensuring faster doorstep delivery.",
  },
];

export default function AIAndTech() {
  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Badge className="mb-2" variant="outline">AI &amp; Technology</Badge>
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">AI-Powered Systems &amp; Our Technology Edge</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How Annadata Uses AI &amp; ML</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {aiFeatures.map(({title, desc}, i) => (
              <motion.div
                key={title}
                className="bg-white border rounded-xl shadow-card-hover p-5 flex flex-col items-center text-center hover:scale-105 transition-all"
                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i, duration: 0.4 }}
              >
                <div className="bg-green-50 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Cpu className="text-green-600 w-7 h-7" />
                </div>
                <div className="font-bold mb-2">{title}</div>
                <div className="text-gray-600 text-sm">{desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Tech Stack</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {techStackDetails.map(({icon, title, desc}, i) => (
              <motion.div
                key={title}
                className="bg-gradient-to-br from-[#e6ffe6] to-white border rounded-xl shadow hover:shadow-green-200 p-5 flex items-start gap-4 hover:scale-102 transition-all"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.07 * i, duration: 0.35 }}
              >
                <div className="shrink-0">{icon}</div>
                <div>
                  <div className="font-bold text-lg mb-1">{title}</div>
                  <div className="text-gray-600 text-sm">{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.p className="mt-8 text-gray-600 text-base animate-fade-in" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
          Annadata and Krishi Mitra combine advanced hardware, cloud tech, and AI/ML to empower every link in the agricultural value chain.
        </motion.p>
      </motion.div>
    </main>
  );
}
