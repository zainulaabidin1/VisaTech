"use client";

import Image from "next/image";
import { FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Step2ColorInstruction({
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
        Color & Clarity Instructions
      </motion.h2>

      {/* Instruction Section */}
      <div className="flex flex-col items-center space-y-4 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#00A5E5]/20">
          <FileText className="w-6 h-6 text-[#00A5E5]" />
          <p className="leading-relaxed">
            Please ensure your uploaded document is in{" "}
            <span className="font-semibold text-[#005B9E]">full color</span>.  
            Black-and-white or unclear copies will{" "}
            <span className="font-semibold text-red-500">not be accepted</span>.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm bg-[#f1f7fc] p-3 rounded-lg border border-[#005B9E]/10">
          <AlertCircle className="w-4 h-4 text-[#005B9E]" />
          <p>
            Make sure the image is <b>clear, glare-free</b>, and all details are visible.
          </p>
        </div>
      </div>

      {/* Example Image */}
      <motion.div
        className="flex justify-center items-center mt-10"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <Image
            src="/step2passport.png"
            alt="Full color passport example"
            width={600}
            height={320}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            ✅ Example of an acceptable full-color document
          </p>
        </div>
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
          onClick={onNext}
          className="bg-[#005B9E] hover:bg-[#00487a] text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-[1.03] cursor-pointer"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
