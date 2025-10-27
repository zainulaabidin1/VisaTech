"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation, Briefcase, Compass } from "lucide-react";

interface MapViewProps {
  coords: [number, number];
  zoom: number;
  city: string;
  country: string;
  occupation: string;
}

export default function MapView({ coords, zoom, city, country, occupation }: MapViewProps) {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    // OpenStreetMap static image URL
    const [lat, lon] = coords;
    const zoomLevel = zoom;
    
    // Using OpenStreetMap Static Map API alternative
    // We'll use a tile-based approach to show the map
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lon}`;
    setMapUrl(url);
  }, [coords, zoom]);

  return (
    <div className="relative h-full w-full min-h-[650px]">
      {/* Map Container */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] shadow-2xl">
        {/* Embedded Map */}
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          title={`Map of ${city}, ${country}`}
          loading="lazy"
        />

        {/* Overlay gradient for better visibility of cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* Floating Info Card - Top Left */}
      <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-[#E2E8F0] z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669]/10 to-[#047857]/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#059669]" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-[#003366]">
              {country}
            </h3>
            <p className="text-sm text-[#64748B]">{city}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#64748B] mt-3 pt-3 border-t border-[#E2E8F0]">
          <Briefcase className="w-3 h-3" />
          <span>{occupation}</span>
        </div>
      </div>

      {/* Bottom Stats Card - Bottom Right */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-[#E2E8F0] z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/10 flex items-center justify-center">
            <Navigation className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-xs text-[#64748B]">Test Centers</p>
            <p className="text-xl font-bold bg-gradient-to-r from-[#059669] to-[#047857] bg-clip-text text-transparent">
              12
            </p>
          </div>
        </div>
      </div>

      {/* Coordinates Badge - Bottom Left */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-[#E2E8F0] z-10">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#003366]" />
          <p className="text-xs text-[#64748B] font-mono">
            {coords[0].toFixed(4)}, {coords[1].toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}