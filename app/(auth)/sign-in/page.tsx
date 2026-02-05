import type { Metadata } from "next";

import SignInCard from "@/components/auth/sign-in/SignInCard";

export const metadata: Metadata = {
  title: "Sign In - Hack Canada Hacker Portal",
  description: "Sign in to your Hack Canada Hacker Portal account. Access your dashboard, manage applications, and connect with the HC community.",
  keywords: [
    "Hack Canada login",
    "HC login",
    "Hack Canada sign in",
    "hacker portal login",
    "HC portal sign in",
  ],
};

const SignInPage = () => {
  return <SignInCard />;
};

export default SignInPage;
