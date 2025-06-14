
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Handshake, Users, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Partnerships() {
  return (
    <main className="py-16 px-4 min-h-screen bg-gradient-to-b from-white to-green-50">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <Badge className="mb-2" variant="outline">Partnerships &amp; Collaborations</Badge>
        <h1 className="text-3xl font-bold mb-4 animate-fade-in">Join the Annadata Movement</h1>
        <div className="space-y-7">
          <motion.div
            className="bg-white border rounded-xl shadow-card-hover p-6"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.37, delay: 0.09 }}
          >
            <div className="mb-4 flex gap-3 justify-center">
              <Handshake className="h-8 w-8 text-[#138808]" />
              <Users className="h-8 w-8 text-[#FF9933]" />
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-center">Who We Work With</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2 text-left">
              <li>Rural innovators and entrepreneurs</li>
              <li>Agricultural NGOs &amp; FPOs</li>
              <li>Government agencies and extension services</li>
              <li>Colleges, students, and agri-tech enthusiasts</li>
            </ul>
          </motion.div>
          <motion.div
            className="mb-8 bg-white border p-6 rounded-xl shadow-card-hover"
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.39, delay: 0.14 }}
          >
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 justify-center"><Sparkles /> Call for Collaboration</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 text-left">
              <li>Implement pilot projects and joint rural innovation programs</li>
              <li>Scale Annadata’s cart vendor network and doorstep delivery model</li>
              <li>Enable digital literacy and agri-entrepreneurship in rural India</li>
              <li>Collaborate on expanding Annadata’s AI/IoT powered platform</li>
            </ul>
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-[#FF9933]/10 to-[#138808]/10 border px-7 py-6 rounded-lg text-center"
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.33, delay: 0.26 }}
          >
            <p className="font-semibold text-lg mb-2 animate-fade-in">Ready to make an impact?</p>
            <p className="mb-4 text-gray-700">Join as a partner, mentor, developer, or investor.</p>
            <a
              href="mailto:hello@annadata.ai"
              className="inline-block bg-[#138808] px-7 py-2 rounded text-white hover:bg-[#138808]/90 transition shadow"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
