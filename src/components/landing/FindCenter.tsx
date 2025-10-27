"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Briefcase, Navigation } from "lucide-react";
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

type CountryName = keyof typeof data;

export default function FindCenter() {
  const defaultCountry: CountryName = "Morocco";
  const defaultCity = Object.keys(data[defaultCountry].cities)[0];

  const [country, setCountry] = useState<CountryName>(defaultCountry);
  const [city, setCity] = useState<string>(defaultCity);
  const [occupation, setOccupation] = useState("Kitchen Worker");

  const currentCountry = data[country];
  const currentCityCoords = currentCountry.cities[city as keyof typeof currentCountry.cities];

  return (
    <section className="relative w-full bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#059669]/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#F59E0B]/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#003366]/10 to-[#059669]/10 border border-[#003366]/20 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-[#003366]" />
            <span className="text-sm font-medium text-[#1E293B]">
              Test Center Locator
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            Find Test Center
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
            In Your Country
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-7xl mx-auto">
          {/* Left Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-[#E2E8F0] h-full flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366]/10 to-[#004D99]/10 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-[#003366]" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#003366]">Search Centers</h3>
                <p className="text-sm text-[#64748B]">Find the nearest test location</p>
              </div>
            </div>

            {/* Country Selector */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-[#003366] font-semibold mb-3">
                <Building2 className="w-4 h-4 text-[#F59E0B]" />
                Country
              </label>
              <select
                className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] py-4 px-4 rounded-xl focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent text-[#1E293B] font-medium transition-all cursor-pointer hover:border-[#F59E0B]/50"
                value={country}
                onChange={(e) => {
                  const selectedCountry = e.target.value as CountryName;
                  setCountry(selectedCountry);
                  const firstCity = Object.keys(data[selectedCountry].cities)[0];
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
              <label className="flex items-center gap-2 text-[#003366] font-semibold mb-3">
                <Briefcase className="w-4 h-4 text-[#059669]" />
                Occupation
              </label>
              <select
                className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] py-4 px-4 rounded-xl focus:ring-2 focus:ring-[#059669] focus:border-transparent text-[#1E293B] font-medium transition-all cursor-pointer hover:border-[#059669]/50"
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
            <div className="mb-8">
              <label className="flex items-center gap-2 text-[#003366] font-semibold mb-3">
                <MapPin className="w-4 h-4 text-[#003366]" />
                City
              </label>
              <select
                className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] py-4 px-4 rounded-xl focus:ring-2 focus:ring-[#003366] focus:border-transparent text-[#1E293B] font-medium transition-all cursor-pointer hover:border-[#003366]/50"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {Object.keys(currentCountry.cities).map((cityName) => (
                  <option key={cityName}>{cityName}</option>
                ))}
              </select>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-[#F59E0B]/5 to-[#D97706]/5 rounded-2xl p-6 border border-[#F59E0B]/20 mt-auto">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003366] mb-2">Selected Location</h4>
                  <p className="text-sm text-[#64748B] mb-1">
                    <span className="font-semibold text-[#1E293B]">{country}</span> - {city}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    Coordinates: {(currentCityCoords as number[])?.join(", ") || currentCountry.coords.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative h-[650px] lg:h-[700px]"
          >
            

            {/* Note: Replace the placeholder above with actual MapView component */}
            <MapView
              coords={currentCityCoords || currentCountry.coords}
              zoom={city ? 7 : 4}
              city={city}
              country={country}
              occupation={occupation}
            />
           
          </motion.div>
        </div>
      </div>
    </section>
  );
}