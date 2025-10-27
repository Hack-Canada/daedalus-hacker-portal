import type { Metadata } from "next";

import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = async (
  props: {
    params: Promise<{
      token: string;
    }>;
  }
) => {
  const params = await props.params;
  return <ResetPasswordCard token={params.token} />;
};

export default ResetPasswordPage;
