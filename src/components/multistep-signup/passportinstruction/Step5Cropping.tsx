"use client";

import { useState } from "react";
import Image from "next/image";
import { Crop, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Step5CropInstruction({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <motion.div
      className="h-full w-full flex flex-col p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 mb-4 text-center">
        <h2 className="text-2xl font-bold text-[#003366]">Cropping & Framing</h2>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 min-h-0">
        <div className="flex-1 max-w-md space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#00A5E5]/30">
            <div className="flex items-center gap-3 mb-2">
              <Crop className="w-6 h-6 text-[#00A5E5]" />
              <p className="font-semibold text-[#003366]">Proper Framing</p>
            </div>
            <p className="text-sm text-gray-700">Crop carefully to ensure <span className="font-semibold">no details are missing</span>. All text/borders must be visible.</p>
          </div>

          <p className="text-sm text-gray-600 italic">
            📏 Image should not be too zoomed in or have excess background.
          </p>

          {/* Checkbox moved up to be part of instructions on desktop */}
          <div
            onClick={() => setChecked(!checked)}
            className="flex items-center gap-3 mt-4 cursor-pointer select-none bg-white p-3 rounded-xl border border-[#003366]/30 hover:shadow-md transition-all"
          >
            <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors ${checked ? "bg-[#003366] border-[#003366]" : "border-[#003366] bg-white"}`}>
              {checked && <CheckCircle2 className="h-4 w-4 text-white" />}
            </div>
            <label className="text-[#003366] text-sm font-medium cursor-pointer">
              I understand cropping instructions.
            </label>
          </div>
        </div>

        <div className="flex-1 h-full max-h-[40vh] md:max-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative w-full h-full bg-white rounded-xl shadow-lg border border-gray-100 p-2">
            <Image
              src="/step5passport.png"
              alt="Properly cropped passport example"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">✅ Properly cropped example</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
        <Button onClick={onPrev} variant="outline" className="text-[#003366] border-[#003366] px-8 py-2.5 rounded-full hover:bg-[#F1F5F9]">Back</Button>
        <Button disabled={!checked} onClick={onNext} className={`px-8 py-2.5 rounded-full shadow-md ${checked ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"}`}>Continue</Button>
      </div>
    </motion.div>
  );
}
