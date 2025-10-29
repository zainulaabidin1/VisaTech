"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Upload } from "lucide-react";
import { PassportInstructionsModal } from "../multistep-signup/passportinstruction/PassportInstructionsModal";

type StepProps = {
  onNext?: () => void;
  onPrev?: () => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export function Step1PassportInfo({ onNext, onPrev, form, setForm }: StepProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form className="space-y-8">
        {/* Upload Passport Section */}
        <div
          className="cursor-pointer group relative flex flex-col items-center justify-center w-full border-2 border-dashed border-[#00A5E5]/60 rounded-2xl py-12 hover:bg-[#E8F4FA]/70 transition-all duration-300 shadow-sm hover:shadow-lg"
          onClick={() => setShowInstructions(true)}
        >
          <div className="mt-6 flex justify-center">
  {form.passportImage ? (
    <img
      src={form.passportImage}
      alt="Passport Preview"
      className="h-40 w-auto rounded-xl shadow-md border border-[#00A5E5]/40 object-cover transition-all duration-300 hover:scale-[1.02]"
    />
  ) : (
    <Upload className="h-10 w-10 text-[#005B9E] mb-3 transition-transform duration-300 group-hover:scale-110" />
  )}
</div>

          <span className="text-[#005B9E] font-semibold text-lg tracking-wide">
            {form.passportImage ? "Change Passport" : "Click to Upload Passport"}
          </span>
          <p className="text-sm text-[#005B9E]/60 mt-1">
            JPG, PNG, or PDF up to 10MB
          </p>
        </div>

        {/* Warning Box */}
        <div className="rounded-xl bg-gradient-to-r from-[#FFF9E6] to-[#FFF3CC] border border-[#F9C400]/40 p-5 flex items-start gap-4 shadow-sm">
          <AlertTriangle className="text-[#F9C400] h-6 w-6 mt-0.5" />
          <div>
            <h3 className="font-semibold text-[#F9C400] text-base mb-1">
              Important
            </h3>
            <p className="text-sm text-[#005B9E]/90 leading-relaxed">
              Please enter your information exactly as written in your passport.
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "passportNo", label: "Passport No." },
            { key: "country", label: "Country of Residence" },
            { key: "nationality", label: "Nationality" },
            { key: "dob", label: "Date of Birth", type: "date" },
            { key: "expiry", label: "Date of Passport Expiry", type: "date" },
          ].map((f) => (
            <div key={f.key} className="flex flex-col">
              <label className="text-sm font-medium text-[#005B9E] mb-1.5">
                {f.label} <span className="text-red-500">*</span>
              </label>
              <input
                name={f.key}
                type={f.type || "text"}
                value={form[f.key] || ""}
                onChange={handleChange}
                required
                className="border border-[#00A5E5]/40 focus:border-[#00A5E5] focus:ring-2 focus:ring-[#00A5E5]/30 rounded-lg px-3 py-2.5 w-full text-black shadow-sm placeholder:text-gray-400 transition-all duration-200"
              />
            </div>
          ))}
        </div>

        {/* Sex Field */}
        <div>
          <label className="text-sm font-medium text-[#005B9E]">
            Sex <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-8 mt-3">
            {["male", "female"].map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-[#005B9E] font-medium cursor-pointer"
              >
                <input
                  type="radio"
                  name="sex"
                  value={s}
                  checked={form.sex === s}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[#00A5E5] cursor-pointer"
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => onPrev?.()}
            className="border-[#00A5E5] text-[#00A5E5] font-medium rounded-lg hover:bg-[#00A5E5] hover:text-white transition-all duration-300 px-6 py-2"
          >
            ← Back
          </Button>

          <div className="flex items-center gap-3">
            <p className="text-xs text-[#005B9E]/70 italic">
              All fields required
            </p>
            <Button
              type="button"
              onClick={() => onNext?.()}
              className="bg-gradient-to-r from-[#F9C400] to-[#FFD84A] text-[#005B9E] font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
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
  form={form}
  setForm={setForm}
/>

      )}
    </>
  );
}
