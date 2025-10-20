"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Step1PassportInfo } from "./Step1PassportInfo"
import { Step2OtherDetails } from "./Step2OtherDetails"



export function MultiStepSignupModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [step, setStep] = useState(1)

  const steps = [
    { label: "Passport Info", component: Step1PassportInfo },
    { label: "Other Details", component: Step2OtherDetails },
    // { label: "Contact Info", component: Step3ContactInfo },
    // { label: "Verification", component: Step4Verification },
  ]

  const next = () => setStep((s) => Math.min(s + 1, steps.length))
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  const CurrentStep = steps[step - 1].component

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
            className="relative w-full max-w-3xl rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-slate-700/50 p-10 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Step Indicator */}
            <div className="mb-8 flex items-center justify-center gap-3">
              {steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border transition",
                      step === i + 1
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent"
                        : "border-slate-400 text-slate-500"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="w-6 h-[1px] bg-slate-300 dark:bg-slate-600"></div>
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
                <CurrentStep onNext={next} onPrev={prev} onClose={onClose} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
