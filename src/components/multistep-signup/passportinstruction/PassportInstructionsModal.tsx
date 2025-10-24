"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import all step components
import { Step1General } from "../passportinstruction/Step1General";
// import { Step2Color } from "../passportinstruction/Step2Color";
// import { Step3Quality } from "../passportinstruction/Step3Quality";
// import { Step4Scan } from "../passportinstruction/Step4Scan";
// import { Step5Cropping } from "../passportinstruction/Step5Cropping";
// import { Step6Upload } from "../passportinstruction/Step6Upload";

export function PassportInstructionsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);

  const steps = [
    { label: "General", component: Step1General },
    // { label: "Color", component: Step2Color },
    // { label: "Quality", component: Step3Quality },
    // { label: "Scan", component: Step4Scan },
    // { label: "Cropping", component: Step5Cropping },
    // { label: "Upload", component: Step6Upload },
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));
  const CurrentStep = steps[step - 1].component;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#F9FBFD] shadow-2xl border border-[#E2F1FA] p-10 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#005B9E]/70 hover:text-[#005B9E]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Step Indicator */}
            <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border transition",
                      step === i + 1
                        ? "bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white border-transparent"
                        : "border-[#00A5E5]/50 text-[#005B9E]/70"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-[#005B9E]/70 hidden sm:inline">
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-6 h-[1px] bg-[#00A5E5]/40" />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStep />
              </motion.div>
            </AnimatePresence>

            {/* Step Controls */}
            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prev}
                disabled={step === 1}
                className="border-[#00A5E5] text-[#00A5E5] hover:bg-[#00A5E5] hover:text-white"
              >
                ← Back
              </Button>

              {step < steps.length ? (
                <Button
                  onClick={next}
                  className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400]"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-[#00A5E5] to-[#005B9E] text-white hover:from-[#005B9E] hover:to-[#00A5E5]"
                >
                  Done
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
