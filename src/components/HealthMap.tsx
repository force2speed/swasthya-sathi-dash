import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const healthData = [
  // Major cities with high intensity
  { village: "Guwahati", lat: 26.1445, lng: 91.7362, intensity: 1.0 },
  { village: "Shillong", lat: 25.5788, lng: 91.8933, intensity: 0.8 },
  { village: "Imphal", lat: 24.8170, lng: 93.9368, intensity: 0.9 },
  { village: "Aizawl", lat: 23.7367, lng: 92.7173, intensity: 0.7 },
  { village: "Kohima", lat: 25.6751, lng: 94.1086, intensity: 0.8 },
  { village: "Agartala", lat: 23.8315, lng: 91.2868, intensity: 0.9 },
  { village: "Itanagar", lat: 27.0844, lng: 93.6053, intensity: 0.6 },
  { village: "Gangtok", lat: 27.3314, lng: 88.6138, intensity: 0.7 },
  { village: "Jorhat", lat: 26.7509, lng: 94.2037, intensity: 0.85 },
  { village: "Dibrugarh", lat: 27.4728, lng: 94.9120, intensity: 0.75 },
  
  // Rural Northeast Areas - High Risk Zones
  { village: "Majuli Island", lat: 26.9539, lng: 94.2196, intensity:1 },
  { village: "Kaziranga", lat: 26.5774, lng: 93.1716, intensity: 0.8 },
  { village: "Sivasagar", lat: 26.9860, lng: 94.6371, intensity: 0.85 },
  { village: "Morigaon", lat: 26.2526, lng: 92.3426, intensity: 0.9 },
  { village: "Dhemaji", lat: 27.4867, lng: 94.5746, intensity: 0.88 },
  { village: "Lakhimpur", lat: 27.2320, lng: 94.1010, intensity: 0.82 },
  { village: "Bongaigaon", lat: 26.4831, lng: 90.5569, intensity: 0.78 },
  { village: "Kokrajhar", lat: 26.4018, lng: 90.2727, intensity: 0.75 },
  { village: "Chirang", lat: 26.6319, lng: 90.2867, intensity: 0.72 },
  { village: "Baksa", lat: 26.7068, lng: 91.1073, intensity: 0.68 },
  
  // Assam Tea Gardens - Vulnerable Areas
  { village: "Tingkhong Tea Estate", lat: 27.2833, lng: 95.4167, intensity: 0.83 },
  { village: "Doom Dooma", lat: 27.5578, lng: 95.5517, intensity: 0.79 },
  { village: "Margherita", lat: 27.2908, lng: 95.6789, intensity: 0.81 },
  { village: "Namrup", lat: 27.1928, lng: 95.3189, intensity: 0.77 },
  
  // Border Areas - Health Monitoring Zones
  { village: "Dhubri", lat: 26.0167, lng: 89.9833, intensity: 0.87 },
  { village: "Mankachar", lat: 25.5333, lng: 89.8667, intensity: 0.84 },
  { village: "Hailakandi", lat: 24.6844, lng: 92.5636, intensity: 0.86 },
  { village: "Karimganj", lat: 24.8697, lng: 92.3647, intensity: 0.89 },
  
  // Manipur Rural Areas
  { village: "Churachandpur", lat: 24.3333, lng: 93.6833, intensity: 0.73 },
  { village: "Ukhrul", lat: 25.1051, lng: 94.3598, intensity: 0.71 },
  { village: "Tamenglong", lat: 24.9833, lng: 93.5167, intensity: 0.69 },
  
  // Mizoram Hill Areas
  { village: "Lunglei", lat: 22.8833, lng: 92.7333, intensity: 0.65 },
  { village: "Champhai", lat: 23.4593, lng: 93.3267, intensity: 0.67 },
  { village: "Serchhip", lat: 23.3011, lng: 92.8361, intensity: 0.63 },
  
  // Nagaland Villages
  { village: "Mokokchung", lat: 26.3208, lng: 94.5203, intensity: 0.74 },
  { village: "Tuensang", lat: 26.2833, lng: 94.8167, intensity: 0.76 },
  { village: "Wokha", lat: 26.0969, lng: 94.2626, intensity: 0.72 },
  
  // Tripura Rural Districts
  { village: "Kailashahar", lat: 24.3317, lng: 92.0036, intensity: 0.70 },
  { village: "Dharmanagar", lat: 24.3683, lng: 92.1575, intensity: 0.68 },
  { village: "Ambassa", lat: 23.9375, lng: 91.8619, intensity: 0.66 },
];

function HeatmapLayer({ points }) {
  const map = useMap();

  L.heatLayer(
    points.map(p => [p.lat, p.lng, p.intensity]),
    { 
      radius: 35,           // Increased radius for stronger effect
      blur: 25,             // Increased blur for better blending
      maxZoom: 18,          // Better performance at high zoom
      max: 1.0,             // Maximum intensity value
      minOpacity: 0.4,      // Minimum opacity for visibility
      gradient: {           // Custom gradient for stronger colors
        0.0: '#0000FF',     // Blue for low intensity
        0.2: '#00FFFF',     // Cyan
        0.4: '#00FF00',     // Green
        0.6: '#FFFF00',     // Yellow
        0.8: '#FF8000',     // Orange
        1.0: '#FF0000'      // Red for high intensity
      }
    }
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
          center={[26.5, 93.0]} // Centered on Northeast India to highlight rural areas
          zoom={7}
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
