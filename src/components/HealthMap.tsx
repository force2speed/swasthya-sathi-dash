import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Activity } from "lucide-react";

// Northeast India health data for demonstration
const healthData = [
  { village: "Guwahati", lat: 26.1445, lng: 91.7362, riskLevel: "high", cases: 28, intensity: 0.9 },
  { village: "Shillong", lat: 25.5788, lng: 91.8933, riskLevel: "medium", cases: 15, intensity: 0.6 },
  { village: "Imphal", lat: 24.8170, lng: 93.9368, riskLevel: "high", cases: 22, intensity: 0.8 },
  { village: "Aizawl", lat: 23.7367, lng: 92.7173, riskLevel: "low", cases: 8, intensity: 0.3 },
  { village: "Kohima", lat: 25.6751, lng: 94.1086, riskLevel: "medium", cases: 12, intensity: 0.5 },
  { village: "Agartala", lat: 23.8315, lng: 91.2868, riskLevel: "high", cases: 25, intensity: 0.85 },
  { village: "Itanagar", lat: 27.0844, lng: 93.6053, riskLevel: "low", cases: 6, intensity: 0.25 },
  { village: "Gangtok", lat: 27.3314, lng: 88.6138, riskLevel: "medium", cases: 10, intensity: 0.4 },
  { village: "Jorhat", lat: 26.7509, lng: 94.2037, riskLevel: "medium", cases: 14, intensity: 0.55 },
  { village: "Dibrugarh", lat: 27.4728, lng: 94.9120, riskLevel: "low", cases: 7, intensity: 0.28 },
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
            className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-border relative overflow-hidden"
          >
            {/* Northeast India map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 opacity-60"></div>
            
            {/* Heatmap zones */}
            {healthData.map((village, index) => {
              // Calculate relative positions for Northeast India layout
              const getPosition = (village: string) => {
                const positions = {
                  "Guwahati": { left: "45%", top: "40%" },
                  "Shillong": { left: "40%", top: "50%" },
                  "Imphal": { left: "75%", top: "65%" },
                  "Aizawl": { left: "35%", top: "75%" },
                  "Kohima": { left: "65%", top: "45%" },
                  "Agartala": { left: "30%", top: "70%" },
                  "Itanagar": { left: "70%", top: "25%" },
                  "Gangtok": { left: "15%", top: "30%" },
                  "Jorhat": { left: "55%", top: "35%" },
                  "Dibrugarh": { left: "80%", top: "30%" },
                };
                return positions[village as keyof typeof positions] || { left: "50%", top: "50%" };
              };

              const position = getPosition(village.village);
              const heatmapSize = Math.max(60, village.intensity * 120);
              
              return (
                <div key={village.village}>
                  {/* Heatmap glow effect */}
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      left: position.left,
                      top: position.top,
                      transform: 'translate(-50%, -50%)',
                      width: `${heatmapSize}px`,
                      height: `${heatmapSize}px`,
                      background: village.riskLevel === 'high' 
                        ? `radial-gradient(circle, hsla(var(--destructive), ${village.intensity * 0.4}) 0%, hsla(var(--destructive), ${village.intensity * 0.2}) 30%, transparent 70%)`
                        : village.riskLevel === 'medium'
                        ? `radial-gradient(circle, hsla(var(--warning), ${village.intensity * 0.4}) 0%, hsla(var(--warning), ${village.intensity * 0.2}) 30%, transparent 70%)`
                        : `radial-gradient(circle, hsla(var(--success), ${village.intensity * 0.4}) 0%, hsla(var(--success), ${village.intensity * 0.2}) 30%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Village marker */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={position}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full ${getRiskColor(village.riskLevel)} flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-300 border-2 border-white`}
                      title={`${village.village}: ${village.cases} cases`}
                    >
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute top-9 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap border border-border">
                      <div className="font-semibold">{village.village}</div>
                      <div className="text-muted-foreground">{village.cases} cases</div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Regional boundary overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-lg pointer-events-none"></div>
            <div className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium border border-border">
              Northeast India Health Map
            </div>
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