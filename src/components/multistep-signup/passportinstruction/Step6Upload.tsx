"use client";

import { useState, DragEvent, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export function Step6UploadPassport({
  onNext,
  onPrev,
  onClose,
  form,
  setForm,
}: StepProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // ✅ Handle file validation
  const validateFile = (selectedFile: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only PNG, JPG, or JPEG formats are allowed.");
      return false;
    }
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      return false;
    }
    return true;
  };

  // ✅ Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(url);
      setError(null);
      setForm((prev: any) => ({
        ...prev,
        passportImage: url,
      }));
    }
  };

  // ✅ Handle drag & drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      const url = URL.createObjectURL(droppedFile);
      setFile(droppedFile);
      setPreviewUrl(url);
      setError(null);
      setForm((prev: any) => ({
        ...prev,
        passportImage: url,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      onClose?.();
    } else {
      setError("Please upload your passport before continuing.");
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
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Upload Your Passport</h2>
        <p className="text-[#005B9E]/80 text-sm">
          Ensure your passport image is <strong>clear, well-lit, and cropped</strong> correctly.
        </p>
      </div>

      {/* Upload Box */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => document.getElementById("passportUpload")?.click()}
        className={`relative border-2 border-dashed rounded-2xl py-12 flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm
          ${
            isDragging
              ? "bg-[#E6F7FF] border-[#00A5E5]"
              : "border-[#00A5E5]/60 hover:bg-[#E8F4FA]"
          }`}
      >
        {previewUrl ? (
          <div className="flex flex-col items-center space-y-3">
            <Image
              src={previewUrl}
              alt="Passport Preview"
              width={220}
              height={150}
              className="rounded-lg shadow-md border border-[#00A5E5]/40 object-cover"
            />
            <p className="text-sm text-[#005B9E]/80 font-medium">
              {file?.name}
            </p>
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
        ) : (
          <>
            <Upload
              className={`h-12 w-12 mb-3 transition-transform duration-300 ${
                isDragging ? "text-[#00A5E5] scale-110" : "text-[#00A5E5]"
              }`}
            />
            <div className="text-center">
              <p className="text-[#005B9E] font-medium text-base">
                Drag & drop your file here
              </p>
              <p className="text-sm text-[#00A5E5] mt-1 underline cursor-pointer">
                or Browse to upload
              </p>
            </div>
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

      {/* Error Message */}
      {error && (
        <div className="flex justify-center items-center gap-2 text-red-500 text-sm">
          <XCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Info Text */}
      <p className="text-sm text-center text-[#005B9E]/80">
        Supported formats: <strong>PNG, JPG, JPEG</strong>. Max size:{" "}
        <strong>2MB</strong>.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="border-[#00A5E5] text-[#00A5E5] cursor-pointer hover:bg-[#E6F7FF] transition-all px-6"
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
