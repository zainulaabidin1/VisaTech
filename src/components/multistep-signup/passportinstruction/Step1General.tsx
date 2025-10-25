"use client";

import Image from "next/image";
import { AlertTriangle, Upload, User, Barcode } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step1General({ onNext }: { onNext?: () => void }) {
  return (
    <div className="text-[#005B9E] space-y-5 text-sm">
      <h2 className="text-xl font-semibold text-[#005B9E] mb-3">
        General Instructions
      </h2>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <Upload className="w-4 h-4 mt-0.5" />
          <p>
            Only <span className="font-semibold">PNG, JPEG or JPG</span> images must be used.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5" />
          <p className="font-lg">
            The <span className="font-semibold">size</span> of the photo should not exceed{" "}
            <span className="font-semibold">2 MBs</span>.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <User className="w-4 h-4 mt-0.5" />
          <p>
            If your <span className="font-semibold">last name is blank</span>, please provide your{" "}
            <span className="font-semibold">father&apos;s name</span> as the last name.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <Barcode className="w-4 h-4 mt-0.5" />
          <p>
            The <span className="font-semibold">MRZ code</span> should be clearly visible; otherwise,
            the request will be rejected.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-6">
        <div className="flex flex-col items-center">
          <Image
            src="/images/passport-valid.png"
            alt="Valid passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-green-500 text-xl mt-2">✔️</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/passport-invalid.png"
            alt="Invalid passport example"
            width={300}
            height={200}
            className="rounded-md shadow-md border border-gray-200"
          />
          <span className="text-red-500 text-xl mt-2">❌</span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
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
