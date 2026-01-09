"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MultiStepSignup } from "./MultiStepSignup";

export function MultiStepSignupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl"
          >
            <MultiStepSignup onClose={onClose} isModal={true} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
