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
})  {
  return (
    <div className="text-[#005B9E] space-y-5 text-sm">
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-0.5" />
          <p>
            <span className="font-semibold">No glare</span> or stain over the scan.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 mt-0.5" />
          <p>
            <span className="font-semibold">No shadows</span> over the scan.
          </p>
        </div>
      </div>

      {/* Example images */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex flex-col items-center">
          <Image
            src="/images/noglare-valid.png"
            alt="Clear passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-green-500 text-xl mt-2">✔️</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/noglare-invalid.png"
            alt="Glare passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-red-500 text-xl mt-2">❌</span>
        </div>
      </div>

      {/* Buttons */}
       <div className="flex justify-center gap-3 mt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="text-[#005B9E] border-[#005B9E] hover:bg-[#e6f3fa]"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#005B9E] hover:bg-[#00487a] text-white px-6 py-2 rounded-md"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
