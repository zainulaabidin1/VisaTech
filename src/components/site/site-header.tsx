"use client";

import { useState, useEffect } from "react";
import { Menu, X, Award, FileCheck, MapPin, Handshake, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Simple Modal Component
const SimpleModal = ({ isOpen, onClose, title, onVerify, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center mt-50 p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366]/10 to-[#004D99]/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#003366]" />
          </div>
          <h3 className="text-2xl font-bold text-[#003366]">{title}</h3>
        </div>
        
        <div className="mb-6">{children}</div>
        
        <button
          onClick={onVerify}
          className="w-full bg-gradient-to-r from-[#003366] to-[#004D99] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
        >
          Verify Now
        </button>
      </motion.div>
    </div>
  );
};

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#E2E8F0]" 
          : "bg-gradient-to-r from-[#003366]/95 to-[#004D99]/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
            <Award className="w-6 h-6 text-white" />
          </div>
          <span className={`font-bold text-2xl tracking-wide transition-colors ${scrolled ? "text-[#003366]" : "text-white"}`}>
            VISAA<span className="text-[#F59E0B]">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setOpenModal("Check Certificate Validity")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
              scrolled 
                ? "text-[#003366] hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]" 
                : "text-white hover:bg-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            Check Certificate
          </button>

          <button
            onClick={() => setOpenModal("Check Labor Result")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
              scrolled 
                ? "text-[#003366] hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]" 
                : "text-white hover:bg-white/10"
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Labor Result
          </button>

          <Link 
            href="#test-center" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
              scrolled 
                ? "text-[#003366] hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]" 
                : "text-white hover:bg-white/10"
            }`}
          >
            <MapPin className="w-4 h-4" />
            Test Center
          </Link>

          <Link 
            href="#partnership" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
              scrolled 
                ? "text-[#003366] hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]" 
                : "text-white hover:bg-white/10"
            }`}
          >
            <Handshake className="w-4 h-4" />
            Partnership
          </Link>

          <button className="ml-2 flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#F59E0B] text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <Mail className="w-4 h-4" />
            Get in Touch
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-[#003366] hover:bg-[#F1F5F9]" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-[#E2E8F0] shadow-lg"
          >
            <div className="px-6 py-4 space-y-2">
              <button
                className="flex items-center gap-3 w-full text-left text-[#003366] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 px-4 py-3 rounded-lg transition-all font-medium"
                onClick={() => { setOpenModal("Check Certificate Validity"); setMenuOpen(false); }}
              >
                <Award className="w-5 h-5" />
                Check Certificate
              </button>
              
              <button
                className="flex items-center gap-3 w-full text-left text-[#003366] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 px-4 py-3 rounded-lg transition-all font-medium"
                onClick={() => { setOpenModal("Check Labor Result"); setMenuOpen(false); }}
              >
                <FileCheck className="w-5 h-5" />
                Labor Result
              </button>
              
              <Link
                href="#test-center"
                className="flex items-center gap-3 text-[#003366] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 px-4 py-3 rounded-lg transition-all font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <MapPin className="w-5 h-5" />
                Test Center
              </Link>
              
              <Link
                href="#partnership"
                className="flex items-center gap-3 text-[#003366] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 px-4 py-3 rounded-lg transition-all font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <Handshake className="w-5 h-5" />
                Partnership
              </Link>
              
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white font-semibold py-3 rounded-xl transition-all hover:shadow-lg mt-2">
                <Mail className="w-4 h-4" />
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <SimpleModal
        isOpen={openModal === "Check Certificate Validity"}
        onClose={() => setOpenModal(null)}
        title="Certificate Verification"
        onVerify={() => alert("Verifying certificate...")}
      >
        <div className="flex flex-col  gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-2">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border-2 border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
            />
          </div>

        </div>
      </SimpleModal>

      {/* Labor Result Modal */}
      <SimpleModal
        isOpen={openModal === "Check Labor Result"}
        onClose={() => setOpenModal(null)}
        title="Labor Result Verification"
        onVerify={() => alert("Verifying labor result...")}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-2">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              className="w-full border-2 border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
            />
          </div>

        </div>
      </SimpleModal>
    </header>
  );
}