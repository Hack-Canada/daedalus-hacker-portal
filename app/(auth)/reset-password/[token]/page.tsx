import type { Metadata } from "next";

import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard";

export const metadata: Metadata = {
  title: "Reset Password",
};

const ResetPasswordPage = ({
  params,
}: {
  params: {
    token: string;
  };
}) => {
  return <ResetPasswordCard token={params.token} />;
};

export default ResetPasswordPage;
