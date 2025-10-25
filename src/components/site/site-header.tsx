"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../modal/CertificateCheck"; // Make sure this points to your Modal component

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState<"Check Certificate Validity" | "Check Labor Result" | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
            onClick={() => setOpenModal("Check Certificate Validity")}
          >
            Check Certificate
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="#about"
            className="relative text-white group"
            onClick={() => setOpenModal("Check Labor Result")}
          >
            Labor Result
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          {/* Other links */}
          <Link href="#about" className="relative text-white group">
            Test Center
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#F9C400] transition-all group-hover:w-full"></span>
          </Link>

          <Link href="#about" className="relative text-white group">
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
            <button
              className="block w-full text-left text-white text-lg hover:text-[#F9C400]"
              onClick={() => { setOpenModal("Check Certificate Validity"); setMenuOpen(false); }}
            >
              Check Certificate
            </button>
            <button
              className="block w-full text-left text-white text-lg hover:text-[#F9C400]"
              onClick={() => { setOpenModal("Check Labor Result"); setMenuOpen(false); }}
            >
              Labor Result
            </button>
            {/* Other mobile links */}
            <Link
              href="#about"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              Test Center
            </Link>
            <Link
              href="#about"
              className="block text-white text-lg hover:text-[#F9C400]"
              onClick={() => setMenuOpen(false)}
            >
              Partnership
            </Link>
            <button className="w-full bg-[#F9C400] hover:bg-[#e0b200] text-black font-semibold py-2 rounded-full transition">
              Get in Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <Modal
        isOpen={openModal === "Check Certificate Validity"} // ✅ boolean
  onClose={() => setOpenModal(null)}                  // ✅ closes modal
  title="Check Certificate Validity"                 // ✅ string title
  onVerify={() => alert("Verifying certificate...")}
      >
        <h3 className="text-xl font-bold text-[#005B9E] mb-4">Check Certificate Validity</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Certificate Serial Number
            </label>
            <input
              type="text"
              placeholder="Enter Certificate Serial Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

        </div>
      </Modal>

      <Modal
        isOpen={openModal === "Check Labor Result"}        // ✅ boolean
  onClose={() => setOpenModal(null)}                // ✅ closes modal
  title="Check Labor Result"                        // ✅ string title
  onVerify={() => alert("Verifying labor result...")}
      >
        <h3 className="text-xl font-bold text-[#005B9E] mb-4">Check Labor Result</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Occupation Key
            </label>
            <input
              type="text"
              placeholder="Enter Occupation Key"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005B9E] mb-1">
              Nationality Code
            </label>
            <input
              type="text"
              placeholder="Enter Nationality Code"
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00A5E5]"
            />
          </div>

        </div>
      </Modal>
    </header>
  );
}
