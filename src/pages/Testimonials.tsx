
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { CircleWheelSwitcher } from "@/components/ui/CircleWheelSwitcher";

const stories = [
  {
    label: "Case",
    content: (
      <section className="mb-2">
        <h2 className="text-lg font-semibold mb-2">Case Study: Farmer Perspective</h2>
        <div className="bg-white border rounded-lg p-4 mb-2">
          <p className="italic text-gray-700">
            “Before Annadata and Krishi Mitra, I struggled to sell my harvest at good prices. Now, I use the Krishi Mitra device to check my crop health daily and get instant alerts for pests. Listing on Annadata connects me directly with vendors in town. Last season, I got 22% higher rates and my payments were always on time. Annadata’s cart vendors make pickup easy—even for small batches. I finally feel secure and respected as a farmer.”
          </p>
          <div className="mt-2 font-semibold">– Suresh Yadav, Village Sonpura, UP</div>
        </div>
      </section>
    ),
  },
  {
    label: "Fresh",
    content: (
      <div className="bg-white border rounded-xl p-4 flex items-center gap-3 mb-2">
        <Star className="text-yellow-400" />
        <span className="font-medium">
          “Everything is so fresh, and prices are always fair. I love chatting with the vendor carts!”
        </span>
      </div>
    ),
  },
  {
    label: "Gate",
    content: (
      <div className="bg-white border rounded-xl p-4 flex items-center gap-3 mb-2">
        <Star className="text-yellow-400" />
        <span className="font-medium">
          “No more morning rush for vegetables—now they come to my gate. Kids love it too!”
        </span>
      </div>
    ),
  },
  {
    label: "Stories",
    content: (
      <div className="bg-white border rounded-xl p-4 flex items-center gap-3 mb-2">
        <Star className="text-yellow-400" />
        <span className="font-medium">
          “It feels good to buy directly from farmers and see their stories on the Annadata platform.”
        </span>
      </div>
    ),
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-2xl mx-auto">
        <Badge className="mb-2" variant="outline">Impact Stories</Badge>
        <h1 className="text-3xl font-bold mb-4">Testimonials, Case Studies &amp; Field Impact</h1>
        <CircleWheelSwitcher items={stories} active={active} setActive={setActive} className="mb-6" />
      </div>
    </main>
  );
}
