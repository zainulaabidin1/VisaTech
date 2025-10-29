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
        Single Page Upload Instructions
      </motion.h2>

      {/* Instruction content */}
      <div className="space-y-5 max-w-2xl mx-auto text-center">
        <motion.div
          className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-sm border border-[#F9C400]/30 hover:shadow-md transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <FileWarning className="w-8 h-8 text-[#F9C400] mb-3" />
          <p className="text-[#005B9E] leading-relaxed">
            Double-page scanned copies are <span className="font-semibold">not allowed</span>.  
            Please upload <span className="font-semibold">only one page</span> of your passport at a time.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-sm border border-[#00A5E5]/20 hover:shadow-md transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <Scissors className="w-7 h-7 text-[#00A5E5] mb-3" />
          <p className="text-[#005B9E] leading-relaxed">
            If your scan includes both left and right pages,  
            <span className="font-semibold"> crop or rescan</span> to include only the required page.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center bg-white p-5 rounded-xl shadow-sm border border-[#FF8080]/20 hover:shadow-md transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <ImageOff className="w-7 h-7 text-[#FF8080] mb-3" />
          <p className="text-[#005B9E] leading-relaxed">
            Uploading unclear or two-page images may result in  
            <span className="font-semibold"> document rejection</span>.
          </p>
        </motion.div>

        <p className="text-sm text-gray-600 mt-3">
          ⚠️ Always verify that your uploaded file shows only the single, required passport page before submission.
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
            src="/step4passport.png"
            alt="Single page valid passport example"
            width={600}
            height={320}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            ✅ Example of a valid single-page passport scan
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
