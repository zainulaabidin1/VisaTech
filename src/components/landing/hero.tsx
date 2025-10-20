"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Background"
        fill
        className="object-cover opacity-30 brightness-[0.9]"
        priority
      />

      {/* Soft Overlay for Balance */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002f52]/60 via-[#005B9E]/40 to-transparent" />

      {/* Animated Glowing Circle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          repeatType: "mirror",
        }}
        className="absolute bottom-[-200px] right-[10%] w-[400px] h-[400px] bg-[#F9C400]/40 blur-3xl rounded-full"
      ></motion.div>

      {/* Content Section */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg"
        >
          Empowering <span className="text-[#F9C400]">Innovation</span> &{" "}
          <span className="text-[#F9C400]">Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-[#E0E8F0] mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Delivering world-class digital experiences through creativity,
          technology, and innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Button
            size="lg"
            className="bg-[#F9C400] hover:bg-[#e0b200] text-black font-semibold rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            Sign Up
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 rounded-full px-8 py-3 transition-transform hover:-translate-y-1"
          >
            Sign In
          </Button>
        </motion.div>
      </div>

      {/* Decorative Wave at Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white/10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path fill="currentColor" d="M0,64L1440,0L1440,120L0,120Z"></path>
      </svg>
    </section>
  );
}
