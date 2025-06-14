
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, Play } from "lucide-react";
import { m } from "framer-motion";
import HeroVideoModal from "./HeroVideoModal";

// Mission-driven content
const MISSION_HEADLINE = "Harvesting Progress, Empowering Lives.";
const MISSION_SUBHEADLINE =
  "Annadata bridges India’s rural farms to every doorstep—connecting farmers and vendors, amplifying prosperity, and bringing fresh produce home.";

// Animations config
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.16, duration: 0.7, type: "spring", stiffness: 48 },
  }),
};

interface HeroBannerProps {
  imageSrc?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  imageSrc = "/logo-placeholder.svg"
}) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-[#F8FFF5] via-[#F2FCE2] to-[#F5F9E6] overflow-hidden">
      {/* Parallax/Animated Background Illustration (replace with SVG/undraw) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <img
          src="/undraw_farmer_market.svg"
          alt=""
          className="max-w-xl w-full opacity-65 blur-sm animate-fade-up"
          style={{ objectFit: "contain" }}
          aria-hidden
        />
      </div>
      {/* Soft gradient blobs (subtle depth) */}
      <div className="absolute top-2 left-4 w-[38rem] h-[38rem] rounded-full bg-primary/10 blur-2xl animate-float pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-[27rem] h-[27rem] rounded-full bg-accent/10 blur-xl animate-float pointer-events-none" style={{ animationDelay: "0.8s" }} />
      
      {/* Main Hero Content */}
      <div className="z-10 w-full px-4 md:px-12 flex flex-col items-center max-w-3xl mx-auto">
        <m.h1
          className="text-balance font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#138808] text-center drop-shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          {MISSION_HEADLINE}
        </m.h1>
        <m.p
          className="text-xl sm:text-2xl mt-4 text-balance text-gray-700 max-w-xl mx-auto text-center font-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={1}
        >
          {MISSION_SUBHEADLINE}
        </m.p>
        <m.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={2}
        >
          <Button
            size="pill-lg"
            variant="green"
            rounded="full"
            animation="float"
            className="text-lg px-8 py-4 shadow-xl font-semibold btn-animate hover:scale-105 focus:ring-4 focus:ring-primary/20"
            asChild
          >
            <Link to="/market-prices">
              Explore Annadata
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          {/* Video play button (opens modal) */}
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all border border-primary/10 text-primary font-medium focus:ring-2 focus:ring-primary/40 backdrop-blur-md btn-animate"
            aria-label="Watch Farmer Success Story"
            style={{ fontSize: "1.1rem" }}
          >
            <Play className="w-6 h-6 fill-primary animate-pulse" />
            Watch Farmer's Story
          </button>
        </m.div>
        {/* Sub-CTA: inspiration/fair pricing, can be animated in */}
        <m.div
          className="mt-6 text-base text-gray-600 text-center max-w-lg mx-auto animate-fade-up"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={3}
        >
          <span>
            <strong>No Middlemen.</strong> Just honest harvests, fair prices, & local success stories.
          </span>
        </m.div>
      </div>
      {/* Farmer photo/hero graphic - right side on large screens */}
      <m.div
        className="hidden lg:flex absolute right-14 top-[12%] h-[400px] w-[400px] items-center justify-center"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 1.2, delay: 0.28 }}
      >
        <img
          src={imageSrc}
          alt="Annadata Platform Highlight Illustration"
          className="rounded-2xl shadow-2xl border-8 border-white/70 object-cover w-full h-full"
          loading="eager"
        />
      </m.div>
      {/* Video Modal */}
      <HeroVideoModal open={showVideo} onClose={() => setShowVideo(false)} />
    </section>
  );
};

export default HeroBanner;
