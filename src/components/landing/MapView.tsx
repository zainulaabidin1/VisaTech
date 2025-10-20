"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet"; // ✅ static import for hook
import "leaflet/dist/leaflet.css";
import type { Icon } from "leaflet";

// Import marker images
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Dynamically import components only
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface MapViewProps {
  coords: [number, number];
  zoom: number;
  city: string;
  country: string;
  occupation: string;
}

// Component to update map center when coords change
function ChangeView({ coords }: { coords: [number, number] }) {
  const map = useMap(); // ✅ use static import
  useEffect(() => {
    map.setView(coords, map.getZoom(), { animate: true });
  }, [coords, map]);
  return null;
}

export default function MapView({ coords, zoom, city, country, occupation }: MapViewProps) {
  const [icon, setIcon] = useState<Icon | null>(null);

  useEffect(() => {
    const L = require("leaflet");
    const newIcon = L.icon({
      iconUrl: markerIconPng,
      shadowUrl: markerShadowPng,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    setIcon(newIcon);
  }, []);

  if (!icon) return <div className="h-[450px] bg-gray-100 rounded-xl" />;

  return (
    <MapContainer center={coords} zoom={zoom} scrollWheelZoom={false} className="h-full w-full z-10">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
      />
      <ChangeView coords={coords} />
      <Marker position={coords} icon={icon}>
        <Popup>
          <strong>{city}</strong> — {country}
          <br />
          Occupation: {occupation}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
