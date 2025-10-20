"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#005B9E]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-2xl tracking-wide">
          VISAA<span className="text-[#F9C400]">Tech</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#about"
            className="relative text-white group"
          >
            Test Center
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="#about"
            className="relative text-white group"
          >
            Check Certificate
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="#about"
            className="relative text-white group"
          >
            Labor Result
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="#about"
            className="relative text-white group"
          >
            Partnership
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <button className="bg-[#F9C400] hover:bg-[#e0b200] text-black font-semibold px-5 py-2 rounded-full transition">
            Get in Touch
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[#005B9E]/95 backdrop-blur-md px-6 py-4 space-y-4"
          >
            <Link
              href="#about"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#services"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#projects"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="w-full bg-[#F9C400] hover:bg-[#e0b200] text-black font-semibold py-2 rounded-full transition">
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
