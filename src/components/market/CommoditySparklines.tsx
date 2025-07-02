import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SparklineData {
  commodity: string;
  currentPrice: number;
  priceHistory: number[];
  change: number;
  changePercent: number;
  volume: string;
}

const generateSparklineData = (commodity: string, basePrice: number): SparklineData => {
  const history = [];
  let price = basePrice;
  
  for (let i = 0; i < 30; i++) {
    price += (Math.random() - 0.5) * basePrice * 0.02;
    history.push(price);
  }
  
  const currentPrice = history[history.length - 1];
  const previousPrice = history[history.length - 2];
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return {
    commodity,
    currentPrice,
    priceHistory: history,
    change,
    changePercent,
    volume: `${(Math.random() * 2000 + 100).toFixed(0)} tons`
  };
};

const mockSparklineData: SparklineData[] = [
  generateSparklineData("Rice", 2850),
  generateSparklineData("Wheat", 2200),
  generateSparklineData("Cotton", 5600),
  generateSparklineData("Sugarcane", 350),
  generateSparklineData("Soybean", 4200),
  generateSparklineData("Maize", 1850),
  generateSparklineData("Turmeric", 12500),
  generateSparklineData("Chili", 8900),
];

const Sparkline: React.FC<{ data: number[]; isPositive: boolean }> = ({ data, isPositive }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg width="100" height="40" className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'green' : 'red'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.polyline
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        points={points}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.polygon
        fill={`url(#gradient-${isPositive ? 'green' : 'red'})`}
        points={`0,100 ${points} 100,100`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </svg>
  );
};

const CommoditySparklines: React.FC = () => {
  const [data, setData] = useState(mockSparklineData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => {
        const newPrice = item.currentPrice + (Math.random() - 0.5) * item.currentPrice * 0.01;
        const newHistory = [...item.priceHistory.slice(1), newPrice];
        const change = newPrice - item.priceHistory[item.priceHistory.length - 1];
        const changePercent = (change / item.priceHistory[item.priceHistory.length - 1]) * 100;
        
        return {
          ...item,
          currentPrice: newPrice,
          priceHistory: newHistory,
          change,
          changePercent
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-card rounded-lg p-6 shadow-sm border">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">Market Trends</h3>
        <p className="text-muted-foreground">30-day price movement sparklines</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <motion.div
            key={item.commodity}
            className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{item.commodity}</h4>
                <p className="text-lg font-bold text-foreground">₹{item.currentPrice.toFixed(0)}</p>
              </div>
              <div className={`flex items-center gap-1 ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.changePercent >= 0 ? 
                  <TrendingUp className="h-3 w-3" /> : 
                  <TrendingDown className="h-3 w-3" />
                }
                <span className="text-xs font-medium">
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="mb-3">
              <Sparkline data={item.priceHistory} isPositive={item.changePercent >= 0} />
            </div>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Vol: {item.volume}</span>
              <span className={item.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {item.change >= 0 ? '+' : ''}₹{item.change.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommoditySparklines;