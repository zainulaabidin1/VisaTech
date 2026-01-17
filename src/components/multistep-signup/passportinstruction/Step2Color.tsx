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
      className="h-full w-full flex flex-col p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex-shrink-0 mb-4 text-center">
        <h2 className="text-2xl font-bold text-[#003366]">Color & Clarity</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 min-h-0">

        {/* Instructions */}
        <div className="flex-1 max-w-md space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#00A5E5]/20">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-[#00A5E5]" />
              <h3 className="font-semibold text-[#003366]">Full Color Required</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Upload <span className="font-semibold">color</span> scans only. Black-and-white copies will be rejected.
            </p>
          </div>

          <div className="bg-[#f1f7fc] p-4 rounded-xl border border-[#003366]/10 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#003366] mt-0.5" />
            <p className="text-sm text-gray-700">
              Ensure image is <b>glare-free</b> and all details are readable.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 h-full max-h-[40vh] md:max-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative w-full h-full bg-white rounded-xl shadow-lg border border-gray-100 p-2">
            <Image
              src="/step2passport.png"
              alt="Full color passport example"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">✅ Acceptable full-color example</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#003366] border-[#003366] px-8 py-2.5 rounded-full hover:bg-[#F1F5F9]"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white px-8 py-2.5 rounded-full shadow-md"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
