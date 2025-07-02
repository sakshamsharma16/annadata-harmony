import React, { useEffect, useRef } from 'react';
import { ScriptLoader } from '@/components/ui/script-loader';

interface TradingViewChartProps {
  symbol?: string;
  interval?: string;
  theme?: 'light' | 'dark';
  height?: number;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = "NSE:RICE",
  interval = "1D",
  theme = "light",
  height = 400
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Check if TradingView is available
    const initializeWidget = () => {
      if (containerRef.current && (window as any).TradingView) {
        // Clear previous widget
        if (widgetRef.current) {
          widgetRef.current = null;
        }
        
        containerRef.current.innerHTML = '';
        
        widgetRef.current = new (window as any).TradingView.widget({
          width: "100%",
          height: height,
          symbol: symbol,
          interval: interval,
          timezone: "Asia/Kolkata",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerRef.current.id,
          studies: [
            "Volume@tv-basicstudies",
            "MACD@tv-basicstudies"
          ],
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
        });
      }
    };

    // Initialize widget when TradingView script is loaded
    if ((window as any).TradingView) {
      initializeWidget();
    } else {
      // Wait for script to load
      const checkTradingView = setInterval(() => {
        if ((window as any).TradingView) {
          clearInterval(checkTradingView);
          initializeWidget();
        }
      }, 100);

      return () => clearInterval(checkTradingView);
    }
  }, [symbol, interval, theme, height]);

  return (
    <div className="w-full bg-card rounded-lg shadow-sm border overflow-hidden">
      <ScriptLoader 
        src="https://s3.tradingview.com/tv.js"
        onLoad={() => {
          // Script loaded, widget will initialize via useEffect
        }}
      />
      <div className="p-4 border-b bg-muted/30">
        <h3 className="text-lg font-semibold text-foreground">Live Mandi Prices</h3>
        <p className="text-sm text-muted-foreground">Real-time commodity price charts with technical analysis</p>
      </div>
      <div 
        ref={containerRef}
        id={`tradingview-widget-${Math.random().toString(36).substr(2, 9)}`}
        style={{ height: `${height}px` }}
        className="w-full"
      />
      {!(window as any).TradingView && (
        <div className="flex items-center justify-center h-64 bg-muted/20">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading market data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingViewChart;