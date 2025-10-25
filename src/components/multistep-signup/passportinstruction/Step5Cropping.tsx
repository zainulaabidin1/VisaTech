"use client";

import { useState } from "react";
import Image from "next/image";
import { Crop } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step5CropInstruction({
  onNext,
  onPrev,
}: {
  onNext?: () => void;
  onPrev?: () => void;
})  {
  const [checked, setChecked] = useState(false);

  return (
    <div className="text-[#005B9E] space-y-5 text-sm">
      {/* Instruction Text */}
      <div className="flex items-start gap-2">
        <Crop className="w-4 h-4 mt-0.5" />
        <p>
          Crop the document so that{" "}
          <span className="font-semibold">no information is missed</span>.
        </p>
      </div>

      {/* Example Images */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex flex-col items-center">
          <Image
            src="/images/crop-valid.png"
            alt="Properly cropped passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-green-500 text-xl mt-2">✔️</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/crop-invalid.png"
            alt="Incorrectly cropped passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-red-500 text-xl mt-2">❌</span>
        </div>
      </div>

      {/* Custom Checkbox Confirmation */}
      <div
        className="flex items-start gap-2 mt-4 cursor-pointer select-none"
        onClick={() => setChecked(!checked)}
      >
        <div
          className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
            checked
              ? "bg-[#005B9E] border-[#005B9E]"
              : "border-[#005B9E] bg-white"
          }`}
        >
          {checked && <span className="text-white text-sm">✓</span>}
        </div>
        <label className="text-[#005B9E] leading-tight cursor-pointer">
          I have reviewed the instructions on how to upload the photo.
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] border-[#005B9E] hover:bg-[#e6f3fa]"
        >
          Back
        </Button>
        <Button
          disabled={!checked}
          onClick={onNext}
          className={`${
            checked
              ? "bg-[#005B9E] hover:bg-[#00487a]"
              : "bg-[#9cc6e4] cursor-not-allowed"
          } text-white px-6 py-2 rounded-md`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

