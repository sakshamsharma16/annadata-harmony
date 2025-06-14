
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users, Globe, Sparkles } from "lucide-react";
import { CircleWheelSwitcher } from "@/components/ui/CircleWheelSwitcher";

const partnershipSections = [
  {
    label: "Who",
    content: (
      <div>
        <div className="mb-4 flex gap-2">
          <Handshake className="h-7 w-7 text-[#138808]" />
          <Users className="h-7 w-7 text-[#FF9933]" />
          <Globe className="h-7 w-7 text-blue-600" />
        </div>
        <p className="text-gray-700 mb-2">
          Annadata believes in inclusive growth and collaboration at every level of rural innovation. We invite:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>Rural innovators and entrepreneurs</li>
          <li>Agricultural NGOs &amp; FPOs</li>
          <li>Government agencies and extension services</li>
          <li>Colleges, students, and agri-tech enthusiasts</li>
        </ul>
      </div>
    ),
  },
  {
    label: "How",
    content: (
      <section className="mb-8 bg-white border p-5 rounded-xl shadow hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Sparkles /> Call for Collaboration</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Implement pilot projects and joint rural innovation programs</li>
          <li>Scale Annadata’s cart vendor network and doorstep delivery model</li>
          <li>Enable digital literacy and agri-entrepreneurship in rural India</li>
          <li>Collaborate on expanding Annadata’s AI/IoT powered platform</li>
        </ul>
      </section>
    ),
  },
  {
    label: "Join",
    content: (
      <div className="bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 border px-6 py-5 rounded-lg text-center">
        <p className="font-semibold text-lg mb-2">
          Ready to make an impact?
        </p>
        <p className="mb-4 text-gray-700">
          Join as a partner, mentor, developer, or investor.
        </p>
        <a
          href="mailto:hello@annadata.ai"
          className="inline-block bg-[#138808] px-6 py-2 rounded text-white hover:bg-[#138808]/90 transition"
        >
          Contact Us
        </a>
      </div>
    ),
  },
];

export default function Partnerships() {
  const [active, setActive] = useState(0);

  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-2xl mx-auto">
        <Badge className="mb-2" variant="outline">Partnerships &amp; Collaborations</Badge>
        <h1 className="text-3xl font-bold mb-4">Join the Annadata Movement</h1>

        <CircleWheelSwitcher items={partnershipSections} active={active} setActive={setActive} className="mb-6" />
      </div>
    </main>
  );
}
