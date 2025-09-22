import { AlertTriangle, Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Alerts() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            Alert Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage health alerts across all villages
          </p>
        </div>
        <Button size="lg" className="bg-primary hover:bg-primary-hover">
          <Plus className="mr-2 h-5 w-5" />
          Create Alert
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search alerts..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-4">
        {[
          {
            id: 1,
            title: "Fever Outbreak Detected",
            description: "Multiple cases of high fever reported in Rampur village",
            severity: "high",
            status: "active",
            village: "Rampur",
            cases: 15,
            timestamp: "2 hours ago",
          },
          {
            id: 2,
            title: "Water Quality Alert",
            description: "Contamination detected in village water supply",
            severity: "medium",
            status: "investigating",
            village: "Krishnapur",
            cases: 0,
            timestamp: "5 hours ago",
          },
          {
            id: 3,
            title: "Medicine Shortage",
            description: "Critical medicines running low at district hospital",
            severity: "high",
            status: "resolved",
            village: "District Hospital",
            cases: 0,
            timestamp: "1 day ago",
          },
        ].map((alert) => (
          <Card key={alert.id} className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                    <Badge 
                      variant={
                        alert.severity === "high" ? "destructive" : 
                        alert.severity === "medium" ? "default" : "secondary"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={
                        alert.status === "active" ? "border-destructive text-destructive" :
                        alert.status === "resolved" ? "border-success text-success" :
                        "border-warning text-warning"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {alert.description}
                  </CardDescription>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>📍 {alert.village}</span>
                    {alert.cases > 0 && <span>👥 {alert.cases} cases</span>}
                    <span>🕒 {alert.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="default" size="sm">
                    Take Action
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}