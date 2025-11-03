"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, Shield, GraduationCap, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  isLast?: boolean;
};

export function Step2PersonalInfo({ onNext, onPrev }: StepProps) {
  const [formData, setFormData] = useState({
    personalPhoto: null as File | null,
    nationalId: "",
    education: "",
    experience: "",
    certification: "",
    password: "",
    confirmPassword: "",
    acknowledge: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    const requiredFields = [
      "nationalId",
      "education",
      "experience",
      "certification",
      "password",
      "confirmPassword",
    ];

    for (const key of requiredFields) {
      if (!(formData as any)[key]) newErrors[key] = "This field is required";
    }

    if (!formData.personalPhoto)
      newErrors.personalPhoto = "Personal photo is required";
    else {
      const file = formData.personalPhoto;
      if (!["image/jpeg", "image/png"].includes(file.type))
        newErrors.personalPhoto = "Only JPG or PNG allowed";
      else if (file.size > 2 * 1024 * 1024)
        newErrors.personalPhoto = "File must be ≤ 2 MB";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.acknowledge)
      newErrors.acknowledge = "You must acknowledge responsibility";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);

    try {
      // Convert file to base64 for storage
      let personalPhotoBase64 = null;
      if (formData.personalPhoto) {
        personalPhotoBase64 = await fileToBase64(formData.personalPhoto);
      }

      const formDataToSend = {
        nationalId: formData.nationalId,
        education: formData.education,
        experience: formData.experience,
        certification: formData.certification,
        password: formData.password,
        personalPhoto: personalPhotoBase64
      };

      // API call to save personal info to database
      const response = await fetch('http://localhost:5000/api/users/personal-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend)
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Personal info saved to database:', result.data);
        onNext?.();
      } else {
        alert(result.message || 'Failed to save personal information');
        console.error('Backend error:', result);
      }
    } catch (error) {
      console.error('Failed to save personal data:', error);
      alert('Network error. Please check if backend is running on port 5000');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7 bg-[#F8FAFC] p-6 rounded-2xl shadow-sm border border-[#E2E8F0]">
      {/* Upload Personal Photo */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <label className="font-semibold text-sm text-[#003366] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#64748B]" />
          Upload Your Personal Photo<span className="text-[#DC2626]">*</span>
        </label>
        <label className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-[#94A3B8]/50 bg-[#FFFFFF] rounded-xl py-10 hover:bg-[#F1F5F9] transition relative mt-2">
          <Input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData((d) => ({ ...d, personalPhoto: file }));
              if (file) {
                const reader = new FileReader();
                reader.onload = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              } else setPreview(null);
            }}
          />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="max-h-32 rounded-lg shadow-sm border border-[#E2E8F0] object-cover"
            />
          ) : (
            <>
              <Upload className="h-8 w-8 text-[#003366] mb-2 opacity-80" />
              <span className="text-[#1E293B] font-medium">
                Click to upload photo
              </span>
              <p className="text-xs text-[#64748B] mt-1">JPG or PNG, max 2MB</p>
            </>
          )}
        </label>
        {errors.personalPhoto && (
          <p className="text-xs text-[#DC2626] mt-1">{errors.personalPhoto}</p>
        )}
      </motion.div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* National ID */}
        <div>
          <label className="text-sm font-semibold text-[#003366]">National ID<span className="text-[#DC2626]">*</span></label>
          <Input
            type="text"
            placeholder="Enter your national ID"
            value={formData.nationalId}
            onChange={(e) => setFormData((d) => ({ ...d, nationalId: e.target.value }))}
            className="border-[#E2E8F0] text-[#1E293B] focus:ring-[#003366] focus:border-[#003366]"
          />
          {errors.nationalId && <p className="text-xs text-[#DC2626] mt-1">{errors.nationalId}</p>}
        </div>

        {/* Education */}
        <div>
          <label className="text-sm font-semibold text-[#003366] flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#64748B]" />
            Education Level<span className="text-[#DC2626]">*</span>
          </label>
          <select
            value={formData.education}
            onChange={(e) => setFormData((d) => ({ ...d, education: e.target.value }))}
            className="w-full text-[#1E293B] border border-[#E2E8F0] rounded-md py-2 px-3 text-sm bg-white focus:ring-[#003366] focus:border-[#003366] outline-none"
          >
            <option value="">Choose education</option>
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.education && <p className="text-xs text-[#DC2626] mt-1">{errors.education}</p>}
        </div>

        {/* Experience */}
        <div>
          <label className="text-sm font-semibold text-[#003366]">Experience Level<span className="text-[#DC2626]">*</span></label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData((d) => ({ ...d, experience: e.target.value }))}
            className="w-full text-[#1E293B] border border-[#E2E8F0] rounded-md py-2 px-3 text-sm bg-white focus:ring-[#003366] focus:border-[#003366] outline-none"
          >
            <option value="">Choose experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Professional">Professional</option>
          </select>
          {errors.experience && <p className="text-xs text-[#DC2626] mt-1">{errors.experience}</p>}
        </div>

        {/* Certification */}
        <div>
          <label className="text-sm font-semibold text-[#003366]">Certifications<span className="text-[#DC2626]">*</span></label>
          <select
            value={formData.certification}
            onChange={(e) => setFormData((d) => ({ ...d, certification: e.target.value }))}
            className="w-full text-[#1E293B] border border-[#E2E8F0] rounded-md py-2 px-3 text-sm bg-white focus:ring-[#003366] focus:border-[#003366] outline-none"
          >
            <option value="">Select certification</option>
            <option value="Coursera">Coursera</option>
            <option value="Udemy">Udemy</option>
            <option value="LinkedIn Learning">LinkedIn Learning</option>
            <option value="Other">Other</option>
          </select>
          {errors.certification && <p className="text-xs text-[#DC2626] mt-1">{errors.certification}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-semibold text-[#003366] flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#64748B]" />
            Password<span className="text-[#DC2626]">*</span>
          </label>
          <Input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
            className="border-[#E2E8F0] text-[#1E293B] focus:ring-[#003366] focus:border-[#003366]"
          />
          {errors.password && <p className="text-xs text-[#DC2626] mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-semibold text-[#003366]">Confirm Password<span className="text-[#DC2626]">*</span></label>
          <Input
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData((d) => ({ ...d, confirmPassword: e.target.value }))}
            className="border-[#E2E8F0] text-[#1E293B] focus:ring-[#003366] focus:border-[#003366]"
          />
          {errors.confirmPassword && <p className="text-xs text-[#DC2626] mt-1">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Acknowledge */}
      <div className="flex items-start gap-3 mt-4 bg-[#FFFFFF] border border-[#E2E8F0] rounded-md p-4 shadow-sm">
        <input
          type="checkbox"
          checked={formData.acknowledge}
          onChange={(e) => setFormData((d) => ({ ...d, acknowledge: e.target.checked }))}
          className="mt-1 accent-[#003366]"
        />
        <label className="text-sm text-[#1E293B] leading-relaxed">
          I acknowledge that all the entered data is correct and my responsibility.
        </label>
      </div>
      {errors.acknowledge && <p className="text-xs text-[#DC2626] -mt-2">{errors.acknowledge}</p>}

      {/* reCAPTCHA Placeholder */}
      <div className="border border-[#E2E8F0] rounded-md p-4 text-center text-sm text-[#64748B] bg-white shadow-sm">
        [reCAPTCHA placeholder]
      </div>

      {/* Buttons */}
      <div className="pt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => onPrev?.()}
          className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition"
        >
          ← Back
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-semibold shadow-md hover:from-[#D97706] hover:to-[#B45309] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : "Continue →"}
        </Button>
      </div>

      <p className="text-center text-sm text-[#64748B] mt-4">
        Already have an account?{" "}
        <span className="text-[#003366] font-medium cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </form>
  );
}