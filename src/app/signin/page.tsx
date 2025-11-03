"use client";

import SignIn from "@/components/sign-in/Signin";
import { useState } from "react";

export default function SignupPage() {
  const [open, setOpen] = useState(true); // modal opens on page load

  return (
    <>
      <SignIn/>
    </>
  );
}
