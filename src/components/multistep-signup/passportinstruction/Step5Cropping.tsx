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
      className="text-[#005B9E] space-y-8 text-base bg-gradient-to-b from-[#f9fafc] to-[#eef6fb] p-8 rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.h2
        className="text-3xl font-bold text-[#005B9E] text-center mb-6 border-b pb-3 border-blue-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Cropping & Framing Instructions
      </motion.h2>

      {/* Instructions */}
      <div className="space-y-4 max-w-2xl mx-auto text-center">
        <motion.div
          className="flex flex-col items-center bg-white p-5 rounded-xl shadow-sm border border-[#00A5E5]/30 hover:shadow-md transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <Crop className="w-8 h-8 text-[#00A5E5] mb-3" />
          <p className="text-[#005B9E] leading-relaxed">
            Crop the document carefully to ensure{" "}
            <span className="font-semibold">no details or edges are missing</span>.
            All text and borders should be clearly visible.
          </p>
        </motion.div>

        <p className="text-sm text-gray-600">
          📏 Make sure the image is neither too zoomed in nor cropped out —
          maintain proper spacing around the document.
        </p>
      </div>

      {/* Example Image */}
      <motion.div
        className="flex justify-center items-center mt-8"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <Image
            src="/step5passport.png"
            alt="Properly cropped passport example"
            width={550}
            height={320}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            ✅ Example of a properly cropped passport photo
          </p>
        </div>
      </motion.div>

      {/* Confirmation Checkbox */}
      <motion.div
        onClick={() => setChecked(!checked)}
        className="flex items-center gap-3 mt-6 cursor-pointer justify-center select-none bg-white p-4 rounded-xl border border-[#005B9E]/30 hover:shadow-md transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <div
          className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors duration-300 ${
            checked ? "bg-[#005B9E] border-[#005B9E]" : "border-[#005B9E] bg-white"
          }`}
        >
          {checked && <CheckCircle2 className="h-4 w-4 text-white" />}
        </div>
        <label className="text-[#005B9E] leading-tight cursor-pointer text-sm sm:text-base">
          I confirm that I’ve reviewed and understood the cropping instructions.
        </label>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] border-[#005B9E] hover:bg-[#e6f3fa] px-8 py-3 text-lg rounded-lg transition-transform hover:scale-[1.03] cursor-pointer"
        >
          Back
        </Button>

        <Button
          disabled={!checked}
          onClick={onNext}
          className={`px-8 py-3 text-lg rounded-lg shadow-md transition-transform ${
            checked
              ? "bg-[#005B9E] hover:bg-[#00487a] text-white hover:scale-[1.03] cursor-pointer"
              : "bg-[#9cc6e4] text-white cursor-not-allowed"
          }`}
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
