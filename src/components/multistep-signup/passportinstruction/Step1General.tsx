"use client";

import Image from "next/image";
import { AlertTriangle, Upload, User, Barcode, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Step1General({ onNext }: { onNext?: () => void }) {
  return (
    <div className="text-[#1E293B] bg-[#F8FAFC] p-8 rounded-2xl shadow-md border border-[#E2E8F0] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-gradient-to-r from-[#003366] to-[#004D99] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-md mb-4">
          <FileCheck2 className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-[#003366]">
          General Passport Upload Instructions
        </h2>
        <p className="text-[#64748B] text-sm max-w-md">
          Please read the following instructions carefully before uploading your passport photo.
        </p>
      </div>

      {/* Instruction list */}
      <div className="space-y-6 max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-[#E2E8F0]">
        <div className="flex items-start gap-4">
          <div className="bg-[#F1F5F9] p-2 rounded-full">
            <Upload className="w-5 h-5 text-[#003366]" />
          </div>
          <p>
            Only <span className="font-semibold text-[#003366]">PNG, JPEG or JPG</span> image formats
            are allowed for passport uploads.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-[#FFF7E6] p-2 rounded-full">
            <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <p>
            The <span className="font-semibold text-[#003366]">file size</span> must not exceed{" "}
            <span className="font-semibold text-[#003366]">2 MB</span>.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-[#E0F2FE] p-2 rounded-full">
            <User className="w-5 h-5 text-[#004D99]" />
          </div>
          <p>
            If your <span className="font-semibold text-[#003366]">last name is blank</span>, please
            use your <span className="font-semibold text-[#003366]">father’s name</span> instead.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-[#E0F2FE] p-2 rounded-full">
            <Barcode className="w-5 h-5 text-[#004D99]" />
          </div>
          <p>
            The <span className="font-semibold text-[#003366]">MRZ code</span> at the bottom of your
            passport must be clearly visible; otherwise, the upload will be rejected.
          </p>
        </div>
      </div>

      {/* Example Image Section */}
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-[#E2E8F0] hover:shadow-xl transition-all">
          <Image
            src="/step1passport.png"
            alt="Valid passport example"
            width={600}
            height={320}
            className="rounded-lg object-contain"
          />
          <p className="text-center text-sm text-[#64748B] mt-3">
            Example showing valid and invalid passport photos
          </p>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex justify-center mt-10">
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white px-8 py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-[1.02]"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
