"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [form, setForm] = useState({ email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (method === "email") {
      if (!form.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    } else {
      if (!form.phone) newErrors.phone = "Phone number is required";
      else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    }

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const loginData = {
        [method === "email" ? "email" : "phone"]: method === "email" ? form.email : form.phone,
        password: form.password
      };

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Login successful:', result.data);
        
        // Store token in localStorage or context
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        
        // Redirect to dashboard or home page
        alert('Login successful!');
        router.push('/dashboard'); // Change this to your desired route
        
      } else {
        setErrors({ general: result.message || 'Login failed' });
        console.error('Login error:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Format phone number as user types
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    
    setForm((d) => ({ ...d, phone: formattedValue }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-[#E3F1FA]"
    >
      {/* Header */}
      <h2 className="text-3xl font-extrabold text-center text-[#005B9E] mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-8 text-sm">
        Sign in to your account using Email or Phone
      </p>

      {/* Toggle Buttons */}
      <div className="flex bg-[#EAF4FA] rounded-xl p-1 shadow-inner mb-8">
        {["email", "phone"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setMethod(option as "email" | "phone")}
            className={`flex-1 py-2.5 rounded-xl cursor-pointer font-medium transition-all duration-300 ${
              method === option
                ? "bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white shadow-md"
                : "text-[#005B9E]/70 hover:text-[#005B9E]"
            }`}
          >
            {option === "email" ? "Email" : "Phone Number"}
          </button>
        ))}
      </div>

      {/* General Error Message */}
      {errors.general && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4">
          <p className="text-red-800 text-sm font-medium">{errors.general}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {method === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="text-sm font-semibold text-[#005B9E]">
              Email Address
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 h-11 border-gray-200 text-black focus:border-[#00A5E5] focus:ring-[#00A5E5] transition-all ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </motion.div>
        )}

        {method === "phone" && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="text-sm font-semibold text-[#005B9E]">
              Phone Number
            </label>
            <div className={`flex items-center border ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            } rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-[#00A5E5] mt-1`}>
              <select
                className="bg-[#EAF4FA] text-[#005B9E] text-sm px-2 py-3 outline-none border-r border-gray-300"
                defaultValue="+92"
              >
                <option value="+92">🇵🇰 +92</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <input
                name="phone"
                type="text"
                placeholder="300 - 123 - 4567"
                value={form.phone}
                onChange={handlePhoneChange}
                className="flex-1 text-black py-2 px-3 text-sm outline-none h-11"
                maxLength={16}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </motion.div>
        )}

        {/* Password with Hide/Show */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <label className="text-sm font-semibold text-[#005B9E]">
            Password
          </label>
          <div className="relative mt-1">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className={`h-11 pr-10 text-black focus:border-[#00A5E5] focus:ring-[#00A5E5] transition-all ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005B9E] hover:text-[#00A5E5] transition-colors"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={2} />
              ) : (
                <Eye size={18} strokeWidth={2} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </motion.div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 cursor-pointer accent-[#005B9E]"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-[#00A5E5] cursor-pointer font-medium hover:underline hover:text-[#008ac5] transition-all"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 cursor-pointer bg-gradient-to-r from-[#FFD84A] to-[#F9C400] text-[#005B9E] font-semibold rounded-xl shadow-[0_4px_10px_rgba(249,196,0,0.4)] hover:shadow-[0_6px_14px_rgba(249,196,0,0.5)] hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E3E8EC] to-transparent"></div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-gray-500 mt-2 text-sm">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => router.push('/signup')}
          className="text-[#00A5E5] font-semibold cursor-pointer hover:underline"
        >
          Sign Up
        </button>
      </p>
    </motion.div>
  );
}