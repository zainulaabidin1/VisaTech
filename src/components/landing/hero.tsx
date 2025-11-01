"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  const router = useRouter(); // ✅ For navigation

  return (
    <section className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFFFF] to-[#EAF2FA] text-[#1E293B]">
      {/* ✅ Background Image */}
      <Image
        src="/hero.png"
        alt="Background"
        fill
        className="object-cover opacity-90 brightness-[0.95] contrast-110"
        priority
      />

      {/* ✅ Very Light Overlay (10%) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF]/10 via-[#F8FAFC]/10 to-[#EAF2FA]/10" />

      {/* Animated Accent Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        className="absolute bottom-[5%] right-[12%] w-[350px] h-[350px] bg-gradient-to-br from-[#F59E0B]/30 to-[#D97706]/20 blur-3xl rounded-full"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#003366] to-[#004D99] text-transparent bg-clip-text drop-shadow-lg"
        >
          Empower Your Future with{" "}
          <span className="text-[#F59E0B]">Digital Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-[#475569] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Build smarter, faster, and more impactful digital solutions with our
          innovative approach that blends creativity, strategy, and technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          {/* ✅ Navigate to /signup */}
          <Button
            size="lg"
            onClick={() => router.push("/signup")}
            className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white font-semibold rounded-full px-8 py-4 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 flex items-center gap-2"
          >
            Sign Up
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-[#E2E8F0] text-[#003366] hover:bg-[#F1F5F9] rounded-full px-8 py-4 transition-transform hover:-translate-y-1 flex items-center gap-2"
          >
            <PlayCircle className="w-5 h-5 text-[#64748B]" />
            Sign In
          </Button>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full text-[#E2E8F0]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,64L1440,0L1440,120L0,120Z"></path>
      </svg>
    </section>
  );
}
