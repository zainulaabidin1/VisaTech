"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

type StepProps = {
  onNext?: () => void
  onPrev?: () => void
  onClose?: () => void
}

export function Step1PassportInfo({ onNext, onPrev, onClose }: StepProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    passportNo: "",
    country: "",
    nationality: "",
    dob: "",
    sex: "male",
    expiry: "",
    passportFile: null as File | null,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [preview, setPreview] = useState<string | null>(null)

  const validate = () => {
    const newErrors: any = {}
    // required for these fields
    const requiredFields = [
      "firstName",
      "lastName",
      "passportNo",
      "country",
      "nationality",
      "dob",
      "expiry",
    ]
    for (const key of requiredFields) {
      if (!(formData as any)[key]) newErrors[key] = "This field is required"
    }

    if (formData.passportFile) {
      const file = formData.passportFile
      if (!["image/jpeg", "image/png"].includes(file.type))
        newErrors.passportFile = "Only JPG or PNG allowed"
      else if (file.size > 2 * 1024 * 1024)
        newErrors.passportFile = "File must be ≤ 2 MB"
    } else {
      newErrors.passportFile = "Passport image required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext?.()
    }
  }

  return (
    <form onSubmit={handleNext} className="space-y-6">
      {/* Upload Passport */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <label className="font-medium text-sm text-slate-800 dark:text-slate-200">
          Upload Passport<span className="text-red-500">*</span>
        </label>
        <label className="cursor-pointer flex flex-col items-center justify-center w-full border-2 border-dashed border-blue-300 rounded-xl py-10 hover:bg-blue-50 transition relative">
          <Input
            type="file"
            className="hidden"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setFormData((d) => ({ ...d, passportFile: file }))
              if (file) {
                const reader = new FileReader()
                reader.onload = () => setPreview(reader.result as string)
                reader.readAsDataURL(file)
              } else {
                setPreview(null)
              }
            }}
          />
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="max-h-32 rounded-md object-cover"
            />
          ) : (
            <>
              <Upload className="h-6 w-6 text-blue-500 mb-2" />
              <span className="text-blue-600 font-medium">
                Click to upload
              </span>
            </>
          )}
        </label>
        {errors.passportFile && (
          <p className="text-xs text-red-500 mt-1">{errors.passportFile}</p>
        )}
      </motion.div>

      {/* Warning */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5" />
        <div>
          <h3 className="font-semibold text-amber-700 dark:text-amber-400">
            Important
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Please enter your information exactly as written in your passport.
          </p>
          <p className="text-sm text-right text-slate-600 dark:text-slate-400 mt-1">
            ضروری معلومات<br />برائے کرم اپنی معلومات بالکل اسی طرح درج کریں جیسے آپ کے پاسپورٹ میں لکھی گئی ہے
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
            <label className="text-sm font-medium">
              {f.label}
              <span className="text-red-500">*</span>
            </label>
            <Input
              type={f.type || "text"}
              value={(formData as any)[f.key] as string}
              onChange={(e) =>
                setFormData((d) => ({ ...d, [f.key]: e.target.value }))
              }
              required
            />
            {errors[f.key] && (
              <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sex */}
      <div>
        <label className="text-sm font-medium">
          Sex<span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === "male"}
              onChange={() => setFormData((d) => ({ ...d, sex: "male" }))}
            />
            Male
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === "female"}
              onChange={() => setFormData((d) => ({ ...d, sex: "female" }))}
            />
            Female
          </label>
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <div>
          {/* call onPrev if provided */}
          <Button variant="outline" onClick={() => onPrev?.()}>
            Back
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground mr-3">All fields required</p>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8"
          >
            Next
          </Button>
        </div>
      </div>
    </form>
  )
}
