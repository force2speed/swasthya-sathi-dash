import { 
  AlertTriangle, 
  Activity, 
  Users, 
  MapPin, 
  TrendingUp,
  Calendar,
  BarChart3
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { HealthMap } from "@/components/HealthMap";
import { TrendChart } from "@/components/TrendChart";
import { RecentAlerts } from "@/components/RecentAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/dashboard-hero.jpg";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-hero text-white shadow-elevated">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-3">
              SwasthyaSetu Health Monitoring
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Real-time health surveillance and outbreak detection across district villages
            </p>
            <div className="flex gap-4">
              <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Create Alert
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Active Alerts"
          value="12"
          change={{ value: "+3 today", type: "increase" }}
          icon={AlertTriangle}
          variant="destructive"
          description="Across 8 villages"
        />
        <KPICard
          title="Health Reports"
          value="248"
          change={{ value: "+15 today", type: "increase" }}
          icon={Activity}
          variant="info"
          description="This week"
        />
        <KPICard
          title="Villages Monitored"
          value="45"
          change={{ value: "2 new", type: "increase" }}
          icon={MapPin}
          variant="success"
          description="Active monitoring"
        />
        <KPICard
          title="ASHA Workers"
          value="78"
          change={{ value: "92% active", type: "neutral" }}
          icon={Users}
          variant="default"
          description="Online this week"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Map */}
        <div className="lg:col-span-2">
          <HealthMap />
        </div>
        
        {/* Trend Chart */}
        <TrendChart title="Health Reports Trend" type="line" />
        
        {/* Recent Alerts */}
        <RecentAlerts />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +20% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">
              Average alert response
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              Alerts resolved successfully
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}