"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CheckCircle2,
    User,
    FileText,
    Phone,
    MailCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Step1PassportInfo } from "./Step1PassportInfo";
import { Step2PersonalInfo } from "../multistep-signup/Step2OtherDetails";
import { Step3ContactInfo } from "../multistep-signup/Step3ContactInfo";
import { Step4EmailVerification } from "../multistep-signup/Step4Verification";

export function MultiStepSignup({
    onClose,
    isModal = false,
}: {
    onClose?: () => void;
    isModal?: boolean;
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
        { label: "Passport Info", icon: FileText, component: Step1PassportInfo },
        { label: "Personal Details", icon: User, component: Step2PersonalInfo },
        { label: "Contact Info", icon: Phone, component: Step3ContactInfo },
        { label: "Verification", icon: MailCheck, component: Step4EmailVerification },
    ];

    const next = () => {
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

    // Get the current step component
    const CurrentStep = steps[step - 1]?.component;

    return (
        <div className={cn(
            "relative w-full max-w-3xl rounded-2xl bg-[#FFFFFF] shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col",
            isModal ? "max-h-[90vh]" : "min-h-[600px]"
        )}>
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-[#003366] to-[#004D99] p-6 text-white flex justify-between items-center">
                <h2 className="text-2xl font-semibold tracking-wide">
                    Create Your Account
                </h2>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white transition"
                    >
                        <X className="h-6 w-6" />
                    </button>
                )}
            </div>

            {/* Stepper Header */}
            {!completed && (
                <div className="px-8 py-6 bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#E2E8F0] rounded-full -translate-y-1/2" />
                        <motion.div
                            className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-[#003366] to-[#004D99] rounded-full -translate-y-1/2"
                            animate={{
                                width: `${((step - 1) / (steps.length - 1)) * 100}%`,
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        />

                        {steps.map((s, i) => {
                            const Icon = s.icon;
                            const isActive = step === i + 1;
                            const isCompleted = i + 1 < step;
                            return (
                                <div
                                    key={s.label}
                                    className="flex flex-col items-center z-10 w-full"
                                >
                                    <div
                                        className={cn(
                                            "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                                            isActive
                                                ? "bg-gradient-to-r from-[#003366] to-[#004D99] text-white border-transparent shadow-md"
                                                : isCompleted
                                                    ? "bg-[#059669] text-white border-[#059669]"
                                                    : "bg-white text-[#64748B] border-[#E2E8F0]"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-5 w-5" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-xs mt-2 font-medium",
                                            isActive
                                                ? "text-[#003366]"
                                                : isCompleted
                                                    ? "text-[#059669]"
                                                    : "text-[#94A3B8]"
                                        )}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-[#FFFFFF]">
                <AnimatePresence mode="wait">
                    {!completed ? (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Render Step4 with email prop, other steps normally */}
                            {step === 4 ? (
                                <Step4EmailVerification
                                    onNext={next}
                                    onPrev={prev}
                                    onClose={onClose}
                                    isLast={step === steps.length}
                                    email={form.email}
                                />
                            ) : (
                                <CurrentStep
                                    onNext={next}
                                    onPrev={prev}
                                    onClose={onClose}
                                    isLast={step === steps.length}
                                    form={form}
                                    setForm={setForm}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <CheckCircle2 className="h-16 w-16 text-[#059669] mb-4" />
                            <h2 className="text-2xl font-bold text-[#003366] mb-2">
                                Signup Completed!
                            </h2>
                            <p className="text-[#64748B] mb-6 max-w-sm">
                                Your registration is complete. A confirmation email has
                                been sent to your inbox.
                            </p>
                            {/* Only show Close button if onClose is provided (modal mode) or if we want a redirect button */}
                            {onClose ? (
                                <Button
                                    onClick={onClose}
                                    className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                                >
                                    Close
                                </Button>
                            ) : (
                                <Button
                                    // TODO: Add redirect logic or make this "Go to Login"
                                    onClick={() => window.location.href = '/signin'}
                                    className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                                >
                                    Go to Login
                                </Button>
                            )}

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
