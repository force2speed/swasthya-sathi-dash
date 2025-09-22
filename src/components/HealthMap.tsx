import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Activity } from "lucide-react";

// Mock data for demonstration
const healthData = [
  { village: "Rampur", lat: 28.6139, lng: 77.2090, riskLevel: "high", cases: 15 },
  { village: "Krishnapur", lat: 28.7041, lng: 77.1025, riskLevel: "medium", cases: 8 },
  { village: "Govindpur", lat: 28.5355, lng: 77.3910, riskLevel: "low", cases: 3 },
  { village: "Shahpur", lat: 28.6692, lng: 77.4538, riskLevel: "high", cases: 22 },
  { village: "Anandpur", lat: 28.4595, lng: 77.0266, riskLevel: "medium", cases: 12 },
];

export function HealthMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for actual map implementation
    // In a real implementation, you would initialize Mapbox or Leaflet here
    console.log("Map would be initialized here with health data:", healthData);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Geographic Health Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Map placeholder - In real implementation, this would be a Mapbox/Leaflet map */}
          <div 
            ref={mapRef}
            className="w-full h-80 bg-gradient-to-br from-muted/30 to-accent/30 rounded-lg border border-border relative overflow-hidden"
          >
            {/* Mock map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
            
            {/* Mock village markers */}
            {healthData.map((village, index) => (
              <div
                key={village.village}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`,
                }}
              >
                <div 
                  className={`w-6 h-6 rounded-full ${getRiskColor(village.riskLevel)} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                  title={`${village.village}: ${village.cases} cases`}
                >
                  <Activity className="h-3 w-3 text-white" />
                </div>
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                  {village.village}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span>High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span>Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>Low Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}