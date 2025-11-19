"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Modal } from "../modal/CertificateCheck";
import { Award, FileCheck, ArrowRight, Shield, CheckCircle, Sparkles, XCircle, CheckCircle2 } from "lucide-react";

const examCards = [
  {
    title: "Check Certificate Validity",
    description:
      "Verify the authenticity of your professional certificate quickly and securely through our official verification portal.",
    buttonText: "Verify Certificate",
    image: "/certificate.png",
    link: "#",
    overlay: "from-[#003366]/70 to-[#004D99]/50",
    circleColor: "#F59E0B",
    icon: <Award className="w-8 h-8" />,
    features: ["Instant verification", "Secure authentication", "24/7 availability"],
  },
  {
    title: "Check Labor Result",
    description:
      "Access your labor test results instantly with our trusted verification system designed for your convenience and security.",
    buttonText: "Check Results",
    image: "/labor-bg.png",
    link: "#",
    overlay: "from-[#059669]/70 to-[#047857]/50",
    circleColor: "#F59E0B",
    icon: <FileCheck className="w-8 h-8" />,
    features: ["Real-time results", "Detailed reports", "Downloadable certificates"],
  },
];

export const ExamResultSection = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [passportNumber, setPassportNumber] = useState("");
  const [nationalityCode, setNationalityCode] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
    tokenNumber?: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

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

  const verifyLaborResult = async () => {
    if (!passportNumber.trim() || !nationalityCode.trim()) {
      alert("Please enter both passport number and nationality code");
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await fetch(`http://localhost:5000/api/passports/verify-labor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passport_number: passportNumber,
          nationality: nationalityCode,
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
            message: "Passport and nationality found but no token number assigned yet.",
          });
        }
      } else {
        setVerificationResult({
          success: false,
          message: result.message || "Passport number and nationality combination not found.",
        });
      }
    } catch (error) {
      console.error("Labor verification error:", error);
      setVerificationResult({
        success: false,
        message: "Error verifying labor result. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setPassportNumber("");
    setNationalityCode("");
    setVerificationResult(null);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    resetForm();
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#F8FAFC] via-[#FFFFFF] to-[#F1F5F9] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#059669]/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F59E0B]/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#059669]/10 to-[#047857]/10 border border-[#059669]/20 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-[#059669]" />
            <span className="text-sm font-medium text-[#1E293B]">
              Verification Services
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#003366] mb-4">
            Exam Results &{" "}
            <span className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
              Verification
            </span>
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Fast, secure, and reliable verification services for your professional credentials
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {examCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${card.overlay} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              {/* Card Content */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#E2E8F0]">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover brightness-95"
                    />
                  </motion.div>
                  
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.overlay} group-hover:opacity-70 transition-all duration-700`} />
                  
                  {/* Floating Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                    className="absolute top-6 right-6 bg-[#F59E0B] w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                  >
                    {card.icon}
                  </motion.div>

                  {/* Sparkle Effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-6 left-6"
                  >
                    <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                  </motion.div>

                  {/* Animated Circle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    }}
                    style={{ backgroundColor: card.circleColor }}
                    className="absolute bottom-[-50px] right-[10%] w-[220px] h-[220px] blur-3xl rounded-full"
                  />
                </div>

                {/* Text Content */}
                <div className="p-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl font-bold text-[#003366] mb-3 group-hover:text-[#F59E0B] transition-colors"
                  >
                    {card.title}
                  </motion.h3>
                  
                  <p className="text-[#64748B] leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {card.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#64748B]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={() => setOpenModal(card.title)}
                    className="w-full bg-gradient-to-r from-[#003366] to-[#004D99] hover:shadow-xl text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group/btn"
                  >
                    {card.buttonText}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#003366]/5 to-[#059669]/5 rounded-2xl p-6 border border-[#E2E8F0]">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#003366] mb-2">Secure Verification Process</h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  All verification requests are processed through encrypted channels and comply with international data protection standards. Your information is always safe with us.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
            <div className={`p-4 rounded-xl border-2 ${
              verificationResult.success 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-start gap-3">
                {verificationResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${
                    verificationResult.success ? "text-green-800" : "text-red-800"
                  }`}>
                    {verificationResult.message}
                  </p>
                  {verificationResult.tokenNumber && (
                    <div className="mt-2 p-3 bg-green-100 rounded-lg">
                      <p className="text-green-800 font-semibold">
                        Your Token Number: <span className="text-lg">{verificationResult.tokenNumber}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Labor Result Modal */}
      <Modal
        isOpen={openModal === "Check Labor Result"}
        onClose={handleCloseModal}
        title="Check Labor Result"
        onVerify={verifyLaborResult}
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

          <div>
            <label className="block text-sm font-semibold text-[#003366] mb-2">
              Nationality Code
            </label>
            <input
              type="text"
              placeholder="Enter Nationality Code"
              value={nationalityCode}
              onChange={(e) => setNationalityCode(e.target.value)}
              className="w-full border-2 border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
              disabled={isVerifying}
            />
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <div className={`p-4 rounded-xl border-2 ${
              verificationResult.success 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              <div className="flex items-start gap-3">
                {verificationResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${
                    verificationResult.success ? "text-green-800" : "text-red-800"
                  }`}>
                    {verificationResult.message}
                  </p>
                  {verificationResult.tokenNumber && (
                    <div className="mt-2 p-3 bg-green-100 rounded-lg">
                      <p className="text-green-800 font-semibold">
                        Your Token Number: <span className="text-lg">{verificationResult.tokenNumber}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};