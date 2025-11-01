"use client";

import { MultiStepSignupModal } from "@/components/multistep-signup/MultiStepSignupModal";
import { useState } from "react";

export default function SignupPage() {
  const [open, setOpen] = useState(true); // modal opens on page load

  return (
    <>
      <MultiStepSignupModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
