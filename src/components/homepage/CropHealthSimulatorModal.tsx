
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const CropHealthSimulatorModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#138808] hover:bg-[#138808]/90 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg mt-6 animate-fade-in" size="lg">
          <Leaf className="w-5 h-5" />
          Try Crop Health Simulator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full bg-white rounded-xl shadow-xl animate-scale-in">
        <DialogHeader>
          <DialogTitle>
            🧪 Crop Health Simulator <span className="ml-2 text-green-600 font-bold">Beta</span>
          </DialogTitle>
          <DialogDescription>
            Enter a crop and see an instant (demo) result! <br />
            <span className="text-xs text-gray-500">(This is a sample - advanced AI coming soon)</span>
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 space-y-3">
          <select className="w-full rounded-md border px-3 py-2 text-sm">
            <option>Wheat</option>
            <option>Rice</option>
            <option>Sugarcane</option>
            <option>Tomato</option>
            <option>Potato</option>
          </select>
          <input
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Enter Field Size (acres)"
            type="number"
            min={1}
          />
        </div>
        <div className="bg-green-50 border border-green-200 rounded-md p-3 text-green-800 text-sm">
          Example Output:
          <ul className="list-disc pl-5 mt-1">
            <li><span className="font-semibold">Crop Health:</span> Good 🌱</li>
            <li><span className="font-semibold">Recommendations:</span> Apply Nitrogen; irrigate in 2 days</li>
            <li><span className="font-semibold">Pest Alert:</span> Low risk this week</li>
          </ul>
          <span className="block mt-2 text-xs text-gray-500">*This is a static demo for visual placement.</span>
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

export default CropHealthSimulatorModal;
