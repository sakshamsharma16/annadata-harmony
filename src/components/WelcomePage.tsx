
import React from 'react';
import { CircleUserRound, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen gradient-background flex flex-col items-center justify-between p-6">
      <motion.div 
        className="w-full max-w-lg mx-auto flex flex-col items-center justify-center flex-grow gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Header */}
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <img 
            src="/image3.jpg" 
            alt="Annadata Logo" 
            className="w-32 h-32 mx-auto annadata-logo rounded-full object-cover border-4 border-white shadow-xl"
          />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#138808] to-[#FF9933]">WELCOME TO ANNADATA</h1>
        </motion.div>

        {/* QR Code Section */}
        <motion.div className="glass-card p-6 w-full" variants={itemVariants}>
          <div className="relative w-48 h-48 mx-auto mb-4 bg-white rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/image1.jpg" 
              alt="Scan QR Code" 
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg">
                <div className="w-24 h-24 bg-gray-900 flex items-center justify-center">
                  <div className="text-lg text-white">Scan Me</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-xl text-[#138808] font-medium">
            <CircleUserRound className="w-6 h-6" />
            <span>SCAN & JOIN NOW</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-center text-lg max-w-md leading-relaxed" 
          variants={itemVariants}
        >
          Join <span className="text-[#138808] font-semibold">ANNADATA</span> - the platform that connects farmers directly with consumers, eliminating middlemen and ensuring fair pricing for all.
        </motion.p>

        {/* Continue Button */}
        <motion.div variants={itemVariants}>
          <Link to="/home">
            <motion.button 
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Platform
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Need Help Button */}
      <motion.button 
        className="need-help-button"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05, backgroundColor: "#F2FCE2" }}
      >
        <CircleUserRound className="w-6 h-6 text-[#138808]" />
        <span className="font-medium">NEED HELP?</span>
      </motion.button>
    </div>
  );
};

export default WelcomePage;
