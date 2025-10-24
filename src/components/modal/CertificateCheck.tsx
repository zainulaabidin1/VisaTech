"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative"
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-[#005B9E]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <h2 className="text-xl font-bold text-[#005B9E] mb-6 text-center">{title}</h2>

          {/* Body */}
          <div className="space-y-4">{children}</div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-[#00A5E5] text-[#00A5E5] font-semibold hover:bg-[#00A5E5] hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={onVerify}
              className="px-5 py-2 rounded-lg bg-[#F9C400] text-[#005B9E] font-semibold hover:bg-[#FFD84A] transition"
            >
              Verify
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
