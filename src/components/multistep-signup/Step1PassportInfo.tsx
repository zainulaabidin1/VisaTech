"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CloudCog, Upload } from "lucide-react";
import { PassportInstructionsModal } from "../multistep-signup/passportinstruction/PassportInstructionsModal";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
  isLast?: boolean;
  form: any; // form state passed from parent
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export function Step1PassportInfo({
  onNext,
  onPrev,
  form,
  setForm,
}: StepProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name,value)
    setForm((prev: any) => ({ ...prev, [name]: value }));
    console.log(form)
  };

  return (
    <>
      <form className="space-y-6">
        {/* Upload Passport Button */}
        <div className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-[#00A5E5]/60 rounded-xl py-10 hover:bg-[#E8F4FA] transition"
             onClick={() => setShowInstructions(true)}>
          <Upload className="h-6 w-6 text-[#005B9E] mb-2" />
          <span className="text-[#005B9E] font-medium">
            Click to Upload Passport
          </span>
        </div>

        {/* Warning */}
        <div className="rounded-xl bg-[#FFF9E6] border border-[#F9C400]/50 p-4 flex items-start gap-3">
          <AlertTriangle className="text-[#F9C400] h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-semibold text-[#F9C400]">Important</h3>
            <p className="text-sm text-[#005B9E]">
              Please enter your information exactly as written in your passport.
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name " },
            { key: "passportNo", label: "Passport No." },
            { key: "country", label: "Country of Residence" },
            { key: "nationality", label: "Nationality" },
            { key: "dob", label: "Date of Birth", type: "date" },
            { key: "expiry", label: "Date of Passport Expiry", type: "date" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-sm font-medium text-[#005B9E]">
                {f.label} <span className="text-red-500">*</span>
              </label>
              <input
                name={f.key}
                type={f.type || "text"}
                value={form[f.key] || ""}
                onChange={handleChange}
                required
                className="border text-black border-[#00A5E5]/40 focus:ring-[#00A5E5] rounded-md px-3 py-2 w-full"
              />
            </div>
          ))}
        </div>

        {/* Sex */}
        <div>
          <label className="text-sm font-medium text-[#005B9E]">
            Sex <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-6 mt-2">
            {["male", "female"].map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-[#005B9E]"
              >
                <input
                  type="radio"
                  name="sex"
                  value={s}
                  checked={form.sex === s}
                  onChange={handleChange}
                />
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
              className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E]"
            >
              Next →
            </Button>
          </div>
        </div>
      </form>

      {/* Passport Instructions Modal */}
      {showInstructions && (
        <PassportInstructionsModal
          open={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
      )}
    </>
  );
}
