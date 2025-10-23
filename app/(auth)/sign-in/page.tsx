import type { Metadata } from "next";

import SignInCard from "@/components/auth/sign-in/SignInCard";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return <SignInCard />;
};

export default SignInPage;
