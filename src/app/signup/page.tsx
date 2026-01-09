"use client";

import { MultiStepSignup } from "@/components/multistep-signup/MultiStepSignup";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-blue-100/10 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
      {/* You can add a Back to Home button here if needed, or rely on the form */}
      <MultiStepSignup />
    </div>
  );
}
