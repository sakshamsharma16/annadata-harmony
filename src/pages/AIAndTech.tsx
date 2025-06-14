
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu, LineChart, Truck, Database, Cloud } from "lucide-react";

const techStackDetails = [
  { icon: <Cpu className="text-[#138808] w-6 h-6" />, title: "Teensy 4.1", desc: "Ultra-fast microcontroller powering Krishi Mitra’s hardware features." },
  { icon: <LineChart className="text-[#FF9933] w-6 h-6" />, title: "NPK Sensors", desc: "Analyze soil nutrients instantly for best crop recommendations." },
  { icon: <Cloud className="text-blue-600 w-6 h-6" />, title: "Cloud Integration", desc: "Seamless data transfer between device, mobile app, and dashboard." },
  { icon: <Database className="text-purple-600 w-6 h-6" />, title: "AI/ML Models", desc: "Dynamic engines for real-time crop health, recommendation, price prediction, and vendor route optimization." },
  { icon: <Truck className="text-emerald-600 w-6 h-6" />, title: "Route Optimization", desc: "AI-powered delivery planning for faster, fairer, and greener supply chains." }
];

export default function AIAndTech() {
  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-3xl mx-auto">
        <Badge className="mb-2" variant="outline">AI &amp; Technology</Badge>
        <h1 className="text-3xl font-bold mb-4">AI-Powered Systems &amp; Our Technology Edge</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How Annadata Uses AI &amp; ML</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-4">
            <li>
              <strong>Crop Health Monitoring:</strong> Computer vision and smart sensors track plant health, detect diseases/pests, and provide instant action tips.
            </li>
            <li>
              <strong>Recommendation Systems:</strong> Personalized crop, fertilizer, and irrigation recommendations based on live soil data, season, and market demand.
            </li>
            <li>
              <strong>Vendor Route Optimization:</strong> AI algorithms plan efficient vendor delivery routes, reducing waste and ensuring quicker doorstep delivery for consumers.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Our Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {techStackDetails.map((t, i) => (
              <div key={i} className="flex gap-3 items-start bg-white p-4 rounded-lg border hover:shadow transition-all">
                <div>{t.icon}</div>
                <div>
                  <div className="font-bold">{t.title}</div>
                  <div className="text-gray-600 text-sm">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-gray-600 text-base">
          Annadata and Krishi Mitra combine advanced hardware, cloud tech, and AI/ML to empower every link in the agricultural value chain.
        </p>
      </div>
    </main>
  );
}
