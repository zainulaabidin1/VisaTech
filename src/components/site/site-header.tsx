"use client";

import { useState, useEffect } from "react";
import { Menu, X, Award, FileCheck, MapPin, Handshake, Mail, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "../modal/CertificateCheck";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState<"Check Certificate Validity" | "Check Labor Result" | null>(null);
  const [passportNumber, setPassportNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    tokenNumber?: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const verifyCertificate = async () => {
    if (!passportNumber.trim()) {
      alert("Please enter passport number");
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/passports/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passport_number: passportNumber,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.data.token_number) {
          setVerificationResult({
            success: true,
            message: "Congratulations! You have successfully received your token number.",
            tokenNumber: result.data.token_number,
          });
        } else {
          setVerificationResult({
            success: false,
            message: "Passport number found but no token number assigned yet.",
          });
        }
      } else {
        setVerificationResult({
          success: false,
          message: result.message || "Passport number not found in our system.",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationResult({
        success: false,
        message: "Error verifying passport number. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOpenModal = (modalType: "Check Certificate Validity" | "Check Labor Result") => {
    setOpenModal(modalType);
    // Reset form when opening modal
    setPassportNumber("");
    setVerificationResult(null);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    // Reset form when closing modal
    setPassportNumber("");
    setVerificationResult(null);
  };

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
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
          >
            <Award className="w-6 h-6 text-white" />
          </div>
          <span
            className={`font-bold text-2xl tracking-wide transition-colors ${
              scrolled ? "text-[#003366]" : "text-white"
            }`}
          >
            VISAA<span className="text-[#F59E0B]">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => handleOpenModal("Check Certificate Validity")}
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
            onClick={() => handleOpenModal("Check Labor Result")}
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
                onClick={() => {
                  handleOpenModal("Check Certificate Validity");
                  setMenuOpen(false);
                }}
              >
                <Award className="w-5 h-5" />
                Check Certificate
              </button>

              <button
                className="flex items-center gap-3 w-full text-left text-[#003366] hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 px-4 py-3 rounded-lg transition-all font-medium"
                onClick={() => {
                  handleOpenModal("Check Labor Result");
                  setMenuOpen(false);
                }}
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
      <Modal
        isOpen={openModal === "Check Certificate Validity"}
        onClose={handleCloseModal}
        title="Check Certificate Validity"
        onVerify={verifyCertificate}
        isVerifying={isVerifying}
      >
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-2">
              Passport Number
            </label>
            <input
              type="text"
              placeholder="Enter Passport Number"
              value={passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              className="w-full border-2 border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
              disabled={isVerifying}
            />
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div
              className={`p-4 rounded-xl border-2 ${
                verificationResult.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {verificationResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      verificationResult.success ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {verificationResult.message}
                  </p>
                  {verificationResult.tokenNumber && (
                    <div className="mt-2 p-3 bg-green-100 rounded-lg">
                      <p className="text-green-800 font-semibold">
                        Your Token Number:{" "}
                        <span className="text-lg">{verificationResult.tokenNumber}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Labor Result Modal (You can implement similar functionality) */}
      <Modal
        isOpen={openModal === "Check Labor Result"}
        onClose={handleCloseModal}
        title="Check Labor Result"
        onVerify={() => {
          // Implement labor result verification
          console.log("Labor result verification");
        }}
        isVerifying={false}
      >
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-2">
              Enter Reference Number
            </label>
            <input
              type="text"
              placeholder="Enter your reference number"
              className="w-full border-2 border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
            />
          </div>
          <p className="text-gray-600 text-sm">
            Enter your labor application reference number to check the result status.
          </p>
        </div>
      </Modal>
    </header>
  );
}