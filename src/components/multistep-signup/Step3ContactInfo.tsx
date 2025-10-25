"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  isLast?: boolean;
};


export function Step3ContactInfo({ onNext, onPrev }: StepProps) {
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+92",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone)
      newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Banner */}
      <div className="rounded-xl bg-[#E8F4FA] border border-[#00A5E5]/40 p-4 flex items-start gap-3">
        <Info className="text-[#00A5E5] h-5 w-5 mt-0.5" />
        <div>
          <h3 className="font-semibold text-[#005B9E]">Info</h3>
          <p className="text-sm text-[#005B9E]/90">
            Enter your phone number or email, which will be used for logging into the platform.
          </p>
        </div>
      </div>

      {/* Email */}
      <motion.div whileFocus={{ scale: 1.01 }}>
        <label className="text-sm font-medium text-[#005B9E]">
          Email<span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((d) => ({ ...d, email: e.target.value }))
          }
          className="border-[#00A5E5]/40 text-black focus:ring-[#00A5E5]"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </motion.div>

      {/* Phone Number */}
      <motion.div whileFocus={{ scale: 1.01 }}>
        <label className="text-sm font-medium text-[#005B9E]">
          Phone Number
        </label>
        <div className="flex items-center border border-[#00A5E5]/40 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-[#00A5E5]">
          {/* Country Code */}
          <select
            value={formData.countryCode}
            onChange={(e) =>
              setFormData((d) => ({ ...d, countryCode: e.target.value }))
            }
            className="bg-[#E8F4FA] text-[#005B9E] text-sm px-2 py-2 outline-none"
          >
            <option value="+92">🇵🇰 +92</option>
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
          </select>

          {/* Phone Input */}
          <input
            type="text"
            placeholder="000 - 000 - 0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData((d) => ({ ...d, phone: e.target.value }))
            }
            className="flex-1 text-black py-2 px-3 text-sm outline-none"
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
        )}
      </motion.div>

      {/* reCAPTCHA Placeholder */}
      <div className="border border-[#00A5E5]/30 rounded-md p-4 text-center text-sm text-[#005B9E]/70">
        [reCAPTCHA placeholder here]
      </div>

      {/* Buttons */}
      <div className="pt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => onPrev?.()}
          className="border-[#00A5E5] text-[#00A5E5] hover:bg-[#00A5E5] hover:text-white"
        >
          Back
        </Button>

        <Button
          type="submit"
          className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400]"
        >
          Continue →
        </Button>
      </div>

      <p className="text-center text-sm text-[#005B9E]/70">
        Already have an account?{" "}
        <span className="text-[#00A5E5] font-medium cursor-pointer">
          Sign in
        </span>
      </p>
    </form>
  );
}
