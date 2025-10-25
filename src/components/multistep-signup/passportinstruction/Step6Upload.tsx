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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-[#005B9E]">
        Upload your passport
      </h2>

      {/* Upload box */}
      <div
        className="border-2 border-dashed border-[#00A5E5]/50 rounded-xl py-12 flex flex-col items-center justify-center hover:bg-[#E8F4FA] transition cursor-pointer"
        onClick={() => document.getElementById("passportUpload")?.click()}
      >
        <Upload className="h-10 w-10 text-[#00A5E5] mb-3" />
        {file ? (
          <p className="text-[#005B9E] font-medium">{file.name}</p>
        ) : (
          <>
            <p className="text-[#005B9E] font-medium">
              Drag & drop your files here, or{" "}
              <span className="text-[#00A5E5] underline cursor-pointer">
                Browse
              </span>{" "}
              to upload
            </p>
          </>
        )}
        <input
          id="passportUpload"
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Info text */}
      <p className="text-sm text-center text-[#005B9E]/80">
        Your photo must be in{" "}
        <span className="font-semibold">PNG, JPG</span> or{" "}
        <span className="font-semibold">JPEG</span> format, not exceeding 2
        megabytes.
      </p>

      {/* Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => onPrev?.()}
          className="border-[#00A5E5] text-[#00A5E5] hover:bg-[#00A5E5] hover:text-white"
        >
          Back
        </Button>

        <Button
          type="submit"
          className="bg-[#9ED6D7] text-white hover:bg-[#7FC2C3]"
        >
          Upload file
        </Button>
      </div>
    </motion.form>
  );
}
