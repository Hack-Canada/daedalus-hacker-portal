import type { Metadata } from "next";

import { EmailVerificationCard } from "@/components/auth/email-verification/EmailVerificationCard";

export const metadata: Metadata = {
  title: "Email Verification",
};

const EmailVerificationPage = () => {
  return <EmailVerificationCard />;
};

export default EmailVerificationPage;
