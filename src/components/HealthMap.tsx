import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const healthData = [
  { village: "Guwahati", lat: 26.1445, lng: 91.7362, intensity: 0.9 },
  { village: "Shillong", lat: 25.5788, lng: 91.8933, intensity: 0.6 },
  { village: "Imphal", lat: 24.8170, lng: 93.9368, intensity: 0.8 },
  { village: "Aizawl", lat: 23.7367, lng: 92.7173, intensity: 0.3 },
  { village: "Kohima", lat: 25.6751, lng: 94.1086, intensity: 0.5 },
  { village: "Agartala", lat: 23.8315, lng: 91.2868, intensity: 0.85 },
  { village: "Itanagar", lat: 27.0844, lng: 93.6053, intensity: 0.25 },
  { village: "Gangtok", lat: 27.3314, lng: 88.6138, intensity: 0.4 },
  { village: "Jorhat", lat: 26.7509, lng: 94.2037, intensity: 0.55 },
  { village: "Dibrugarh", lat: 27.4728, lng: 94.9120, intensity: 0.28 },
];

function HeatmapLayer({ points }) {
  const map = useMap();

  L.heatLayer(
    points.map(p => [p.lat, p.lng, p.intensity]),
    { radius: 25 }
  ).addTo(map);

  return null;
}

export function HealthMap() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Geographic Health Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MapContainer
          center={[26.1445, 91.7362]} // Center on Guwahati
          zoom={6}
          style={{ height: "500px", width: "100%", borderRadius: "12px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          />
          <HeatmapLayer points={healthData} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}
