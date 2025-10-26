"use client";

import Image from "next/image";
import { AlertTriangle, Upload, User, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step1General({ onNext }: { onNext?: () => void }) {
  return (
    <div className="text-[#005B9E] space-y-8 text-base bg-[#f9fafc] p-8 rounded-2xl shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#005B9E] text-center mb-6 border-b pb-3 border-blue-200">
        General Instructions
      </h2>

      {/* Instruction list */}
      <div className="space-y-5 max-w-3xl mx-auto">
        <div className="flex items-start gap-3">
          <Upload className="w-5 h-5 mt-1 text-[#005B9E]" />
          <p>
            Only <span className="font-semibold">PNG, JPEG or JPG</span> images must be used.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 mt-1 text-[#F9C400]" />
          <p>
            The <span className="font-semibold">size</span> of the photo should not exceed{" "}
            <span className="font-semibold">2 MBs</span>.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <User className="w-5 h-5 mt-1 text-[#00A5E5]" />
          <p>
            If your <span className="font-semibold">last name is blank</span>, please provide your{" "}
            <span className="font-semibold">father&apos;s name</span> as the last name.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Barcode className="w-5 h-5 mt-1 text-[#00A5E5]" />
          <p>
            The <span className="font-semibold">MRZ code</span> should be clearly visible; otherwise,
            the request will be rejected.
          </p>
        </div>
      </div>

      {/* Example Image */}
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
          <Image
            src="/step1passport.png"
            alt="Valid passport example"
            width={600}
            height={300}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-gray-500 mt-3">
            Example of valid and invalid passport photos
          </p>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={onNext}
          className="bg-[#005B9E] hover:bg-[#00487a] cursor-pointer text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-[1.02]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
