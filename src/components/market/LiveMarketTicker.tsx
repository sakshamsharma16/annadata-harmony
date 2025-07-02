import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommodityData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const mockCommodityData: CommodityData[] = [
  { name: "Rice", price: 2850, change: 45, changePercent: 1.6, volume: "1.2K tons" },
  { name: "Wheat", price: 2200, change: -30, changePercent: -1.3, volume: "850 tons" },
  { name: "Cotton", price: 5600, change: 120, changePercent: 2.2, volume: "420 tons" },
  { name: "Sugarcane", price: 350, change: 8, changePercent: 2.3, volume: "2.8K tons" },
  { name: "Soybean", price: 4200, change: -85, changePercent: -2.0, volume: "680 tons" },
  { name: "Maize", price: 1850, change: 25, changePercent: 1.4, volume: "950 tons" },
  { name: "Turmeric", price: 12500, change: 350, changePercent: 2.9, volume: "180 tons" },
  { name: "Chili", price: 8900, change: -180, changePercent: -2.0, volume: "320 tons" },
];

const LiveMarketTicker: React.FC = () => {
  const [currentData, setCurrentData] = useState(mockCommodityData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 20,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 4,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border/20 py-3 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: '-100%' }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: 'calc(200% + 2rem)' }}
      >
        {[...currentData, ...currentData].map((commodity, index) => (
          <div key={`${commodity.name}-${index}`} className="flex items-center gap-3 min-w-fit">
            <span className="font-semibold text-foreground">{commodity.name}</span>
            <span className="text-lg font-bold text-primary">₹{commodity.price.toFixed(0)}</span>
            <div className={`flex items-center gap-1 ${commodity.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {commodity.change >= 0 ? 
                <TrendingUp className="h-3 w-3" /> : 
                <TrendingDown className="h-3 w-3" />
              }
              <span className="text-sm font-medium">
                {commodity.change >= 0 ? '+' : ''}{commodity.changePercent.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Vol: {commodity.volume}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LiveMarketTicker;