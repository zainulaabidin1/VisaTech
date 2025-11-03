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
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);

  // Store the actual OTP that was sent (in real app, this comes from backend)
  const [actualOTP, setActualOTP] = useState("");

  // Generate or fetch OTP when component mounts
  useEffect(() => {
    // In real app, this would be an API call to send OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setActualOTP(generatedOTP);
    console.log("OTP sent to user:", generatedOTP); // Remove in production
    
    // Simulate sending email
    sendVerificationEmail(generatedOTP);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      // Auto-focus next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const sendVerificationEmail = async (otp: string) => {
    try {
      // Replace this with your actual email sending API call
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      
      if (!response.ok) throw new Error('Failed to send email');
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send verification email. Please try again.');
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setActualOTP(newOTP);
    console.log("New OTP:", newOTP); // Remove in production
    
    await sendVerificationEmail(newOTP);
    
    setTimeLeft(30);
    setCanResend(false);
    setCode(["", "", "", "", "", ""]);
    setError("");
    setIsLoading(false);
    
    // Focus first input
    const firstInput = document.getElementById('code-0');
    if (firstInput) firstInput.focus();
  };

  const verifyCode = async (enteredCode: string) => {
    // Replace this with your actual API verification call
    try {
      const response = await fetch('/api/verify-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: enteredCode })
      });

      const data = await response.json();
      
      if (data.success) {
        return true;
      } else {
        setError(data.message || 'Invalid verification code');
        return false;
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    
    if (enteredCode.length < 6) {
      setError("Please enter the complete verification code.");
      return;
    }

    setIsLoading(true);
    setError("");

    // For demo purposes - compare with generated OTP
    // In production, use the verifyCode function above
    if (enteredCode === actualOTP) {
      setIsVerified(true);
      setTimeout(() => onNext?.(), 1000);
    } else {
      setError("Invalid verification code. Please try again.");
    }
    
    setIsLoading(false);
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
            id={`code-${i}`}
            type="text"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            className="w-12 h-12 text-center text-lg border-[#00A5E5]/50 focus:ring-[#00A5E5] rounded-md"
            disabled={isLoading || isVerified}
          />
        ))}
      </div>

      {/* Timer and Resend */}
      <p className="text-[#005B9E]/70 mt-3 text-sm font-medium">
        {timeLeft > 0 ? (
          `00:${timeLeft.toString().padStart(2, "0")}`
        ) : (
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-[#00A5E5] hover:text-[#005B9E] underline"
          >
            Resend Code
          </button>
        )}
      </p>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isVerified || isLoading}
          className="w-full bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400]"
        >
          {isLoading ? "Verifying..." : isVerified ? "Verified ✓" : "Continue"}
        </Button>
      </div>

      {/* For testing - remove in production */}
      <div className="text-xs text-gray-500 mt-2">
        Debug: OTP is {actualOTP} (remove in production)
      </div>
    </form>
  );
}