
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

const DemoMap = () => (
  <div className="w-full h-48 rounded-lg border border-green-100 bg-gradient-to-br from-green-100 to-gray-50 flex flex-col items-center justify-center">
    <div className="relative w-56 h-40 mt-2">
      {/* Demo cart icons & path lines */}
      <svg width="100%" height="100%" viewBox="0 0 220 160" className="absolute">
        <polyline points="40,130 70,100 110,120 150,60 190,90" fill="none" stroke="#06C167" strokeWidth="4" strokeDasharray="8 4" />
        {/* Vendor Carts */}
        <circle cx="40" cy="130" r="12" fill="#FF9933" />
        <circle cx="150" cy="60" r="12" fill="#138808" />
        {/* Dots */}
        <circle cx="70" cy="100" r="6" fill="#E8E8E8" />
        <circle cx="110" cy="120" r="6" fill="#E8E8E8" />
        <circle cx="190" cy="90" r="10" fill="#007DC5" />
      </svg>
      <span className="absolute left-1 top-28 bg-white/80 rounded px-1 text-xs">Start</span>
      <span className="absolute left-36 top-2 bg-white/80 rounded px-1 text-xs">Cart A</span>
      <span className="absolute left-48 top-20 bg-white/80 rounded px-1 text-xs">Market</span>
    </div>
    <div className="mt-2 text-gray-500 text-xs">Sample cart delivery route (demo)</div>
  </div>
);

const CartRouteVisualizerModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg mt-4" size="lg">
          <Map className="w-5 h-5" />
          Cart Route Visualizer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full bg-white rounded-xl shadow-xl animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            🗺️ Cart Route Visualizer
          </DialogTitle>
          <DialogDescription>
            See a demo vendor cart route for better delivery planning.
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <DemoMap />
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartRouteVisualizerModal;
