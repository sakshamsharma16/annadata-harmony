export interface MandiData {
  id: string;
  state: string;
  mandi: string;
  commodity: string;
  variety?: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  volume: number;
  unit: string;
  lastUpdated: string;
  context: string;
  seasonalNote?: string;
  priceHistory: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

export interface SeasonalEvent {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  startDate: string;
  endDate: string;
  affectedCommodities: string[];
  regions: string[];
}

// Generate realistic price history for last 60 days
const generatePriceHistory = (basePrice: number, volatility: number = 0.05) => {
  const history = [];
  let currentPrice = basePrice;
  
  for (let i = 60; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dailyChange = (Math.random() - 0.5) * 2 * volatility * basePrice;
    const open = currentPrice;
    const high = open + Math.random() * Math.abs(dailyChange) * 1.5;
    const low = open - Math.random() * Math.abs(dailyChange) * 1.5;
    const close = open + dailyChange;
    
    currentPrice = close;
    
    history.push({
      date: date.toISOString().split('T')[0],
      open: Math.max(0, open),
      high: Math.max(0, high),
      low: Math.max(0, low),
      close: Math.max(0, close),
      volume: Math.floor(Math.random() * 500 + 100)
    });
  }
  
  return history;
};

export const mandiMarketData: MandiData[] = [
  // Punjab Wheat
  {
    id: 'pb-wheat-001',
    state: 'Punjab',
    mandi: 'Ludhiana',
    commodity: 'Wheat',
    variety: 'PBW 343',
    currentPrice: 2150,
    minPrice: 2100,
    maxPrice: 2200,
    avgPrice: 2150,
    change: 25,
    changePercent: 1.18,
    trend: 'up',
    volume: 1250,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T10:30:00Z',
    context: 'Strong demand from flour mills, MSP support active',
    seasonalNote: 'Harvest season approaching, quality premium for PBW 343',
    priceHistory: generatePriceHistory(2150, 0.03)
  },
  {
    id: 'pb-wheat-002',
    state: 'Punjab',
    mandi: 'Patiala',
    commodity: 'Wheat',
    variety: 'HD 3086',
    currentPrice: 2125,
    minPrice: 2080,
    maxPrice: 2170,
    avgPrice: 2125,
    change: -15,
    changePercent: -0.70,
    trend: 'down',
    volume: 980,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T11:15:00Z',
    context: 'Increased arrivals from neighboring districts',
    priceHistory: generatePriceHistory(2125, 0.04)
  },

  // UP Wheat
  {
    id: 'up-wheat-001',
    state: 'Uttar Pradesh',
    mandi: 'Meerut',
    commodity: 'Wheat',
    variety: 'HD 2967',
    currentPrice: 2080,
    minPrice: 2020,
    maxPrice: 2140,
    avgPrice: 2080,
    change: 12,
    changePercent: 0.58,
    trend: 'up',
    volume: 1450,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T10:45:00Z',
    context: 'Steady demand from NCR region, transportation costs stable',
    seasonalNote: 'Pre-harvest price firming expected',
    priceHistory: generatePriceHistory(2080, 0.035)
  },

  // Punjab Basmati
  {
    id: 'pb-basmati-001',
    state: 'Punjab',
    mandi: 'Amritsar',
    commodity: 'Basmati Rice',
    variety: 'Pusa Basmati 1121',
    currentPrice: 4850,
    minPrice: 4700,
    maxPrice: 5200,
    avgPrice: 4850,
    change: 180,
    changePercent: 3.85,
    trend: 'up',
    volume: 620,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T09:20:00Z',
    context: 'Premium Basmati demand surge in Majha region, export orders increasing',
    seasonalNote: 'Peak export season, quality premium commanding higher prices',
    priceHistory: generatePriceHistory(4850, 0.06)
  },

  // UP Mango
  {
    id: 'up-mango-001',
    state: 'Uttar Pradesh',
    mandi: 'Lucknow',
    commodity: 'Mango',
    variety: 'Dasheri',
    currentPrice: 2000,
    minPrice: 1800,
    maxPrice: 2200,
    avgPrice: 2000,
    change: -120,
    changePercent: -5.66,
    trend: 'down',
    volume: 340,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T08:30:00Z',
    context: 'Mango oversupply in UP due to good harvest, local consumption high',
    seasonalNote: 'Peak season arrivals causing price pressure',
    priceHistory: generatePriceHistory(2000, 0.08)
  },
  {
    id: 'up-mango-002',
    state: 'Uttar Pradesh',
    mandi: 'Saharanpur',
    commodity: 'Mango',
    variety: 'Dasheri',
    currentPrice: 1950,
    minPrice: 1750,
    maxPrice: 2100,
    avgPrice: 1950,
    change: -80,
    changePercent: -3.94,
    trend: 'down',
    volume: 280,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T09:45:00Z',
    context: 'High arrivals from orchards, cold storage demand moderate',
    priceHistory: generatePriceHistory(1950, 0.07)
  },

  // Punjab Maize
  {
    id: 'pb-maize-001',
    state: 'Punjab',
    mandi: 'Bathinda',
    commodity: 'Maize',
    variety: 'Hybrid',
    currentPrice: 1920,
    minPrice: 1880,
    maxPrice: 1980,
    avgPrice: 1920,
    change: 35,
    changePercent: 1.86,
    trend: 'up',
    volume: 750,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T11:00:00Z',
    context: 'Poultry feed demand strong, processing industry active',
    seasonalNote: 'Rabi season planting decisions affecting prices',
    priceHistory: generatePriceHistory(1920, 0.04)
  },

  // UP Paddy
  {
    id: 'up-paddy-001',
    state: 'Uttar Pradesh',
    mandi: 'Gorakhpur',
    commodity: 'Paddy',
    variety: 'Common',
    currentPrice: 2050,
    minPrice: 2020,
    maxPrice: 2100,
    avgPrice: 2050,
    change: 20,
    changePercent: 0.99,
    trend: 'stable',
    volume: 1100,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T10:15:00Z',
    context: 'MSP procurement ongoing, steady arrivals from eastern UP',
    seasonalNote: 'Government procurement supporting price stability',
    priceHistory: generatePriceHistory(2050, 0.02)
  },

  // Punjab Wheat Straw
  {
    id: 'pb-straw-001',
    state: 'Punjab',
    mandi: 'Fazilka',
    commodity: 'Wheat Straw',
    variety: 'Toori',
    currentPrice: 320,
    minPrice: 300,
    maxPrice: 350,
    avgPrice: 320,
    change: -25,
    changePercent: -7.25,
    trend: 'down',
    volume: 450,
    unit: '₹/quintal',
    lastUpdated: '2024-01-15T12:00:00Z',
    context: 'Wheat straw demand decline in Punjab due to stubble burning restrictions',
    seasonalNote: 'Alternative fodder sources reducing straw demand',
    priceHistory: generatePriceHistory(320, 0.09)
  }
];

export const seasonalEvents: SeasonalEvent[] = [
  {
    id: 'rabi-harvest-2024',
    title: 'Rabi Harvest Season',
    description: 'Peak harvesting season for wheat and other rabi crops, typically leads to increased arrivals and price pressure',
    impact: 'negative',
    startDate: '2024-03-15',
    endDate: '2024-05-15',
    affectedCommodities: ['Wheat', 'Barley', 'Mustard'],
    regions: ['Punjab', 'Uttar Pradesh', 'Haryana']
  },
  {
    id: 'msp-announcement-2024',
    title: 'MSP Hike Announcement',
    description: 'Government announces increased Minimum Support Price for major crops, providing price floor support',
    impact: 'positive',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    affectedCommodities: ['Wheat', 'Paddy', 'Maize'],
    regions: ['Punjab', 'Uttar Pradesh', 'Haryana', 'Bihar']
  },
  {
    id: 'mango-season-2024',
    title: 'Mango Peak Season',
    description: 'Peak mango season with high arrivals, typically causes price volatility due to perishable nature',
    impact: 'neutral',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    affectedCommodities: ['Mango'],
    regions: ['Uttar Pradesh', 'Bihar', 'Andhra Pradesh']
  },
  {
    id: 'export-demand-basmati',
    title: 'Basmati Export Season',
    description: 'Peak export season for Basmati rice, international demand drives premium pricing',
    impact: 'positive',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    affectedCommodities: ['Basmati Rice'],
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh']
  },
  {
    id: 'stubble-burning-restrictions',
    title: 'Stubble Burning Restrictions',
    description: 'Environmental regulations limiting stubble burning affect wheat straw and rice straw markets',
    impact: 'negative',
    startDate: '2024-10-15',
    endDate: '2024-01-31',
    affectedCommodities: ['Wheat Straw', 'Rice Straw'],
    regions: ['Punjab', 'Haryana']
  }
];

export const mandiLocations = {
  'Punjab': ['Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Fazilka', 'Jalandhar', 'Moga'],
  'Uttar Pradesh': ['Meerut', 'Lucknow', 'Saharanpur', 'Gorakhpur', 'Kanpur', 'Agra', 'Varanasi']
};

export const commodityCategories = {
  'Cereals': ['Wheat', 'Paddy', 'Maize', 'Barley'],
  'Rice': ['Basmati Rice', 'Non-Basmati Rice'],
  'Fruits': ['Mango', 'Apple', 'Grapes', 'Banana'],
  'Fodder': ['Wheat Straw', 'Rice Straw', 'Maize Fodder'],
  'Pulses': ['Chickpea', 'Lentil', 'Black Gram'],
  'Oilseeds': ['Mustard', 'Sunflower', 'Soybean']
};