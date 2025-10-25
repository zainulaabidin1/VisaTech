"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [form, setForm] = useState({ email: "", phone: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // handle sign-in logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gradient-to-b from-[#F8FBFD] to-[#EAF4FA] rounded-2xl p-8 sm:p-10 shadow-lg"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-[#005B9E] mb-2">
        Welcome Back
      </h2>
      <p className="text-center text-gray-500 mb-6 text-sm">
        Sign in to your account using Email or Phone
      </p>

      {/* Toggle Method */}
      <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner mb-6">
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={`flex-1 py-2 rounded-xl font-medium transition-all duration-300 ${
            method === "email"
              ? "bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white shadow-md"
              : "text-[#005B9E]"
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setMethod("phone")}
          className={`flex-1 py-2 rounded-xl font-medium transition-all duration-300 ${
            method === "phone"
              ? "bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white shadow-md"
              : "text-[#005B9E]"
          }`}
        >
          Phone Number
        </button>
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
            <label className="text-sm font-medium text-[#005B9E]">
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 border-gray-200 focus:border-[#00A5E5]"
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
            <label className="text-sm font-medium text-[#005B9E]">
              Phone Number
            </label>
            <Input
              name="phone"
              type="tel"
              placeholder="000 - 000 - 0000"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 border-gray-200 focus:border-[#00A5E5]"
            />
          </motion.div>
        )}

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label className="text-sm font-medium text-[#005B9E]">Password</label>
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 border-gray-200 focus:border-[#00A5E5]"
          />
        </motion.div>

        {/* Remember & Forgot */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-[#005B9E]" />
            Remember me
          </label>
          <button type="button" className="text-[#00A5E5] font-medium hover:underline">
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#FFD84A] to-[#F9C400] text-[#005B9E] font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Sign In
        </Button>
      </form>

      {/* Sign Up */}
      <p className="text-center text-gray-500 mt-4 text-sm">
        Don’t have an account?{" "}
        <span className="text-[#00A5E5] font-semibold cursor-pointer hover:underline">
          Sign Up
        </span>
      </p>
    </motion.div>
  );
}
