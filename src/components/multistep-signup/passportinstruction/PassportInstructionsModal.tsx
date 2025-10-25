"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Step components
import { Step1General } from "../passportinstruction/Step1General";
import { Step2ColorInstruction } from "../passportinstruction/Step2Color";
import { Step3ClarityInstruction } from "../passportinstruction/Step3Quality";
import { Step4SinglePageInstruction } from "../passportinstruction/Step4Scan";
import { Step5CropInstruction } from "../passportinstruction/Step5Cropping";
import { Step6UploadPassport } from "../passportinstruction/Step6Upload";

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
    { label: "Color", component: Step2ColorInstruction },
    { label: "Quality", component: Step3ClarityInstruction },
    { label: "Scan", component: Step4SinglePageInstruction },
    { label: "Cropping", component: Step5CropInstruction },
    { label: "Upload", component: Step6UploadPassport },
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
            className="relative w-full max-w-4xl rounded-2xl bg-[#F9FBFD] shadow-2xl border border-[#E2F1FA] p-10 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#005B9E]/70 hover:text-[#005B9E]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Step Progress Bar */}
            {/* Step Progress Bar */}
{/* Step Progress Bar */}
{/* Step Progress Bar */}
<div className="relative mb-12 w-full">
  {/* Background line (behind steps, but not under circles) */}
  <div className="absolute top-1/2 left-[6%] right-[6%] h-[4px] bg-[#E2F1FA] rounded-full transform -translate-y-1/2" />

  {/* Progress line — stops between steps */}
  <motion.div
    className="absolute top-1/2 left-[6%] h-[4px] rounded-full bg-gradient-to-r from-[#0072CE] to-[#00C6FF] shadow-[0_0_8px_#00B8FF]"
    initial={{ width: 0 }}
    animate={{
      width: `${((step - 1) / (steps.length - 1)) * 88}%`,
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  />

  {/* Step Circles */}
  <div className="relative flex justify-between">
    {steps.map((s, i) => {
      const isActive = step === i + 1;
      const isCompleted = i + 1 < step;

      return (
        <div
          key={s.label}
          className="flex flex-col items-center text-center select-none"
        >
          {/* Circle */}
          <div
            className={cn(
              "h-12 w-12 flex items-center justify-center rounded-full border-[2.5px] transition-all duration-300",
              isActive
                ? "bg-[#0072CE] text-white border-[#66CCFF] shadow-[0_0_20px_#66CCFF]"
                : isCompleted
                ? "bg-white text-[#0072CE] border-[#66CCFF]"
                : "bg-white text-[#0072CE]/50 border-[#A7E3FF]"
            )}
          >
            {isCompleted ? "✓" : i + 1}
          </div>

          {/* Label */}
          <span
            className={cn(
              "text-sm mt-3 font-medium",
              isActive
                ? "text-[#0072CE]"
                : isCompleted
                ? "text-[#0072CE]/80"
                : "text-[#0072CE]/50"
            )}
          >
            {s.label}
          </span>
        </div>
      );
    })}
  </div>
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
                {/* ✅ Pass onNext and onPrev props to every step */}
                <CurrentStep onNext={next} onPrev={prev} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
