
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Activity, Thermometer, Sprout, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface CropHealthDataProps {
  overallScore: number;
  soilHealth: number;
  waterEfficiency: number;
  pestRisk: number;
}

interface CropHealthCardProps {
  cropHealthData: CropHealthDataProps;
}

const CropHealthCard: React.FC<CropHealthCardProps> = ({ cropHealthData }) => {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-green-600" /> 
              Crop Health Index
            </CardTitle>
            <CardDescription>
              Real-time monitoring of your crop's overall health and vitality
            </CardDescription>
          </div>
          <Link to="/crop-health">
            <Button variant="outline" className="gap-2 text-green-700 border-green-200 hover:bg-green-50">
              <ExternalLink className="h-4 w-4" />
              View Detailed Analysis
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="relative h-32 w-32 flex items-center justify-center mb-3">
              <div className="absolute inset-0 rounded-full border-8 border-green-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500" 
                style={{ 
                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                  clip: `rect(0px, ${32 * 2}px, ${32 * 2}px, 0px)`
                }}
              ></div>
              <div className="text-center">
                <span className="text-4xl font-bold text-green-700">{cropHealthData.overallScore}</span>
                <span className="block text-xs text-green-600">out of 100</span>
              </div>
            </div>
            <span className="font-semibold text-green-700">Overall Health</span>
            <span className="text-xs text-green-600">
              {cropHealthData.overallScore >= 80 ? 'Excellent' : 
               cropHealthData.overallScore >= 60 ? 'Good' : 
               cropHealthData.overallScore >= 40 ? 'Average' : 'Needs Attention'}
            </span>
          </div>
          
          <div className="flex flex-col p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-700">Soil Health</span>
              <Activity className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mb-1">{cropHealthData.soilHealth}</div>
            <div className="w-full bg-blue-200 rounded-full h-2.5 mb-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.soilHealth}%` }}></div>
            </div>
            <p className="text-xs text-blue-600">NPK levels and pH balance</p>
          </div>
          
          <div className="flex flex-col p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-cyan-700">Water Efficiency</span>
              <Thermometer className="h-4 w-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-bold mb-1">{cropHealthData.waterEfficiency}</div>
            <div className="w-full bg-cyan-200 rounded-full h-2.5 mb-2">
              <div className="bg-cyan-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.waterEfficiency}%` }}></div>
            </div>
            <p className="text-xs text-cyan-600">Irrigation and moisture levels</p>
          </div>
          
          <div className="flex flex-col p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-amber-700">Pest Risk</span>
              <HeartPulse className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold mb-1">{cropHealthData.pestRisk}%</div>
            <div className="w-full bg-amber-200 rounded-full h-2.5 mb-2">
              <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${cropHealthData.pestRisk}%` }}></div>
            </div>
            <p className="text-xs text-amber-600">Current pest and disease risk</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Link to="/crop-health">
            <Button className="bg-[#138808] hover:bg-[#138808]/90 shadow-sm hover:shadow-md transition-all">
              View Detailed Analysis
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropHealthCard;
