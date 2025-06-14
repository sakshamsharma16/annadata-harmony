
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    label: "Farmer Perspective",
    text: "“Before Annadata and Krishi Mitra, I struggled to sell my harvest at good prices. Now, I use the Krishi Mitra device to check my crop health daily and get instant alerts for pests. Listing on Annadata connects me directly with vendors in town. Last season, I got 22% higher rates and my payments were always on time. Annadata’s cart vendors make pickup easy—even for small batches. I finally feel secure and respected as a farmer.”",
    name: "Suresh Yadav",
    place: "Village Sonpura, UP",
  },
  {
    label: "Freshness",
    text: "“Everything is so fresh, and prices are always fair. I love chatting with the vendor carts!”",
    name: "Asha Singh",
    place: "Kanpur",
  },
  {
    label: "Doorstep",
    text: "“No more morning rush for vegetables—now they come to my gate. Kids love it too!”",
    name: "Narendra Mishra",
    place: "Lucknow",
  },
  {
    label: "Stories",
    text: "“It feels good to buy directly from farmers and see their stories on the Annadata platform.”",
    name: "Priya Sharma",
    place: "Varanasi",
  },
];

export default function Testimonials() {
  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-amber-50">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Badge className="mb-2" variant="outline">Impact Stories</Badge>
        <h1 className="text-3xl font-bold mb-6 animate-fade-in">Testimonials, Case Studies &amp; Field Impact</h1>
        <div className="grid gap-7 md:grid-cols-2">
          {testimonials.map(({ label, text, name, place }, i) => (
            <motion.div
              key={label}
              className="bg-white border rounded-xl shadow-card-hover px-7 py-7 flex flex-col items-center hover:scale-105 transition-all animate-fade-in"
              initial={{ opacity: 0, y: 20, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 * i, duration: 0.37 }}
            >
              <div className="bg-yellow-50 rounded-full w-12 h-12 flex items-center justify-center mb-3 animate-fade-in">
                <Star className="text-yellow-400 w-7 h-7" />
              </div>
              <div className="italic text-gray-700 text-base mb-3 text-center">{text}</div>
              <div className="mt-1 font-semibold text-gray-900 text-sm">{name}</div>
              <div className="text-xs text-gray-500">{place}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
