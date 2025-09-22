import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  description?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  description 
}: KPICardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      case "info":
        return "border-info/20 bg-info/5";
      default:
        return "border-border bg-gradient-card";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "destructive":
        return "text-destructive bg-destructive/10";
      case "info":
        return "text-info bg-info/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  const getChangeStyles = () => {
    if (!change) return "";
    switch (change.type) {
      case "increase":
        return "text-success bg-success/10 border-success/20";
      case "decrease":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted/50 border-border";
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-elevated transition-smooth ${getVariantStyles()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getIconStyles()}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground mb-1">
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {change && (
            <Badge 
              variant="outline" 
              className={`ml-2 text-xs ${getChangeStyles()}`}
            >
              {change.value}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}