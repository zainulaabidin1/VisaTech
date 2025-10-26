"use client";

import Image from "next/image";
import { FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step4SinglePageInstruction({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
}) {
  return (
    <div className="text-[#005B9E] space-y-8 text-base bg-[#f9fafc] p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#005B9E] text-center mb-6 border-b pb-3 border-blue-200">
        Single Page Upload Instructions
      </h2>

      {/* Instruction text */}
      <div className="space-y-5 max-w-2xl mx-auto text-center">
        <div className="flex items-start justify-center gap-3">
          <FileWarning className="w-6 h-6 mt-1 text-[#F9C400]" />
          <p className="text-[#005B9E]">
            Double pages of scanned copies are <span className="font-semibold">not allowed</span>.
            <br />
            Please ensure you upload <span className="font-semibold">only a single page</span> of your passport.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Uploading both left and right pages in one image may cause rejection. Crop or rescan the document
          to include only the required single page.
        </p>
      </div>

      {/* Example Image */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform hover:scale-[1.02]">
          <Image
            src="/step4passport.png"
            alt="Single page valid passport example"
            width={600}
            height={300}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Example of valid single-page passport scan
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] cursor-pointer border-[#005B9E] hover:bg-[#e6f3fa] px-8 py-3 text-lg rounded-lg transition-transform hover:scale-[1.03]"
        >
          Back
        </Button>

        <Button
          onClick={onNext}
          className="bg-[#005B9E] hover:bg-[#00487a] cursor-pointer text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-[1.03]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
