import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeatmapData {
  commodity: string;
  price: number;
  change: number;
  changePercent: number;
  region: string;
  category: string;
}

const mockHeatmapData: HeatmapData[] = [
  { commodity: "Rice", price: 2850, change: 45, changePercent: 1.6, region: "Punjab", category: "Grain" },
  { commodity: "Wheat", price: 2200, change: -30, changePercent: -1.3, region: "UP", category: "Grain" },
  { commodity: "Cotton", price: 5600, change: 120, changePercent: 2.2, region: "Gujarat", category: "Fiber" },
  { commodity: "Sugarcane", price: 350, change: 8, changePercent: 2.3, region: "Maharashtra", category: "Cash Crop" },
  { commodity: "Soybean", price: 4200, change: -85, changePercent: -2.0, region: "MP", category: "Oilseed" },
  { commodity: "Maize", price: 1850, change: 25, changePercent: 1.4, region: "Karnataka", category: "Grain" },
  { commodity: "Turmeric", price: 12500, change: 350, changePercent: 2.9, region: "Telangana", category: "Spice" },
  { commodity: "Chili", price: 8900, change: -180, changePercent: -2.0, region: "Andhra", category: "Spice" },
  { commodity: "Onion", price: 1200, change: 60, changePercent: 5.3, region: "Maharashtra", category: "Vegetable" },
  { commodity: "Tomato", price: 2500, change: -120, changePercent: -4.6, region: "Karnataka", category: "Vegetable" },
  { commodity: "Potato", price: 800, change: 15, changePercent: 1.9, region: "UP", category: "Vegetable" },
  { commodity: "Mustard", price: 5800, change: 95, changePercent: 1.7, region: "Rajasthan", category: "Oilseed" },
];

const CommodityHeatmap: React.FC = () => {
  const [data, setData] = useState(mockHeatmapData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('1d');

  const categories = ['all', ...Array.from(new Set(data.map(item => item.category)))];
  const regions = ['all', ...Array.from(new Set(data.map(item => item.region)))];

  const filteredData = data.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (selectedRegion === 'all' || item.region === selectedRegion)
  );

  const getColorIntensity = (changePercent: number) => {
    const intensity = Math.min(Math.abs(changePercent) / 5, 1);
    if (changePercent > 0) {
      return `hsla(142, 76%, 36%, ${intensity})`;
    } else {
      return `hsla(0, 84%, 60%, ${intensity})`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        price: item.price + (Math.random() - 0.5) * 50,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 8,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">Live Market Heatmap</h3>
            <p className="text-muted-foreground">Real-time commodity price movements across regions</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] bg-background border-border z-50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="hover:bg-muted">
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[120px] bg-background border-border z-50">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                {regions.map(region => (
                  <SelectItem key={region} value={region} className="hover:bg-muted">
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] bg-background border-border z-50">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border shadow-lg z-50">
                <SelectItem value="1h" className="hover:bg-muted">1 Hour</SelectItem>
                <SelectItem value="1d" className="hover:bg-muted">1 Day</SelectItem>
                <SelectItem value="1w" className="hover:bg-muted">1 Week</SelectItem>
                <SelectItem value="1m" className="hover:bg-muted">1 Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredData.map((item, index) => (
          <motion.div
            key={item.commodity}
            className="relative p-4 rounded-lg border cursor-pointer transition-transform hover:scale-105 group"
            style={{ backgroundColor: getColorIntensity(item.changePercent) }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <div className="text-center">
              <h4 className="font-semibold text-sm text-foreground mb-1">{item.commodity}</h4>
              <p className="text-lg font-bold text-foreground">₹{item.price.toFixed(0)}</p>
              <p className={`text-xs font-medium ${item.changePercent >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.region}</p>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              <div className="font-semibold">{item.commodity} - {item.region}</div>
              <div>Price: ₹{item.price.toFixed(2)}</div>
              <div>Change: {item.change >= 0 ? '+' : ''}₹{item.change.toFixed(2)}</div>
              <div>Category: {item.category}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500/60"></div>
            <span>Price Increase</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500/60"></div>
            <span>Price Decrease</span>
          </div>
          <div className="text-xs">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommodityHeatmap;