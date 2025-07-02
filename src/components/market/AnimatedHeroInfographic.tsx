import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Truck, Store, Users, TrendingUp, Coins } from 'lucide-react';

interface FlowStage {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  color: string;
}

const flowStages: FlowStage[] = [
  {
    id: 'farm',
    title: 'Farm Production',
    description: 'Fresh harvest from local farmers',
    icon: <Sprout className="w-6 h-6" />,
    price: 1200,
    color: '#22c55e'
  },
  {
    id: 'transport',
    title: 'Transportation',
    description: 'Efficient supply chain logistics',
    icon: <Truck className="w-6 h-6" />,
    price: 1350,
    color: '#3b82f6'
  },
  {
    id: 'mandi',
    title: 'Mandi Market',
    description: 'Wholesale trading hub',
    icon: <Store className="w-6 h-6" />,
    price: 1500,
    color: '#f59e0b'
  },
  {
    id: 'retail',
    title: 'Retail Distribution',
    description: 'Direct to consumer delivery',
    icon: <Users className="w-6 h-6" />,
    price: 1800,
    color: '#ec4899'
  }
];

const AnimatedHeroInfographic: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % flowStages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-secondary/10 blur-lg"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Commodity Lifecycle Flow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track the journey of agricultural commodities from farm to consumer with transparent pricing at every stage
          </p>
        </motion.div>

        {/* Main Flow Visualization */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            staggerChildren: 0.3,
            delayChildren: 0.2
          }}
        >
          {/* Desktop Flow */}
          <div className="hidden lg:flex justify-between items-center relative">
            {flowStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="relative z-20"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={activeStage === index ? { 
                  opacity: 1, 
                  y: -5, 
                  scale: 1.1 
                } : { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setIsPlaying(false)}
                onHoverEnd={() => setIsPlaying(true)}
              >
                <div 
                  className="bg-card rounded-2xl p-6 shadow-lg border-2 cursor-pointer transition-colors duration-300 min-w-[200px]"
                  style={{ 
                    borderColor: activeStage === index ? stage.color : 'transparent',
                    backgroundColor: activeStage === index ? `${stage.color}15` : undefined
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-center">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 text-center">{stage.description}</p>
                  <motion.div 
                    className="text-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <span className="font-bold text-lg" style={{ color: stage.color }}>
                        ₹{stage.price}/quintal
                      </span>
                    </div>
                    {index > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">
                          +₹{stage.price - flowStages[index - 1].price}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute top-1/2 left-0 w-full h-2 transform -translate-y-1/2 z-10" style={{ height: '2px' }}>
              {flowStages.slice(0, -1).map((_, index) => (
                <motion.line
                  key={index}
                  x1={`${(index + 1) * 25 - 12.5}%`}
                  y1="50%"
                  x2={`${(index + 1) * 25 + 12.5}%`}
                  y2="50%"
                  stroke={flowStages[index + 1].color}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              ))}
            </svg>
          </div>

          {/* Mobile Flow */}
          <div className="lg:hidden space-y-6">
            {flowStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="relative"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={activeStage === index ? { 
                  opacity: 1, 
                  y: -5, 
                  scale: 1.1 
                } : { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <div 
                  className="bg-card rounded-xl p-4 shadow-lg border-2 transition-colors duration-300"
                  style={{ 
                    borderColor: activeStage === index ? stage.color : 'transparent',
                    backgroundColor: activeStage === index ? `${stage.color}15` : undefined
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: stage.color }}
                    >
                      {stage.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                    </div>
                    <motion.div 
                      className="text-right"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      <div className="font-bold text-lg" style={{ color: stage.color }}>
                        ₹{stage.price}
                      </div>
                      {index > 0 && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <TrendingUp className="w-3 h-3" />
                          +₹{stage.price - flowStages[index - 1].price}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
                
                {index < flowStages.length - 1 && (
                  <div className="flex justify-center py-2">
                    <motion.div
                      className="w-0.5 h-8 rounded-full"
                      style={{ backgroundColor: flowStages[index + 1].color }}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div 
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {flowStages.map((stage, index) => (
            <button
              key={stage.id}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: activeStage === index ? stage.color : '#e5e7eb'
              }}
              onClick={() => {
                setActiveStage(index);
                setIsPlaying(false);
                setTimeout(() => setIsPlaying(true), 3000);
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHeroInfographic;