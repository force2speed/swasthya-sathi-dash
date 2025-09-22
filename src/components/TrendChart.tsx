import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp } from "lucide-react";

const mockData = [
  { date: "Jan 1", reports: 12, resolved: 8, active: 4 },
  { date: "Jan 8", reports: 19, resolved: 15, active: 8 },
  { date: "Jan 15", reports: 25, resolved: 18, active: 15 },
  { date: "Jan 22", reports: 32, resolved: 22, active: 25 },
  { date: "Jan 29", reports: 28, resolved: 25, active: 28 },
  { date: "Feb 5", reports: 35, resolved: 30, active: 33 },
  { date: "Feb 12", reports: 42, resolved: 38, active: 37 },
  { date: "Feb 19", reports: 38, resolved: 35, active: 40 },
  { date: "Feb 26", reports: 45, resolved: 42, active: 43 },
  { date: "Mar 5", reports: 52, resolved: 48, active: 47 },
];

interface TrendChartProps {
  title: string;
  type?: "line" | "area";
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    value: number;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function TrendChart({ title, type = "line" }: TrendChartProps) {
  const Chart = type === "area" ? AreaChart : LineChart;
  
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis 
                dataKey="date" 
                className="text-muted-foreground text-xs"
              />
              <YAxis 
                className="text-muted-foreground text-xs"
              />
              <Tooltip content={<CustomTooltip />} />
              {type === "area" ? (
                <>
                  <Area
                    type="monotone"
                    dataKey="reports"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="1"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success))"
                    fillOpacity={0.1}
                  />
                </>
              ) : (
                <>
                  <Line
                    type="monotone"
                    dataKey="reports"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="active"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 3 }}
                  />
                </>
              )}
            </Chart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}