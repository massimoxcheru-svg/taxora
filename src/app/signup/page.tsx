"use client";

import { SignUpScreen } from "@/src/pages_component/signUp_page_component/signUp";

export default function SignupPage() {
  const handleSignUp = () => {
    console.log("Sign up");
  };

  return <SignUpScreen onSignUp={handleSignUp} />;
}
