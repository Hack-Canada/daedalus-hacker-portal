import type { Metadata } from "next";

import SignUpCard from "@/components/auth/sign-up/SignUpCard";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = () => {
  return <SignUpCard />;
};

export default SignUpPage;
