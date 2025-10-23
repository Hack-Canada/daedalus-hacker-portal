import type { Metadata } from "next";

import ForgotPasswordCard from "@/components/auth/forgot-password/ForgotPasswordCard";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordCard />;
};

export default ForgotPasswordPage;
