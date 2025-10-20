"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MapView from "./MapView";

// === Sample Data ===
const data = {
  Morocco: {
    coords: [31.7917, -7.0926],
    cities: {
      Rabat: [34.020882, -6.84165],
      Casablanca: [33.5731, -7.5898],
    },
  },
  Pakistan: {
    coords: [30.3753, 69.3451],
    cities: {
      Lahore: [31.5204, 74.3587],
      Karachi: [24.8607, 67.0011],
      Islamabad: [33.6844, 73.0479],
    },
  },
  USA: {
    coords: [37.0902, -95.7129],
    cities: {
      "New York": [40.7128, -74.006],
      Chicago: [41.8781, -87.6298],
      Dallas: [32.7767, -96.797],
    },
  },
};

type CountryName = keyof typeof data; // "Morocco" | "Pakistan" | "USA"

export default function FindCenter() {
  const defaultCountry: CountryName = "Morocco";
  const defaultCity = Object.keys(data[defaultCountry].cities)[0]; // string

  // ✅ Use string for city state to avoid TypeScript errors
  const [country, setCountry] = useState<CountryName>(defaultCountry);
  const [city, setCity] = useState<string>(defaultCity);
  const [occupation, setOccupation] = useState("Kitchen Worker");

  const currentCountry = data[country];
  const currentCityCoords = currentCountry.cities[city as keyof typeof currentCountry.cities];
  const zoomLevel = city ? 7 : 4;

  return (
    <section className="relative w-full bg-gradient-to-b from-white via-blue-50/40 to-blue-100/10 py-20">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Form Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#005B9E] leading-tight">
            Find test center <br />
            <span className="text-[#00A5E5]">in your country</span>
          </h2>

          {/* Country Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Country</label>
            <select
              className="w-full bg-[#F8FEFE] border-none py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#00A5E5] text-gray-800"
              value={country}
              onChange={(e) => {
                const selectedCountry = e.target.value as CountryName;
                setCountry(selectedCountry);
                const firstCity = Object.keys(data[selectedCountry].cities)[0]; // string
                setCity(firstCity);
              }}
            >
              {Object.keys(data).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Occupation Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Occupation</label>
            <select
              className="w-full bg-[#F8FEFE] border-none py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#00A5E5] text-gray-800"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            >
              <option>Kitchen Worker</option>
              <option>Teacher</option>
              <option>Engineer</option>
              <option>Doctor</option>
            </select>
          </div>

          {/* City Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <select
              className="w-full bg-[#F8FEFE] border-none py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#00A5E5] text-gray-800"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {Object.keys(currentCountry.cities).map((cityName) => (
                <option key={cityName}>{cityName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Map Section */}
        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
          <MapView
            coords={currentCityCoords || currentCountry.coords}
            zoom={zoomLevel}
            city={city}
            country={country}
            occupation={occupation}
          />

          {/* Overlay Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-md"
          >
            <h3 className="font-bold text-lg text-[#005B9E]">
              {country} ({city})
            </h3>
            <p className="text-gray-600 text-sm">
  Coordinates: {(currentCityCoords as number[])?.join(", ") || currentCountry.coords.join(", ")}
</p>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
