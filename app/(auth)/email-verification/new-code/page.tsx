import type { Metadata } from "next";

import NewCodeCard from "@/components/auth/email-verification/NewCodeCard";

export const metadata: Metadata = {
  title: "New Verification Code",
};

const NewCodePage = () => {
  return <NewCodeCard />;
};

export default NewCodePage;
