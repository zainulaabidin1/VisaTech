"use client";

import { useState, DragEvent, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Upload, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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
  const [isUploading, setIsUploading] = useState(false);

  // ✅ Handle file validation
  const validateFile = (selectedFile: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Only PNG, JPG, JPEG, or PDF formats are allowed.");
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return false;
    }
    return true;
  };

  // ✅ Upload file to server
  const uploadToServer = async (fileToUpload: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('passportImage', fileToUpload);

      console.log('📤 Starting upload:', {
        name: fileToUpload.name,
        size: fileToUpload.size,
        type: fileToUpload.type
      });

      const UPLOAD_URL = 'http://localhost:5000/api/passports/upload';
      console.log('🌐 Upload URL:', UPLOAD_URL);

      // Add timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        // Don't set Content-Type header - browser does it automatically for FormData
      });

      clearTimeout(timeoutId);

      console.log('📥 Response status:', response.status, response.statusText);

      if (!response.ok) {
        // Try to get error details
        let errorDetails = '';
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch {
          errorDetails = await response.text();
        }

        console.error('❌ Server responded with error:', {
          status: response.status,
          statusText: response.statusText,
          details: errorDetails
        });

        throw new Error(`Server error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Upload successful:', result);

      if (result.success) {
        setForm((prev: any) => ({
          ...prev,
          passportImage: result.data.filePath,
          passportImageUrl: result.data.fileUrl
        }));

        return {
          success: true,
          filePath: result.data.filePath,
          fileUrl: result.data.fileUrl
        };
      } else {
        setError(result.message || 'Upload failed');
        return { success: false };
      }
    } catch (error: any) {
      console.error('❌ Upload caught error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });

      // Specific error messages
      if (error.name === 'AbortError') {
        setError('Upload timed out. Check if server is running.');
      } else if (error.message.includes('Failed to fetch')) {
        setError(`Cannot connect to server. Make sure:
        1. Backend is running on http://localhost:5000
        2. No CORS issues (check console)
        3. Try refreshing the page`);
      } else {
        setError(`Upload error: ${error.message}`);
      }

      return { success: false };
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ Handle file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      // Create temporary preview
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(url);
      setError(null);

      // Upload to server immediately
      const uploadResult = await uploadToServer(selectedFile);
      if (uploadResult.success) {
        // Update preview with server URL
        setPreviewUrl(uploadResult.fileUrl);
      } else {
        // Clear if upload failed
        setFile(null);
        setPreviewUrl(null);
      }
    }
  };

  // ✅ Handle drag & drop
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && validateFile(droppedFile)) {
      // Create temporary preview
      const url = URL.createObjectURL(droppedFile);
      setFile(droppedFile);
      setPreviewUrl(url);
      setError(null);

      // Upload to server immediately
      const uploadResult = await uploadToServer(droppedFile);
      if (uploadResult.success) {
        // Update preview with server URL
        setPreviewUrl(uploadResult.fileUrl);
      } else {
        // Clear if upload failed
        setFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload your passport before continuing.");
      return;
    }

    // Check if we have the file path (means upload was successful)
    if (!form.passportImage || !form.passportImage.startsWith('/uploads/')) {
      setError("Please wait for the upload to complete.");
      return;
    }

    onClose?.();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="h-full w-full flex flex-col p-6"
    >
      {/* Header */}
      <div className="flex-shrink-0 text-center mb-4">
        <h2 className="text-2xl font-semibold text-[#005B9E]">Upload Your Passport</h2>
        <p className="text-[#005B9E]/80 text-sm mt-1">
          Ensure your passport image is <strong>clear, well-lit, and cropped</strong>.
        </p>
      </div>

      {/* Upload Box - Constrained height to ensure buttons are always visible */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100% - 180px)' }}>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => !isUploading && document.getElementById("passportUpload")?.click()}
          className={`flex-1 relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all shadow-sm overflow-hidden
            ${isDragging
              ? "bg-[#E6F7FF] border-[#00A5E5] cursor-copy"
              : isUploading
                ? "bg-gray-50 border-gray-300 cursor-wait"
                : "border-[#00A5E5]/60 hover:bg-[#E8F4FA] cursor-pointer"
            }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center space-y-3">
              <Loader2 className="h-10 w-10 text-[#00A5E5] animate-spin" />
              <p className="text-[#005B9E] font-medium">Uploading...</p>
            </div>
          ) : previewUrl ? (
            <div className="flex flex-col items-center space-y-2 h-full w-full justify-center p-4 overflow-hidden">
              <div className="relative flex-1 w-full min-h-0 max-h-full overflow-hidden">
                <img
                  src={previewUrl}
                  alt="Passport Preview"
                  className="w-full h-full object-contain rounded-lg shadow-sm"
                  style={{ maxHeight: '100%' }}
                />
              </div>
              <p className="text-sm text-[#005B9E]/80 font-medium text-center truncate w-full max-w-xs flex-shrink-0">
                {file?.name}
              </p>
              <div className="flex items-center gap-2 text-green-500 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Uploaded</span>
              </div>
            </div>
          ) : (
            <>
              <Upload
                className={`h-10 w-10 mb-2 transition-transform duration-300 ${isDragging ? "text-[#00A5E5] scale-110" : "text-[#00A5E5]"
                  }`}
              />
              <div className="text-center">
                <p className="text-[#005B9E] font-medium text-base">
                  Drag & drop here
                </p>
                <p className="text-sm text-[#00A5E5] mt-1 underline">
                  or Browse to upload
                </p>
              </div>
            </>
          )}

          <input
            id="passportUpload"
            type="file"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </div>
      </div>

      {/* Footer Info & Buttons - Always visible at bottom */}
      <div className="flex-shrink-0 mt-4 space-y-3 bg-white pt-2">
        {error && (
          <div className="flex justify-center items-center gap-2 text-red-500 text-sm bg-red-50 p-2 rounded-lg">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="text-center space-y-1">
          <p className="text-xs text-[#005B9E]/60">
            Max size: <strong>10MB</strong>. Formats: PNG, JPG, JPEG, PDF.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button type="button" variant="outline" onClick={onPrev} disabled={isUploading} className="border-[#00A5E5] text-[#00A5E5] px-8 rounded-full">Back</Button>
          <Button type="submit" disabled={!file || isUploading || !form.passportImage} className={`px-8 text-white rounded-full ${file && form.passportImage ? "bg-[#00A5E5] hover:bg-[#008fc7]" : "bg-gray-300"}`}>
            {isUploading ? "Uploading..." : file && form.passportImage ? "Continue" : "Upload File"}
          </Button>
        </div>
      </div>
    </motion.form>
  );
}
