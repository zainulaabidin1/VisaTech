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
  const [timeLeft, setTimeLeft] = useState(180);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Debug: Check what email we're receiving
  useEffect(() => {
    console.log("🔍 Step4 Debug - Email prop:", email);
    console.log("🔍 Step4 Debug - localStorage email:", localStorage.getItem('userEmail'));
    
    if (email) {
      setUserEmail(email);
      console.log("✅ Using email from props:", email);
    } else {
      // Try to get email from localStorage
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
        console.log("✅ Using email from localStorage:", storedEmail);
      } else {
        console.error("❌ No email found in props or localStorage");
        setError("Email not found. Please go back and try again.");
      }
    }
  }, [email]);

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

      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }

      if (newCode.every(digit => digit !== "") && index === 5) {
        handleSubmit(newCode.join(""));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResendCode = async () => {
    if (!canResend || !userEmail) {
      console.log("❌ Cannot resend - conditions:", { canResend, userEmail });
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      console.log("📨 Attempting to resend OTP to:", userEmail);
      
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail })
      });

      console.log("📨 Resend response status:", response.status);
      
      const result = await response.json();
      console.log("📨 Resend response data:", result);

      if (result.success) {
        console.log('✅ New OTP sent successfully');
        setTimeLeft(180);
        setCanResend(false);
        setCode(["", "", "", "", "", ""]);
        setError("");
        
        const firstInput = document.getElementById('code-0');
        if (firstInput) firstInput.focus();
      } else {
        setError(result.message || 'Failed to resend verification code');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (enteredCode: string) => {
    if (!userEmail) {
      console.log("❌ No email available for verification");
      setError('Email not found. Please go back and try again.');
      return false;
    }

    try {
      console.log("🔐 Attempting to verify code:", { email: userEmail, code: enteredCode });
      
      const response = await fetch('http://localhost:5000/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: userEmail, 
          verification_code: enteredCode 
        })
      });

      console.log("🔐 Verification response status:", response.status);
      
      const result = await response.json();
      console.log("🔐 Verification response data:", result);
      
      if (result.success) {
        return true;
      } else {
        setError(result.message || 'Invalid verification code');
        return false;
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Verification failed. Please try again.');
      return false;
    }
  };

  const handleSubmit = async (enteredCode?: string) => {
    const finalCode = enteredCode || code.join("");
    
    if (finalCode.length < 6) {
      setError("Please enter the complete verification code.");
      return;
    }

    setIsLoading(true);
    setError("");

    console.log("🔄 Starting verification process...");
    
    const isValid = await verifyCode(finalCode);
    
    if (isValid) {
      setIsVerified(true);
      setTimeout(() => onNext?.(), 1000);
    }
    
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-8 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-[#005B9E]"
      >
        Email Verification
      </motion.h2>

      <p className="text-[#005B9E]/80 text-sm">
        We just sent your verification code to{" "}
        <span className="font-semibold text-[#005B9E]">
          {userEmail || "your email"}
        </span>
      </p>

      {!userEmail && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
          <p className="text-yellow-800 text-sm">
            ⚠️ <strong>Email not found.</strong> Please go back to Step 3 and enter your email again.
          </p>
        </div>
      )}

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
            inputMode="numeric"
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-12 h-12 text-center text-lg font-semibold border-[#00A5E5]/50 focus:ring-[#00A5E5] rounded-md"
            disabled={isLoading || isVerified || !userEmail}
            autoFocus={i === 0 && !!userEmail}
          />
        ))}
      </div>

      {/* Timer and Resend */}
      <div className="text-[#005B9E]/70 mt-3 text-sm font-medium">
        {timeLeft > 0 ? (
          <div>
            Code expires in: <span className="text-[#F59E0B]">{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading || !userEmail}
            className="text-[#00A5E5] hover:text-[#005B9E] underline disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Resend Code"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm bg-red-50 p-2 rounded-lg"
        >
          {error}
        </motion.p>
      )}

      {/* Success Message */}
      {isVerified && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm bg-green-50 p-2 rounded-lg"
        >
          ✅ Email verified successfully! Redirecting...
        </motion.p>
      )}

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isVerified || isLoading || code.join("").length < 6 || !userEmail}
          className="w-full bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400] disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : isVerified ? "Verified ✓" : "Verify Email"}
        </Button>
      </div>

      {/* Enhanced Debug info */}
      <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-100 rounded">
        <p><strong>Debug Information:</strong></p>
        <p>• Email from props: {email || "undefined"}</p>
        <p>• Email being used: {userEmail || "undefined"}</p>
        <p>• Code entered: {code.join('')}</p>
        <p>• API endpoints:</p>
        <p>  - Verify: http://localhost:5000/api/auth/verify-email</p>
        <p>  - Resend: http://localhost:5000/api/auth/resend-otp</p>
        <button
          type="button"
          onClick={() => {
            console.log("🔍 Manual Debug Check:");
            console.log("Email prop:", email);
            console.log("UserEmail state:", userEmail);
            console.log("LocalStorage email:", localStorage.getItem('userEmail'));
            console.log("Code array:", code);
          }}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
        >
          Check Console for Debug Info
        </button>
      </div>
    </form>
  );
}