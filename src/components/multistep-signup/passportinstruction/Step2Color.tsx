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
    <div className="text-[#005B9E] space-y-5 text-sm">
      <div className="flex items-start gap-2">
        <FileText className="w-4 h-4 mt-0.5" />
        <p>
          Please make sure to upload the document in{" "}
          <span className="font-semibold">full color</span>.
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex flex-col items-center">
          <Image
            src="/images/fullcolor-valid.png"
            alt="Full color passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-green-500 text-xl mt-2">✔️</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/fullcolor-invalid.png"
            alt="Black and white passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-red-500 text-xl mt-2">❌</span>
        </div>
      </div>

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
