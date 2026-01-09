"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileCheck2, Palette, ZoomIn, Scan, Crop, Upload } from "lucide-react";
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
  form,
  setForm,
}: {
  open: boolean;
  onClose: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [step, setStep] = useState(1);

  const steps = [
    { label: "General", icon: FileCheck2, component: Step1General },
    { label: "Color", icon: Palette, component: Step2ColorInstruction },
    { label: "Quality", icon: ZoomIn, component: Step3ClarityInstruction },
    { label: "Scan", icon: Scan, component: Step4SinglePageInstruction },
    { label: "Cropping", icon: Crop, component: Step5CropInstruction },
    { label: "Upload", icon: Upload, component: Step6UploadPassport },
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const CurrentStep = steps[step - 1].component;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full bg-[#FFFFFF] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#003366] to-[#004D99] p-6 flex items-center justify-between text-white flex-shrink-0">
              <h2 className="text-xl font-semibold tracking-wide">
                Passport Upload Instructions
              </h2>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stepper */}
            <div className="flex justify-center items-center gap-3 py-6 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = i + 1 === step;
                const isCompleted = i + 1 < step;

                return (
                  <div key={s.label} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-r from-[#003366] to-[#004D99] text-white border-transparent shadow-md"
                          : isCompleted
                            ? "bg-gradient-to-r from-[#059669] to-[#047857] text-white border-transparent"
                            : "border-[#94A3B8] text-[#64748B] bg-white"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-semibold hidden sm:inline transition-colors",
                        isActive
                          ? "text-[#003366]"
                          : isCompleted
                            ? "text-[#059669]"
                            : "text-[#64748B]"
                      )}
                    >
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <div className="w-6 h-[1px] bg-[#E2E8F0]"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="flex-1 bg-[#FFFFFF] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <CurrentStep
                    onNext={next}
                    onPrev={prev}
                    form={form}
                    setForm={setForm}
                    onClose={onClose}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
