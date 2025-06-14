
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const cropRates = {
  Wheat: 2000,
  Rice: 2500,
  Sugarcane: 3000,
  Tomato: 1800,
  Potato: 1700,
};

const FarmerIncomeCalculatorModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState(1);
  const [price, setPrice] = useState<number>(cropRates["Wheat"]);
  const [income, setIncome] = useState<number | null>(null);

  const handleCalculate = () => {
    setIncome(area * price);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg mt-4" size="lg">
          <Calculator className="w-5 h-5" />
          Farmer Income Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full bg-white rounded-xl shadow-xl animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            💹 Farmer Income Calculator
          </DialogTitle>
          <DialogDescription>
            Estimate your crop income easily. (Demo calculator)
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-3">
          <label className="block text-sm font-medium mb-1">Select Crop</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={crop}
            onChange={(e) => {
              setCrop(e.target.value);
              setPrice(cropRates[e.target.value as keyof typeof cropRates]);
            }}
          >
            {Object.keys(cropRates).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <label className="block text-sm font-medium mb-1 pt-2">Field Size (acres)</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            type="number"
            min={1}
            value={area}
            onChange={e => setArea(Number(e.target.value))}
          />
          <label className="block text-sm font-medium mb-1 pt-2">Market Price (₹/acre)</label>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 text-blue-800 text-sm">
          {income !== null ? (
            <>
              <span className="font-semibold">Estimated Income: </span>
              <span className="text-lg font-bold">₹{income.toLocaleString()}</span>
            </>
          ) : (
            <>Enter your details and click Calculate.</>
          )}
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleCalculate}>
            Calculate
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FarmerIncomeCalculatorModal;
