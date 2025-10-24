"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  isLast?: boolean;
  email?: string;
};


export function Step4EmailVerification({ onNext, onPrev, email }: StepProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.join("").length < 6) {
      setError("Please enter the complete verification code.");
      return;
    }
    // You can replace this with your verification API logic
    setIsVerified(true);
    setTimeout(() => onNext?.(), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-[#005B9E]"
      >
        Email Verification
      </motion.h2>

      <p className="text-[#005B9E]/80 text-sm">
        We just sent your verification code to{" "}
        <span className="font-semibold text-[#005B9E]">{email || "your email"}</span>
      </p>

      <p className="text-[#00A5E5] text-sm">
        Please enter it below or{" "}
        <button
          type="button"
          className="underline hover:text-[#005B9E]"
          onClick={() => onPrev?.()}
        >
          change email
        </button>
      </p>

      {/* Code Inputs */}
      <div className="flex justify-center gap-3 mt-4">
        {code.map((digit, i) => (
          <Input
            key={i}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-12 h-12 text-center text-lg border-[#00A5E5]/50 focus:ring-[#00A5E5] rounded-md"
          />
        ))}
      </div>

      {/* Timer */}
      <p className="text-[#005B9E]/70 mt-3 text-sm font-medium">
        {timeLeft > 0 ? `00:${timeLeft.toString().padStart(2, "0")}` : "Resend Code"}
      </p>

      {/* Captcha Placeholder */}
      <div className="mx-auto mt-4 w-fit border border-[#00A5E5]/40 rounded-lg p-3 bg-[#E8F4FA]/40">
        <label className="flex items-center gap-2 text-sm text-[#005B9E]">
          <input type="checkbox" />
          I'm not a robot
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isVerified}
          className="w-full bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400]"
        >
          {isVerified ? "Verified ✓" : "Continue"}
        </Button>
      </div>

      {/* Sign-in Option */}
      <p className="text-sm text-[#005B9E]/70 mt-3">
        Already have an account?{" "}
        <span className="text-[#00A5E5] font-medium cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </form>
  );
}
