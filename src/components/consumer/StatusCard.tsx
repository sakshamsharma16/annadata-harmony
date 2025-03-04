
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgGradient?: string;
  isLoading?: boolean;
}

const StatusCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
  bgGradient = "bg-gradient-to-br from-blue-50 to-blue-100",
  isLoading = false,
}: StatusCardProps) => {
  return (
    <Card className={bgGradient}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-6 w-16 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className={`text-xs ${iconColor}`}>
              {description}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
