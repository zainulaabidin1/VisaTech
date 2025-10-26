"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step2ColorInstruction({
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
        Color & Clarity Instructions
      </h2>

      {/* Instruction */}
      <div className="flex flex-col items-center space-y-4 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <FileText className="w-6 h-6 text-[#00A5E5]" />
          <p>
            Please make sure to upload your document in{" "}
            <span className="font-semibold text-[#005B9E]">full color</span>.  
            Black-and-white or unclear copies will not be accepted.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          The uploaded image should clearly show all details — no blur, no glare, and full visibility of text and face.
        </p>
      </div>

      {/* Example Image */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-transform hover:scale-[1.02]">
          <Image
            src="/step2passport.png"
            alt="Full color passport example"
            width={600}
            height={300}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Example of acceptable full-color document
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
