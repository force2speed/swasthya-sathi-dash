import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, ArrowRight } from "lucide-react";

const recentAlerts = [
  {
    id: 1,
    title: "Fever Outbreak Detected",
    village: "Rampur",
    severity: "high",
    timestamp: "15 minutes ago",
    cases: 15,
    status: "active"
  },
  {
    id: 2,
    title: "Water Quality Alert",
    village: "Krishnapur",
    severity: "medium",
    timestamp: "1 hour ago",
    cases: 0,
    status: "investigating"
  },
  {
    id: 3,
    title: "Medicine Shortage",
    village: "District Hospital",
    severity: "high",
    timestamp: "2 hours ago",
    cases: 0,
    status: "resolved"
  },
  {
    id: 4,
    title: "Routine Health Check",
    village: "Govindpur",
    severity: "low",
    timestamp: "4 hours ago",
    cases: 3,
    status: "completed"
  },
  {
    id: 5,
    title: "Vaccination Drive",
    village: "Anandpur",
    severity: "low",
    timestamp: "1 day ago",
    cases: 0,
    status: "scheduled"
  }
];

export function RecentAlerts() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "destructive";
      case "investigating": return "warning";
      case "resolved": return "success";
      case "completed": return "info";
      case "scheduled": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Recent Alerts
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${
                alert.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                alert.severity === 'medium' ? 'bg-warning/10 text-warning' :
                'bg-success/10 text-success'
              }`}>
                <AlertTriangle className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {alert.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {alert.village}
                      {alert.cases > 0 && (
                        <>
                          <span>•</span>
                          <span>{alert.cases} cases</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={getSeverityColor(alert.severity) as any}
                      className="text-xs"
                    >
                      {alert.severity}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        alert.status === 'active' ? 'border-destructive/20 text-destructive' :
                        alert.status === 'resolved' ? 'border-success/20 text-success' :
                        'border-warning/20 text-warning'
                      }`}
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}