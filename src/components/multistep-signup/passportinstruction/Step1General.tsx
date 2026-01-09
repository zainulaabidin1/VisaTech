"use client";

import Image from "next/image";
import { AlertTriangle, Upload, User, Barcode, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step1General({ onNext }: { onNext?: () => void }) {
  return (
    <div className="h-full w-full flex flex-col p-6 overflow-hidden">
      {/* Header - Compact */}
      <div className="flex flex-col items-center text-center mb-4 flex-shrink-0">
        <h2 className="text-2xl font-bold text-[#003366] flex items-center gap-3">
          <div className="bg-[#003366] text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
            <FileCheck2 className="w-5 h-5" />
          </div>
          General Instructions
        </h2>
      </div>

      {/* Main Content - Flex to fill space */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 min-h-0 items-center justify-center">

        {/* Left: Instructions List - Scrollable if absolutely needed but designed to fit */}
        <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto pr-2">
          <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="bg-[#F1F5F9] p-2 rounded-full flex-shrink-0">
              <Upload className="w-5 h-5 text-[#003366]" />
            </div>
            <p className="text-sm md:text-base text-gray-700">
              Only <span className="font-semibold text-[#003366]">PNG, JPEG or JPG</span> formats.
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="bg-[#FFF7E6] p-2 rounded-full flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <p className="text-sm md:text-base text-gray-700">
              Max file size: <span className="font-semibold text-[#003366]">2 MB</span>.
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="bg-[#E0F2FE] p-2 rounded-full flex-shrink-0">
              <User className="w-5 h-5 text-[#004D99]" />
            </div>
            <p className="text-sm md:text-base text-gray-700">
              If <span className="font-semibold text-[#003366]">last name is blank</span>, use father’s name.
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="bg-[#E0F2FE] p-2 rounded-full flex-shrink-0">
              <Barcode className="w-5 h-5 text-[#004D99]" />
            </div>
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold text-[#003366]">MRZ code</span> must be clearly visible.
            </p>
          </div>
        </div>

        {/* Right: Example Image - Scales to fit */}
        <div className="flex-1 h-full max-h-[40vh] md:max-h-[60vh] flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-[#E2E8F0] p-4">
          <div className="relative w-full h-full">
            <Image
              src="/step1passport.png"
              alt="Valid passport example"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-xs text-[#64748B] mt-2 flex-shrink-0">
            Valid vs Invalid Examples
          </p>
        </div>
      </div>

      {/* Footer Button - Fixed at bottom */}
      <div className="flex justify-center mt-6 flex-shrink-0">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white px-10 py-2.5 text-lg rounded-full shadow-md transition-transform hover:scale-[1.02]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
