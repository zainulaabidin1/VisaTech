"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
};

export function Step6UploadPassport({ onNext, onPrev }: StepProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert("File must be less than 2MB and in PNG, JPG, or JPEG format.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onNext?.();
    } else {
      alert("Please upload your passport before proceeding.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="space-y-8 text-[#005B9E]"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center">
        Upload your Passport
      </h2>
      <p className="text-center text-[#005B9E]/80 text-sm">
        Make sure your passport image is clear, well-lit, and cropped correctly.
      </p>

      {/* Upload Box */}
      <div
        className="relative border-2 border-dashed border-[#00A5E5]/60 rounded-2xl py-14 flex flex-col items-center justify-center hover:bg-[#E8F4FA] transition-all cursor-pointer shadow-sm hover:shadow-md"
        onClick={() => document.getElementById("passportUpload")?.click()}
      >
        <Upload className="h-12 w-12 text-[#00A5E5] mb-3" />
        {file ? (
          <p className="text-base font-medium text-[#005B9E]">
            {file.name}
          </p>
        ) : (
          <div className="text-center">
            <p className="text-[#005B9E] font-medium text-base">
              Drag & drop your file here
            </p>
            <p className="text-sm text-[#00A5E5] mt-1 underline cursor-pointer">
              or Browse to upload
            </p>
          </div>
        )}
        <input
          id="passportUpload"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Info Text */}
      <p className="text-sm text-center text-[#005B9E]/80">
        Only <span className="font-semibold">PNG, JPG</span> or{" "}
        <span className="font-semibold">JPEG</span> formats are supported. Max file size:{" "}
        <span className="font-semibold">2MB</span>.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => onPrev?.()}
          className="border-[#00A5E5] text-[#00A5E5] cursor-pointer hover:bg-[#00A5E5] hover:text-white transition-all px-6"
        >
          Back
        </Button>

        <Button
          type="submit"
          disabled={!file}
          className={`px-6 cursor-pointer text-white transition-all rounded-md ${
            file
              ? "bg-[#00A5E5] hover:bg-[#008fc7]"
              : "bg-[#b7e0ef] cursor-not-allowed"
          }`}
        >
          {file ? "Continue" : "Upload File"}
        </Button>
      </div>
    </motion.form>
  );
}
