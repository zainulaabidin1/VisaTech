"use client";

import Image from "next/image";
import { FileWarning, Scissors, ImageOff } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Step4SinglePageInstruction({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  return (
    <motion.div
      className="h-full w-full flex flex-col p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 mb-4 text-center">
        <h2 className="text-2xl font-bold text-[#005B9E]">Single Page Upload</h2>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 min-h-0">
        <div className="flex-1 max-w-md space-y-3 overflow-y-auto max-h-full pr-2">
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#F9C400]/30">
            <FileWarning className="w-6 h-6 text-[#F9C400]" />
            <p className="text-sm text-gray-700">No double pages. <span className="font-semibold">One page</span> at a time.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#00A5E5]/20">
            <Scissors className="w-6 h-6 text-[#00A5E5]" />
            <p className="text-sm text-gray-700"><span className="font-semibold">Crop</span> if scan has both pages.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#FF8080]/20">
            <ImageOff className="w-6 h-6 text-[#FF8080]" />
            <p className="text-sm text-gray-700">Two-page images will be <span className="font-semibold">rejected</span>.</p>
          </div>
        </div>

        <div className="flex-1 h-full max-h-[40vh] md:max-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative w-full h-full bg-white rounded-xl shadow-lg border border-gray-100 p-2">
            <Image
              src="/step4passport.png"
              alt="Single page passport example"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">✅ Valid single-page scan</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
        <Button onClick={onPrev} variant="outline" className="text-[#005B9E] border-[#005B9E] px-8 py-2.5 rounded-full">Back</Button>
        <Button onClick={onNext} className="bg-[#005B9E] hover:bg-[#00487a] text-white px-8 py-2.5 rounded-full shadow-md">Continue</Button>
      </div>
    </motion.div>
  );
}
