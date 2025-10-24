"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Upload } from "lucide-react";
import { PassportInstructionsModal } from "../multistep-signup/passportinstruction/PassportInstructionsModal";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  isLast?: boolean;
};

export function Step1PassportInfo({ onNext, onPrev }: StepProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      {/* ========== MAIN PASSPORT INFO FORM ========== */}
      <form className="space-y-6">
        {/* Upload Passport Button */}
        <motion.div whileHover={{ scale: 1.01 }}>
          <p className="font-medium text-sm text-[#005B9E] mb-2">
            Upload Passport<span className="text-red-500">*</span>
          </p>

          {/* ✅ changed from <label> to <div> so file picker never triggers */}
          <div
            onClick={() => setShowInstructions(true)}
            className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-[#00A5E5]/60 rounded-xl py-10 hover:bg-[#E8F4FA] transition"
          >
            <Upload className="h-6 w-6 text-[#005B9E] mb-2" />
            <span className="text-[#005B9E] font-medium">
              Click to Upload Passport
            </span>
          </div>
        </motion.div>

        {/* Warning */}
        <div className="rounded-xl bg-[#FFF9E6] border border-[#F9C400]/50 p-4 flex items-start gap-3">
          <AlertTriangle className="text-[#F9C400] h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-semibold text-[#F9C400]">Important</h3>
            <p className="text-sm text-[#005B9E]">
              Please enter your information exactly as written in your passport.
            </p>
            <p className="text-sm text-right text-[#005B9E]/80 mt-1">
              ضروری معلومات
              <br />
              برائے کرم اپنی معلومات بالکل اسی طرح درج کریں جیسے آپ کے
              پاسپورٹ میں لکھی گئی ہے
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: "firstName", label: "First Name (Given Names)" },
            { key: "lastName", label: "Last Name (Surname)" },
            { key: "passportNo", label: "Passport No." },
            { key: "country", label: "Country of Residence" },
            { key: "nationality", label: "Nationality" },
            { key: "dob", label: "Date of Birth", type: "date" },
            { key: "expiry", label: "Date of Passport Expiry", type: "date" },
          ].map((f) => (
            <motion.div key={f.key} whileFocus={{ scale: 1.01 }}>
              <label className="text-sm font-medium text-[#005B9E]">
                {f.label}
                <span className="text-red-500">*</span>
              </label>
              <input
                type={f.type || "text"}
                required
                className="border border-[#00A5E5]/40 focus:ring-[#00A5E5] rounded-md px-3 py-2 w-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Sex */}
        <div>
          <label className="text-sm font-medium text-[#005B9E]">
            Sex<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-2">
            {["male", "female"].map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-[#005B9E]"
              >
                <input type="radio" name="sex" value={s} />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={() => onPrev?.()}
            className="border-[#00A5E5] text-[#00A5E5] hover:bg-[#00A5E5] hover:text-white"
          >
            Back
          </Button>

          <div className="flex items-center gap-3">
            <p className="text-xs text-[#005B9E]/70">All fields required</p>
            <Button
              type="button"
              onClick={() => onNext?.()}
              className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] hover:from-[#FFD84A] hover:to-[#F9C400]"
            >
              Next →
            </Button>
          </div>
        </div>
      </form>

      {/* ========== PASSPORT INSTRUCTION MULTISTEP MODAL ========== */}
      <AnimatePresence>
        {showInstructions && (
          <PassportInstructionsModal
            open={showInstructions}
            onClose={() => setShowInstructions(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
