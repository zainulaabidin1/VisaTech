"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, CheckCircle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onVerify?: () => void;
}

export const Modal = ({ isOpen, onClose, title, children, onVerify }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Top Bar */}
            <div className="h-2 bg-gradient-to-r from-[#003366] via-[#F59E0B] to-[#059669]" />

            {/* Content */}
            <div className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-6 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-lg p-1.5 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366]/10 to-[#004D99]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#003366]" />
                </div>
                <h2 className="text-2xl font-bold text-[#003366]">{title}</h2>
              </div>

              {/* Info Badge */}
              <div className="mb-6 bg-gradient-to-r from-[#059669]/10 to-[#047857]/10 border border-[#059669]/20 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#059669] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    All verification requests are encrypted and processed securely. Your information is protected.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-4 mb-6">{children}</div>

              {/* Footer Buttons */}
              <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  onClick={onClose}
                  className="flex-1 px-5 py-3 rounded-xl border-2 border-[#E2E8F0] text-[#64748B] font-semibold hover:bg-[#F1F5F9] hover:border-[#64748B] hover:text-[#1E293B] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={onVerify}
                  className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-[#003366] to-[#004D99] text-white font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Verify Now
                </button>
              </div>
            </div>

            {/* Decorative Background Circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#059669]/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};