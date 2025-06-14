
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, LineChart, Truck, Database, Cloud } from "lucide-react";
import { CircleWheelSwitcher } from "@/components/ui/CircleWheelSwitcher";

const techStackDetails = [
  { icon: <Cpu className="text-[#138808] w-6 h-6" />, title: "Teensy 4.1", desc: "Ultra-fast microcontroller powering Krishi Mitra’s hardware features." },
  { icon: <LineChart className="text-[#FF9933] w-6 h-6" />, title: "NPK Sensors", desc: "Analyze soil nutrients instantly for best crop recommendations." },
  { icon: <Cloud className="text-blue-600 w-6 h-6" />, title: "Cloud Integration", desc: "Seamless data transfer between device, mobile app, and dashboard." },
  { icon: <Database className="text-purple-600 w-6 h-6" />, title: "AI/ML Models", desc: "Dynamic engines for real-time crop health, recommendation, price prediction, and vendor route optimization." },
  { icon: <Truck className="text-emerald-600 w-6 h-6" />, title: "Route Optimization", desc: "AI-powered delivery planning for faster, fairer, and greener supply chains." }
];

const aiFeatures = [
  {
    label: "Health",
    content: (
      <div>
        <b>Crop Health Monitoring:</b>
        <p className="text-gray-600 text-sm mt-1">
          Computer vision and smart sensors track plant health, detect diseases/pests, giving instant action tips.
        </p>
      </div>
    ),
  },
  {
    label: "Recommend",
    content: (
      <div>
        <b>Recommendation Systems:</b>
        <p className="text-gray-600 text-sm mt-1">
          Personalized crop, fertilizer, and irrigation advice based on real soil data, season, and market demand.
        </p>
      </div>
    ),
  },
  {
    label: "Routes",
    content: (
      <div>
        <b>Route Optimization:</b>
        <p className="text-gray-600 text-sm mt-1">
          AI plans vendor delivery routes, reducing waste and ensuring faster doorstep delivery.
        </p>
      </div>
    ),
  },
];

export default function AIAndTech() {
  const [activeAI, setActiveAI] = useState(0);
  const [activeTech, setActiveTech] = useState(0);

  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-3xl mx-auto">
        <Badge className="mb-2" variant="outline">AI &amp; Technology</Badge>
        <h1 className="text-3xl font-bold mb-4">AI-Powered Systems &amp; Our Technology Edge</h1>
        
        {/* AI Features Interactive Circle Switcher */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How Annadata Uses AI &amp; ML</h2>
          <CircleWheelSwitcher items={aiFeatures} active={activeAI} setActive={setActiveAI} className="my-4" />
        </section>

        {/* Tech Stack Radial Switcher */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Tech Stack</h2>
          <CircleWheelSwitcher
            items={
              techStackDetails.map((t) => ({
                label: t.title,
                content: (
                  <div className="flex items-start gap-3">
                    {t.icon}
                    <div>
                      <div className="font-bold">{t.title}</div>
                      <div className="text-gray-600 text-sm">{t.desc}</div>
                    </div>
                  </div>
                ),
              }))
            }
            active={activeTech}
            setActive={setActiveTech}
            className="mb-2"
          />
        </section>

        <p className="mt-8 text-gray-600 text-base">
          Annadata and Krishi Mitra combine advanced hardware, cloud tech, and AI/ML to empower every link in the agricultural value chain.
        </p>
      </div>
    </main>
  );
}
