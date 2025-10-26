"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [form, setForm] = useState({ email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // handle sign-in logic here
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
              className="mt-1 h-11 border-gray-200 text-black focus:border-[#00A5E5] focus:ring-[#00A5E5] transition-all"
            />
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
            <Input
              name="phone"
              type="tel"
              placeholder="000 - 000 - 0000"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 h-11 border-gray-200 text-black focus:border-[#00A5E5] focus:ring-[#00A5E5] transition-all"
            />
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
              className="h-11 pr-10 border-gray-200 text-black focus:border-[#00A5E5] focus:ring-[#00A5E5] transition-all"
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
        </motion.div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <label className="flex items-center gap-2 ">
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
          className="w-full py-3 mt-4 cursor-pointer bg-gradient-to-r from-[#FFD84A] to-[#F9C400] text-[#005B9E] font-semibold rounded-xl shadow-[0_4px_10px_rgba(249,196,0,0.4)] hover:shadow-[0_6px_14px_rgba(249,196,0,0.5)] hover:scale-[1.02] transition-all duration-200"
        >
          Sign In
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E3E8EC] to-transparent"></div>
      </div>

      {/* Sign Up */}
      <p className="text-center text-gray-500 mt-2 text-sm">
        Don’t have an account?{" "}
        <span className="text-[#00A5E5] font-semibold cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </motion.div>
  );
}
