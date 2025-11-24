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
  form?: any; // Add this line
  setForm?: React.Dispatch<React.SetStateAction<any>>; // Add this line
};

export function Step3ContactInfo({ onNext, onPrev, form, setForm }: StepProps) {
  const [formData, setFormData] = useState({
    email: form?.email || "", // Initialize with parent form data
    countryCode: "+92",
    phone: form?.phone || "", // Initialize with parent form data
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone)
      newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = "Please enter a valid phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);

    try {
      const contactData = {
        email: formData.email,
        phone: formData.phone,
        countryCode: formData.countryCode
      };

      // 🔥 UPDATE PARENT FORM STATE WITH EMAIL AND PHONE
      if (setForm) {
        setForm((prev: any) => ({
          ...prev,
          email: formData.email,
          phone: formData.phone
        }));
        console.log('✅ Updated parent form state with email:', formData.email);
      }

      // Store email in localStorage as backup
      localStorage.setItem('userEmail', formData.email);
      console.log('📧 Email stored for verification:', formData.email);

      // API call to save contact info and send OTP
      const response = await fetch('http://localhost:5000/api/users/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Contact info saved to database:', result.data);
        
        if (result.data.otpSent) {
          // OTP was sent successfully
          setOtpSent(true);
          alert(`OTP sent to ${formData.email}. Please check your email.`);
          
          // Move to verification step (Step 4)
          onNext?.();
        } else {
          alert('Contact information saved but OTP could not be sent. Please try again.');
        }
      } else {
        alert(result.message || 'Failed to save contact information');
        console.error('Backend error:', result);
      }
    } catch (error) {
      console.error('Failed to save contact data:', error);
      alert('Network error. Please check if backend is running on port 5000');
    } finally {
      setIsLoading(false);
    }
  };

  // Update parent form when inputs change (optional but good for real-time updates)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData((d) => ({ ...d, email: newEmail }));
    
    // Update parent form in real-time
    if (setForm) {
      setForm((prev: any) => ({ ...prev, email: newEmail }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (rawValue.length > 0) {
      if (rawValue.length <= 3) {
        formattedValue = rawValue;
      } else if (rawValue.length <= 6) {
        formattedValue = `${rawValue.slice(0, 3)} - ${rawValue.slice(3)}`;
      } else {
        formattedValue = `${rawValue.slice(0, 3)} - ${rawValue.slice(3, 6)} - ${rawValue.slice(6, 10)}`;
      }
    }
    
    setFormData((d) => ({ ...d, phone: formattedValue }));
    
    // Update parent form in real-time
    if (setForm) {
      setForm((prev: any) => ({ ...prev, phone: rawValue })); // Store raw phone number without formatting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info Banner */}
      <div className="rounded-xl bg-[#E8F4FA] border border-[#00A5E5]/40 p-4 flex items-start gap-3">
        <Info className="text-[#00A5E5] h-5 w-5 mt-0.5" />
        <div>
          <h3 className="font-semibold text-[#005B9E]">
            {otpSent ? "OTP Sent Successfully!" : "Contact Information"}
          </h3>
          <p className="text-sm text-[#005B9E]/90">
            {otpSent 
              ? `A 6-digit verification code has been sent to ${formData.email}. Please check your email and proceed to verification.`
              : "Enter your phone number or email, which will be used for logging into the platform."
            }
          </p>
        </div>
      </div>

      {!otpSent ? (
        <>
          {/* Email */}
          <motion.div whileFocus={{ scale: 1.01 }}>
            <label className="text-sm font-medium text-[#005B9E]">
              Email<span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleEmailChange} // Use the updated handler
              className="border-[#00A5E5]/40 text-black focus:ring-[#00A5E5]"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </motion.div>

          {/* Phone Number */}
          <motion.div whileFocus={{ scale: 1.01 }}>
            <label className="text-sm font-medium text-[#005B9E]">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[#00A5E5]/40 rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-[#00A5E5]">
              {/* Country Code */}
              <select
                value={formData.countryCode}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, countryCode: e.target.value }))
                }
                className="bg-[#E8F4FA] text-[#005B9E] text-sm px-2 py-2 outline-none border-r border-[#00A5E5]/30"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+966">🇸🇦 +966</option>
              </select>

              {/* Phone Input */}
              <input
                type="text"
                placeholder="300 - 123 - 4567"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="flex-1 text-black py-2 px-3 text-sm outline-none"
                maxLength={16} // 3-3-4 format with spaces
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
        </>
      ) : (
        /* Success Message when OTP is sent */
        <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-green-800 font-medium">
            ✅ Verification code sent successfully!
          </p>
          <p className="text-green-600 text-sm mt-1">
            Please check your email at <strong>{formData.email}</strong> and proceed to the next step.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="pt-6 flex justify-between">
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
          disabled={isLoading || otpSent}
          className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending OTP..." : otpSent ? "OTP Sent ✓" : "Send OTP & Continue →"}
        </Button>
      </div>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-100 rounded">
          <p><strong>Debug Info:</strong></p>
          <p>• Local email state: {formData.email}</p>
          <p>• Parent form email: {form?.email || 'Not set'}</p>
          <p>• Has setForm function: {setForm ? 'Yes' : 'No'}</p>
        </div>
      )}

      <p className="text-center text-sm text-[#005B9E]/70">
        Already have an account?{" "}
        <span className="text-[#00A5E5] font-medium cursor-pointer hover:underline">
          Sign in
        </span>
      </p>
    </form>
  );
}