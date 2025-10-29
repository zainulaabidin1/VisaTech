"use client";

import Image from "next/image";
import { Sparkles, Sun, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Step3ClarityInstruction({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
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
        Clarity & Visibility Instructions
      </motion.h2>

      {/* Instructions */}
      <div className="space-y-5 max-w-2xl mx-auto">
        <motion.div
          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#00A5E5]/20"
          whileHover={{ scale: 1.02 }}
        >
          <Sparkles className="w-6 h-6 mt-1 text-[#00A5E5]" />
          <p className="leading-relaxed">
            Ensure there is <span className="font-semibold">no glare</span> or stain on the scan.  
            The surface should appear clean, bright, and easy to read.
          </p>
        </motion.div>

        <motion.div
          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#F9C400]/30"
          whileHover={{ scale: 1.02 }}
        >
          <Sun className="w-6 h-6 mt-1 text-[#F9C400]" />
          <p className="leading-relaxed">
            Avoid <span className="font-semibold">shadows</span> or dark areas over your document.  
            Make sure every part of the image is evenly lit.
          </p>
        </motion.div>

        <motion.div
          className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#005B9E]/10"
          whileHover={{ scale: 1.02 }}
        >
          <Eye className="w-6 h-6 mt-1 text-[#005B9E]" />
          <p className="leading-relaxed">
            Capture your document in <span className="font-semibold">natural, indirect light</span>.  
            Avoid flash or strong reflections for the best clarity.
          </p>
        </motion.div>

        <p className="text-sm text-gray-600 text-center mt-3">
          ⚠️ Photos taken under harsh light or shadows may cause glare,  
          making important details unreadable. Take time to get a clean image.
        </p>
      </div>

      {/* Example Image */}
      <motion.div
        className="flex justify-center items-center mt-10"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <Image
            src="/step3passport.png"
            alt="Clear passport example"
            width={600}
            height={320}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            ✅ Example of a clear, glare-free passport scan
          </p>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] border-[#005B9E] hover:bg-[#e6f3fa] px-8 py-3 text-lg rounded-lg transition-transform hover:scale-[1.03] cursor-pointer"
        >
          Back
        </Button>

        <Button
          onClick={onNext}
          className="bg-[#005B9E] hover:bg-[#00487a] text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-[1.03] cursor-pointer"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
