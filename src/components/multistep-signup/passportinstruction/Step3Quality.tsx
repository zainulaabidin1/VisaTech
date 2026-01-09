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
      className="h-full w-full flex flex-col p-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0 mb-4 text-center">
        <h2 className="text-2xl font-bold text-[#005B9E]">Clarity & Lighting</h2>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 min-h-0">
        <div className="flex-1 max-w-md space-y-3 overflow-y-auto max-h-full pr-2">
          <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#00A5E5]/20">
            <Sparkles className="w-5 h-5 mt-1 text-[#00A5E5]" />
            <p className="text-sm text-gray-700"><span className="font-semibold">No glare</span> or stains. Surface should be clean.</p>
          </div>

          <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#F9C400]/30">
            <Sun className="w-5 h-5 mt-1 text-[#F9C400]" />
            <p className="text-sm text-gray-700">Avoid <span className="font-semibold">shadows</span>. Ensure even lighting.</p>
          </div>

          <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-[#005B9E]/10">
            <Eye className="w-5 h-5 mt-1 text-[#005B9E]" />
            <p className="text-sm text-gray-700">Use <span className="font-semibold">natural light</span>. Avoid flash.</p>
          </div>

          <p className="text-xs text-red-500 italic mt-2">
            ⚠️ Harsh light or shadows can hide details and cause rejection.
          </p>
        </div>

        <div className="flex-1 h-full max-h-[40vh] md:max-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative w-full h-full bg-white rounded-xl shadow-lg border border-gray-100 p-2">
            <Image
              src="/step3passport.png"
              alt="Clear passport example"
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">✅ Clear, glare-free example</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
        <Button onClick={onPrev} variant="outline" className="text-[#005B9E] border-[#005B9E] px-8 py-2.5 rounded-full">Back</Button>
        <Button onClick={onNext} className="bg-[#005B9E] hover:bg-[#00487a] text-white px-8 py-2.5 rounded-full shadow-md">Continue</Button>
      </div>
    </motion.div>
  );
}
