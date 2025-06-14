
import React from "react";
import { X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";

// Placeholder - replace src with actual farmer story video or Lottie animation
const VIDEO_URL = "https://www.youtube.com/embed/nm_CVZGhHZY"; // replace with branded farmer story!

interface Props {
  open: boolean;
  onClose: () => void;
}
const animations = {
  modal: {
    hidden: { opacity: 0, scale: 0.96, y: 18 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, scale: 0.96, y: 24, transition: { duration: 0.22, ease: [0.4,0,1,1] } }
  },
  overlay: {
    hidden: { opacity: 0 },
    visible: { opacity: 0.9, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }
};

export default function HeroVideoModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <m.div
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animations.overlay}
            onClick={onClose}
          />
          {/* Modal */}
          <m.div
            className="fixed inset-0 flex items-center justify-center z-[130] px-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animations.modal}
          >
            <div className="relative bg-white rounded-2xl p-0 shadow-2xl border border-primary/10 max-w-2xl w-full mx-auto overflow-hidden animate-fade-in backdrop-blur-xl">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 p-2 bg-white/70 rounded-full hover:bg-white transition"
                aria-label="Close video"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <iframe
                src={VIDEO_URL}
                title="Annadata Farmer Success Story"
                className="w-full aspect-video max-h-[440px] rounded-b-2xl"
                allow="autoplay; fullscreen"
              />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
