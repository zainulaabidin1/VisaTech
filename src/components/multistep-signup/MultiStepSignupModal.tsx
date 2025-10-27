"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step1PassportInfo } from "./Step1PassportInfo";
import { Step2PersonalInfo } from "../multistep-signup/Step2OtherDetails";
import { Step3ContactInfo } from "../multistep-signup/Step3ContactInfo";
import { Step4EmailVerification } from "../multistep-signup/Step4Verification";
import { Button } from "@/components/ui/button";

export function MultiStepSignupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    passportNo: "",
    country: "",
    nationality: "",
    dob: "",
    expiry: "",
    sex: "",
    email: "",
    phone: "",
    verificationCode: "",
  });

  const steps = [
    { label: "Passport Info", component: Step1PassportInfo },
    { label: "Personal Details", component: Step2PersonalInfo },
    { label: "Contact Info", component: Step3ContactInfo },
    { label: "Verification", component: Step4EmailVerification },
  ];

  const next = () => {
    // basic validation before proceeding
    const currentKey = Object.keys(form)[step - 1];
    if (!form[currentKey as keyof typeof form]) {
      alert("Please fill in all required fields before continuing.");
      return;
    }

    if (step < steps.length) {
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const CurrentStep = steps[step - 1]?.component;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl rounded-2xl bg-[#F9FBFD] shadow-2xl border border-[#E2F1FA] p-10 overflow-y-auto max-h-[90vh]"
          >
            {/* ❌ Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#005B9E]/70 hover:text-[#005B9E]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* ✅ Stepper Header */}
            {!completed && (
              <div className="mb-8 flex items-center justify-center gap-3">
                {steps.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center text-large font-semibold border transition",
                        step === i + 1
                          ? "bg-gradient-to-r from-[#005B9E] to-[#00A5E5] text-white border-transparent"
                          : "border-[#00A5E5]/50 text-[#005B9E]/70"
                      )}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm font-semibold text-[#005B9E]/70 hidden sm:inline">
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <div className="w-6 h-[1px] bg-[#00A5E5]/40"></div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ✅ Step Content or Completion */}
            <AnimatePresence mode="wait">
              {!completed ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CurrentStep
                    onNext={next}
                    onPrev={prev}
                    onClose={onClose}
                    isLast={step === steps.length}
                    form={form}
                    setForm={setForm}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-[#005B9E] mb-2">
                    Signup Completed!
                  </h2>
                  <p className="text-[#005B9E]/70 mb-6">
                    Your registration is complete. We’ve sent a confirmation to
                    your email.
                  </p>
                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E]"
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
