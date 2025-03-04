
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatusCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgGradient?: string;
}

const StatusCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
  bgGradient = "bg-gradient-to-br from-blue-50 to-blue-100",
}: StatusCardProps) => {
  return (
    <Card className={bgGradient}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${iconColor}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
