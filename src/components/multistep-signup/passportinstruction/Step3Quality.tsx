"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step3ClarityInstruction({
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
        Clarity & Visibility Instructions
      </h2>

      {/* Instructions */}
      <div className="space-y-4 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 mt-1 text-[#00A5E5]" />
          <p>
            Ensure there is <span className="font-semibold">no glare</span> or stain over the scan.
            The surface should appear clean and readable.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 mt-1 text-[#F9C400]" />
          <p>
            Make sure there are <span className="font-semibold">no shadows</span> over the document.
            Every part of the image should be evenly lit.
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-3 text-center">
          Photos taken under direct light or uneven lighting may cause glare or shadows.
          Try to capture your document in natural, indirect light.
        </p>
      </div>

      {/* Example Image */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform hover:scale-[1.02]">
          <Image
            src="/step3passport.png"
            alt="Clear passport example"
            width={600}
            height={300}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Example of a clear, glare-free passport scan
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] border-[#005B9E] cursor-pointer hover:bg-[#e6f3fa] px-8 py-3 text-lg rounded-lg transition-transform hover:scale-[1.03]"
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
